import { db } from "@/server/db";
import { mysqlTable, sessions, users } from "@/server/db/schema";
import { routes } from "@/shared/routes";
import { env } from "@/env";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth, { type DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import Github from "next-auth/providers/github";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {}
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: {
    ...DrizzleAdapter(db, mysqlTable),
    getUser: async (id) => {
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      return user ?? null;
    },
    getSessionAndUser: async (sessionToken) => {
      const sessionAndUser = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);

      return sessionAndUser;
    },
  },
  pages: {
    signIn: routes.signin,
  },
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
});
