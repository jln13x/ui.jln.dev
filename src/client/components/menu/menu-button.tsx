import { forwardRef } from "react";

import { Button, type ButtonProps } from "@/client/components/ui/button";
import { cn } from "@/client/lib/cn";

export const MenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn("h-full border bg-accent", className)}
        {...props}
      />
    );
  },
);

MenuButton.displayName = "MenuButton";
