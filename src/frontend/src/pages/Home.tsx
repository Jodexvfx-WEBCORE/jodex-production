import { ClientWorkSection } from "@/components/ClientWorkSection";
import { HeroPanelCarousel } from "@/components/HeroPanelCarousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { YouTubeVideo } from "@/types/index";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "jodex_yt_videos";
const SEED_KEY = "jodex_yt_seeded_v5";

const SEED_VIDEOS: YouTubeVideo[] = [
  {
    id: 1,
    url: "https://www.youtube.com/watch?v=cLoXQb5M6oI",
    title: "3D Animation Showreel",
    addedAt: 1700000001,
  },
  {
    id: 2,
    url: "https://www.youtube.com/watch?v=nWc3c1Lvp1Q",
    title: "Motion Design Reel",
    addedAt: 1700000002,
  },
  {
    id: 3,
    url: "https://www.youtube.com/watch?v=OX5vqtiZQ2s&t=1135s",
    title: "Visual Effects Breakdown",
    addedAt: 1700000003,
  },
  {
    id: 4,
    url: "https://www.youtube.com/watch?v=LJxoLJ_5uyQ",
    title: "2D Animation Project",
    addedAt: 1700000004,
  },
  {
    id: 5,
    url: "https://www.youtube.com/watch?v=jqgYlRHfyQU",
    title: "Interior Design Walkthrough",
    addedAt: 1700000005,
  },
  {
    id: 6,
    url: "https://www.youtube.com/watch?v=mr_O1xgobE8",
    title: "Video Editing Highlights",
    addedAt: 1700000006,
  },
  {
    id: 7,
    url: "https://www.youtube.com/watch?v=6NbGjuKwvYA",
    title: "Product Animation Demo",
    addedAt: 1700000007,
  },
  {
    id: 8,
    url: "https://www.youtube.com/watch?v=_sXXPXnJuBg",
    title: "Creative Motion Reel",
    addedAt: 1700000008,
  },
  {
    id: 9,
    url: "https://www.youtube.com/watch?v=4rHYfFW3Edc",
    title: "3D Cinematic Sequence",
    addedAt: 1700000009,
  },
  {
    id: 10,
    url: "https://www.youtube.com/watch?v=jBzR16cQEh4",
    title: "Client Work Showcase",
    addedAt: 1700000010,
  },
  {
    id: 11,
    url: "https://www.youtube.com/watch?v=f1X5QWwrwN8",
    title: "Interior Design Showcase",
    addedAt: 1700000011,
  },
];

function seedVideosIfNeeded(): void {
  try {
    if (!localStorage.getItem(SEED_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_VIDEOS));
      localStorage.setItem(SEED_KEY, "true");
    }
  } catch {
    // localStorage unavailable — silently skip
  }
}

function loadVideosFromStorage(): YouTubeVideo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as YouTubeVideo[];
  } catch {
    return [];
  }
}

