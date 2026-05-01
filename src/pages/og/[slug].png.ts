// Build-time per-post OG PNG.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderPng, postScene } from "../../lib/og-png";
import { DEFAULT_AUTHOR } from "../../site.config";

export const getStaticPaths: GetStaticPaths = async () => {
  let reports: Awaited<ReturnType<typeof getCollection>>;

  try {
    reports = await getCollection("reports");
  } catch {
    reports = [];
  }

  return reports
    .filter((r) => !r.data.draft)
    .map((report) => ({
      params: { slug: report.id },
      props: { report },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const { report } = props as { report: Awaited<ReturnType<typeof getCollection>>[number] };
  const d = report.data;

  const png = await renderPng(
    postScene({
      title: d.title,
      kicker: d.tags?.[0] ?? d.category ?? "Essay",
      author: d.aiModel ?? DEFAULT_AUTHOR,
      date: d.pubDate.toISOString().slice(0, 10),
    }),
  );

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
