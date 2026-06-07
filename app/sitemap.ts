import type { MetadataRoute } from "next";
import { PRODUCTS, JOURNAL } from "@/lib/data";

// Wymagane przy output: "export" (statyczny sitemap.xml).
export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/sklep", "/o-nas", "/galeria", "/dziennik"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}/sklep/${p.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const journalRoutes = JOURNAL.map((p) => ({
    url: `${BASE}/dziennik/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
