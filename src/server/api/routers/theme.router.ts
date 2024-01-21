import { protectedProcedure } from "@/server/api/procedures/protected-procedure";
import { publicProcedure, router } from "@/server/api/trpc";
import { stars, themes } from "@/server/db/schema";
import { createId } from "@/server/db/utils/create-id";
import {
  changeVisiblityRateLimit,
  saveThemePublicRateLimit,
  starRateLimit,
} from "@/server/ratelimit";
import { SaveThemeSchema } from "@/shared/save-theme-schema";
import { ThemeConfigSchema } from "@/shared/theme-config";

import { TRPCError } from "@trpc/server";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { isDefined } from "remeda";
import { z } from "zod";

const getThemeSelect = (userId?: string) => ({
  id: themes.id,
  userId: themes.userId,
  name: themes.name,
  config: themes.config,
  createdAt: themes.createdAt,
  isPublic: themes.isPublic,
  stars: sql`COUNT(${stars.themeId})`.mapWith(Number).as("stars"),
  starred: isDefined(userId)
    ? sql`MAX(CASE WHEN ${stars.userId} = ${userId} THEN 1 ELSE 0 END)`
        .mapWith((val) => Boolean(Number(val)))
        .as("starred")
    : sql`0`.mapWith((val) => Boolean(Number(val))).as("starred"),
});

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
      const result = await ctx.db
        .select({
          ...getThemeSelect(ctx.session?.user?.id),
        })
        .from(themes)
        .leftJoin(stars, eq(stars.themeId, themes.id))
        .where(
          and(
            eq(themes.id, input.id),
            or(
              eq(themes.isPublic, true),
              ctx.session?.user
                ? eq(themes.userId, ctx.session?.user.id)
                : undefined,
            ),
          ),
        )
        .groupBy(themes.id);

      const theme = result.at(0);

      return theme;
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
        .select({
          ...getThemeSelect(ctx.session?.user?.id),
        })
        .from(themes)
        .leftJoin(stars, eq(stars.themeId, themes.id))
        .where(eq(themes.userId, ctx.session.user.id))
        .limit(limit)
        .offset(offset)
        .groupBy(themes.id);

      return {
        themes: themesFromUser,
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

      const publicThemes = await ctx.db
        .select({
          ...getThemeSelect(ctx.session?.user?.id),
        })
        .from(themes)
        .leftJoin(stars, eq(stars.themeId, themes.id))
        .where(eq(themes.isPublic, true))
        .limit(limit)
        .offset(offset)
        .orderBy(
          input.sortBy === "stars"
            ? desc(sql`COUNT(${stars.themeId})`)
            : desc(themes.createdAt),
        )
        .groupBy(themes.id);

      return {
        themes: publicThemes,
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
});
