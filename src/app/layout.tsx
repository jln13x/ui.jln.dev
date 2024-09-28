import "@/client/styles/globals.css";

import { type Metadata } from "next";

import { ClientProviders } from "@/client/components/client-providers";
import { ThemeProvider } from "@/client/components/theme-provider";
import { Umami } from "@/client/components/umami";
import { auth } from "@/server/auth/auth";
import { TRPCReactProvider } from "@/trpc/react";

import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";

const title = "10000+ Themes for shadcn/ui";
const description =
  "Explore 10000+ themes for shadcn/ui and easily copy them into your project. Or just create your own theme from scratch!";

const ogImage = "/_static/og.png";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://ui.jln.dev"),
  openGraph: {
    type: "website",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="en"
      className={`${GeistSans.className} dark`}
      suppressHydrationWarning
    >
      <head>
        <Umami />
      </head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className="flex min-h-screen flex-col overflow-hidden overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-accent">
          <SessionProvider session={session}>
            <TRPCReactProvider>
              <ClientProviders>{children}</ClientProviders>
            </TRPCReactProvider>
          </SessionProvider>
          <Analytics />
        </body>
      </ThemeProvider>
    </html>
  );
}
