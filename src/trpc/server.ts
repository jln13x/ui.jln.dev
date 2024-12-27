import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

const createContext = cache(async () => {
  const hdrs = await headers();
  const heads = new Headers(hdrs);
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const api = createCaller(createContext);
