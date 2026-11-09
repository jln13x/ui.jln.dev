import "server-only";

import { db } from "@/server/db";
import { themes } from "@/server/db/schema";

import { and, asc, desc, eq, gt, lt, ne } from "drizzle-orm";

const themeSelect = {
  id: themes.id,
  name: themes.name,
  config: themes.config,
};

// Neighbours by primary key instead of color similarity: every theme page gets
// a different set of links, all public themes become reachable through
// internal links, and each query only reads a handful of rows.
export const getMoreThemes = async (themeId: string, limit = 8) => {
  const half = Math.ceil(limit / 2);

  const [after, before] = await Promise.all([
    db
      .select(themeSelect)
      .from(themes)
      .where(and(eq(themes.isPublic, true), gt(themes.id, themeId)))
      .orderBy(asc(themes.id))
      .limit(half),
    db
      .select(themeSelect)
      .from(themes)
      .where(and(eq(themes.isPublic, true), lt(themes.id, themeId)))
      .orderBy(desc(themes.id))
      .limit(limit - half),
  ]);

  const result = [...after, ...before];

  // Wrap around at the start/end of the id range
  if (result.length < limit) {
    const wrapped = await db
      .select(themeSelect)
      .from(themes)
      .where(and(eq(themes.isPublic, true), ne(themes.id, themeId)))
      .orderBy(after.length < half ? asc(themes.id) : desc(themes.id))
      .limit(limit);

    for (const theme of wrapped) {
      if (result.length >= limit) break;
      if (!result.some((t) => t.id === theme.id)) result.push(theme);
    }
  }

  return result;
};
