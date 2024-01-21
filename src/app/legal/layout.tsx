import { type PropsWithChildren } from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const Layout = (props: PropsWithChildren) => {
  return props.children;
};

export default Layout;
