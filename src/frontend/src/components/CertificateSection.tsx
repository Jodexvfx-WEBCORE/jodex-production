import type { Certificate } from "@/types/index";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CERTS_KEY = "jodex_certificates";

function loadCertificates(): Certificate[] {
  try {
    const raw = localStorage.getItem(CERTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Certificate[];
  } catch {
    return [];
  }
}

interface LightboxProps {
  url: string;
  onClose: () => void;
}

function Lightbox({ url, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.88)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-ocid="cert-lightbox"
      >
        <motion.div
          className="relative max-w-4xl max-h-[90vh] w-full"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={url}
            alt="Certificate full view"
            className="w-full h-full object-contain rounded-xl"
            style={{
              maxHeight: "85vh",
              boxShadow:
                "0 0 60px rgba(0,0,0,0.8), 0 0 20px rgba(0,217,255,0.1)",
            }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate"
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-smooth"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,217,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.6)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            data-ocid="cert-lightbox-close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function CertificateSection() {
  const certificates = loadCertificates();
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  return (
    <>
      <section
        className="relative px-6 py-20 overflow-hidden"
        data-ocid="certificate-section"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.13 0.04 200 / 0.45) 0%, transparent 65%)",
          }}
        />
        {/* Top divider line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,217,255,0.35), transparent)",
          }}
        />

        <div className="max-w-5xl mx-auto">
          {/* Section heading */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-mono text-xs tracking-[0.3em] uppercase mb-3 opacity-50"
              style={{ color: "#00D9FF" }}
            >
              Credentials
            </p>
            <h2
              className="font-display font-bold uppercase tracking-[0.18em]"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                color: "#fff",
              }}
            >
              Certificates
            </h2>
            <div
              className="mx-auto mt-4 h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)",
              }}
            />
          </motion.div>

          {/* Grid or empty state */}
          {certificates.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              data-ocid="cert-empty-state"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: "rgba(0,217,255,0.05)",
                  border: "1px solid rgba(0,217,255,0.15)",
                }}
              >
                <svg
                  className="w-7 h-7 opacity-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <p className="font-display text-foreground/35 text-sm tracking-wide">
                No certificates yet
              </p>
              <p className="font-mono text-[11px] mt-1.5 opacity-25 tracking-wider">
                Certificates will appear here once added from the admin panel
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {certificates.map((cert, index) => (
                <motion.button
                  key={cert.id}
                  type="button"
                  onClick={() => setLightboxUrl(cert.url)}
                  aria-label={`View certificate ${index + 1}`}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer text-left"
                  style={{
                    background: "rgba(10,14,18,0.55)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(0,217,255,0.1)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.04 }}
                  data-ocid={`cert-card-${index}`}
                >
                  <img
                    src={cert.url}
                    alt={`Certificate ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(0,217,255,0.9)"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                  {/* Glass sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%)",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxUrl && (
        <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />
      )}
    </>
  );
}
