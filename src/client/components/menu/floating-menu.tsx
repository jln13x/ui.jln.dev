"use client";

import dynamic from "next/dynamic";

import { Account } from "@/client/components/menu/account";
import { AppTheme } from "@/client/components/menu/app-theme";
import { CopyCode } from "@/client/components/menu/copy-code";
import { Customize } from "@/client/components/menu/customize";
import { Explore } from "@/client/components/menu/explore";
import { GitHub } from "@/client/components/menu/github";
import { GoBack } from "@/client/components/menu/go-back";
import { Random } from "@/client/components/menu/random";
import { Save } from "@/client/components/menu/save";
import { SavedThemes } from "@/client/components/menu/saved-themes";
import { Xcom } from "@/client/components/menu/xcom";
import { Separator } from "@/client/components/ui/separator";

const Menu = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex  overflow-hidden px-2 pb-1 duration-300 animate-in slide-in-from-bottom-12 lg:justify-center lg:p-4 lg:pb-4">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="pointer-events-auto relative">
          <div className="absolute -left-1 top-0 -translate-x-full">
            <GoBack />
          </div>
          <Random />
        </div>
        <div className="pointer-events-auto relative mx-auto flex flex-shrink-0 items-center gap-2 rounded-md border border-accent bg-accent/40 p-2 shadow backdrop-blur-sm scrollbar-thin max-lg:overflow-x-auto max-sm:w-full">
          <Customize />
          <CopyCode />
          <Save />
          <Separator orientation="vertical" className="bg-accent" />
          <Explore />
          <SavedThemes />
          <Separator orientation="vertical" className="bg-accent" />
          <AppTheme />
          <Xcom />
          <GitHub />
          <div>
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
};

export const FloatingMenu = dynamic(() => Promise.resolve(Menu), {
  ssr: false,
});