/* ── Contact option data ── */
const CONTACT_OPTIONS = [
  {
    id: "gmail",
    label: "Gmail",
    detail: "Jodexvfx@gmail.com",
    href: "mailto:Jodexvfx@gmail.com",
    target: "_self",
    accent: "rgba(255,80,80,0.85)",
    glow: "rgba(255,80,80,0.6)",
    glowOff: "rgba(255,80,80,0.2)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-7 h-7"
        aria-hidden="true"
        role="img"
      >
        <rect width="24" height="24" rx="5" fill="rgba(255,80,80,0.18)" />
        <path
          d="M4 7.5C4 6.67 4.67 6 5.5 6h13C19.33 6 20 6.67 20 7.5V17a1 1 0 01-1 1H5a1 1 0 01-1-1V7.5z"
          stroke="#FF5050"
          strokeWidth="1.5"
        />
        <path
          d="M4 8l8 5.5L20 8"
          stroke="#FF5050"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "discord",
    label: "Discord",
    detail: "@godly_boxer",
    href: "https://discord.com/channels/@godly_boxer",
    target: "_blank",
    accent: "rgba(88,101,242,0.9)",
    glow: "rgba(88,101,242,0.6)",
    glowOff: "rgba(88,101,242,0.22)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-7 h-7"
        aria-hidden="true"
        role="img"
      >
        <rect width="24" height="24" rx="5" fill="rgba(88,101,242,0.18)" />
        <path
          d="M9.5 14.5c-.83 0-1.5-.76-1.5-1.7s.66-1.7 1.5-1.7 1.51.76 1.5 1.7c0 .94-.67 1.7-1.5 1.7zM14.5 14.5c-.83 0-1.5-.76-1.5-1.7s.66-1.7 1.5-1.7 1.51.76 1.5 1.7c0 .94-.67 1.7-1.5 1.7z"
          fill="#5865F2"
        />
        <path
          d="M17.36 5.5A15.56 15.56 0 0014 5a.07.07 0 00-.07.04c-.14.25-.3.57-.4.82A14.47 14.47 0 0010.46 5c-.29.24-.57.57-.41.82-.11.25-.27.57-.41.82A15.35 15.35 0 006.64 5.5C5.13 7.87 4.67 10.18 4.88 12.47a15.6 15.6 0 004.74 2.4.07.07 0 00.08-.03c.36-.5.69-1.03.97-1.58a.07.07 0 00-.04-.1 10.26 10.26 0 01-1.47-.7.07.07 0 01-.01-.11c.1-.07.2-.15.29-.22a.07.07 0 01.07-.01c3.09 1.41 6.44 1.41 9.5 0a.07.07 0 01.07.01c.1.08.19.15.3.22a.07.07 0 01-.01.12c-.47.27-.97.5-1.48.7a.07.07 0 00-.04.1c.29.55.62 1.08.97 1.57a.07.07 0 00.08.03 15.53 15.53 0 004.74-2.4c.18-2.55-.31-4.84-1.77-7z"
          fill="#5865F2"
        />
      </svg>
    ),
  },
] as const;

