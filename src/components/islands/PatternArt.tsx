// SVG pattern art for card fronts. Port of app-helpers.jsx PatternArt.
import type { Theme } from "../../lib/theme-generator";
import { hashSeed, mulberry, patternFor } from "../../lib/theme-generator";

type Props = {
  id: string;
  theme: Theme;
  w?: number;
  h?: number;
  safeTop?: number;
};

export default function PatternArt({ id, theme, w = 260, h = 364, safeTop = 130 }: Props) {
  const key = patternFor(id);
  const r = mulberry(hashSeed(id + ":render"));
  const stroke = theme.strokes[Math.floor(r() * theme.strokes.length)];
  const stroke2 = theme.strokes[(Math.floor(r() * theme.strokes.length) + 1) % theme.strokes.length];
  const rand = (min: number, max: number) => min + r() * (max - min);

  const shapes: React.ReactNode[] = [];

  if (key === "arcs") {
    for (let i = 0; i < 5; i++) {
      const cx = rand(-30, w + 30), cy = rand(safeTop, h + 60);
      const rad = rand(60, 180);
      shapes.push(<circle key={i} cx={cx} cy={cy} r={rad} fill="none" stroke={i % 2 ? stroke : stroke2} strokeWidth={rand(1, 3)} opacity={rand(.4, .9)} />);
    }
  } else if (key === "phyllo") {
    const cx = w / 2, cy = h * 0.72, count = 80;
    for (let i = 0; i < count; i++) {
      const a = i * 137.5 * Math.PI / 180;
      const rr = Math.sqrt(i) * 8;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      if (y < safeTop) continue;
      shapes.push(<circle key={i} cx={x} cy={y} r={2 + (i % 5) * .4} fill={i % 3 ? stroke : stroke2} opacity={.8} />);
    }
  } else if (key === "waves") {
    for (let i = 0; i < 8; i++) {
      const y = safeTop + i * (h - safeTop) / 8;
      let d = `M 0 ${y}`;
      const amp = rand(6, 16), freq = rand(2, 5);
      for (let x = 0; x <= w; x += 6) d += ` L ${x} ${y + Math.sin(x / w * Math.PI * freq + i) * amp}`;
      shapes.push(<path key={i} d={d} fill="none" stroke={i % 2 ? stroke : stroke2} strokeWidth={1.2} opacity={.7} />);
    }
  } else if (key === "grid") {
    const step = 18;
    for (let x = 0; x <= w; x += step) for (let y = safeTop; y <= h; y += step) {
      if (r() < 0.25) continue;
      shapes.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={r() < .2 ? 3 : 1.5} fill={r() < .3 ? stroke2 : stroke} />);
    }
  } else if (key === "contours") {
    for (let i = 0; i < 12; i++) {
      const cx = rand(0, w), cy = rand(safeTop, h);
      const rad = rand(20, 100);
      shapes.push(<ellipse key={i} cx={cx} cy={cy} rx={rad} ry={rad * .6} fill="none" stroke={i % 2 ? stroke : stroke2} strokeWidth={1} opacity={.5} />);
    }
  } else if (key === "rings") {
    const cx = w / 2, cy = h * 0.7;
    for (let i = 0; i < 14; i++) {
      shapes.push(<circle key={i} cx={cx} cy={cy} r={10 + i * 14} fill="none" stroke={i % 2 ? stroke : stroke2} strokeWidth={1} opacity={.6} />);
    }
  } else if (key === "orbits") {
    const cx = w / 2, cy = h * 0.7;
    for (let i = 0; i < 6; i++) {
      const rx = 40 + i * 20, ry = 20 + i * 12;
      const rot = rand(0, 180);
      shapes.push(<ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={i % 2 ? stroke : stroke2} strokeWidth={1.2} opacity={.7} transform={`rotate(${rot} ${cx} ${cy})`} />);
    }
  } else if (key === "field") {
    for (let i = 0; i < 30; i++) {
      const x = rand(0, w), y = rand(safeTop, h);
      const len = rand(8, 24), ang = rand(0, Math.PI * 2);
      const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      shapes.push(<line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke={i % 2 ? stroke : stroke2} strokeWidth={1.5} opacity={.8} />);
    }
  } else if (key === "constellation") {
    const pts = Array.from({ length: 12 }, () => ({ x: rand(10, w - 10), y: rand(safeTop + 10, h - 10) }));
    pts.forEach((p, i) => {
      shapes.push(<circle key={`p${i}`} cx={p.x} cy={p.y} r={2} fill={stroke} />);
      if (i > 0) {
        const q = pts[i - 1];
        shapes.push(<line key={`l${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={stroke2} strokeWidth={.8} opacity={.5} />);
      }
    });
  } else if (key === "burst") {
    const cx = w / 2, cy = h * 0.72;
    for (let i = 0; i < 36; i++) {
      const a = i * Math.PI / 18;
      const r1 = rand(10, 40), r2 = rand(60, 140);
      shapes.push(<line key={i} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2} stroke={i % 2 ? stroke : stroke2} strokeWidth={1} opacity={.7} />);
    }
  } else if (key === "hatching") {
    const ang = rand(20, 60);
    for (let i = 0; i < 40; i++) {
      const y = safeTop + i * (h - safeTop) / 40;
      shapes.push(<line key={i} x1={-40} y1={y} x2={w + 40} y2={y + Math.tan(ang * Math.PI / 180) * 20} stroke={i % 2 ? stroke : stroke2} strokeWidth={1} opacity={.4} />);
    }
  } else {
    // scribble
    let d = `M ${rand(20, w - 20)} ${safeTop + rand(20, 40)}`;
    for (let i = 0; i < 30; i++) {
      d += ` Q ${rand(0, w)} ${rand(safeTop, h)} ${rand(0, w)} ${rand(safeTop, h)}`;
    }
    shapes.push(<path key="s" d={d} fill="none" stroke={stroke} strokeWidth={1.2} opacity={.6} />);
  }

  return (
    <svg
      className="card__art"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", background: theme.bg }}
    >
      {shapes}
    </svg>
  );
}
