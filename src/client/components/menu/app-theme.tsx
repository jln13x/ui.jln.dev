import * as Icons from "@/client/components/icons";
import { MenuButton } from "@/client/components/menu/menu-button";
import { useResolvedTheme } from "@/client/lib/use-resolved-theme";

import { useTheme } from "next-themes";

export const AppTheme = () => {
  const theme = useResolvedTheme();
  const { setTheme } = useTheme();

  const Icon = theme === "light" ? Icons.Light : Icons.Dark;

  return (
    <MenuButton
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <Icon className="size-4" />
    </MenuButton>
  );
};
