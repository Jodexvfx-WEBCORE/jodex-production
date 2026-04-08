import { useEffect, useState } from "react";

const PANELS_KEY = "jodex_hero_panels";
const PANEL_COUNT = 6;

interface PanelEntry {
  src: string;
  type: "image" | "video";
}

function detectType(src: string): "image" | "video" {
  if (src.startsWith("data:video")) return "video";
  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src)) return "video";
  return "image";
}

function loadPanels(): PanelEntry[] {
  try {
    const raw = localStorage.getItem(PANELS_KEY);
    if (!raw)
      return Array(PANEL_COUNT).fill({ src: "", type: "image" as const });
    const parsed = JSON.parse(raw) as (PanelEntry | string)[];
    const result: PanelEntry[] = Array(PANEL_COUNT).fill({
      src: "",
      type: "image" as const,
    });
    for (let i = 0; i < PANEL_COUNT; i++) {
      const entry = parsed[i];
      if (!entry) continue;
      if (typeof entry === "string") {
        result[i] = { src: entry, type: detectType(entry) };
      } else {
        result[i] = {
          src: entry.src ?? "",
          type: entry.type ?? detectType(entry.src ?? ""),
        };
      }
    }
    return result;
  } catch {
    return Array(PANEL_COUNT).fill({ src: "", type: "image" as const });
  }
}

interface PanelMediaProps {
  entry: PanelEntry;
  index: number;
}

function PanelMedia({ entry, index }: PanelMediaProps) {
  const { src, type } = entry;

  if (!src) {
    const gradients = [
      "linear-gradient(135deg, rgba(0,217,255,0.12) 0%, rgba(120,0,255,0.08) 100%)",
      "linear-gradient(135deg, rgba(255,0,200,0.10) 0%, rgba(0,100,255,0.08) 100%)",
      "linear-gradient(135deg, rgba(0,255,120,0.08) 0%, rgba(0,180,255,0.10) 100%)",
      "linear-gradient(135deg, rgba(255,120,0,0.08) 0%, rgba(200,0,255,0.10) 100%)",
      "linear-gradient(135deg, rgba(0,200,255,0.10) 0%, rgba(255,0,120,0.08) 100%)",
      "linear-gradient(135deg, rgba(120,0,255,0.10) 0%, rgba(0,217,255,0.08) 100%)",
    ];
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: gradients[index % gradients.length] }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="rgba(0,217,255,0.2)"
            strokeWidth="1"
            strokeDasharray="3 2"
          />
          <path
            d="M8 14h12M14 8v12"
            stroke="rgba(0,217,255,0.25)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (type === "video" || src.startsWith("data:video")) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <img
      src={src}
      alt={`Panel ${index + 1}`}
      className="w-full h-full object-cover"
      draggable={false}
    />
  );
}

/* Six unique floating animations — each panel drifts independently */
const PANEL_STYLES = `
@keyframes panel0Move {
  0%   { transform: translate(0px, 0px) rotate(-3deg); }
  25%  { transform: translate(18px, -22px) rotate(2deg); }
  50%  { transform: translate(8px, -38px) rotate(-5deg); }
  75%  { transform: translate(-12px, -16px) rotate(4deg); }
  100% { transform: translate(0px, 0px) rotate(-3deg); }
}
@keyframes panel1Move {
  0%   { transform: translate(0px, 0px) rotate(5deg); }
  30%  { transform: translate(-20px, 16px) rotate(-2deg); }
  55%  { transform: translate(-10px, 32px) rotate(7deg); }
  80%  { transform: translate(16px, 14px) rotate(-4deg); }
  100% { transform: translate(0px, 0px) rotate(5deg); }
}
@keyframes panel2Move {
  0%   { transform: translate(0px, 0px) rotate(-6deg); }
  20%  { transform: translate(14px, 20px) rotate(3deg); }
  50%  { transform: translate(28px, 8px) rotate(-8deg); }
  75%  { transform: translate(10px, -18px) rotate(5deg); }
  100% { transform: translate(0px, 0px) rotate(-6deg); }
}
@keyframes panel3Move {
  0%   { transform: translate(0px, 0px) rotate(4deg); }
  33%  { transform: translate(-16px, -24px) rotate(-3deg); }
  66%  { transform: translate(-28px, 4px) rotate(6deg); }
  100% { transform: translate(0px, 0px) rotate(4deg); }
}
@keyframes panel4Move {
  0%   { transform: translate(0px, 0px) rotate(-2deg); }
  25%  { transform: translate(22px, 12px) rotate(6deg); }
  50%  { transform: translate(12px, 28px) rotate(-4deg); }
  75%  { transform: translate(-8px, 16px) rotate(3deg); }
  100% { transform: translate(0px, 0px) rotate(-2deg); }
}
@keyframes panel5Move {
  0%   { transform: translate(0px, 0px) rotate(7deg); }
  30%  { transform: translate(-18px, -12px) rotate(-5deg); }
  60%  { transform: translate(-6px, -30px) rotate(9deg); }
  85%  { transform: translate(14px, -8px) rotate(-3deg); }
  100% { transform: translate(0px, 0px) rotate(7deg); }
}
`;

/* Scattered positions: [left%, top%] for each panel */
const PANEL_POSITIONS: [string, string][] = [
  ["6%", "8%"],
  ["72%", "4%"],
  ["2%", "58%"],
  ["78%", "62%"],
  ["42%", "74%"],
  ["62%", "28%"],
];

const PANEL_ANIMATIONS = [
  { name: "panel0Move", duration: "28s", delay: "0s" },
  { name: "panel1Move", duration: "34s", delay: "-8s" },
  { name: "panel2Move", duration: "26s", delay: "-14s" },
  { name: "panel3Move", duration: "32s", delay: "-5s" },
  { name: "panel4Move", duration: "30s", delay: "-20s" },
  { name: "panel5Move", duration: "22s", delay: "-11s" },
];

const PANEL_KEYS = ["p0", "p1", "p2", "p3", "p4", "p5"] as const;

export function HeroPanelCarousel() {
  const [panels, setPanels] = useState<PanelEntry[]>(loadPanels);

  useEffect(() => {
    const sync = () => setPanels(loadPanels());
    const handleVisibility = () => {
      if (!document.hidden) sync();
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === PANELS_KEY) sync();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", sync);
    window.addEventListener("storage", handleStorage);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <>
      <style>{PANEL_STYLES}</style>
      {/* Floating panels — absolutely positioned in the hero, behind text */}
      {panels.map((entry, i) => {
        const [left, top] = PANEL_POSITIONS[i];
        const anim = PANEL_ANIMATIONS[i];
        return (
          <div
            key={PANEL_KEYS[i]}
            data-ocid={`hero-panel-${i}`}
            style={{
              position: "absolute",
              left,
              top,
              width: "clamp(110px, 14vw, 200px)",
              height: "clamp(110px, 14vw, 200px)",
              zIndex: 1,
              overflow: "hidden",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.4), 0 0 6px rgba(0,217,255,0.06)",
              animation: `${anim.name} ${anim.duration} ease-in-out ${anim.delay} infinite`,
              willChange: "transform",
            }}
          >
            <PanelMedia entry={entry} index={i} />
            {/* Subtle glass sheen overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)",
                pointerEvents: "none",
              }}
            />
          </div>
        );
      })}
    </>
  );
}
