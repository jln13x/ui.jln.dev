import { db } from "@/server/db";
import { themes, vscodeThemes } from "@/server/db/schema";
import { createId } from "@/server/db/utils/create-id";
import { type Theme } from "@/shared/theme-config";

import extensions from "./vscodethemes.json";
import { faker } from "@faker-js/faker";
import { Colord, colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import labPlugin from "colord/plugins/lab";
import {
  clamp,
  filter,
  isDefined,
  map,
  omit,
  pipe,
  sortBy,
  take,
  values,
} from "remeda";
import { z } from "zod";

extend([a11yPlugin, labPlugin]);

await db.delete(vscodeThemes).execute();

for (const extension of Object.values(extensions)) {
  const promises = Object.entries(extension.themes).map(
    async ([name, theme]) => {
      const transformedColors = pipe(theme, omit(["slug"]));

      const colors = z
        .object({
          editorBackground: z.string(),
          editorForeground: z.string(),
          activityBarBackground: z.string(),
          activityBarForeground: z.string(),
          tabActiveBorder: z.string().nullable(),
        })
        .parse(transformedColors);

      const isDarkTheme = new Colord(colors.editorBackground).isDark();

      const { accent, accentForeground } = createAccent(
        colors.editorBackground,
      );

      const { primary, primaryForeground } = identifyPrimaryColor(
        colors.editorBackground,
        pipe(
          colors,
          omit(["editorBackground", "editorForeground"]),
          values,
          filter(isDefined),
        ),
      );

      const { secondary, secondaryForeground } = createSecondary(primary);

      const background = new Colord(colors.editorBackground);
      const foreground = new Colord(colors.editorForeground);

      const card = background.darken(0.02);
      const cardForeground = createContrast(card);

      const { destructive, destructiveForeground } =
        createDestructive(isDarkTheme);

      const popover = card.darken(0.02);
      const popoverForeground = createContrast(popover);

      const { muted, mutedForeground } = createMuted(primary, isDarkTheme);

      const cfg: Theme = {
        background: background.toHsl(),
        foreground: foreground.toHsl(),

        primary: primary.toHsl(),
        primaryForeground: primaryForeground.toHsl(),
        ring: primary.toHsl(),

        card: card.toHsl(),
        cardForeground: cardForeground.toHsl(),

        popover: popover.toHsl(),
        popoverForeground: popoverForeground.toHsl(),

        accent: accent.toHsl(),
        accentForeground: accentForeground.toHsl(),

        secondary,
        secondaryForeground,

        muted,
        mutedForeground,

        destructive,
        destructiveForeground,

        border: background.isDark()
          ? background.lighten(0.05).desaturate(0.1).toHsl()
          : background.darken(0.05).desaturate(0.1).toHsl(),
        input: background.isDark()
          ? background.lighten(0.08).desaturate(0.1).toHsl()
          : background.darken(0.08).desaturate(0.1).toHsl(),
      };

      const themeId = createId();

      await db.insert(themes).values({
        id: themeId,
        name,
        config: {
          dark: cfg,
          light: cfg,
        },
        userId: "system-vscode",
        isPublic: true,
      });

      await db.insert(vscodeThemes).values({
        themeId,
        installs: extension.installs,
        metadata: {
          vscExtensionId: extension.vscExtensionId,
        },
      });
    },
  );

  await Promise.all(promises);
}

function createContrast(color: Colord) {
  const isLight = color.isLight();
  let opposite = color;

  let i = 0;
  while (opposite.contrast(color) < 6) {
    opposite = isLight ? opposite.darken(0.2) : opposite.lighten(0.2);
    if (i++ > 10) break;
  }
  return opposite;
}

function createSecondary(primary: Colord) {
  const primaryHsl = primary.toHsl();

  if (primary.isDark()) {
    const secondary = colord({
      h: primaryHsl.h,
      s: clamp(30, {
        max: primaryHsl.s - 10,
      }),

      l: 75,
    });

    const secondaryForeground = createContrast(secondary);

    return {
      secondary: secondary.toHsl(),
      secondaryForeground: secondaryForeground.toHsl(),
    };
  }

  const secondary = colord({
    h: primaryHsl.h,
    s: clamp(30, {
      max: primaryHsl.s - 10,
    }),

    l: 25,
  });

  const secondaryForeground = createContrast(secondary);

  return {
    secondary: secondary.toHsl(),
    secondaryForeground: secondaryForeground.toHsl(),
  };
}

function createDestructive(isDark?: boolean) {
  const destructiveLight = {
    h: faker.number.int({
      min: 0,
      max: 10,
    }),
    s: faker.number.int({
      min: 80,
      max: 100,
    }),
    l: faker.number.int({
      min: 20,
      max: 45,
    }),
  };

  if (isDark) {
    const destructiveDark = {
      h: destructiveLight.h,
      s: destructiveLight.s,
      l: faker.number.int({ min: 45, max: 60 }),
    };

    return {
      destructive: destructiveDark,
      destructiveForeground: createContrast(
        new Colord(destructiveDark),
      ).toHsl(),
    };
  }

  return {
    destructive: destructiveLight,
    destructiveForeground: createContrast(new Colord(destructiveLight)).toHsl(),
  };
}

function createMuted(base: Colord, isDark?: boolean) {
  const { h } = base.toHsl();

  const mutedBaseDeviations = {
    s: 25,
    l: 6,
  };

  const mutedForegroundBaseDeviations = {
    s: 6,
    l: 8,
  };

  if (isDark) {
    const mutedDark = {
      h,
      s: mutedBaseDeviations.s,
      l: 15 - mutedBaseDeviations.l,
    };

    const mutedForegroundDark = {
      h: mutedDark.h,
      s: mutedForegroundBaseDeviations.s,
      l: 75 - mutedForegroundBaseDeviations.l,
    };

    return {
      muted: mutedDark,
      mutedForeground: mutedForegroundDark,
    };
  }

  const mutedLight = {
    h,
    s: mutedBaseDeviations.s,
    l: 85 + mutedBaseDeviations.l,
  };

  const mutedForegroundLight = {
    h: mutedLight.h,
    s: mutedForegroundBaseDeviations.s,
    l: 25 + mutedForegroundBaseDeviations.l,
  };

  return {
    muted: mutedLight,
    mutedForeground: mutedForegroundLight,
  };
}

function identifyPrimaryColor(base: string, colors: string[]) {
  const baseColor = colord(base);

  const [first, second] = pipe(
    colors,
    map((color) => {
      return {
        delta: baseColor.delta(color),
        color,
      };
    }),
    sortBy([(v) => v.delta, "desc"]),
    take(2),
  );

  if (!first || !second) throw new Error("No primary colors found");

  const delta = first.delta - second.delta;

  if (delta > 0.2) {
    const primary = colord(first.color);

    return {
      primary: primary,
      primaryForeground: createContrast(primary),
    };
  }

  const firstColor = colord(first.color).toHsl();
  const secondColor = colord(second.color).toHsl();

  const primary = colord(
    firstColor.s > secondColor.s ? firstColor : secondColor,
  );

  return {
    primary: primary,
    primaryForeground: createContrast(primary),
  };
}
function createAccent(base: string) {
  const baseClr = colord(base);

  const accent = baseClr.isDark()
    ? baseClr.lighten(0.15)
    : baseClr.darken(0.15);

  return {
    accent,
    accentForeground: createContrast(accent),
  };
}
