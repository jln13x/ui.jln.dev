import { getVscodeThemes } from "@/server/get-vscode-themes";
import { routes } from "@/shared/routes";

export const VSCodeThemes = async () => {
  const vscodeThemes = await getVscodeThemes({
    limit: 9_999,
    offset: 0,
  });

  return (
    <div className="sr-only">
      <h4 className="pb-2 text-sm font-bold">
        Themes from Visual Studio Code for shadcn/ui
      </h4>
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-6">
        {vscodeThemes.map((theme) => {
          return (
            <li key={theme.id} className="line-clamp-1 text-xs">
              <a href={routes.theme(theme.id)}>{theme.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
