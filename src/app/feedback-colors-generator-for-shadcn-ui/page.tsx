import { type Metadata } from "next";
import Link from "next/link";

import { Support } from "@/client/components/headline";
import { Logo } from "@/client/components/logo";
import { Pitch } from "@/client/components/pitch";
import { cn } from "@/client/lib/cn";
import {
  Generate,
  Styles,
  Tailwind,
  Variants,
} from "@/app/feedback-colors-generator-for-shadcn-ui/generator";

const title =
  "Generate Success, Error, Warning and Info Colors for shadcn/ui - Color Generator";
const description =
  "Generate success, error, warning and info colors for shadcn/ui.";

const ogUrl = "/_static/feedback/og.png";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://ui.jln.dev"),
  openGraph: {
    type: "website",
    title,
    description,
    images: {
      url: ogUrl,
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
      url: ogUrl,
      alt: title,
      width: 1200,
      height: 630,
      type: "website",
    },
  },
};

export const dynamic = "force-static";

const Page = () => {
  return (
    <div>
      <div className="border-b bg-muted py-3 text-muted-foreground">
        <div className="container flex items-center justify-center gap-2 text-center text-sm max-sm:flex-col">
          <p>
            Over <span className="font-medium">{" 10000 Themes "}</span>
            for shadcn/ui available.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-accent px-3 py-0.5 text-accent-foreground hover:bg-accent/80"
          >
            Explore themes
          </Link>
        </div>
      </div>
      <div className="container pb-40 pt-12">
        <div className="flex flex-col items-center gap-6">
          <Pitch />
          <Logo className="size-10" />
          <h1
            className={cn(
              "relative flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl",
            )}
          >
            <span className="rounded-lg bg-primary px-2 py-1  tabular-nums text-primary-foreground lg:px-4 lg:py-2">
              Feedback Colors
            </span>
            for shadcn/ui
          </h1>

          <div className="pt-6">
            <Support />
          </div>
        </div>

        <div className="flex flex-col gap-20 py-12">
          <Generate />
          <Tailwind />
          <Styles />
          <Variants />
        </div>
      </div>
    </div>
  );
};

export default Page;
