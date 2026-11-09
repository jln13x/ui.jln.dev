import { backfillCharts } from "@/shared/create-theme-config";
import {
  chartKeys,
  type Hsl,
  type Theme,
  type ThemeConfig,
} from "@/shared/theme-config";

import { HSL_to_XYZ_D50, XYZ_D50_to_OKLCH } from "@csstools/color-helpers";
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

export const configToCss = (config: ThemeConfig) => {
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
