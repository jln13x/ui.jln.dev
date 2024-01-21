"use client";

import { useResolvedTheme } from "@/client/lib/use-resolved-theme";
import { createThemeConfig } from "@/shared/create-theme-config";
import { type ThemeConfig } from "@/shared/theme-config";

import { atom, useAtomValue, useSetAtom } from "jotai";

export const defaultConfig: ThemeConfig = {
  light: {
    background: { h: 0, s: 0, l: 100 },
    foreground: { h: 224, s: 71.4, l: 4.1 },
    card: { h: 0, s: 0, l: 100 },
    cardForeground: { h: 224, s: 71.4, l: 4.1 },
    popover: { h: 0, s: 0, l: 100 },
    popoverForeground: { h: 224, s: 71.4, l: 4.1 },
    primary: { h: 262.1, s: 83.3, l: 57.8 },
    primaryForeground: { h: 210, s: 20, l: 98 },
    secondary: { h: 220, s: 14.3, l: 95.9 },
    secondaryForeground: { h: 220.9, s: 39.3, l: 11 },
    muted: { h: 220, s: 14.3, l: 95.9 },
    mutedForeground: { h: 220, s: 8.9, l: 46.1 },
    accent: { h: 220, s: 14.3, l: 95.9 },
    accentForeground: { h: 220.9, s: 39.3, l: 11 },
    destructive: { h: 0, s: 84.2, l: 60.2 },
    destructiveForeground: { h: 210, s: 20, l: 98 },
    border: { h: 220, s: 13, l: 91 },
    input: { h: 220, s: 13, l: 91 },
    ring: { h: 262.1, s: 83.3, l: 57.8 },
  },
  dark: {
    background: { h: 224, s: 71.4, l: 4.1 },
    foreground: { h: 210, s: 20, l: 98 },
    card: { h: 224, s: 71.4, l: 4.1 },
    cardForeground: { h: 210, s: 20, l: 98 },
    popover: { h: 224, s: 71.4, l: 4.1 },
    popoverForeground: { h: 210, s: 20, l: 98 },
    primary: { h: 263.4, s: 70, l: 50.4 },
    primaryForeground: { h: 210, s: 20, l: 98 },
    secondary: { h: 215, s: 27.9, l: 16.9 },
    secondaryForeground: { h: 210, s: 20, l: 98 },
    muted: { h: 215, s: 27.9, l: 16.9 },
    mutedForeground: { h: 217.9, s: 10.6, l: 64.9 },
    accent: { h: 215, s: 27.9, l: 16.9 },
    accentForeground: { h: 210, s: 20, l: 98 },
    destructive: { h: 0, s: 62.8, l: 30.6 },
    destructiveForeground: { h: 210, s: 20, l: 98 },
    border: { h: 215, s: 27.9, l: 16.9 },
    input: { h: 215, s: 27.9, l: 16.9 },
    ring: { h: 263.4, s: 70, l: 50.4 },
  },
};

export const themeConfigAtom = atom<ThemeConfig>(createThemeConfig());

export const useThemeConfig = () => {
  return useAtomValue(themeConfigAtom);
};

export const useSetThemeConfig = () => {
  return useSetAtom(themeConfigAtom);
};

export const useActiveTheme = () => {
  const appTheme = useResolvedTheme();
  const config = useThemeConfig();

  if (!appTheme) return null;

  return config[appTheme];
};
