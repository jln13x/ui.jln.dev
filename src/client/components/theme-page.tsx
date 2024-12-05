import { Suspense } from "react";
import Link from "next/link";

import { StyleProvider } from "@/client/components/style-provider";
import { ThemeComponents } from "@/client/components/theme-components";
import { Button } from "@/client/components/ui/button";
import { VSCodeThemes } from "@/client/components/vscode-themes";
import { routes } from "@/shared/routes";

export const ThemePage = () => {
  return (
    <StyleProvider>
      <div className="container min-h-screen pt-6 lg:pt-10">
        <ThemeComponents />

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

          <Suspense>
            <VSCodeThemes />
          </Suspense>

          <div className="flex justify-end gap-2 pb-40 pt-52 text-xs lg:pb-10">
            <Link href={routes.legal.terms}>Terms</Link>
            <Link href={routes.legal.privacy}>Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </StyleProvider>
  );
};
