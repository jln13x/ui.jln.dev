import { useTheme } from "next-themes";

export const useResolvedTheme = () => {
  const theme = useTheme();

  return theme.resolvedTheme as "light" | "dark" | undefined;
};
