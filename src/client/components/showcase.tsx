// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { useEffect, useState } from "react";

import { useSetThemeConfig } from "@/client/lib/use-theme-config";

export const Showcase = ({ themes }: { themes: any }) => {
  const [index, setIndex] = useState(0);

  const onlyThose = [
    "GitHub Dark",
    "One Dark Pro",
    "Dracula",
    "Shades of Purple",
    "Nord",
    "GitHub Light",
    "Catppuccin Mocha",
    "Material Theme",
    "Palenight Theme",
    "Catppuccin Macchiato",
    "Monokai Pro",
    "Winter is Coming (Light)",
    "Aura Dark",
    "Night Owl",
    "Cobalt2",
    "One Monokai",
    "Ayu Dark",
    "Tokyo Night",
    "SynthWave '84",
    "Noctis",
    "Atom One Light",
    "Catppuccin Frappé",
    "Andromeda",
    "Eva Dark",
    "Panda Syntax",
    "Winter is Coming (Dark Blue)",
    "PowerShell ISE",
    "Gruvbox Dark Medium",
    "Bearded Theme Black & Gold",
    "Dark+ Material",
    "Vue Theme",
    "Monokai Night",
    "GitHub Plus",
    "Atom Material Theme",
    "Bluloco Light",
    "Spinel",
    "Brave (rainglow)",
    "Hopscotch",
    "eppz!",
    "Omni",
    "Dracula At Night",
    "Bluloco Dark",
    "Electron",
    "FlatUI",
    "Moonlight",
    "Gruvbox Material Dark",
    "City Lights",
    "Monokai++",
    "Mayukai Dark",
  ];

  const relevantThemes = onlyThose.map((name) =>
    themes.find((theme) => theme.name === name),
  );

  const theme = relevantThemes[index];

  const setThemeConfig = useSetThemeConfig();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextThemeIdx = (index + 1) % relevantThemes.length;
      const theme = relevantThemes[nextThemeIdx];

      setThemeConfig(theme.config);
      setIndex(nextThemeIdx);
    }, 500);

    return () => clearInterval(interval);
  }, [index, relevantThemes, relevantThemes.length, setThemeConfig]);

  if (!theme) return null;

  return (
    <div className="absolute z-50 grid h-screen w-full place-items-center bg-black/20">
      <p className="max-w-screen-lg rounded-lg border-4 border-primary-foreground/20 bg-primary px-24 py-10 text-center text-8xl font-bold text-primary-foreground backdrop-blur-sm">
        {theme.name}
      </p>
    </div>
  );
};
