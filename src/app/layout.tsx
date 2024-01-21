import "@/client/styles/globals.css";

import { type Metadata } from "next";
import { cookies } from "next/headers";

import { ClientProviders } from "@/client/components/client-providers";
import { auth } from "@/server/auth/auth";
import { TRPCReactProvider } from "@/trpc/react";

import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";

const title = "10.000+ Themes for shadcn/ui";
const description =
  "Explore 10.000+ themes for shadcn/ui and easily copy them into your project. Or just create your own theme from scratch!";

const ogImage = "https://ui.jln.dev/_static/og.png";

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
    <html lang="en" className={`${GeistSans.className} dark`}>
      <body className="flex min-h-screen flex-col overflow-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-accent">
        <SessionProvider session={session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ClientProviders>{children}</ClientProviders>
          </TRPCReactProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
