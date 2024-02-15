import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import { useSelectedThemeId } from "@/client/lib/use-selected-theme";
import { useSetThemeConfig } from "@/client/lib/use-theme-config";

export const Random = () => {
  const setThemeConfig = useSetThemeConfig();
  const [, setSelectedThemeId] = useSelectedThemeId();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <MenuButton asChild>
          <Link
            href="/"
            onClick={async () => {
              const createThemeConfig = (
                await import("@/shared/create-theme-config")
              ).createThemeConfig;

              setThemeConfig(createThemeConfig());
              setSelectedThemeId(undefined);
            }}
            className="flex h-8 items-center gap-2 px-6 py-1.5 text-xs"
            scroll={false}
          >
            <Icons.Dices className="size-4" />
            Randomize
          </Link>
        </MenuButton>
      </TooltipTrigger>
      <TooltipContent>Generate Random theme</TooltipContent>
    </Tooltip>
  );
};
