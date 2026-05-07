export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL ?? "https://binah.co").replace(/\/$/, "");
export const SITE_NAME = "Binah";
export const DEFAULT_OG_IMAGE = "/binah-symbol-wordmark.png";

export const marketingPages = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/modulos",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/modulo-crm",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/modulo-retail",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/precios",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/nosotros",
    priority: "0.6",
    changefreq: "monthly",
  },
] as const;

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();
