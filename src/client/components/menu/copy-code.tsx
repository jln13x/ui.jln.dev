"use client";

import { CopyButton } from "@/client/components/copy-button";
import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { useThemeConfig } from "@/client/lib/use-theme-config";
import { backfillCharts } from "@/shared/create-theme-config";
import { chartKeys, type Hsl, type Theme, type ThemeConfig } from "@/shared/theme-config";

import { HSL_to_XYZ_D50, XYZ_D50_to_OKLCH } from "@csstools/color-helpers";
import { useIsMobile } from "@jlns/hooks";
import { RemoveScroll } from "react-remove-scroll";
import { keys } from "remeda";

const variables: Record<keyof Theme, string> = {
  background: "background",
  foreground: "foreground",
  muted: "muted",
  mutedForeground: "muted-foreground",
  popover: "popover",
  popoverForeground: "popover-foreground",
  card: "card",
  cardForeground: "card-foreground",
  border: "border",
  input: "input",
  primary: "primary",
  primaryForeground: "primary-foreground",
  secondary: "secondary",
  secondaryForeground: "secondary-foreground",
  accent: "accent",
  accentForeground: "accent-foreground",
  destructive: "destructive",
  destructiveForeground: "destructive-foreground",
  ring: "ring",
  "chart-1": "chart-1",
  "chart-2": "chart-2",
  "chart-3": "chart-3",
  "chart-4": "chart-4",
  "chart-5": "chart-5",
};

const hslToOklch = (hsl: Hsl): string => {
  const xyz = HSL_to_XYZ_D50([hsl.h, hsl.s, hsl.l]);
  const oklch = XYZ_D50_to_OKLCH(xyz);
  const formatValue = (value: number): string => {
    return Number(value.toFixed(3)).toString();
  };
  return `${formatValue(oklch[0])} ${formatValue(oklch[1])} ${formatValue(oklch[2])}`;
};

const configToCss = (config: ThemeConfig) => {
  const order = keys.strict(variables);
  const lightTheme = backfillCharts(config.light, [...chartKeys]);
  const darkTheme = backfillCharts(config.dark, [...chartKeys]);

  const light = order
    .map((key) => {
      const hsl = lightTheme[key];
      const oklchValue = hslToOklch(hsl);
      return `  --${variables[key]}: oklch(${oklchValue});`;
    })
    .join("\n");

  const dark = order
    .map((key) => {
      const hsl = darkTheme[key];
      const oklchValue = hslToOklch(hsl);
      return `  --${variables[key]}: oklch(${oklchValue});`;
    })
    .join("\n");

  return `:root {
  --radius: 0.5rem;
${light}
}

.dark {
  --radius: 0.5rem;
${dark}
}
`;
};

const title = "Copy code";
const description = "Just copy the code below into your own project.";

export const CopyCode = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <MenuButton>
            <Icons.Copy className="size-4" />
            <span className="sr-only">Copy code</span>
          </MenuButton>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="flex max-h-[80svh] flex-col p-4">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <MenuButton>
              <Icons.Copy className="size-4" />
              <span className="sr-only">Copy code</span>
            </MenuButton>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>Copy current theme as code</TooltipContent>
      </Tooltip>
      <DialogContent className="flex max-h-[95vh] w-[98vw] max-w-screen-lg flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

const Content = () => {
  const config = useThemeConfig();

  const themeTemplate = configToCss(config);

  return (
    <div className="relative grid min-h-0 rounded-md border bg-muted">
      <CopyButton value={themeTemplate} />
      <pre className="h-full overflow-auto">
        <code className="block rounded px-2 py-3 font-mono text-xs lg:text-sm">
          {themeTemplate}
        </code>
      </pre>
    </div>
  );
};
