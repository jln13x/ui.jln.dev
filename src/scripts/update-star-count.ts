import { db } from "@/server/db";
import { stars, themes } from "@/server/db/schema";

import { sql } from "drizzle-orm";

try {
  const starCounts = await db
    .select({
      themeId: stars.themeId,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(stars)
    .groupBy(stars.themeId);

  for (const { themeId, count } of starCounts) {
    await db
      .update(themes)
      .set({ starsCount: count })
      .where(sql`${themes.id} = ${themeId}`);
  }

  console.log("Theme star counts updated successfully");
} catch (error) {
  console.error("Error updating theme star counts:", error);
}
