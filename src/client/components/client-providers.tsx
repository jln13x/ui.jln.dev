"use client";

import { type ReactNode } from "react";

import { Toaster } from "@/client/components/ui/sonner";
import { TooltipProvider } from "@/client/components/ui/tooltip";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider delayDuration={100}>
      {children}
      <Toaster />
    </TooltipProvider>
  );
};
