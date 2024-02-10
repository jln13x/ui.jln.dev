import Link from "next/link";

import { Cards } from "@/client/components/examples/pages/cards/cards";
import { Headline } from "@/client/components/headline";
import { StyleProvider } from "@/client/components/style-provider";
import { Button } from "@/client/components/ui/button";
import { getVscodeThemes } from "@/server/get-vscode-themes";
import { routes } from "@/shared/routes";

export const ThemePage = async () => {
  const vscodeThemes = await getVscodeThemes({
    limit: 9_999,
    offset: 0,
  });

  return (
    <StyleProvider>
      <div className="container min-h-screen pt-6 lg:pt-20">
        <Headline />
        <Cards />
        <footer>
          <p className="pt-24 text-center">
            This project is heavily inspired by{" "}
            <Button
              variant="link"
              className="h-auto p-0 font-bold text-foreground transition-none"
              asChild
            >
              <Link href="https://ui.shadcn.com/themes" target="_blank">
                Themes
              </Link>
            </Button>
            {" from "}
            <Button
              variant="link"
              className="h-auto p-0 font-bold text-foreground transition-none"
              asChild
            >
              <Link href="https://x.com/shadcn" target="_blank">
                shadcn
              </Link>
            </Button>
            .
          </p>

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

          <div className="flex justify-end gap-2 pb-40 pt-52 text-xs lg:pb-10">
            <Link href={routes.legal.terms}>Terms</Link>
            <Link href={routes.legal.privacy}>Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </StyleProvider>
  );
};
