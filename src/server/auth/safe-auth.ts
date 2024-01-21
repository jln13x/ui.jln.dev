import { redirect } from "next/navigation";

import { auth } from "@/server/auth/auth";
import { routes } from "@/shared/routes";

export const safeAuth = async () => {
  const sesh = await auth();

  if (!sesh) return redirect(routes.signin);

  return sesh;
};
