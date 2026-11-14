import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { Headline } from "@/client/components/headline";
import { HydrateTheme } from "@/client/components/hydrate-theme";
import { ThemePage } from "@/client/components/theme-page";
import { getMoreThemes } from "@/server/get-more-themes";
import { describeTheme } from "@/shared/theme-insights";
import { ThemeDetails } from "@/app/(theme)/theme/[id]/theme-details";
import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-static";
export const revalidate = 31536000; // 1 year in seconds

export const generateStaticParams = async () => {
  return [];
};

export async function generateMetadata({
  params: unwrapParams,
}: Props): Promise<Metadata> {
  const params = await unwrapParams;
  const themeId = params.id;

  const theme = await api.theme.byId({
    id: themeId,
  });

  // A real 404 instead of a redirect: private and deleted themes previously
  // answered 200 with a meta refresh, which Google treats as a soft 404.
  if (!theme) {
    notFound();
  }

  const title = `${theme.name} for shadcn/ui`;
  const description = describeTheme(theme.name, theme.config);

  return {
    title,
    description,
    metadataBase: new URL("https://ui.jln.dev"),
    alternates: {
      canonical: "https://ui.jln.dev/theme/" + themeId,
    },
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
  const params = await props.params;
  const themeId = params.id;

  const theme = await api.theme.byId({
    id: themeId,
  });

  if (!theme) {
    notFound();
  }

  const moreThemes = await getMoreThemes(theme.id);

  return (
    <div className="relative">
      <Headline surface="theme-page" />
      <div className="pt-10">
        <ThemePage
          details={
            <ThemeDetails
              name={theme.name}
              config={theme.config}
              moreThemes={moreThemes}
            />
          }
        />
      </div>
      <HydrateTheme theme={theme} />
    </div>
  );
};

export default Page;
