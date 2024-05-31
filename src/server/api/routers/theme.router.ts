import { protectedProcedure } from "@/server/api/procedures/protected-procedure";
import { publicProcedure, router } from "@/server/api/trpc";
import { db } from "@/server/db";
import { stars, themes } from "@/server/db/schema";
import { createId } from "@/server/db/utils/create-id";
import { getVscodeThemes } from "@/server/get-vscode-themes";
import {
  changeVisiblityRateLimit,
  saveThemePublicRateLimit,
  starRateLimit,
} from "@/server/ratelimit";
import { SaveThemeSchema } from "@/shared/save-theme-schema";
import { ThemeConfigSchema } from "@/shared/theme-config";

import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ne, or, sql } from "drizzle-orm";
import { omit } from "remeda";
import { z } from "zod";

const themeSelect = {
  id: themes.id,
  userId: themes.userId,
  name: themes.name,
  config: themes.config,
  createdAt: themes.createdAt,
  isPublic: themes.isPublic,
  stars: count(stars.themeId).as("stars"),
};

export const themeRouter = router({
  save: protectedProcedure
    .input(
      SaveThemeSchema.merge(
        z.object({
          config: ThemeConfigSchema,
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.isPublic) {
        const rl = await saveThemePublicRateLimit.limit(ctx.session.user.id);

        if (!rl.success) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
          });
        }
      }

      const id = createId();

      await ctx.db.insert(themes).values({
        id,
        name: input.name,
        config: input.config,
        userId: ctx.session.user.id,
        isPublic: input.isPublic,
      });

      return {
        id,
      };
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const themeQuery = await ctx.db
        .select(themeSelect)
        .from(themes)
        .leftJoin(stars, and(eq(stars.themeId, themes.id)))
        .where(
          and(
            eq(themes.id, input.id),
            or(
              eq(themes.isPublic, true),
              ctx.session?.user?.id
                ? eq(themes.userId, ctx.session?.user.id)
                : undefined,
            ),
          ),
        )
        .groupBy(themes.id);

      const starredByUserQuery = getStarredByUserQuery(ctx.session?.user?.id);

      const [theme, starredByUser] = await Promise.all([
        themeQuery.at(0),
        starredByUserQuery,
      ]);

      if (!theme) return null;

      return {
        ...theme,
        starred:
          ctx.session?.user?.id && starredByUser
            ? starredByUser.includes(`${theme.id}___${ctx.session.user.id}`)
            : false,
      };
    }),

  allFromUser: protectedProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = 50;
      const offset = input.cursor ?? 0;

      const themesFromUser = await ctx.db
        .select(themeSelect)
        .from(themes)
        .leftJoin(stars, eq(stars.themeId, themes.id))
        .where(eq(themes.userId, ctx.session.user.id))
        .limit(limit)
        .offset(offset)
        .groupBy(themes.id);

      return {
        themes: themesFromUser.map((theme) => ({
          ...theme,
          starred: false,
        })),
        nextCursor: themesFromUser.length === limit ? offset + limit : null,
      };
    }),

  allStarredFromUser: protectedProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = 50;
      const offset = input.cursor ?? 0;

      const themesFromUser = await ctx.db
        .select(omit(themeSelect, ["stars"]))
        .from(themes)
        .innerJoin(
          stars,
          and(
            eq(stars.themeId, themes.id),
            eq(stars.userId, ctx.session.user.id),
          ),
        )
        .limit(limit)
        .offset(offset)
        .groupBy(themes.id);

      return {
        themes: themesFromUser.map((theme) => ({
          ...theme,
          starred: true,
        })),
        nextCursor: themesFromUser.length === limit ? offset + limit : null,
      };
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(themes)
        .where(
          and(eq(themes.userId, ctx.session.user.id), eq(themes.id, input.id)),
        );
    }),

  allPublic: publicProcedure
    .input(
      z.object({
        sortBy: z.enum(["stars", "createdAt"]).optional(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = 50;
      const offset = input.cursor ?? 0;

      const publicThemesQuery = ctx.db
        .select(themeSelect)
        .from(themes)
        .leftJoin(stars, eq(stars.themeId, themes.id))
        .where(
          and(eq(themes.isPublic, true), ne(themes.userId, "system-vscode")),
        )
        .limit(limit)
        .offset(offset)
        .orderBy(
          input.sortBy === "stars" ? desc(sql`stars`) : desc(themes.createdAt),
        )
        .groupBy(themes.id);

      const starredByUserQuery = getStarredByUserQuery(ctx.session?.user?.id);

      const [publicThemes, starredByUser] = await Promise.all([
        publicThemesQuery,
        starredByUserQuery,
      ]);

      return {
        themes: publicThemes.map((theme) => ({
          ...theme,
          starred:
            ctx.session?.user?.id && starredByUser
              ? starredByUser.includes(`${theme.id}___${ctx.session.user.id}`)
              : false,
        })),
        nextCursor: publicThemes.length === limit ? offset + limit : null,
      };
    }),

  toggleStar: protectedProcedure
    .input(
      z.object({
        themeId: z.string(),
        starred: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const rl = await starRateLimit.limit(input.themeId);

      if (!rl.success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      if (!input.starred) {
        await ctx.db
          .delete(stars)
          .where(
            and(
              eq(stars.themeId, input.themeId),
              eq(stars.userId, ctx.session.user.id),
            ),
          );
        return;
      }

      await ctx.db.insert(stars).values({
        themeId: input.themeId,
        userId: ctx.session.user.id,
      });
    }),

  changeVisiblity: protectedProcedure
    .input(
      z.object({
        themeId: z.string(),
        isPublic: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const rl = await changeVisiblityRateLimit.limit(input.themeId);

      if (!rl.success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      await ctx.db
        .update(themes)
        .set({
          isPublic: input.isPublic,
        })
        .where(
          and(
            eq(themes.id, input.themeId),
            eq(themes.userId, ctx.session.user.id),
          ),
        );
    }),

  publicCount: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({
        count: sql`COUNT(${themes.id})`.mapWith(Number),
      })
      .from(themes)
      .where(eq(themes.isPublic, true));

    const res = result.at(0);

    if (!res) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return res.count;
  }),

  allPublicVscodeThemes: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = 50;
      const offset = input.cursor ?? 0;
      const allPublicVscodeThemes = await getVscodeThemes({
        limit,
        offset,
        query: input.query,
      });

      return {
        themes: allPublicVscodeThemes,
        nextCursor:
          allPublicVscodeThemes.length === limit ? offset + limit : null,
      };
    }),
});

const getStarredByUserQuery = (userId?: string) => {
  if (!userId) return null;

  return db
    .select({
      themeId: stars.themeId,
      userId: stars.userId,
    })
    .from(stars)
    .where(eq(stars.userId, userId))
    .then((r) => r.flatMap((r) => [r.themeId, r.userId].join("___")));
};
