import { createId } from "@/server/db/utils/create-id";
import { type ThemeConfig } from "@/shared/theme-config";
import { type VscodeTheme } from "@/shared/vscode";

import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  numeric,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { TABLE_NAME } from "project.config";

export const table = sqliteTableCreator((name) => `${TABLE_NAME}_${name}`);

export const users = table("user", {
  id: text("id", { length: 255 }).primaryKey().notNull().$defaultFn(createId),
  name: text("name", { length: 255 }).notNull().default(""),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: numeric("emailVerified").default(sql`(CURRENT_TIMESTAMP)`),
  image: text("image", { length: 255 }).default("sql`(NULL)`"),
  created_at: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  themes: many(themes),
  stars: many(stars),
}));

export const accounts = table(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = table("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const themes = table(
  "themes",
  {
    id: text("id", { length: 255 }).primaryKey().notNull().$defaultFn(createId),
    name: text("name", { length: 255 }).notNull().default(""),
    config: text("config", { mode: "json" }).$type<ThemeConfig>().notNull(),
    createdAt: numeric("created_at")
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
    userId: text("userId", { length: 255 }).notNull(),
    isPublic: integer("isPublic", { mode: "boolean" }).default(true).notNull(),
    starsCount: integer("stars_count").default(0),
  },
  (theme) => ({
    nameIdx: index("themes_name_idx").on(theme.name),
    userIdIdx: index("themes_userId_idx").on(theme.userId),
    isPublicIdx: index("themes_isPublic_idx").on(theme.isPublic),
    userIdIsPublicCreatedAtIdx: index(
      "themes_userId_isPublic_createdAt_idx",
    ).on(theme.userId, theme.isPublic, theme.createdAt),
  }),
);

export type DatabaseTheme = typeof themes.$inferSelect & {
  stars: number;
  starred: boolean;
};

export const themeRelations = relations(themes, ({ one, many }) => ({
  user: one(users, { fields: [themes.userId], references: [users.id] }),
  stars: many(stars),
}));

export const stars = table(
  "stars",
  {
    userId: text("userId", { length: 255 }).notNull(),
    themeId: text("themeId", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      themeIdIdx: index("stars_themeId_idx").on(table.themeId),
      userIdIdx: index("stars_userId_idx").on(table.userId),
      compoundKey: primaryKey({
        columns: [table.themeId, table.userId],
      }),
    };
  },
);

export const starsRelations = relations(stars, ({ one }) => ({
  user: one(users, { fields: [stars.userId], references: [users.id] }),
  theme: one(themes, { fields: [stars.themeId], references: [themes.id] }),
}));

export const vscodeThemes = table("vscodeThemes", {
  id: text("id", { length: 255 }).primaryKey().notNull(),
  themeId: text("themeId", { length: 255 }).notNull(),
  metadata: text("metadata", { mode: "json" }).notNull().$type<VscodeTheme>(),
  installs: integer("installs").notNull(),
});
