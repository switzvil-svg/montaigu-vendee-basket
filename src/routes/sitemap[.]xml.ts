import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles, players } from "@/data/club";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/le-club", changefreq: "monthly", priority: "0.8" },
          { path: "/effectifs", changefreq: "monthly", priority: "0.8" },
          { path: "/formation", changefreq: "monthly", priority: "0.8" },
          { path: "/calendrier", changefreq: "weekly", priority: "0.9" },
          { path: "/actualites", changefreq: "weekly", priority: "0.9" },
          { path: "/partenaires", changefreq: "monthly", priority: "0.7" },
          { path: "/billetterie", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          ...players.map((p) => ({ path: `/effectifs/${p.slug}`, priority: "0.6" as const })),
          ...articles.map((a) => ({ path: `/actualites/${a.slug}`, priority: "0.6" as const })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
