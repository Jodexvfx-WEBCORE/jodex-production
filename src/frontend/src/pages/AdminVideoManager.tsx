import type { YouTubeVideo } from "@/types/index";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "jodex_yt_videos";
const MAX_VIDEOS = 12;

function loadVideos(): YouTubeVideo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as YouTubeVideo[];
  } catch {
    return [];
  }
}

function saveVideos(videos: YouTubeVideo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}

function isValidYouTubeUrl(url: string): boolean {
  return (
    url.includes("youtube.com/watch") ||
    url.includes("youtu.be/") ||
    url.includes("youtube.com/embed/")
  );
}

export default function AdminVideoManager() {
  const [videos, setVideos] = useState<YouTubeVideo[]>(loadVideos);
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [error, setError] = useState("");
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveVideos(videos);
  }, [videos]);

  const handleAdd = () => {
    setError("");
    const url = urlInput.trim();
    const title = titleInput.trim();

    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }
    if (!isValidYouTubeUrl(url)) {
      setError(
        "URL must be a valid YouTube link (youtube.com/watch or youtu.be).",
      );
      return;
    }
    if (!title) {
      setError("Please enter a video title.");
      return;
    }
    if (videos.length >= MAX_VIDEOS) {
      setError(`Maximum of ${MAX_VIDEOS} videos reached.`);
      return;
    }

    const newVideo: YouTubeVideo = {
      id: Date.now(),
      url,
      title,
      addedAt: Date.now(),
    };

    setVideos((prev) => [...prev, newVideo]);
    setUrlInput("");
    setTitleInput("");
    urlRef.current?.focus();
  };

  const handleDelete = (id: number) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(0,217,255,0.22)",
    color: "#f0f0f0",
    borderRadius: "0.6rem",
    padding: "0.6rem 0.9rem",
    fontSize: "0.85rem",
    fontFamily: "inherit",
    width: "100%",
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <div className="space-y-6" data-ocid="admin-video-manager">
      {/* Add Video Form */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "rgba(0,217,255,0.04)",
          border: "1px solid rgba(0,217,255,0.2)",
        }}
      >
        <h3
          className="font-display font-semibold text-sm tracking-[0.14em] uppercase mb-4"
          style={{ color: "#00D9FF" }}
        >
          Add YouTube Video
        </h3>

        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="yt-url"
              className="block font-mono text-[10px] tracking-widest uppercase mb-1.5 opacity-50"
            >
              YouTube URL
            </label>
            <input
              ref={urlRef}
              id="yt-url"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(0,217,255,0.18)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.22)";
                e.currentTarget.style.boxShadow = "none";
              }}
              data-ocid="yt-url-input"
            />
          </div>

          <div>
            <label
              htmlFor="yt-title"
              className="block font-mono text-[10px] tracking-widest uppercase mb-1.5 opacity-50"
            >
              Video Title
            </label>
            <input
              id="yt-title"
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="e.g. 3D Product Visualization"
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.6)";
                e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(0,217,255,0.18)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,217,255,0.22)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
              data-ocid="yt-title-input"
            />
          </div>

          {error && (
            <p
              className="text-xs font-mono"
              style={{ color: "rgba(255,100,100,0.9)" }}
            >
              {error}
            </p>
          )}

          {videos.length >= MAX_VIDEOS && (
            <p
              className="text-xs font-mono"
              style={{ color: "rgba(255,165,0,0.85)" }}
            >
              ⚠ Maximum of {MAX_VIDEOS} videos reached. Remove one to add more.
            </p>
          )}

          <button
            type="button"
            onClick={handleAdd}
            disabled={videos.length >= MAX_VIDEOS}
            className="mt-1 px-5 py-2.5 rounded-lg font-display font-semibold text-sm tracking-[0.12em] uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,217,255,0.22), rgba(0,180,220,0.12))",
              border: "1px solid rgba(0,217,255,0.5)",
              color: "#00D9FF",
              boxShadow: "0 0 16px rgba(0,217,255,0.2)",
            }}
            onMouseEnter={(e) => {
              if (videos.length < MAX_VIDEOS) {
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(0,217,255,0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 16px rgba(0,217,255,0.2)";
            }}
            data-ocid="yt-add-btn"
          >
            + Add Video
          </button>
        </div>
      </div>

      {/* Video List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-mono text-[10px] tracking-widest uppercase opacity-50">
            Added Videos
          </h3>
          <span
            className="font-mono text-[10px] tracking-wider"
            style={{ color: "rgba(0,217,255,0.7)" }}
          >
            {videos.length} / {MAX_VIDEOS}
          </span>
        </div>

        {videos.length === 0 ? (
          <div
            className="rounded-xl p-6 text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <p className="font-body text-sm opacity-30">
              No videos added yet. Add your first video above.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2" data-ocid="yt-video-list">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-center gap-3 rounded-lg px-4 py-3 group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,217,255,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {/* YT icon */}
                <div
                  className="w-8 h-8 rounded-md flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(255,0,0,0.15)" }}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="rgba(255,80,80,0.9)"
                    aria-hidden="true"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground/85 truncate">
                    {video.title}
                  </p>
                  <p className="font-mono text-[10px] truncate mt-0.5 opacity-35">
                    {video.url}
                  </p>
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(video.id)}
                  aria-label={`Remove ${video.title}`}
                  className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: "rgba(255,80,80,0.12)",
                    border: "1px solid rgba(255,80,80,0.2)",
                    color: "rgba(255,100,100,0.9)",
                  }}
                  data-ocid="yt-delete-btn"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
