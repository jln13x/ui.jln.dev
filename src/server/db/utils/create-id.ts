// nice2read https://unkey.dev/blog/uuid-ux

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
);

const prefixes = {
  invite: "inv",
};

type Prefix = keyof typeof prefixes;

export const createId = (prefix?: Prefix) =>
  prefix ? `${prefixes[prefix]}_${nanoid(16)}` : nanoid(16);
