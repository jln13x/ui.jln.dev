import { db } from "@/server/db";
import { accounts, sessions, stars, themes, users } from "@/server/db/schema";

import { eq } from "drizzle-orm";

// cascade not possible with planetscale
export const deleteUser = async (userId: string) => {
  await db.transaction(async () => {
    // User
    await db.delete(users).where(eq(users.id, userId));

    // Sessions
    await db.delete(sessions).where(eq(sessions.userId, userId));

    // Accounts
    await db.delete(accounts).where(eq(accounts.userId, userId));

    // Themes
    await db.delete(themes).where(eq(themes.userId, userId));

    // Starred Themes
    await db.delete(stars).where(eq(stars.userId, userId));
  });
};
