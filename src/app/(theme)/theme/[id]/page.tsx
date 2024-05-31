import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { Headline } from "@/client/components/headline";
import { HydrateTheme } from "@/client/components/hydrate-theme";
import { ThemePage } from "@/client/components/theme-page";
import { type Hsl } from "@/shared/theme-config";
import { api } from "@/trpc/server";

import { Colord } from "colord";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const themeId = params.id;

  const theme = await api.theme.byId({
    id: themeId,
  });

  if (!theme) {
    return redirect("/");
  }

  const hslToHex = (hsl: Hsl) => {
    return new Colord(hsl).toHex();
  };

  const primary = hslToHex(theme.config.light.primary);
  const secondary = hslToHex(theme.config.light.secondary);
  const accent = hslToHex(theme.config.light.accent);

  const title = `${theme.name} for shadcn/ui`;
  const description = `${theme.name} is a theme for shadcn/ui. It consist of the colors ${primary}, ${secondary}, and ${accent}.`;

  return {
    title,
    description,
    metadataBase: new URL("https://ui.jln.dev"),
    openGraph: {
      description,
      title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const Page = async (props: Props) => {
  const themeId = props.params.id;

  const theme = await api.theme.byId({
    id: themeId,
  });

  if (!theme) {
    return redirect("/");
  }

  return (
    <div className="relative">
      <Headline />
      <div className="pt-10">
        <ThemePage />
      </div>
      {theme && <HydrateTheme theme={theme} />}
    </div>
  );
};

export default Page;
