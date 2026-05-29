import { absoluteUrl } from "../lib/seo";

export const GET = () =>
  new Response(`User-agent: *
Allow: /
Disallow: /*/public/data-treatment-policy/
Disallow: /p/

Sitemap: ${absoluteUrl("/sitemap.xml")}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
