// Port of home.jsx — toolbar, piles, grid, list, post cards, iris navigation.
// Receives posts from the Astro page (no window.POSTS global).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Post } from "../../lib/reports-to-posts";
import { themeFor, themeForMono, hashSeed, mulberry } from "../../lib/theme-generator";
import type { Theme } from "../../lib/theme-generator";
import { irisNavigate, useIrisReset } from "../../lib/iris";
import PatternArt from "./PatternArt";

type Mode = "piles" | "name" | "date" | "list";
type Palette = "rainbow" | "mono";

type Position = { x: number; y: number; rot: number; z: number };

function compute(w: number): number {
  if (w < 768) return 1;
  if (w < 900) return 4;
  if (w < 1200) return 6;
  if (w < 1500) return 8;
  return 10;
}

function useWindowWidth(initial = 1280) {
  // Initial state must be deterministic for SSR/CSR parity — update after mount.
  const [w, setW] = useState<number>(initial);
  useEffect(() => {
    const sync = () => setW(window.innerWidth);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  return w;
}

function pilePositions(cards: Post[], pileCenterY: number, stageWidth: number, seedStr: string): Position[] {
  const CARD_W = 260, CARD_H = 364;
  const isMobile = stageWidth <= 768;
  const r = mulberry(hashSeed(seedStr));
  const left = 50, right = 50;
  const usable = stageWidth - left - right - CARD_W;
  const results: Position[] = [];

  cards.forEach((_c, idx) => {
    if (isMobile) {
      const centerX = stageWidth / 2 - CARD_W / 2;
      const offsetX = (r() - 0.5) * 60;
      const finalX = Math.max(20, Math.min(centerX + offsetX, stageWidth - CARD_W - 20));
      const rotation = (r() - 0.5) * 6;
      const finalY = pileCenterY + idx * 12;
      results.push({ x: finalX, y: finalY, rot: rotation, z: 1000 + idx });
    } else {
      const progress = cards.length > 1 ? idx / (cards.length - 1) : 0.5;
      const baseX = left + progress * usable;
      const offsetX = (r() - 0.5) * 70;
      const isEven = idx % 2 === 0;
      const offsetY = (isEven ? -90 : 90) + (r() - 0.5) * 50;
      const rotation = (r() - 0.5) * 10;
      const finalX = Math.max(left, Math.min(baseX + offsetX, stageWidth - CARD_W - right));
      const finalY = Math.max(40, pileCenterY - CARD_H / 2 + offsetY);
      results.push({ x: finalX, y: finalY, rot: rotation, z: 1000 + idx * 3 + (isEven ? 0 : 5) });
    }
  });
  return results;
}

function Toolbar({
  mode, onMode, sortDir, onShuffle, count,
}: {
  mode: Mode;
  onMode: (m: Mode) => void;
  sortDir: "asc" | "desc" | undefined;
  onShuffle: () => void;
  count: number;
}) {
  return (
    <div className="toolbar">
      <button className="pill" aria-pressed={mode === "piles"} onClick={onShuffle}>Shuffle</button>
      <button className="pill" aria-pressed={mode === "name"} onClick={() => onMode("name")}>
        Sort by name {mode === "name" && (sortDir === "asc" ? "↑" : "↓")}
      </button>
      <button className="pill" aria-pressed={mode === "date"} onClick={() => onMode("date")}>
        Sort by date {mode === "date" && (sortDir === "asc" ? "↑" : "↓")}
      </button>
      <button className="pill" aria-pressed={mode === "list"} onClick={() => onMode(mode === "list" ? "piles" : "list")}>
        {mode === "list" ? "View as cards" : "View as list"}
      </button>
      <div className="toolbar__spacer"></div>
      <span className="toolbar__count">{count.toString().padStart(2, "0")} posts</span>
    </div>
  );
}

function PostCard({
  post, theme, position, flipped, onFlip, onNavigate, draggable = true,
}: {
  post: Post;
  theme: Theme;
  position: Position;
  flipped: boolean;
  onFlip: (id: string) => void;
  onNavigate: (post: Post, theme: Theme, el: HTMLElement) => void;
  draggable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [localPos, setLocalPos] = useState<Position | null>(null);
  const dragging = useRef<{
    x: number; y: number; baseX: number; baseY: number; moved: boolean;
  } | null>(null);

  useEffect(() => { setLocalPos(null); }, [position.x, position.y]);

  const pos = localPos ?? position;

  const handleClick = useCallback((e: MouseEvent | React.MouseEvent) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) { onNavigate(post, theme, ref.current!); return; }
    if (!flipped) { onFlip(post.id); return; }
    if (e.metaKey || e.ctrlKey) { window.open(post.href, "_blank"); return; }
    onNavigate(post, theme, ref.current!);
  }, [flipped, onFlip, onNavigate, post, theme]);

  // True between mousedown and the subsequent click when a drag actually happened;
  // lets the React onClick handler know to skip this click so we don't flip/navigate
  // on drag release.
  const suppressNextClick = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!draggable || e.button !== 0) return;
    // Don't start a drag on a flipped card — but still let the native click
    // reach onClick so a second click on a flipped card navigates.
    if (flipped) return;
    const start = { x: e.clientX, y: e.clientY, baseX: pos.x, baseY: pos.y, moved: false };
    dragging.current = start;
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - start.x, dy = ev.clientY - start.y;
      if (!start.moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        start.moved = true;
        ref.current?.setAttribute("data-state", "dragging");
      }
      if (start.moved) {
        setLocalPos({ x: start.baseX + dx, y: start.baseY + dy, rot: pos.rot, z: 9999 });
      }
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      const wasMoved = dragging.current?.moved ?? false;
      dragging.current = null;
      ref.current?.setAttribute("data-state", "");
      if (wasMoved) {
        // Drag ended — swallow the follow-up click so we don't also flip.
        suppressNextClick.current = true;
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const onClickReact = (e: React.MouseEvent) => {
    if (suppressNextClick.current) {
      suppressNextClick.current = false;
      return;
    }
    handleClick(e);
  };

  return (
    <div
      ref={ref}
      className="card"
      data-flipped={flipped}
      style={{
        left: pos.x + "px",
        top: pos.y + "px",
        transform: `rotate(${pos.rot}deg)`,
        zIndex: pos.z,
        color: theme.text,
      }}
      onMouseDown={onMouseDown}
      onClick={onClickReact}
    >
      <div className="card__inner">
        <div className="card__face card__face--front" style={{ background: theme.bg }}>
          <PatternArt id={post.id} theme={theme} />
          <div className="card__label">{post.author}<strong>{post.title}</strong></div>
        </div>
        <div className="card__face card__face--back" style={{ background: theme.bg, color: theme.text }}>
          <div className="card__back-header">
            <div className="card__label" style={{ position: "relative", top: 0, left: 0 }}>
              {post.author}<strong>{post.title}</strong>
            </div>
          </div>
          <div className="card__quote-wrap">
            <div className="card__quote">“{post.quote}”</div>
          </div>
          <div className="card__cta">Read essay →</div>
        </div>
      </div>
    </div>
  );
}

function Piles({
  posts, themes, onFlip, onNavigate, flippedId, cardsPerPile,
}: {
  posts: Post[];
  themes: Record<string, Theme>;
  onFlip: (id: string) => void;
  onNavigate: (p: Post, t: Theme, el: HTMLElement) => void;
  flippedId: string | null;
  cardsPerPile: number;
}) {
  const stageWidth = useWindowWidth();
  const BLOCK_H = cardsPerPile === 1 ? 440 : 620;
  const GAP = cardsPerPile === 1 ? 0 : 40;
  const piles: Post[][] = [];
  for (let i = 0; i < posts.length; i += cardsPerPile) piles.push(posts.slice(i, i + cardsPerPile));

  const rows = piles.map((pile, p) => {
    const top = p * (BLOCK_H + GAP);
    const centerY = top + BLOCK_H / 2;
    const positions = pilePositions(pile, centerY, stageWidth, `pile-${p}-${stageWidth}-${cardsPerPile}`);
    return { top, pile, positions };
  });

  const totalH = rows.length * (BLOCK_H + GAP);

  return (
    <div className="stage" style={{ height: totalH + "px" }}>
      {rows.map((row, i) => (
        <div key={i}>
          <div className="pile-rule" style={{ top: row.top + "px" }}></div>
          <div className="pile-rule" style={{ top: (row.top + BLOCK_H) + "px" }}></div>
          {GAP > 0 && <div className="pile-gap" style={{ top: (row.top + BLOCK_H) + "px", height: GAP + "px" }}></div>}
          {row.pile.map((post, j) => (
            <PostCard
              key={post.id}
              post={post}
              theme={themes[post.id]}
              position={row.positions[j]}
              flipped={flippedId === post.id}
              onFlip={onFlip}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function GridView({
  posts, themes, onFlip, onNavigate, flippedId,
}: {
  posts: Post[];
  themes: Record<string, Theme>;
  onFlip: (id: string) => void;
  onNavigate: (p: Post, t: Theme, el: HTMLElement) => void;
  flippedId: string | null;
}) {
  const stageWidth = useWindowWidth();
  const CARD_W = 260, CARD_H = 364, gap = 24;
  const cols = Math.max(1, Math.floor((stageWidth - 80) / (CARD_W + gap)));
  const gridW = cols * (CARD_W + gap) - gap;
  const startX = (stageWidth - gridW) / 2;
  const rows = Math.ceil(posts.length / cols);

  return (
    <div className="stage" style={{ height: (rows * (CARD_H + gap) + 40) + "px" }}>
      {posts.map((post, idx) => {
        const row = Math.floor(idx / cols), col = idx % cols;
        const position: Position = {
          x: startX + col * (CARD_W + gap),
          y: 20 + row * (CARD_H + gap),
          rot: 0,
          z: 1000 + idx,
        };
        return (
          <PostCard
            key={post.id}
            post={post}
            theme={themes[post.id]}
            position={position}
            flipped={flippedId === post.id}
            onFlip={onFlip}
            onNavigate={onNavigate}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

function ListView({
  posts, themes, onNavigate,
}: {
  posts: Post[];
  themes: Record<string, Theme>;
  onNavigate: (p: Post, t: Theme, el: HTMLElement) => void;
}) {
  return (
    <div className="list">
      {posts.map((post) => {
        const t = themes[post.id];
        return (
          <a
            key={post.id}
            href={post.href}
            className="list-item"
            style={{ background: t.bg, color: t.text }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(post, t, e.currentTarget);
            }}
          >
            <p className="list-item__author">{post.author}</p>
            <h3 className="list-item__title">{post.title}</h3>
            <p className="list-item__quote">“{post.quote}”</p>
            <div className="list-item__meta">
              <span>{post.date}</span>
              <span>{post.readMinutes} min</span>
              <span>{post.kicker}</span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default function HomeApp({
  posts,
  palette = "rainbow",
}: {
  posts: Post[];
  palette?: Palette;
}) {
  useIrisReset();

  const themes = useMemo(() => {
    const map: Record<string, Theme> = {};
    for (const p of posts) {
      map[p.id] = palette === "mono" ? themeForMono(p.id) : themeFor(p.id);
    }
    return map;
  }, [posts, palette]);

  const [stageW, setStageW] = useState<number>(1280);
  useEffect(() => {
    const sync = () => setStageW(window.innerWidth);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  const cardsPerPile = compute(stageW);

  const [mode, setMode] = useState<Mode>("piles");
  const [sortDir, setSortDir] = useState<{ name: "asc" | "desc"; date: "asc" | "desc" }>({ name: "asc", date: "desc" });
  const [shuffleKey, setShuffleKey] = useState(0);
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const sortedPosts = useMemo(() => {
    const arr = [...posts];
    if (mode === "name") {
      arr.sort((a, b) => {
        const an = a.author.split(" ").pop()!.toLowerCase();
        const bn = b.author.split(" ").pop()!.toLowerCase();
        return sortDir.name === "asc" ? an.localeCompare(bn) : bn.localeCompare(an);
      });
    } else if (mode === "date") {
      arr.sort((a, b) => sortDir.date === "desc" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
    } else if (shuffleKey > 0) {
      // Explicit shuffle (user clicked the Shuffle pill at least once).
      const r = mulberry(shuffleKey + 1);
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    } else {
      // Default for piles / list: newest first.
      arr.sort((a, b) => b.date.localeCompare(a.date));
    }
    return arr;
  }, [posts, mode, sortDir, shuffleKey]);

  const handleMode = (m: Mode) => {
    setFlippedId(null);
    if (m === mode && (m === "name" || m === "date")) {
      setSortDir((d) => ({ ...d, [m]: d[m] === "asc" ? "desc" : "asc" }));
    } else {
      setMode(m);
    }
  };
  const handleShuffle = () => {
    setFlippedId(null);
    setMode("piles");
    setShuffleKey((k) => k + 1);
  };
  const handleFlip = (id: string) => setFlippedId((prev) => prev === id ? null : id);
  const handleNavigate = (post: Post, theme: Theme, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    irisNavigate(post.href, theme.bg, origin);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!flippedId) return;
      const target = e.target as HTMLElement | null;
      const card = target?.closest?.(".card");
      if (!card) setFlippedId(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [flippedId]);

  const activeSortDir = mode === "name" ? sortDir.name : mode === "date" ? sortDir.date : undefined;

  return (
    <>
      <Toolbar
        mode={mode}
        onMode={handleMode}
        sortDir={activeSortDir}
        onShuffle={handleShuffle}
        count={sortedPosts.length}
      />
      {mode === "list" ? (
        <ListView posts={sortedPosts} themes={themes} onNavigate={handleNavigate} />
      ) : mode === "piles" ? (
        <Piles
          posts={sortedPosts}
          themes={themes}
          onFlip={handleFlip}
          onNavigate={handleNavigate}
          flippedId={flippedId}
          cardsPerPile={cardsPerPile}
        />
      ) : (
        <GridView
          posts={sortedPosts}
          themes={themes}
          onFlip={handleFlip}
          onNavigate={handleNavigate}
          flippedId={flippedId}
        />
      )}
    </>
  );
}
