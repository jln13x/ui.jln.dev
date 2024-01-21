import { NextResponse } from "next/server";

import { auth } from "@/server/auth/auth";
import { routes } from "@/shared/routes";

import { pathToRegexp } from "path-to-regexp";

const publicRoutes: string[] = [
  routes.signin,
  "/",
  "/theme/(.*)",
  "/legal/(.*)",
  "/api/trpc/(.*)",
  "/api/auth/(.*)",
  "/api/webhooks/(.*)",
  "/api/uploadthing",
  "/api/uploadthing/(.*)",
];

export default auth((req) => {
  const publicRoutesAsRegex = publicRoutes.map((route) => pathToRegexp(route));

  const isPublicRoute = publicRoutesAsRegex.some((route) =>
    route.test(req.nextUrl.pathname),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (req.auth === null) {
    return NextResponse.redirect(new URL(routes.signin, req.nextUrl.href));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
