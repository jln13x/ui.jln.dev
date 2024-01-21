import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Logo } from "@/client/components/logo";
import { routes } from "@/shared/routes";
import { auth } from "@/server/auth/auth";
import { Providers } from "@/app/(auth)/providers";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-12">
        <div className="flex flex-col items-center gap-10">
          <Logo />
          <h1 className="text-center text-2xl font-semibold leading-none tracking-tight">
            Sign in to your account
          </h1>
        </div>
        <Providers />
        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link
            href={routes.legal.terms}
            className="font-medium underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={routes.legal.privacy}
            className="font-medium underline underline-offset-2"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
