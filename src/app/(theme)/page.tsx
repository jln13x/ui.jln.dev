import { redirect } from "next/navigation";

import { HydrateTheme } from "@/client/components/hydrate-theme";
import { ThemePage } from "@/client/components/theme-page";
import { api } from "@/trpc/server";

type Props = {
  searchParams: {
    theme?: string;
  };
};
const Page = async (props: Props) => {
  const themeId = props.searchParams.theme;

  if (!themeId) {
    return <ThemePage />;
  }

  const theme = await api.theme.byId({
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
