import { type Hsl, type Theme, type ThemeConfig } from "@/shared/theme-config";

import { Colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import namesPlugin from "colord/plugins/names";

extend([a11yPlugin, namesPlugin]);

export const hslToHex = (hsl: Hsl) => new Colord(hsl).toHex();

// Closest CSS named color, e.g. "slateblue"
export const hslToColorName = (hsl: Hsl) =>
  new Colord(hsl).toName({ closest: true }) ?? "";

const hueFamily = (h: number) => {
  const hue = ((h % 360) + 360) % 360;

  if (hue < 15) return "red";
  if (hue < 40) return "orange";
  if (hue < 65) return "yellow";
  if (hue < 150) return "green";
  if (hue < 185) return "teal";
  if (hue < 200) return "cyan";
  if (hue < 235) return "blue";
  if (hue < 255) return "indigo";
  if (hue < 285) return "violet";
  if (hue < 320) return "purple";
  if (hue < 345) return "pink";
  return "red";
};

const describeColor = (hsl: Hsl) => {
  if (hsl.s < 8 || hsl.l < 4 || hsl.l > 97) {
    if (hsl.l < 15) return "near-black";
    if (hsl.l > 90) return "near-white";
    return "neutral gray";
  }

  const tone = hsl.l < 30 ? "deep " : hsl.l > 75 ? "light " : "";
  const saturation = hsl.s < 30 ? "muted " : hsl.s > 75 ? "vivid " : "";

  return `${saturation}${tone}${hueFamily(hsl.h)}`;
};

const withArticle = (word: string) =>
  `${/^[aeiou]/.test(word) ? "an" : "a"} ${word}`;

const describeBackground = (hsl: Hsl) => {
  if (hsl.s < 8 || hsl.l < 3 || hsl.l > 97) return "neutral";

  return `${hueFamily(hsl.h)}-tinted`;
};

export const describeTheme = (name: string, config: ThemeConfig) => {
  const { light, dark } = config;

  const primary = describeColor(light.primary);
  const accent = describeColor(light.accent);
  const darkPrimary = describeColor(dark.primary);

  const darkSentence =
    darkPrimary === primary
      ? `Dark mode keeps the ${primary} primary`
      : `Dark mode switches to ${withArticle(darkPrimary)} primary`;

  return `${name} is a shadcn/ui theme built around ${withArticle(primary)} primary color (${hslToHex(light.primary)}) with ${accent} accents (${hslToHex(light.accent)}). The light mode uses ${withArticle(describeBackground(light.background))} background (${hslToHex(light.background)}). ${darkSentence} (${hslToHex(dark.primary)}) on ${withArticle(describeBackground(dark.background))} background (${hslToHex(dark.background)}).`;
};

const contrastPairs = [
  ["Text on background", "background", "foreground"],
  ["Text on card", "card", "cardForeground"],
  ["Primary button", "primary", "primaryForeground"],
  ["Secondary button", "secondary", "secondaryForeground"],
  ["Muted text", "muted", "mutedForeground"],
  ["Accent", "accent", "accentForeground"],
  ["Destructive", "destructive", "destructiveForeground"],
] as const satisfies ReadonlyArray<readonly [string, keyof Theme, keyof Theme]>;

export type ContrastCheck = {
  label: string;
  ratio: number;
  rating: "AAA" | "AA" | "AA Large" | "Fail";
};

export const getContrastChecks = (theme: Theme): ContrastCheck[] => {
  return contrastPairs.map(([label, backgroundKey, foregroundKey]) => {
    const background = new Colord(theme[backgroundKey]);
    const foreground = new Colord(theme[foregroundKey]);
    const ratio = background.contrast(foreground);

    const rating =
      ratio >= 7
        ? "AAA"
        : ratio >= 4.5
          ? "AA"
          : ratio >= 3
            ? "AA Large"
            : "Fail";

    return { label, ratio, rating };
  });
};
