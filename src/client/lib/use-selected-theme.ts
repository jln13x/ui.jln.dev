"use client";

import { api } from "@/trpc/react";

import { atom, useAtom } from "jotai";
import { isDefined } from "remeda";

export const selectedThemeAtomId = atom<string | undefined>(undefined);

export const useSelectedThemeId = () => {
  return useAtom(selectedThemeAtomId);
};

export const useSelectedTheme = () => {
  return useSelectedThemeExp().data;
};

export const useSelectedThemeExp = () => {
  const [id] = useSelectedThemeId();

  return api.theme.byId.useQuery(
    { id: id ?? "" },
    {
      enabled: isDefined(id),
    },
  );
};
