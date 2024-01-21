export const routes = {
  signin: "/signin",
  account: "/account",
  legal: {
    terms: "/legal/terms",
    privacy: "/legal/privacy-policy",
  },
  theme: (id: string) => `?theme=${id}`,
} as const;
