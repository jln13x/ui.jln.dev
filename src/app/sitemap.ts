import { type MetadataRoute } from "next";

import { db } from "@/server/db";
import { themes } from "@/server/db/schema";

import { count } from "drizzle-orm";
import pMap from "p-map";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const CHUNK_SIZE = 2000;
  const CONCURRENT_REQUESTS = 2;

  const res = await db.select({ count: count() }).from(themes);

  const totalThemes = res.at(0)?.count ?? 0;

  const chunks = Math.ceil(totalThemes / CHUNK_SIZE);
  const chunkIndices = Array.from({ length: chunks }, (_, i) => i);

  const themeChunks = await pMap(
    chunkIndices,
    async (chunkIndex) => {
      const offset = chunkIndex * CHUNK_SIZE;

      const themes = await db.query.themes.findMany({
        limit: CHUNK_SIZE,
        offset,
      });

      return themes.map((theme) => ({
        url: `https://ui.jln.dev/theme/${theme.id}`,
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
