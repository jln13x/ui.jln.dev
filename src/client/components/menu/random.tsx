import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { useSetThemeConfig } from "@/client/components/use-theme-config";
import { cn } from "@/client/lib/cn";
import { useSelectedThemeId } from "@/client/lib/use-selected-theme";

export const Random = ({ className }: { className?: string }) => {
  const setThemeConfig = useSetThemeConfig();
  const [, setSelectedThemeId] = useSelectedThemeId();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <MenuButton asChild className={cn(className)}>
          <Link
            href="/"
            onClick={async () => {
              const createThemeConfig = (
                await import("@/shared/create-theme-config")
              ).createThemeConfig;

              setThemeConfig(createThemeConfig());
              setSelectedThemeId(undefined);
            }}
            className="flex items-center gap-2"
            scroll={false}
          >
            <Icons.Dices className="size-4" />
            Random Theme
          </Link>
        </MenuButton>
      </TooltipTrigger>
      <TooltipContent>Generate Random theme</TooltipContent>
    </Tooltip>
  );
};
