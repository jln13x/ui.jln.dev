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
    "chart-1": { h: 262.1, s: 83.3, l: 57.8 },
    "chart-2": { h: 220, s: 14.3, l: 95.9 },
    "chart-3": { h: 220, s: 14.3, l: 95.9 },
    "chart-4": { h: 220, s: 14.3, l: 98.9 },
    "chart-5": { h: 220, s: 17.3, l: 95.9 },
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
    "chart-1": { h: 263.4, s: 70, l: 50.4 },
    "chart-2": { h: 215, s: 27.9, l: 16.9 },
    "chart-3": { h: 215, s: 27.9, l: 16.9 },
    "chart-4": { h: 215, s: 27.9, l: 19.9 },
    "chart-5": { h: 215, s: 30.9, l: 16.9 },
  },
};

export const themeConfigAtom = atom<ThemeConfig>(createThemeConfig());
export const themeStackAtom = atom<ThemeConfig[]>([]);

const STACK_MAX_SIZE = 100;

export const useThemeConfig = () => {
  return useAtomValue(themeConfigAtom);
};

export const useSetThemeConfig = () => {
  const activeThemeConfig = useThemeConfig();
  const setThemeConfig = useSetAtom(themeConfigAtom);
  const setStack = useSetAtom(themeStackAtom);

  const set = (
    value: ThemeConfig | ((v: ThemeConfig) => ThemeConfig),
    addToStack = true,
  ) => {
    setThemeConfig(value);

    if (activeThemeConfig && addToStack) {
      setStack((stack) =>
        stack.length < STACK_MAX_SIZE
          ? [...stack, activeThemeConfig]
          : [...stack.slice(0, STACK_MAX_SIZE - 1), activeThemeConfig],
      );
    }
  };

  return set;
};

export const useActiveTheme = () => {
  const appTheme = useResolvedTheme();
  const config = useThemeConfig();

  if (!appTheme) return null;

  return config[appTheme];
};
