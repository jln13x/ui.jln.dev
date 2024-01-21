"use client";

import { type ReactNode } from "react";

import { ThemeStyleSheet } from "@/client/components/theme-style-sheet";
import { useActiveTheme } from "@/client/components/use-theme-config";
import { themeToStyles } from "@/client/lib/theme-to-styles";

import * as Portal from "@radix-ui/react-portal";

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const activeTheme = useActiveTheme();

  if (!activeTheme) return null;

  const style = themeToStyles(activeTheme);

  return (
    <div style={style} className="h-full w-full bg-background text-foreground">
      {children}
      <Portal.Root asChild>
        <ThemeStyleSheet />
      </Portal.Root>
    </div>
  );
};
