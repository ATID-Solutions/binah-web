import type { APIRoute } from "astro";
import text from "../../legal/terminos-plataforma/2026-11.md?raw";

/** The exact text of the 2026-11 platform terms, whose SHA-256 the dashboard records. */
export const GET: APIRoute = () =>
  new Response(text, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
