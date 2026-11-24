import type { APIRoute } from "astro";

/** The version in force; each version keeps its own address. */
export const GET: APIRoute = () =>
  new Response(null, {
    status: 302,
    headers: { location: "/terminos-plataforma/2026-11" },
  });
