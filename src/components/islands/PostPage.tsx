// Client-side bits of the single-post reading view:
// - iris intro (close overlay on mount if we arrived from homepage)
// - iris reset on bfcache return
// - related grid (themed cards linking back to other reports)
// Body / meta / hero are rendered server-side by the Astro page.

import { useMemo } from "react";
import type { Post } from "../../lib/reports-to-posts";
import { themeFor } from "../../lib/theme-generator";
import type { Theme } from "../../lib/theme-generator";
import { irisNavigate, useIrisReset, useIrisIntro } from "../../lib/iris";
import { hashSeed, mulberry } from "../../lib/theme-generator";

export default function PostPage({
  currentId,
  others,
}: {
  currentId: string;
  others: Post[];
}) {
  useIrisReset();
  useIrisIntro();

  const related = useMemo(() => {
    const r = mulberry(hashSeed(currentId + ":related"));
    const shuffled = [...others].sort(() => r() - 0.5);
    return shuffled.slice(0, 3);
  }, [currentId, others]);

  const navigate = (p: Post, t: Theme, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    irisNavigate(p.href, t.bg, origin);
  };

  if (related.length === 0) return null;

  return (
    <section className="related">
      <div className="related__head">
        <span className="related__label">Continue reading</span>
      </div>
      <div className="related__grid">
        {related.map((p) => {
          const t = themeFor(p.id);
          return (
            <a
              key={p.id}
              href={p.href}
              className="related__item"
              style={{ background: t.bg, color: t.text }}
              onClick={(e) => { e.preventDefault(); navigate(p, t, e.currentTarget); }}
            >
              <p className="related__author">{p.author}</p>
              <h3 className="related__title">{p.title}</h3>
            </a>
          );
        })}
      </div>
    </section>
  );
}
