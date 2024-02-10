import { ThemePage } from "@/client/components/theme-page";

export const dynamic = "force-static";

const Page = async () => {
  return (
    <div className="relative">
      <ThemePage />
    </div>
  );
};

export default Page;
