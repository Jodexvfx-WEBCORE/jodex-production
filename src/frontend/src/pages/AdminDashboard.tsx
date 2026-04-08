import { AdminHeroPanelManager } from "@/components/AdminHeroPanelManager";
import { Button } from "@/components/Button";
import { GlassCard } from "@/components/GlassCard";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { Certificate } from "@/types/index";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AdminVideoManager from "./AdminVideoManager";

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

function saveCertificates(certs: Certificate[]): void {
  localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}

/* ─── Certificates Manager ─── */
function AdminCertificateManager() {
  const [certs, setCerts] = useState<Certificate[]>(loadCertificates);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImg = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file.name);
    if (!isImg) {
      setError("Only image files are accepted (JPG, PNG, WEBP, etc.).");
      return;
    }
    if (file.size > 4.5 * 1024 * 1024) {
      setError("File too large. Max 4.5 MB per certificate.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const url = await fileToDataUrl(file);
      const newCert: Certificate = {
        id: `cert-${Date.now()}`,
        url,
        filename: file.name,
        uploadedAt: Date.now(),
      };
      const next = [...certs, newCert];
      setCerts(next);
      saveCertificates(next);
    } catch {
      setError("Failed to read file. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = (id: string) => {
    const next = certs.filter((c) => c.id !== id);
    setCerts(next);
    saveCertificates(next);
  };

  return (
    <div data-ocid="admin-certificate-manager">
      <div className="flex items-start justify-between mb-4 gap-4">
        <p
          className="font-body text-sm"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Upload certificate images (max 4.5 MB each). They appear in a grid
          below the hero section.
        </p>
        <span
          className="font-mono text-[10px] tracking-wider flex-shrink-0"
          style={{ color: "rgba(0,217,255,0.7)" }}
        >
          {certs.length} cert{certs.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload certificate image"
        data-ocid="cert-upload-input"
      />

      {/* Add button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-display font-semibold text-xs tracking-[0.12em] uppercase mb-5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,217,255,0.16), rgba(0,180,220,0.08))",
          border: "1px solid rgba(0,217,255,0.4)",
          color: "#00D9FF",
          boxShadow: "0 0 12px rgba(0,217,255,0.15)",
        }}
        onMouseEnter={(e) => {
          if (!uploading)
            e.currentTarget.style.boxShadow = "0 0 24px rgba(0,217,255,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 12px rgba(0,217,255,0.15)";
        }}
        data-ocid="cert-add-btn"
      >
        {uploading ? (
          <>
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0"
              style={{ borderColor: "rgba(0,217,255,0.7)" }}
            />
            Uploading…
          </>
        ) : (
          <>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m-8-8h16"
              />
            </svg>
            Add Certificate
          </>
        )}
      </button>

      {error && (
        <p
          className="font-mono text-[10px] mb-3"
          style={{ color: "rgba(255,100,100,0.85)" }}
        >
          {error}
        </p>
      )}

      {/* Grid */}
      {certs.length === 0 ? (
        <div
          className="rounded-xl p-6 text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
          data-ocid="cert-empty"
        >
          <p className="font-body text-sm opacity-30">
            No certificates uploaded yet.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 gap-3"
          data-ocid="cert-grid"
        >
          {certs.map((cert) => (
            <div key={cert.id} className="relative group aspect-square">
              <img
                src={cert.url}
                alt={cert.filename}
                className="w-full h-full object-cover rounded-lg"
                style={{ border: "1px solid rgba(0,217,255,0.12)" }}
              />
              {/* Delete overlay */}
              <button
                type="button"
                onClick={() => handleDelete(cert.id)}
                aria-label={`Delete certificate ${cert.filename}`}
                className="absolute inset-0 w-full h-full rounded-lg flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(2px)",
                }}
                data-ocid={`cert-delete-${cert.id}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="rgba(255,100,100,0.9)"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className="font-mono text-[9px] tracking-wider"
                  style={{ color: "rgba(255,100,100,0.8)" }}
                >
                  Delete
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Admin Dashboard ─── */
export default function AdminDashboard() {
  const { session, logout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [session.isAuthenticated, navigate]);

  if (!session.isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 py-12 relative">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, rgba(0,217,255,0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,255,0.6) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-1">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm font-mono tracking-wider">
              Jodex Production — Control Panel
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
            data-ocid="admin-logout"
          >
            Logout
          </Button>
        </motion.div>

        {/* Welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6" glow="cyan">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full glass-effect flex items-center justify-center glow-cyan shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">
                  Welcome back, Admin.
                </p>
                <p className="text-muted-foreground text-xs mt-0.5 font-mono">
                  Session active · Jodex Production
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Hero Panel Media Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="mb-8"
        >
          <GlassCard
            className="p-6"
            glow="none"
            data-ocid="admin-card-hero-panels"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Hero 3D Panels
              </h2>
            </div>
            <AdminHeroPanelManager />
          </GlassCard>
        </motion.div>

        {/* Certificates Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.26 }}
          className="mb-8"
        >
          <GlassCard
            className="p-6"
            glow="none"
            data-ocid="admin-card-certificates"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Certificates
              </h2>
            </div>
            <AdminCertificateManager />
          </GlassCard>
        </motion.div>

        {/* Work Showcase — YouTube Video Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.34 }}
          className="mb-8"
        >
          <GlassCard
            className="p-6"
            glow="none"
            data-ocid="admin-card-work-showcase"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="text-primary">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="font-display font-semibold text-base text-foreground">
                Work Showcase
              </h2>
            </div>
            <AdminVideoManager />
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
