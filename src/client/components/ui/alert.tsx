import * as React from "react";

import { cn } from "@/client/lib/cn";

import { cva, type VariantProps } from "class-variance-authority";

const alertVariants = cva("relative rounded-lg border font-medium", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      warning: "border-border-warning text-warning-foreground bg-warning",
      destructive:
        "border-border-destructive text-destructive-foreground bg-destructive",
      success: "border-border-success text-success-foreground bg-success",
      info: "border-border-info text-info-foreground bg-info",
    },
    size: {
      default: "px-6 py-4",
      sm: "px-4 py-2 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
