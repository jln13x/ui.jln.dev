import { ThemeLink } from "@/client/components/theme-link";
import { type DatabaseTheme } from "@/server/db/schema";

export const Themes = ({ themes }: { themes: Array<DatabaseTheme> }) => {
  return (
    <div className="grid max-h-[50vh] w-full  grid-cols-4 gap-6 overflow-y-auto px-2 py-6">
      {themes.map((theme) => (
        <ThemeLink theme={theme} key={theme.id} />
      ))}
    </div>
  );
};
