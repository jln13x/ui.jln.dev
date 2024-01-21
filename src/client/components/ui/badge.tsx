import * as React from "react";

import { cn } from "@/client/lib/cn";

import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary border-transparent text-primary-foreground",
        secondary: "bg-secondary border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive border-border-destructive text-destructive-foreground",
        success: "bg-success border-border-success text-success-foreground",
        warning: "bg-warning border-border-warning text-warning-foreground",
        info: "bg-info border-border-info text-info-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
