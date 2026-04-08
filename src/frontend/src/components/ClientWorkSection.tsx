import type { YouTubeVideo } from "@/types/index";
import { motion } from "motion/react";
import { YouTubeCard } from "./YouTubeCard";

interface ClientWorkSectionProps {
  videos: YouTubeVideo[];
}

export function ClientWorkSection({ videos }: ClientWorkSectionProps) {
  const displayVideos = videos.slice(0, 12);

  return (
    <section
      id="my-work"
      className="relative px-6 py-24 overflow-hidden"
      data-ocid="client-work-section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.12 0.04 200 / 0.5) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-50"
            style={{ color: "#00D9FF" }}
          >
            Portfolio
          </p>
          <h2
            className="font-display font-bold uppercase tracking-[0.18em]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "#fff" }}
          >
            Client Work
          </h2>
          {/* Underline accent */}
          <div
            className="mx-auto mt-4 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)",
            }}
          />
        </motion.div>

        {/* Grid or empty state */}
        {displayVideos.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            data-ocid="client-work-empty"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{
                background: "rgba(0,217,255,0.06)",
                border: "1px solid rgba(0,217,255,0.2)",
              }}
            >
              <svg
                className="w-8 h-8 opacity-40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <p className="font-display text-foreground/40 text-base tracking-wide">
              No client work added yet
            </p>
            <p className="font-mono text-xs mt-2 opacity-30 tracking-wider">
              Videos will appear here once added from the admin panel
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <YouTubeCard video={video} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
