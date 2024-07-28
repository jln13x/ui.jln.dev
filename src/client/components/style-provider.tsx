"use client";

import { type ReactNode } from "react";

import { ThemeStyleSheet } from "@/client/components/theme-style-sheet";
import { Skeleton } from "@/client/components/ui/skeleton";
import { themeToStyles } from "@/client/lib/theme-to-styles";
import { useActiveTheme } from "@/client/lib/use-theme-config";

import { createPortal } from "react-dom";
import { range } from "remeda";

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const activeTheme = useActiveTheme();

  if (!activeTheme)
    return (
      <div className="container grid gap-12 py-24 lg:grid-cols-3 lg:py-40">
        {range(0, 9).map((i) => (
          <Skeleton key={i} className="h-60" />
        ))}
      </div>
    );

  const style = themeToStyles(activeTheme);

  return (
    <div style={style} className="h-full w-full bg-background text-foreground">
      {children}
      {createPortal(<ThemeStyleSheet />, document.head)}
    </div>
  );
};
