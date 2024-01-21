import { Fragment, type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <div className="flex flex-1">{children}</div>
    </Fragment>
  );
};

export default Layout;
