import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import {
  themeStackAtom,
  useSetThemeConfig,
} from "@/client/lib/use-theme-config";

import { useAtom } from "jotai";

export const GoBack = () => {
  const [stack, setStack] = useAtom(themeStackAtom);
  const setTheme = useSetThemeConfig();

  if (stack.length === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <MenuButton asChild>
          <Link
            href="/"
            onClick={async () => {
              const theme = stack.pop();
              setStack(stack);

              if (theme) {
                setTheme(theme, false);
                return;
              }
            }}
            className="flex h-8 items-center gap-2 px-6 py-1.5 text-xs"
            scroll={false}
          >
            <Icons.Previous className="size-4" />
            <span className="sr-only">Previous</span>
          </Link>
        </MenuButton>
      </TooltipTrigger>
      <TooltipContent>Back to previous theme</TooltipContent>
    </Tooltip>
  );
};
