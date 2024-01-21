import { protectedProcedure } from "@/server/api/procedures/protected-procedure";
import { router } from "@/server/api/trpc";
import { accounts } from "@/server/db/schema";
import { deleteUser } from "@/server/db/utils/delete-user";

import { eq } from "drizzle-orm";

export const userRouter = router({
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await deleteUser(ctx.session.user.id);
  }),

  accounts: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.accounts.findMany({
      where: eq(accounts.userId, ctx.session.user.id),
      columns: {
        provider: true,
      },
    });
  }),
});
