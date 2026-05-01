// Site-level OG PNG for the home page.
import type { APIRoute } from "astro";
import { renderPng, homeScene } from "../../lib/og-png";
import { SITE_TAGLINE } from "../../site.config";

export const GET: APIRoute = async () => {
  const png = await renderPng(homeScene({ tagline: SITE_TAGLINE }));
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
