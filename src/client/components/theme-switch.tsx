import * as Icons from "@/client/components/icons";
import { Label } from "@/client/components/ui/label";
import { Switch } from "@/client/components/ui/switch";

import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme: theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-switch">
        <Icons.Light className="size-4" />
      </Label>
      <Switch
        variant="inverted"
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
        id="theme-switch"
      />
      <Label htmlFor="theme-switch">
        <Icons.Dark className="size-4" />
      </Label>
    </div>
  );
};
