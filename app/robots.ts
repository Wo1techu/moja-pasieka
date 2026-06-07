import type { MetadataRoute } from "next";

// Wymagane przy output: "export" (statyczny robots.txt).
export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/zamowienie"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
