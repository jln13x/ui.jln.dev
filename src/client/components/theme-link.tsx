"use client";

import { Star } from "@/client/components/star";
import { useSetThemeConfig } from "@/client/components/use-theme-config";
import { hslToCssValue } from "@/client/lib/hsl-to-variable-value";
import { useResolvedTheme } from "@/client/lib/use-resolved-theme";
import { useSelectedThemeId } from "@/client/lib/use-selected-theme";
import { type DatabaseTheme } from "@/server/db/schema";
import { type ThemeConfig } from "@/shared/theme-config";
import { api } from "@/trpc/react";

import { useUrlSearchParams } from "@jlns/hooks";
import { isDefined } from "remeda";

export const ThemeLink = ({ theme }: { theme: DatabaseTheme }) => {
  const setThemeConfig = useSetThemeConfig();
  const { setSearchParam } = useUrlSearchParams();

  const utils = api.useUtils();
  const [, setSelectedThemeId] = useSelectedThemeId();

  return (
    <button
      className="flex flex-col items-center gap-1 overflow-auto rounded-lg px-2 py-1 hover:bg-accent/60"
      onClick={() => {
        setThemeConfig(theme.config);
        setSelectedThemeId(theme.id);
        utils.theme.byId.setData({ id: theme.id }, theme);
        setSearchParam("theme", theme.id, {
          scroll: false,
        });
      }}
    >
      <ColorPalette config={theme.config} />
      <p className="line-clamp-1 text-center text-sm">{theme.name}</p>
      {isDefined(theme.stars) && (
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          {theme.stars} <Star filled={theme.starred} className="size-3" />
        </span>
      )}
    </button>
  );
};

const ColorPalette = ({ config }: { config: ThemeConfig }) => {
  const visibleColors = ["primary", "secondary", "accent"] as const;

  const theme = useResolvedTheme();

  if (!theme) return null;

  return (
    <div className="flex h-12 w-20 gap-0.5 p-1">
      {visibleColors.map((color) => (
        <div
          className="flex-1 rounded border"
          key={color}
          style={{
            backgroundColor: hslToCssValue(config[theme][color]),
          }}
        />
      ))}
    </div>
  );
};
