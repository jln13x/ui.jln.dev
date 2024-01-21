import Link from "next/link";

import { Cards } from "@/client/components/examples/pages/cards/cards";
import { Headline } from "@/client/components/headline";
import { StyleProvider } from "@/client/components/style-provider";
import { routes } from "@/shared/routes";

export const ThemePage = () => {
  return (
    <StyleProvider>
      <div className="container min-h-screen pt-6 lg:pt-20">
        <Headline />
        <Cards />
        <div className="flex justify-end gap-2 pb-40 pt-52 text-xs lg:pb-10">
          <Link href={routes.legal.terms}>Terms</Link>
          <Link href={routes.legal.privacy}>Privacy Policy</Link>
        </div>
      </div>
    </StyleProvider>
  );
};
