import { Headline } from "@/client/components/headline";
import { ThemePage } from "@/client/components/theme-page";

const Page = async () => {
  return (
    <div className="relative">
      <Headline />
      <ThemePage />
    </div>
  );
};

export default Page;
