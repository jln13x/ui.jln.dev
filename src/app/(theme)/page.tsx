import { type Metadata } from "next";

import { Headline } from "@/client/components/headline";
import { ThemePage } from "@/client/components/theme-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ui.jln.dev",
  },
};

const Page = () => {
  return (
    <div className="relative flex flex-col items-center gap-8">
      <Headline />
      <div className="w-full max-w-screen-2xl rounded-lg border bg-transparent p-1 shadow-inner shadow-border">
        <ThemePage />
      </div>
    </div>
  );
};

export default Page;
