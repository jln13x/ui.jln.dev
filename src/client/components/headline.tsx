"use client";

import { Logo } from "@/client/components/logo";
import { Badge } from "@/client/components/ui/badge";
import { cn } from "@/client/lib/cn";

export const Headline = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="pb-4">
        <div className="flex items-center gap-2 rounded-lg border bg-muted px-4 py-2">
          <Badge variant="success">New</Badge>
          <p>
            Over{" "}
            <span className="font-bold tabular-nums">
              {Number(1000).toLocaleString()}
            </span>{" "}
            themes from VS Code have been added.
          </p>
        </div>
      </div>

      <Logo className="size-10" />

      <h1
        className={cn(
          "animate relative flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl",
        )}
      >
        <span className="rounded-lg bg-primary px-2 py-1  tabular-nums text-primary-foreground lg:px-4 lg:py-2">
          {Number(10000).toLocaleString()}+
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
