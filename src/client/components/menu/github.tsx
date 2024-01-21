import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";

export const GitHub = () => {
  return (
    <MenuButton asChild>
      <Link href="https://github.com/jln13x/ui.jln.dev" target="_blank">
        <Icons.GitHub className="size-4" />
        <span className="sr-only">GitHub</span>
      </Link>
    </MenuButton>
  );
};