/* ─── Home Page ─── */
export default function Home() {
  // Seed default videos on first ever visit (v4 key forces re-seed for updated list)
  seedVideosIfNeeded();

  const containerRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>(loadVideosFromStorage);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, -90]);

  // Sync videos from localStorage when page becomes visible / regains focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setVideos(loadVideosFromStorage());
      }
    };
    const handleFocus = () => setVideos(loadVideosFromStorage());
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* ── Hero Section ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
        data-ocid="hero-section"
      >
        {/* Animated radial background */}
        <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse 85% 65% at 50% 42%, oklch(0.14 0.05 200 / 0.85) 0%, oklch(0.06 0 0) 68%)",
            }}
          />
        </motion.div>

        {/* Ambient neon blobs */}
        <div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[130px] opacity-[0.08] pointer-events-none"
          style={{ background: "#00D9FF" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full blur-[110px] opacity-[0.07] pointer-events-none"
          style={{ background: "#FF00FF" }}
        />

        {/* ── Floating Panels — scattered behind text ── */}
        <HeroPanelCarousel />

        {/* ── Hero Content ── */}
        <div className="relative z-20 flex flex-col items-center text-center px-6 pt-24 pb-16 w-full max-w-5xl mx-auto">
          {/* Main Title */}
          <motion.h1
            className="font-display font-bold uppercase tracking-[0.22em] mb-7"
            style={{
              fontSize: "clamp(2.2rem, 7.5vw, 5.5rem)",
              color: "#00D9FF",
            }}
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            data-ocid="hero-name"
          >
            Jodex Production
          </motion.h1>

          {/* Services */}
          <motion.p
            className="font-body text-foreground/55 tracking-[0.2em] uppercase text-xs sm:text-sm mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.32 }}
            data-ocid="hero-services"
          >
            3D Animation&nbsp;&nbsp;|&nbsp;&nbsp;2D
            Animation&nbsp;&nbsp;|&nbsp;&nbsp;Video
            Editing&nbsp;&nbsp;|&nbsp;&nbsp;Interior Designing
          </motion.p>

          {/* Thin divider */}
          <motion.div
            className="h-px w-36 mb-5 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,217,255,0.55), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.44 }}
          />

          {/* Quote */}
          <motion.p
            className="italic font-body text-foreground/38 text-base mb-12 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            data-ocid="hero-quote"
          >
            "Chill vibe matters only..."
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-5 justify-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Hire Me */}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group relative px-9 py-3.5 font-display font-semibold text-sm tracking-[0.18em] uppercase overflow-hidden rounded-full text-foreground"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,0,255,0.22) 0%, rgba(180,0,180,0.12) 100%)",
                border: "1px solid rgba(255,0,255,0.55)",
                boxShadow:
                  "0 0 18px rgba(255,0,255,0.28), inset 0 0 18px rgba(255,0,255,0.04)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow =
                  "0 0 40px rgba(255,0,255,0.7), inset 0 0 28px rgba(255,0,255,0.1)";
                el.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow =
                  "0 0 18px rgba(255,0,255,0.28), inset 0 0 18px rgba(255,0,255,0.04)";
                el.style.transform = "scale(1)";
              }}
              data-ocid="cta-hire"
            >
              Hire Me
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-1.5 mt-8"
            style={{ opacity: 0.28 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-accent to-transparent" />
            <span
              className="text-[10px] font-body tracking-[0.25em] uppercase"
              style={{ color: "#00D9FF" }}
            >
              scroll
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Client Work Section ── */}
      <ClientWorkSection videos={videos} />

      {/* ── Contact Modal ── */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent
          className="max-w-sm w-full p-0 border-0 shadow-none bg-transparent"
          data-ocid="contact-modal"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10, 10, 14, 0.82)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 0 60px rgba(0,0,0,0.8), 0 0 30px rgba(0,217,255,0.07)",
            }}
          >
            {/* Header */}
            <DialogHeader className="px-7 pt-7 pb-5">
              <DialogTitle
                className="font-display font-bold tracking-[0.14em] uppercase text-center text-foreground"
                style={{ fontSize: "1.25rem", letterSpacing: "0.14em" }}
              >
                Get In Touch
              </DialogTitle>
              <p className="text-foreground/40 font-body text-xs text-center tracking-widest uppercase mt-1">
                Choose how to reach me
              </p>
            </DialogHeader>

            {/* Divider */}
            <div
              className="h-px mx-7 mb-5"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)",
              }}
            />

            {/* Contact Options */}
            <div className="flex flex-col gap-3 px-7 pb-7">
              {CONTACT_OPTIONS.map((opt, i) => (
                <motion.a
                  key={opt.id}
                  href={opt.href}
                  target={opt.target}
                  rel={
                    opt.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer no-underline group"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${opt.glowOff}`,
                    boxShadow: `0 0 0px ${opt.glow}`,
                    transition:
                      "box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.boxShadow = `0 0 22px ${opt.glow}`;
                    el.style.borderColor = opt.accent;
                    el.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.boxShadow = `0 0 0px ${opt.glow}`;
                    el.style.borderColor = opt.glowOff;
                    el.style.background = "rgba(255,255,255,0.03)";
                  }}
                  data-ocid={`contact-${opt.id}`}
                >
                  <div className="flex-shrink-0">{opt.icon}</div>
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <span
                      className="font-display font-semibold text-sm tracking-[0.1em] uppercase"
                      style={{ color: opt.accent }}
                    >
                      {opt.label}
                    </span>
                    <span
                      className="font-body text-xs truncate"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {opt.detail}
                    </span>
                  </div>
                  <svg
                    className="ml-auto flex-shrink-0 opacity-30 group-hover:opacity-70 transition-opacity"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    role="img"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
