import { Headline } from "@/client/components/headline";
import { ThemePage } from "@/client/components/theme-page";

const Page = async () => {
  return (
    <div className="relative">
      <Headline />
      <div className="pt-10>
        <ThemePage />
      </div>
    </div>
  );
};

export default Page;
