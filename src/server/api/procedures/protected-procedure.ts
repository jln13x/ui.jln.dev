import { publicProcedure } from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const userId = ctx.session?.user?.id;

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (!ctx.session || !ctx.session.user || !userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: {
          ...ctx.session.user,
          id: userId,
        },
      },
    },
  });
});
