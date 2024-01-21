import { redirect } from "next/navigation";

import { HydrateTheme } from "@/client/components/hydrate-theme";
import { ThemePage } from "@/client/components/theme-page";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

const Page = async (props: Props) => {
  const themeId = props.params.id;

  if (!themeId) return redirect("/");

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
