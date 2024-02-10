import { hslToVariableValue } from "@/client/lib/hsl-to-variable-value";
import { type Hsl, type Theme } from "@/shared/theme-config";

import { fromPairs, invert, keys } from "remeda";

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
};

export const themeToStyles = (theme: Theme) => {
  const order = keys.strict(variables);

  const ordered = order.map((key) => {
    return [`--${variables[key]}`, hslToVariableValue(theme[key])] as const;
  });

  return fromPairs.strict(ordered);
};

export const cssToTheme = (styles: string) => {
  const lines = styles.split("\n");

  const invertedVariables = invert(variables);

  const lightThemeEntries: Array<[keyof Theme, Hsl]> = [];
  const darkThemeEntries: Array<[keyof Theme, Hsl]> = [];

  let errors = 0;

  let isDark = false;

  for (const line of lines) {
    if (line.includes(".dark")) {
      isDark = true;
    }

    if (line.includes("}")) {
      isDark = false;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith("--")) {
      const [variable, value] = trimmed.split(":");

      if (!variable) {
        errors++;
        continue;
      }

      const themeKey = invertedVariables[variable.replace("--", "")];

      if (!themeKey) continue;

      if (!value) {
        errors++;
        continue;
      }

      const hsl = value.trim().replace(";", "").replaceAll("%", "").split(" ");

      if (hsl.length !== 3) {
        errors++;
        continue;
      }

      const [h, s, l] = hsl;

      if (!h || !s || !l) {
        errors++;
        continue;
      }

      const hAsNumber = Number(h);
      const sAsNumber = Number(s);
      const lAsNumber = Number(l);

      if (isNaN(hAsNumber) || isNaN(sAsNumber) || isNaN(lAsNumber)) {
        errors++;
        continue;
      }

      const hslColor: Hsl = {
        h: hAsNumber,
        s: sAsNumber,
        l: lAsNumber,
      };

      if (isDark) {
        darkThemeEntries.push([themeKey, hslColor]);
        continue;
      }

      lightThemeEntries.push([themeKey, hslColor]);
    }
  }

  return {
    light: fromPairs.strict(lightThemeEntries),
    dark: fromPairs.strict(darkThemeEntries),
    errors,
  };
};
