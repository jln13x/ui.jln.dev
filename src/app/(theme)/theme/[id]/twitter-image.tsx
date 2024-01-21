import { redirect } from "next/navigation";
import { ImageResponse } from "next/og";

import { type Hsl } from "@/shared/theme-config";
import { api } from "@/trpc/server";

import { Colord } from "colord";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "shadcn/ui theme";
export const contentType = "image/png";

type Props = {
  params: {
    id: string;
  };
};

// Image generation
export default async function Image(props: Props) {
  const themeId = props.params.id;

  const theme = await api.theme.byId.query({
    id: themeId,
  });

  if (!theme) {
    return redirect("https://ui.jln.dev/_static/og.png");
  }

  const hslToHex = (hsl: Hsl) => {
    return new Colord(hsl).toHex();
  };

  const primary = hslToHex(theme.config.dark.primary);
  const secondary = hslToHex(theme.config.dark.secondary);
  const accent = hslToHex(theme.config.dark.accent);

  return new ImageResponse(
    (
      <div tw="flex h-full w-full relative">
        <div
          tw="h-full flex-1"
          style={{
            backgroundColor: primary,
          }}
        ></div>
        <div
          tw="h-full flex-1"
          style={{
            backgroundColor: secondary,
          }}
        ></div>
        <div
          tw="h-full flex-1"
          style={{
            backgroundColor: accent,
          }}
        ></div>
      </div>
    ),
    {
      ...size,
    },
  );
}
