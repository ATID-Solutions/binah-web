import { absoluteUrl, marketingPages } from "../lib/seo";

export const GET = () => {
  const lastmod = new Date().toISOString().split("T")[0];
  const urls = marketingPages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
