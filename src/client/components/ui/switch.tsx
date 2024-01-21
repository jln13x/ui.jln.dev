"use client";

import * as React from "react";

import { cn } from "@/client/lib/cn";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

const switchRootVariants = cva(
  "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-transparent data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        inverted:
          "bg-background data-[state=checked]:bg-background border-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        default: "bg-background",
        inverted: "bg-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchRootVariants>,
    VariantProps<typeof switchThumbVariants> {}

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchRootVariants>,
    VariantProps<typeof switchThumbVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant: colorScheme, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchRootVariants({ variant: colorScheme }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={switchThumbVariants({ variant: colorScheme })}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
