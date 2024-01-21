import Link from "next/link";

import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";

export const Xcom = () => {
  return (
    <MenuButton asChild>
      <Link href="https://x.com/jlndev" target="_blank">
        <Icons.Xcom className="size-4" />
      </Link>
    </MenuButton>
  );
};
