import { createId } from "@/server/db/utils/create-id";
import { type ThemeConfig } from "@/shared/theme-config";
import { type VscodeTheme } from "@/shared/vscode";

import { type AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  json,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { TABLE_NAME } from "project.config";

export const mysqlTable = mysqlTableCreator((name) => `${TABLE_NAME}_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  themes: many(themes),
  stars: many(stars),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const themes = mysqlTable(
  "themes",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    config: json("config").$type<ThemeConfig>().notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      fsp: 3,
    })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    isPublic: boolean("isPublic").default(true).notNull(),
  },
  (theme) => ({
    nameIdx: index("name_idx").on(theme.name),
    userIdIdx: index("userId_idx").on(theme.userId),
    isPublicIdx: index("isPublic_idx").on(theme.isPublic),
    userIdIsPublicCreatedAtIdx: index("userId_isPublic_createdAt_idx").on(
      theme.userId,
      theme.isPublic,
      theme.createdAt,
    ),
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

export const stars = mysqlTable(
  "stars",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    themeId: varchar("themeId", { length: 255 }).notNull(),
  },
  (star) => ({
    compoundKey: primaryKey(star.userId, star.themeId),
    themeIdIdx: index("themeId_idx").on(star.themeId),
    userIdIdx: index("userId_idx").on(star.userId),
  }),
);

export const starsRelations = relations(stars, ({ one }) => ({
  user: one(users, { fields: [stars.userId], references: [users.id] }),
  theme: one(themes, { fields: [stars.themeId], references: [themes.id] }),
}));

export const vscodeThemes = mysqlTable("vscodeThemes", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),

  installs: int("installs").notNull(),
  themeId: varchar("themeId", { length: 255 }).notNull(),
  metadata: json("metadata").notNull().$type<VscodeTheme>(),
});
