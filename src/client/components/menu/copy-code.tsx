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
import { useThemeConfig } from "@/client/lib/use-theme-config";
import { configToCss } from "@/shared/theme-css";

import { useIsMobile } from "@jlns/hooks";
import { RemoveScroll } from "react-remove-scroll";

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
          <RemoveScroll className="flex max-h-[80svh] flex-col p-4">
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
      <DialogContent className="flex max-h-[95vh] w-[98vw] max-w-screen-lg flex-col">
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
    <div className="relative grid min-h-0 rounded-md border bg-muted">
      <CopyButton value={themeTemplate} />
      <pre className="h-full overflow-auto">
        <code className="block rounded px-2 py-3 font-mono text-xs lg:text-sm">
          {themeTemplate}
        </code>
      </pre>
    </div>
  );
};
