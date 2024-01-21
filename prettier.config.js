/** @type {import("prettier").Config & { [key:string]: any }} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "^@/client/(.*)$",
    "^@/server/(.*)$",
    "^@/shared/(.*)$",
    "^@/(.*)$",
    "",
    "<THIRD_PARTY_MODULES>",
  ],
};

export default config;
