import { type Metadata } from "next";
import { redirect } from "next/navigation";

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

// export async function generateStaticParams() {
//   const allThemes = await db.query.themes.findMany({
//     where: eq(themes.isPublic, true),
//   });

//   return allThemes.map((theme) => ({
//     id: theme.id,
//   }));
// }

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const themeId = params.id;

  const theme = await api.theme.byId.query({
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

  const title = `${theme.name} - Theme for shadcn/ui`;
  const description = `Check out the theme "${theme.name}" for shadcn/ui and copy it into your project!. It consist of the colors ${primary}, ${secondary}, and ${accent}.`;
  const ogImage = "/_static/og.png";

  return {
    title,
    description,
    metadataBase: new URL("https://ui.jln.dev"),
    openGraph: {
      description,
      title,
      images: {
        url: ogImage,
        alt: title,
        width: 1200,
        height: 630,
        type: "website",
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: {
        url: ogImage,
        alt: title,
        width: 1200,
        height: 630,
        type: "website",
      },
    },
  };
}

const Page = async (props: Props) => {
  const themeId = props.params.id;

  const theme = await api.theme.byId.query({
    id: themeId,
  });

  if (!theme) {
    return redirect("/");
  }

  return (
    <div className="relative">
      <ThemePage />
      {theme && <HydrateTheme theme={theme} />}
    </div>
  );
};

export default Page;
