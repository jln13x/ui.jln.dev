import { db } from "@/server/db";
import { themes } from "@/server/db/schema";
import { type Theme } from "@/shared/theme-config";
import { type VscodeTheme } from "@/shared/vscode";

import { Colord } from "colord";
import { parse } from "csv-parse/sync";
import { mapValues, omit, pickBy, pipe } from "remeda";

const parseFile = async <T>(file: string) => {
  const input = await Bun.file(import.meta.dir + file).text();

  return parse(input, {
    columns: true,
  }) as Array<T>;
};

type ColorConfig = {
  id: string;
  extensionId: string;
  path: string;
  displayName: string;
  slug: string;
  activityBarBackground: string;
  activityBarBorder: string;
  activityBarForeground: string;
  editorBackground: string;
  editorForeground: string;
  editorGroupHeaderTabsBackground: string;
  editorGroupHeaderTabsBorder: string;
  statusBarBackground: string;
  statusBarForeground: string;
  statusBarBorder: string;
  tabActiveBackground: string;
  tabActiveBorder: string;
  tabActiveForeground: string;
  tabBorder: string;
  titleBarActiveBackground: string;
  titleBarActiveForeground: string;
  titleBarBorder: string;
};

const importedVscodeThemes = await parseFile<VscodeTheme>("/themes.csv");
const importedColors = await parseFile<ColorConfig>("/editor.csv");

const hexToHsl = (hex: string) => {
  return new Colord(hex).toHsl();
};

for (const vscodeTheme of importedVscodeThemes) {
  const colorConfig = importedColors.find(
    (c) => vscodeTheme.id === c.extensionId,
  );

  if (!colorConfig) {
    console.log(`No color config found for ${vscodeTheme.name}`);
    continue;
  }

  const colors = pipe(
    colorConfig,
    pickBy((v) => v.startsWith("#")),
    omit(["id", "extensionId", "path", "displayName", "slug"] as const),
    mapValues(hexToHsl),
  );

  const anyHsl = {
    h: 0,
    s: 0,
    l: 0,
  };

  console.log(colorConfig);

  const cfg: Theme = {
    background: colors.editorBackground,
    foreground: colors.editorForeground,
    primary: colors.tabActiveBackground,
    primaryForeground: colors.tabActiveForeground,
    card: colors.editorGroupHeaderTabsBackground,
    cardForeground: colors.editorForeground,
    accent: colors.activityBarForeground,
    accentForeground: colors.activityBarBackground,

    //
    input: anyHsl,
    border: anyHsl,
    destructive: anyHsl,
    destructiveForeground: anyHsl,
    muted: colors.activityBarBackground,
    mutedForeground: colors.activityBarForeground,
    popover: anyHsl,
    popoverForeground: anyHsl,
    ring: anyHsl,
    secondary: anyHsl,
    secondaryForeground: anyHsl,
  };

  const theme = await db.insert(themes).values({
    name: vscodeTheme.name,
    isPublic: true,
    userId: "system-vscode",
    config: {
      dark: cfg,
      light: cfg,
    },
  });
}
