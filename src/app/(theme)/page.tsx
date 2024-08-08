import { Headline } from "@/client/components/headline";
import { ThemePage } from "@/client/components/theme-page";

const Page = () => {
  return (
    <div className="relative flex flex-col items-center gap-8">
      <Headline />
      <div className="rounded-lg border bg-transparent p-1 shadow-inner shadow-border">
        <ThemePage />
      </div>
    </div>
  );
};

export default Page;
