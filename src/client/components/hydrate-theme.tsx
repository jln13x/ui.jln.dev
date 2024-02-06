"use client";

import { selectedThemeAtomId } from "@/client/lib/use-selected-theme";
import { themeConfigAtom } from "@/client/lib/use-theme-config";
import { type DatabaseTheme } from "@/server/db/schema";
import { api } from "@/trpc/react";

import { useHydrateAtoms } from "jotai/utils";

export const HydrateTheme = ({ theme }: { theme: DatabaseTheme }) => {
  useHydrateAtoms([
    [selectedThemeAtomId, theme.id],
    [themeConfigAtom, theme.config],
  ]);

  api.theme.byId.useQuery(
    {
      id: theme.id,
    },
    {
      initialData: theme,
      refetchOnWindowFocus: false,
    },
  );

  return null;
};
