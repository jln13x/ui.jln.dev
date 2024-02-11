import { db } from "@/server/db";
import { themes, vscodeThemes } from "@/server/db/schema";

import { and, desc, eq, isNotNull, sql } from "drizzle-orm";
import { filter, isDefined, map, pipe } from "remeda";

export const getVscodeThemes = async (input: {
  limit: number;
  offset: number;
  query?: string;
}) => {
  const allPublicVscodeThemes = await db
    .select()
    .from(themes)
    .leftJoin(vscodeThemes, eq(vscodeThemes.themeId, themes.id))
    .orderBy(desc(vscodeThemes.installs))
    .where(
      and(
        input.query
          ? sql`LOWER(${themes.name}) LIKE ${`%${input.query.toLowerCase()}%`}`
          : undefined,

        isNotNull(vscodeThemes.id),
      ),
    )
    .limit(input.limit)
    .offset(input.offset);

  return pipe(
    map(allPublicVscodeThemes, (theme) => {
      if (!theme.vscodeThemes) return null;

      return {
        ...theme.themes,
        vscode: theme.vscodeThemes,
      };
    }),
    filter(isDefined),
  );
};
