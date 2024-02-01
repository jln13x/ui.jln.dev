"use client";

import { Fragment, useCallback, useEffect } from "react";

import { ColorPicker } from "@/client/components/color-picker";
import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { Alert } from "@/client/components/ui/alert";
import { Button } from "@/client/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import { Label } from "@/client/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import {
  useActiveTheme,
  useSetThemeConfig,
} from "@/client/components/use-theme-config";
import { isMac } from "@/client/lib/is-mac";
import { cssToTheme } from "@/client/lib/theme-to-styles";
import { createThemeConfig } from "@/shared/create-theme-config";
import { type Theme } from "@/shared/theme-config";

import { useIsMobile } from "@jlns/hooks";
import { useTheme } from "next-themes";
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";

export const Customize = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <MenuButton variant="default" className="bg-primary">
            <Icons.Paintbrush className="size-4" />
            <span className="sr-only">Customize</span>
          </MenuButton>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="max-h-[80svh] overflow-auto p-4 scrollbar-thin">
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuButton variant="default" className="bg-primary">
          <Icons.Paintbrush className="size-4" />
          <span className="sr-only">Customize</span>
        </MenuButton>
      </PopoverTrigger>
      <PopoverContent className="max-h-[60svh] overflow-auto scrollbar-thin">
        <Content />
      </PopoverContent>
    </Popover>
  );
};

const Content = () => {
  return (
    <Fragment>
      <p className="pb-4 text-lg font-semibold leading-none tracking-tight">
        Customize Theme
      </p>
      <Alert variant="info" size="sm">
        <p className="font-bold">Color Picker doesn't work?</p>
        <p className="text-xs">Toggle between Light and Dark mode to fix it.</p>
      </Alert>
      <div className="flex justify-center py-6">
        <ThemeSwitch />
      </div>

      <div className="flex flex-col gap-3 py-4">
        {changeableThemeValues.map(({ label, themeKey }) => (
          <ThemeValue label={label} themeKey={themeKey} key={themeKey} />
        ))}
      </div>

      <div>
        <PasteTheme />
      </div>
      <div className="pt-8">
        <GenerateTheme />
      </div>
    </Fragment>
  );
};

const changeableThemeValues: Array<{ label: string; themeKey: keyof Theme }> = [
  {
    label: "Background",
    themeKey: "background",
  },
  {
    label: "Foreground",
    themeKey: "foreground",
  },
  {
    label: "Card",
    themeKey: "card",
  },
  {
    label: "Card Foreground",
    themeKey: "cardForeground",
  },
  {
    label: "Popover",
    themeKey: "popover",
  },
  {
    label: "Popover Foreground",
    themeKey: "popoverForeground",
  },
  {
    label: "Primary",
    themeKey: "primary",
  },
  {
    label: "Primary Foreground",
    themeKey: "primaryForeground",
  },
  {
    label: "Secondary",
    themeKey: "secondary",
  },
  {
    label: "Secondary Foreground",
    themeKey: "secondaryForeground",
  },
  {
    label: "Muted",
    themeKey: "muted",
  },
  {
    label: "Muted Foreground",
    themeKey: "mutedForeground",
  },
  {
    label: "Accent",
    themeKey: "accent",
  },
  {
    label: "Accent Foreground",
    themeKey: "accentForeground",
  },
  {
    label: "Destructive",
    themeKey: "destructive",
  },
  {
    label: "Destructive Foreground",
    themeKey: "destructiveForeground",
  },
  {
    label: "Border",
    themeKey: "border",
  },
  {
    label: "Input",
    themeKey: "input",
  },
  {
    label: "Ring",
    themeKey: "ring",
  },
];

const ThemeValue = ({
  label,
  themeKey,
}: {
  themeKey: keyof Theme;
  label: string;
}) => {
  const { theme: appTheme } = useTheme();

  const activeTheme = useActiveTheme();
  const setConfig = useSetThemeConfig();

  if (!activeTheme) return null;

  const color = activeTheme[themeKey];

  const changeThemeValue = <TKey extends keyof Theme>(
    key: TKey,
    value: Theme[TKey],
  ) => {
    if (!appTheme) return;

    const newActiveThemeConfig = {
      ...activeTheme,
      [key]: value,
    };

    setConfig((prev) => ({
      ...prev,
      [appTheme]: newActiveThemeConfig,
    }));
  };

  return (
    <div className="flex items-center gap-2">
      <ColorPicker
        color={color}
        onColorChange={(color) => {
          const hsl = color.hsl;
          const h = Number(hsl.h.toFixed(2));
          const s = Number(hsl.s.toFixed(2));
          const l = Number(hsl.l.toFixed(2));

          changeThemeValue(themeKey, { h, s, l });
        }}
      />
      <Label className="flex-shrink-0">{label}</Label>
    </div>
  );
};

const PasteTheme = () => {
  const setThemeConfig = useSetThemeConfig();

  const handlePaste = useCallback(
    (text: string) => {
      const theme = cssToTheme(text);

      setThemeConfig((prev) => ({
        dark: {
          ...prev.dark,
          ...theme.dark,
        },
        light: {
          ...prev.light,
          ...theme.light,
        },
      }));

      if (theme.errors > 0) {
        toast.warning("Some values were invalid and were not pasted.");
      } else {
        toast.success("Theme pasted successfully! 🎉");
      }
    },
    [setThemeConfig],
  );

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const pastedData = e?.clipboardData?.getData("text");

      if (!pastedData) return;

      handlePaste(pastedData);
    };

    window.addEventListener("paste", handler);

    return () => {
      window.removeEventListener("paste", handler);
    };
  }, [handlePaste]);

  return (
    <div className="flex flex-col items-center border border-dotted px-2 py-4 text-center">
      <p className="text-sm">Paste existing theme</p>
      <p className="mx-auto flex rounded-pill font-mono text-sm text-muted-foreground">
        {isMac() ? "⌘" : "Ctrl"} + V
      </p>
    </div>
  );
};

const GenerateTheme = () => {
  const theme = useActiveTheme();
  const setThemeConfig = useSetThemeConfig();

  if (!theme) return null;

  return (
    <div className="border border-dotted px-2 py-4">
      <p className="text-sm font-medium">Generate theme</p>
      <p className="text-xs text-muted-foreground">
        Based on the primary color
      </p>
      <div className="flex items-center justify-between gap-1 py-2">
        <ThemeValue label="Primary" themeKey="primary" />
        <Button
          className="h-auto px-4 py-1 text-sm"
          onClick={() => {
            setThemeConfig(createThemeConfig(theme.primary));
          }}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};
