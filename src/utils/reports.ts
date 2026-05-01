import { getCollection } from "astro:content";

export async function getPublishedReports() {
  let all: Awaited<ReturnType<typeof getCollection>>;

  try {
    all = await getCollection("reports");
  } catch {
    all = [];
  }

  return all
    .filter((r) => !r.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getAllTags(
  reports: Awaited<ReturnType<typeof getPublishedReports>>,
): string[] {
  const tagSet = new Set<string>();
  for (const r of reports) {
    for (const t of r.data.tags) tagSet.add(t);
  }
  return [...tagSet].sort();
}
