import { useRef, useState } from "react";

const PANELS_KEY = "jodex_hero_panels";
const PANEL_COUNT = 6;
const SLOT_KEYS = ["s0", "s1", "s2", "s3", "s4", "s5"] as const;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per user preference

interface PanelEntry {
  src: string;
  type: "image" | "video";
}

function loadPanels(): PanelEntry[] {
  try {
    const raw = localStorage.getItem(PANELS_KEY);
    if (!raw) return Array(PANEL_COUNT).fill({ src: "", type: "image" });
    const parsed = JSON.parse(raw) as (PanelEntry | string)[];
    const result: PanelEntry[] = Array(PANEL_COUNT).fill({
      src: "",
      type: "image" as const,
    });
    for (let i = 0; i < PANEL_COUNT; i++) {
      const entry = parsed[i];
      if (!entry) continue;
      // Handle legacy string-only format
      if (typeof entry === "string") {
        const src = entry;
        const type = detectType(src, "");
        result[i] = { src, type };
      } else {
        result[i] = { src: entry.src ?? "", type: entry.type ?? "image" };
      }
    }
    return result;
  } catch {
    return Array(PANEL_COUNT).fill({ src: "", type: "image" });
  }
}

function savePanels(panels: PanelEntry[]): void {
  localStorage.setItem(PANELS_KEY, JSON.stringify(panels));
}

function detectType(src: string, fileName: string): "image" | "video" {
  if (src.startsWith("data:video")) return "video";
  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(fileName || src)) return "video";
  return "image";
}

function isVideoEntry(entry: PanelEntry): boolean {
  return entry.type === "video" || entry.src.startsWith("data:video");
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("FileReader returned unexpected result type."));
        return;
      }
      resolve(result);
    };
    reader.onerror = () =>
      reject(new Error("FileReader failed to read the file."));
    reader.readAsDataURL(file);
  });
}

interface PanelSlotProps {
  index: number;
  entry: PanelEntry;
  onUpload: (index: number, entry: PanelEntry) => void;
  onClear: (index: number) => void;
}

function PanelSlot({ index, entry, onUpload, onClear }: PanelSlotProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value early so same file can be re-selected after an error
    if (fileRef.current) fileRef.current.value = "";

    const isVid =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|mov|ogg)$/i.test(file.name);
    const isImg =
      file.type.startsWith("image/") ||
      /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(file.name);

    if (!isVid && !isImg) {
      setError("Only image or video files are supported.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 50 MB per panel.`,
      );
      return;
    }

    setError("");
    setUploading(true);

    let dataUrl: string;
    try {
      dataUrl = await fileToDataUrl(file);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Read error: ${err.message}`
          : "Failed to read file. Please try again.",
      );
      setUploading(false);
      return;
    }

    const type = detectType(dataUrl, file.name);

    try {
      onUpload(index, { src: dataUrl, type });
    } catch {
      // savePanels inside onUpload can throw QuotaExceededError
      setError(
        "Upload failed: browser storage quota exceeded. For large videos, try a shorter clip or lower resolution.",
      );
      setUploading(false);
      return;
    }

    setUploading(false);
  };

  const url = entry.src;

  return (
    <div data-ocid={`panel-slot-${index}`}>
      {/* Slot label row */}
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{ color: "rgba(0,217,255,0.55)" }}
        >
          Panel {index + 1}
        </span>
        {url && (
          <button
            type="button"
            onClick={() => onClear(index)}
            aria-label={`Clear panel ${index + 1}`}
            className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded"
            style={{
              color: "rgba(255,100,100,0.7)",
              border: "1px solid rgba(255,100,100,0.2)",
              background: "rgba(255,80,80,0.06)",
            }}
            data-ocid={`panel-clear-${index}`}
          >
            Clear
          </button>
        )}
      </div>

      {/* Upload label / preview */}
      <label
        htmlFor={`panel-file-${index}`}
        style={{
          display: "block",
          borderRadius: "10px",
          overflow: "hidden",
          cursor: uploading ? "wait" : "pointer",
          border: url
            ? "1px solid rgba(0,217,255,0.35)"
            : "1px dashed rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.03)",
          position: "relative",
          aspectRatio: "1 / 1",
        }}
      >
        <input
          ref={fileRef}
          id={`panel-file-${index}`}
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime,video/ogg"
          className="sr-only"
          onChange={handleFileChange}
          disabled={uploading}
          data-ocid={`panel-file-input-${index}`}
        />

        {/* Content */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ minHeight: 90 }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full animate-spin"
                style={{
                  border: "2px solid rgba(0,217,255,0.6)",
                  borderTopColor: "transparent",
                }}
              />
              <span
                className="font-mono text-[9px]"
                style={{ color: "rgba(0,217,255,0.5)" }}
              >
                Loading…
              </span>
            </div>
          ) : url ? (
            isVideoEntry(entry) ? (
              <video
                src={url}
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  inset: 0,
                }}
              />
            ) : (
              <img
                src={url}
                alt={`Panel ${index + 1} preview`}
                className="w-full h-full object-cover"
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  inset: 0,
                }}
              />
            )
          ) : (
            <div className="flex flex-col items-center gap-1.5 py-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 3v9M7 6l3-3 3 3"
                  stroke="rgba(0,217,255,0.35)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1"
                  stroke="rgba(0,217,255,0.22)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className="font-mono text-[9px] tracking-wider"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                Upload
              </span>
            </div>
          )}
        </div>

        {/* Hover overlay on existing media */}
        {url && !uploading && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.55)" }}
          >
            <span
              className="font-mono text-[9px] tracking-wider uppercase"
              style={{ color: "rgba(0,217,255,0.9)" }}
            >
              Replace
            </span>
          </div>
        )}
      </label>

      {error && (
        <p
          className="font-mono text-[9px] mt-1 leading-relaxed"
          style={{ color: "rgba(255,100,100,0.85)" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function AdminHeroPanelManager() {
  const [panels, setPanels] = useState<PanelEntry[]>(loadPanels);

  const handleUpload = (index: number, newEntry: PanelEntry) => {
    setPanels((prev) => {
      const next = [...prev];
      next[index] = newEntry;
      // This may throw QuotaExceededError — caller catches it
      savePanels(next);
      return next;
    });
  };

  const handleClear = (index: number) => {
    setPanels((prev) => {
      const next = [...prev];
      next[index] = { src: "", type: "image" };
      savePanels(next);
      return next;
    });
  };

  const filled = panels.filter((p) => Boolean(p.src)).length;

  return (
    <div data-ocid="admin-hero-panel-manager">
      <div className="flex items-start justify-between mb-4 gap-4">
        <p
          className="font-body text-sm"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Upload an image or short video clip (max 50MB each) for each panel.
          They float as 3D glass cards in the hero section.
        </p>
        <span
          className="font-mono text-[10px] tracking-wider flex-shrink-0"
          style={{ color: "rgba(0,217,255,0.7)" }}
        >
          {filled} / {PANEL_COUNT}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3" data-ocid="hero-panel-grid">
        {panels.map((entry, i) => (
          <PanelSlot
            key={SLOT_KEYS[i]}
            index={i}
            entry={entry}
            onUpload={handleUpload}
            onClear={handleClear}
          />
        ))}
      </div>

      <p
        className="font-mono text-[9px] mt-3"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        Max 50MB per panel (image or video clip) — browser storage limit.
      </p>
    </div>
  );
}
