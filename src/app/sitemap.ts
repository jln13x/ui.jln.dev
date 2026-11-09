import { type MetadataRoute } from "next";

import { db } from "@/server/db";
import { themes } from "@/server/db/schema";

import { asc, count, eq } from "drizzle-orm";
import pMap from "p-map";

export const dynamic = "force-static";

// SQLite CURRENT_TIMESTAMP format: "YYYY-MM-DD HH:MM:SS" (UTC)
const parseSqliteTimestamp = (value: string) => {
  const date = new Date(`${value.replace(" ", "T")}Z`);

  return isNaN(date.getTime()) ? undefined : date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const CHUNK_SIZE = 2000;
  const CONCURRENT_REQUESTS = 2;

  const res = await db
    .select({ count: count() })
    .from(themes)
    .where(eq(themes.isPublic, true));

  const totalThemes = res.at(0)?.count ?? 0;

  const chunks = Math.ceil(totalThemes / CHUNK_SIZE);
  const chunkIndices = Array.from({ length: chunks }, (_, i) => i);

  const themeChunks = await pMap(
    chunkIndices,
    async (chunkIndex) => {
      const offset = chunkIndex * CHUNK_SIZE;

      // Private themes 404, so they must not be listed. A stable order keeps
      // the chunks from overlapping or skipping themes.
      const publicThemes = await db
        .select({ id: themes.id, createdAt: themes.createdAt })
        .from(themes)
        .where(eq(themes.isPublic, true))
        .orderBy(asc(themes.id))
        .limit(CHUNK_SIZE)
        .offset(offset);

      return publicThemes.map((theme) => ({
        url: `https://ui.jln.dev/theme/${theme.id}`,
        lastModified: parseSqliteTimestamp(theme.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }));
    },
    {
      concurrency: CONCURRENT_REQUESTS,
      stopOnError: true,
    },
  );

  return [
    {
      url: "https://ui.jln.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ui.jln.dev/feedback-colors-generator-for-shadcn-ui",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },

    ...themeChunks.flat(),
  ];
}
