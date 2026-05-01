import type { APIContext } from "astro";
import { getPublishedReports } from "../utils/reports";
import { SITE_TITLE, SITE_DESCRIPTION } from "../site.config";
import { withBase } from "../utils/paths";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET(context: APIContext) {
  const reports = await getPublishedReports();
  const site = context.site?.href ?? "https://pro.mashbean.net/";
  const origin = site.endsWith("/") ? site.slice(0, -1) : site;
  const items = reports
    .map((report) => {
      const link = `${origin}${withBase(`/reports/${report.id}/`)}`;
      return `<item><title>${escapeXml(report.data.title)}</title><link>${escapeXml(link)}</link><guid>${escapeXml(link)}</guid><pubDate>${report.data.pubDate.toUTCString()}</pubDate><description>${escapeXml(report.data.description)}</description></item>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(SITE_TITLE)}</title><description>${escapeXml(SITE_DESCRIPTION)}</description><link>${escapeXml(origin)}</link>${items}</channel></rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    },
  );
}
