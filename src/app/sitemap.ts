import type { MetadataRoute } from "next";
import { GUIDES } from "@/content/registry";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE.domain}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.domain}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE.domain}/sardine-run-2027`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.domain}/sardine-run-tracker`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${SITE.domain}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.domain}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.domain}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.domain}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE.domain}/guides/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...core, ...guides];
}
