"use client";

import { type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Star } from "@/client/components/star";
import { hslToCssValue } from "@/client/lib/hsl-to-variable-value";
import { useResolvedTheme } from "@/client/lib/use-resolved-theme";
import { useSelectedThemeId } from "@/client/lib/use-selected-theme";
import { useSetThemeConfig } from "@/client/lib/use-theme-config";
import { type DatabaseTheme } from "@/server/db/schema";
import { type ThemeConfig } from "@/shared/theme-config";
import { api } from "@/trpc/react";

import { isDefined } from "remeda";

export const ThemeLink = ({ theme }: { theme: DatabaseTheme }) => {
  const utils = api.useUtils();
  const [, setSelectedThemeId] = useSelectedThemeId();

  return (
    <ThemeButton
      config={theme.config}
      name={theme.name}
      onClick={() => {
        setSelectedThemeId(theme.id);
        utils.theme.byId.setData(
          { id: theme.id },
          {
            ...theme,
            stars: theme.stars ?? 1,
          },
        );
      }}
    >
      {isDefined(theme.stars) && (
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          {theme.stars} <Star filled={theme.starred} className="size-3" />
        </span>
      )}
    </ThemeButton>
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

export const ThemeButton = ({
  onClick,
  config,
  name,
  children,
}: {
  onClick?: () => void;
  config: ThemeConfig;
  name: string;
  children?: ReactNode;
}) => {
  const setThemeConfig = useSetThemeConfig();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className="flex flex-col items-center gap-1 overflow-auto rounded-lg px-2 py-1 hover:bg-accent/60"
      onClick={() => {
        onClick?.();
        setThemeConfig(config);

        if (pathname !== "/") {
          router.push("/", {
            scroll: false,
          });
          return;
        }
      }}
    >
      <ColorPalette config={config} />
      <p className="line-clamp-1 text-center text-sm">{name}</p>
      {children}
    </button>
  );
};
