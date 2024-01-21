import { themeRouter } from "@/server/api/routers/theme.router";
import { userRouter } from "@/server/api/routers/user.router";
import { router } from "@/server/api/trpc";

export const appRouter = router({
  user: userRouter,
  theme: themeRouter,
});

export type AppRouter = typeof appRouter;
