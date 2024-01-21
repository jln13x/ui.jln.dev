"use client";

import { type ReactNode } from "react";

import { ThemeProvider } from "@/client/components/theme-provider";
import { Toaster } from "@/client/components/ui/sonner";
import { TooltipProvider } from "@/client/components/ui/tooltip";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </TooltipProvider>
  );
};
