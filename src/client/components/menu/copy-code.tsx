"use client";

import { CopyButton } from "@/client/components/copy-button";
import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/client/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { themeToStyles } from "@/client/lib/theme-to-styles";
import { useThemeConfig } from "@/client/lib/use-theme-config";
import { type ThemeConfig } from "@/shared/theme-config";

import { useIsMobile } from "@jlns/hooks";
import { RemoveScroll } from "react-remove-scroll";
import { toPairs } from "remeda";

const configToCss = (config: ThemeConfig) => {
  const lightStyle = themeToStyles(config.light);
  const light = toPairs(lightStyle)
    .map(([key, value]) => `      ${key}: ${value};`)
    .join("\n");

  const space = `      `;

  const darkStyle = themeToStyles(config.dark);
  const dark = toPairs(darkStyle)
    .map(([key, value]) => `${space}${key}: ${value};`)
    .join("\n");

  return `@layer base {
    :root {
${light}
${space}--radius: 0.5rem;
    }
  
    .dark {
${dark}
    }
  }
  `;
};

const title = "Copy code";
const description = "Just copy the code below into your own project.";

export const CopyCode = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <MenuButton>
            <Icons.Copy className="size-4" />
            <span className="sr-only">Copy code</span>
          </MenuButton>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="max-h-[80svh] overflow-auto p-4 scrollbar-thin">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <MenuButton>
              <Icons.Copy className="size-4" />
              <span className="sr-only">Copy code</span>
            </MenuButton>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>Copy current theme as code</TooltipContent>
      </Tooltip>
      <DialogContent className="w-full max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

const Content = () => {
  const config = useThemeConfig();

  const themeTemplate = configToCss(config);

  return (
    <div className="relative grid h-full max-h-[768px] w-full overflow-auto rounded-md border bg-muted">
      <div className="absolute right-2 top-2">
        <CopyButton value={themeTemplate} />
      </div>
      <pre>
        <code className="block rounded px-2 py-3 font-mono text-xs lg:text-sm">
          {themeTemplate}
        </code>
      </pre>
    </div>
  );
};
