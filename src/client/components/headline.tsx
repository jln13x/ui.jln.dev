"use client";

import * as Icons from "@/client/components/icons";
import { Logo } from "@/client/components/logo";
import { Badge } from "@/client/components/ui/badge";
import { cn } from "@/client/lib/cn";

import { Coffee } from "lucide-react";

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

      <div className="pt-6">
        <div className="flex flex-col items-center gap-1.5 text-sm text-muted-foreground">
          <p>Found an awesome theme? Consider supporting me.</p>
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/jlndev"
              className="flex items-center gap-2 rounded border border-accent-foreground/20 bg-accent  px-4 py-0.5 text-sm text-accent-foreground"
            >
              <Icons.Xcom className="size-4" />
              <span className="font-medium">
                Built by <span className="font-bold">jlndev</span>
              </span>
            </a>
            <a
              href="https://www.buymeacoffee.com/jlndev"
              className="flex items-center gap-1 rounded border border-muted-foreground/20 bg-muted px-4 py-0.5 font-medium text-muted-foreground "
            >
              <Coffee className="size-4" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
