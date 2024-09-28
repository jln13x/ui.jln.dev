import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/legal/*", "/api/*"],
    },
    sitemap: "https://ui.jln.dev/sitemap.xml",
  };
}
