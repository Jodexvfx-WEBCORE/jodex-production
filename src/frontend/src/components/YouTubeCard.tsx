import type { OEmbedData, YouTubeVideo } from "@/types/index";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface YouTubeCardProps {
  video: YouTubeVideo;
}

/** English client comments mapped by YouTube video ID */
const HINDI_COMMENTS: Record<string, string> = {
  cLoXQb5M6oI:
    "The editing was absolutely fire — our channel views shot up after this!",
  nWc3c1Lvp1Q:
    "Everyone loved it! The work turned out incredible, really exceeded expectations.",
  OX5vqtiZQ2s:
    "The 3D animation was so smooth, it genuinely made me smile watching it.",
  LJxoLJ_5uyQ:
    "Timing and transitions were spot on — exactly what we had in mind.",
  jqgYlRHfyQU:
    "The overall video quality looks super high-end. Really impressive work.",
  mr_O1xgobE8:
    "Jodex delivered something beyond words — absolutely superb output!",
  "6NbGjuKwvYA":
    "The audio-visual combo was outstanding, our audience loved every second.",
  _sXXPXnJuBg:
    "Fast delivery and such clean editing — this is genuinely professional work.",
  "4rHYfFW3Edc":
    "Better than we expected — it had a real cinematic feel to it.",
  jBzR16cQEh4:
    "Colors, text, and music all came together perfectly. We're very happy!",
  f1X5QWwrwN8:
    "The interior visualization left our client speechless — outstanding work!",
};

function extractVideoId(url: string): string | null {
  // Handles ?v=ID with any extra params like &t=1135s
  const vParam = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (vParam) return vParam[1];
  // youtu.be short links
  const shortLink = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortLink) return shortLink[1];
  // /embed/ links
  const embed = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];
  return null;
}

/* YouTube official red logo SVG */
function YTLogo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 90 63"
      fill="none"
      aria-label="YouTube"
      role="img"
    >
      <rect width="90" height="63" rx="13" fill="#FF0000" />
      <path d="M37 20 L37 43 L58 31.5 Z" fill="white" />
    </svg>
  );
}

export function YouTubeCard({ video }: YouTubeCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [oEmbed, setOEmbed] = useState<OEmbedData | null>(null);
  const [thumbError, setThumbError] = useState(false);
  const [loading, setLoading] = useState(true);

  const videoId = extractVideoId(video.url);
  const maxresThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
  const hqThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const thumbnail = thumbError ? hqThumbnail : maxresThumbnail;

  // Hindi comment for this video
  const hindiComment = videoId ? (HINDI_COMMENTS[videoId] ?? null) : null;

  // Fetch oEmbed data for channel name + real title
  useEffect(() => {
    if (!video.url) return;
    let cancelled = false;
    setLoading(true);

    // Build a clean URL without timestamp params for oEmbed
    const cleanUrl = videoId
      ? `https://www.youtube.com/watch?v=${videoId}`
      : video.url;
    const encoded = encodeURIComponent(cleanUrl);

    fetch(`https://www.youtube.com/oembed?url=${encoded}&format=json`)
      .then((r) => {
        if (!r.ok) throw new Error("oEmbed failed");
        return r.json() as Promise<OEmbedData>;
      })
      .then((data) => {
        if (!cancelled) {
          setOEmbed(data);
          setLoading(false);
        }
      })
      .catch(() => {
        // Gracefully degrade — show card with fallback title
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [video.url, videoId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -12;
    const rotateY = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
    card.style.boxShadow =
      "0 8px 48px rgba(0,0,0,0.6), 0 0 28px rgba(0,217,255,0.45)";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.boxShadow =
      "0 4px 32px rgba(0,0,0,0.5), 0 0 0px rgba(0,217,255,0)";
  };

  const handleClick = () => {
    window.open(video.url, "_blank", "noopener,noreferrer");
  };

  const channelName = oEmbed?.author_name ?? null;
  const displayTitle = oEmbed?.title ?? video.title;

  return (
    <button
      ref={cardRef}
      type="button"
      aria-label={`Watch ${displayTitle} on YouTube`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-ocid="yt-card"
      className="relative rounded-2xl overflow-hidden cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 w-full text-left flex flex-col"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(0,217,255,0.18)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.5), 0 0 0px rgba(0,217,255,0)",
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/60 flex-shrink-0">
        {loading ? (
          /* Skeleton */
          <div className="w-full h-full bg-white/5 animate-pulse" />
        ) : thumbnail ? (
          <img
            src={thumbnail}
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => {
              if (!thumbError) setThumbError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <YTLogo size={48} />
          </div>
        )}

        {/* Play button overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,217,255,0.18)",
              border: "2px solid rgba(0,217,255,0.7)",
              boxShadow: "0 0 24px rgba(0,217,255,0.5)",
            }}
          >
            <svg
              className="w-6 h-6 ml-0.5"
              viewBox="0 0 24 24"
              fill="#00D9FF"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Cyan edge glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "inset 0 0 28px rgba(0,217,255,0.12)" }}
        />
      </div>

      {/* Bottom info bar */}
      <div
        className="flex flex-col gap-1 px-3 py-2.5 flex-1"
        style={{
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Row: YT logo + channel name */}
        <div className="flex items-center gap-2 min-w-0">
          <YTLogo size={20} />
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
            ) : (
              <span className="text-white text-sm font-medium truncate block leading-tight">
                {channelName ?? "YouTube"}
              </span>
            )}
          </div>
        </div>

        {/* Video title */}
        {loading ? (
          <div className="space-y-1 mt-0.5">
            <div className="h-2.5 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-2.5 w-3/4 bg-white/10 rounded animate-pulse" />
          </div>
        ) : (
          <p
            className="line-clamp-2 leading-snug"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.72rem" }}
          >
            {displayTitle}
          </p>
        )}

        {/* Hindi client comment */}
        {!loading && hindiComment && (
          <div
            className="mt-1.5 pt-2"
            style={{ borderTop: "1px solid rgba(0,217,255,0.12)" }}
          >
            <p
              className="text-[10px] font-mono tracking-wider uppercase mb-1"
              style={{ color: "rgba(0,217,255,0.55)" }}
            >
              Client Says:
            </p>
            <p
              className="italic leading-snug"
              style={{ color: "rgba(255,255,255,0.60)", fontSize: "0.70rem" }}
            >
              ❝ {hindiComment} ❞
            </p>
          </div>
        )}

        {/* Watch on YouTube */}
        <p
          className="text-[10px] tracking-wider uppercase mt-1"
          style={{ color: "rgba(255,75,75,0.7)" }}
        >
          Watch on YouTube
        </p>
      </div>

      {/* Bottom cyan line accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,217,255,0.7), transparent)",
        }}
      />
    </button>
  );
}
