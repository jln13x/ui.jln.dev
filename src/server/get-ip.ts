import { headers } from "next/headers";

import { hash } from "@/server/hash";

const getIp = () => {
  return headers().get("x-real-ip") ?? "local";
};

export const getHashedIp = () => {
  return hash(getIp());
};
