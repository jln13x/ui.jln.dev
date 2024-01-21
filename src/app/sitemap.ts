import { type MetadataRoute } from "next";

import { db } from "@/server/db";
import { themes } from "@/server/db/schema";

import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allThemes = await db.query.themes.findMany({
    where: eq(themes.isPublic, true),
  });

  return allThemes.map((theme) => ({
    url: `https://ui.jln.dev/theme/${theme.id}`,
    lastModified: theme.createdAt,
    priority: 0.5,
  }));
}
