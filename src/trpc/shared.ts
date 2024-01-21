import { type AppRouter } from "@/server/api/root";
import { getBaseUrl } from "@/shared/get-base-url";

import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

export const transformer = superjson;

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
