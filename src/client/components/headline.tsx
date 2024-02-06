"use client";

import { Logo } from "@/client/components/logo";
import { cn } from "@/client/lib/cn";

export const Headline = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo className="size-10" />
      <h1
        className={cn(
          "animate relative flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl",
        )}
      >
        <span className="rounded-lg bg-primary px-2 py-1  tabular-nums text-primary-foreground lg:px-4 lg:py-2">
          10.000+
        </span>
        Themes for shadcn/ui
      </h1>

      <p className="">
        Built by{" "}
        <a href="https://x.com/jlndev" className="font-bold text-primary">
          jlndev
        </a>
      </p>
    </div>
  );
};
