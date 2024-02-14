"use client";

import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { Logo } from "@/client/components/logo";
import { Badge } from "@/client/components/ui/badge";
import { Button } from "@/client/components/ui/button";
import { cn } from "@/client/lib/cn";

import { Coffee } from "lucide-react";

export const Headline = () => {
  return (
    <div>
      <div className="border-b bg-muted py-3 text-muted-foreground">
        <div className="container flex items-center justify-center gap-2 text-center text-sm max-sm:flex-col">
          <p>
            Generate feedback colors (success, warning, error, and info) for
            shadcn/ui
          </p>
          <Link
            href="/feedback-colors-generator-for-shadcn-ui"
            className="rounded-lg bg-accent px-3 py-0.5 text-accent-foreground hover:bg-accent/80"
          >
            Go to generator
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 pt-8">
        <div className="pb-4">
          <div className="flex items-center gap-2 rounded-lg border bg-muted px-4 py-2 max-sm:flex-col max-sm:text-center max-sm:text-sm">
            <Badge variant="success">New</Badge>
            <p>
              Over <span className="font-bold tabular-nums">1000</span> themes
              from VS Code have been added.
            </p>

            <Button className="whitespace-nowrap" size="xs" asChild>
              <a
                href="https://twitter.com/jlndev/status/1757017446391664808"
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </a>
            </Button>
          </div>
        </div>

        <Logo className="size-10" />

        <h1
          className={cn(
            "animate relative flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl",
          )}
        >
          <span className="rounded-lg bg-primary px-2 py-1  tabular-nums text-primary-foreground lg:px-4 lg:py-2">
            10000+
          </span>
          Themes for shadcn/ui
        </h1>

        <div className="pt-6">
          <Support />
        </div>
      </div>
    </div>
  );
};

export const Support = () => {
  return (
    <div className="flex flex-col items-center gap-1.5 text-sm text-muted-foreground">
      <p className="text-center">
        Found an awesome theme? Consider supporting me.
      </p>
      <div className="flex items-center gap-2 max-sm:flex-col">
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
  );
};
