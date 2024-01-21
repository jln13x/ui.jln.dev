import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container relative grid h-[100svh] place-items-center">
      {children}
    </div>
  );
}
