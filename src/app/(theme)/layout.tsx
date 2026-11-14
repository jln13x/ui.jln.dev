import { type PropsWithChildren } from "react";

import { FloatingMenu } from "@/client/components/menu/floating-menu";
import { ThemeBanner } from "@/client/components/theme-banner";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative w-full">
      <ThemeBanner />
      {children}
      <FloatingMenu />
    </div>
  );
};

export default Layout;
