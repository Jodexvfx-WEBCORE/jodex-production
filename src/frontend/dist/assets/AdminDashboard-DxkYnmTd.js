import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-HTiSLxfL.js";
import { u as useAdminAuth, B as Button, G as GlassCard } from "./useAdminAuth-CEdf4wzp.js";
import { l as motion } from "./proxy-DSs8VgC6.js";
const PANELS_KEY = "jodex_hero_panels";
const PANEL_COUNT = 6;
const SLOT_KEYS = ["s0", "s1", "s2", "s3", "s4", "s5"];
const MAX_FILE_SIZE = 50 * 1024 * 1024;
function loadPanels() {
  try {
    const raw = localStorage.getItem(PANELS_KEY);
    if (!raw) return Array(PANEL_COUNT).fill({ src: "", type: "image" });
    const parsed = JSON.parse(raw);
    const result = Array(PANEL_COUNT).fill({
      src: "",
      type: "image"
    });
    for (let i = 0; i < PANEL_COUNT; i++) {
      const entry = parsed[i];
      if (!entry) continue;
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
function savePanels(panels) {
  localStorage.setItem(PANELS_KEY, JSON.stringify(panels));
}
function detectType(src, fileName) {
  if (src.startsWith("data:video")) return "video";
  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(fileName || src)) return "video";
  return "image";
}
function isVideoEntry(entry) {
  return entry.type === "video" || entry.src.startsWith("data:video");
}
function fileToDataUrl$1(file) {
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
    reader.onerror = () => reject(new Error("FileReader failed to read the file."));
    reader.readAsDataURL(file);
  });
}
function PanelSlot({ index, entry, onUpload, onClear }) {
  const [uploading, setUploading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  const handleFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (fileRef.current) fileRef.current.value = "";
    const isVid = file.type.startsWith("video/") || /\.(mp4|webm|mov|ogg)$/i.test(file.name);
    const isImg = file.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(file.name);
    if (!isVid && !isImg) {
      setError("Only image or video files are supported.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 50 MB per panel.`
      );
      return;
    }
    setError("");
    setUploading(true);
    let dataUrl;
    try {
      dataUrl = await fileToDataUrl$1(file);
    } catch (err) {
      setError(
        err instanceof Error ? `Read error: ${err.message}` : "Failed to read file. Please try again."
      );
      setUploading(false);
      return;
    }
    const type = detectType(dataUrl, file.name);
    try {
      onUpload(index, { src: dataUrl, type });
    } catch {
      setError(
        "Upload failed: browser storage quota exceeded. For large videos, try a shorter clip or lower resolution."
      );
      setUploading(false);
      return;
    }
    setUploading(false);
  };
  const url = entry.src;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `panel-slot-${index}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono text-[10px] tracking-widest uppercase",
          style: { color: "rgba(0,217,255,0.55)" },
          children: [
            "Panel ",
            index + 1
          ]
        }
      ),
      url && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onClear(index),
          "aria-label": `Clear panel ${index + 1}`,
          className: "font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded",
          style: {
            color: "rgba(255,100,100,0.7)",
            border: "1px solid rgba(255,100,100,0.2)",
            background: "rgba(255,80,80,0.06)"
          },
          "data-ocid": `panel-clear-${index}`,
          children: "Clear"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: `panel-file-${index}`,
        style: {
          display: "block",
          borderRadius: "10px",
          overflow: "hidden",
          cursor: uploading ? "wait" : "pointer",
          border: url ? "1px solid rgba(0,217,255,0.35)" : "1px dashed rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.03)",
          position: "relative",
          aspectRatio: "1 / 1"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              id: `panel-file-${index}`,
              type: "file",
              accept: "image/*,video/mp4,video/webm,video/quicktime,video/ogg",
              className: "sr-only",
              onChange: handleFileChange,
              disabled: uploading,
              "data-ocid": `panel-file-input-${index}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full flex items-center justify-center",
              style: { minHeight: 90 },
              children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-5 h-5 rounded-full animate-spin",
                    style: {
                      border: "2px solid rgba(0,217,255,0.6)",
                      borderTopColor: "transparent"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px]",
                    style: { color: "rgba(0,217,255,0.5)" },
                    children: "Loading…"
                  }
                )
              ] }) : url ? isVideoEntry(entry) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "video",
                {
                  src: url,
                  muted: true,
                  playsInline: true,
                  className: "w-full h-full object-cover",
                  style: {
                    pointerEvents: "none",
                    position: "absolute",
                    inset: 0
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: url,
                  alt: `Panel ${index + 1} preview`,
                  className: "w-full h-full object-cover",
                  style: {
                    pointerEvents: "none",
                    position: "absolute",
                    inset: 0
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M10 3v9M7 6l3-3 3 3",
                          stroke: "rgba(0,217,255,0.35)",
                          strokeWidth: "1.4",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1",
                          stroke: "rgba(0,217,255,0.22)",
                          strokeWidth: "1.4",
                          strokeLinecap: "round"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px] tracking-wider",
                    style: { color: "rgba(255,255,255,0.22)" },
                    children: "Upload"
                  }
                )
              ] })
            }
          ),
          url && !uploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200",
              style: { background: "rgba(0,0,0,0.55)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-[9px] tracking-wider uppercase",
                  style: { color: "rgba(0,217,255,0.9)" },
                  children: "Replace"
                }
              )
            }
          )
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-mono text-[9px] mt-1 leading-relaxed",
        style: { color: "rgba(255,100,100,0.85)" },
        role: "alert",
        children: error
      }
    )
  ] });
}
function AdminHeroPanelManager() {
  const [panels, setPanels] = reactExports.useState(loadPanels);
  const handleUpload = (index, newEntry) => {
    setPanels((prev) => {
      const next = [...prev];
      next[index] = newEntry;
      savePanels(next);
      return next;
    });
  };
  const handleClear = (index) => {
    setPanels((prev) => {
      const next = [...prev];
      next[index] = { src: "", type: "image" };
      savePanels(next);
      return next;
    });
  };
  const filled = panels.filter((p) => Boolean(p.src)).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin-hero-panel-manager", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-body text-sm",
          style: { color: "rgba(255,255,255,0.45)" },
          children: "Upload an image or short video clip (max 50MB each) for each panel. They float as 3D glass cards in the hero section."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono text-[10px] tracking-wider flex-shrink-0",
          style: { color: "rgba(0,217,255,0.7)" },
          children: [
            filled,
            " / ",
            PANEL_COUNT
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", "data-ocid": "hero-panel-grid", children: panels.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PanelSlot,
      {
        index: i,
        entry,
        onUpload: handleUpload,
        onClear: handleClear
      },
      SLOT_KEYS[i]
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-mono text-[9px] mt-3",
        style: { color: "rgba(255,255,255,0.2)" },
        children: "Max 50MB per panel (image or video clip) — browser storage limit."
      }
    )
  ] });
}
const STORAGE_KEY = "jodex_yt_videos";
const MAX_VIDEOS = 12;
function loadVideos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveVideos(videos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}
function isValidYouTubeUrl(url) {
  return url.includes("youtube.com/watch") || url.includes("youtu.be/") || url.includes("youtube.com/embed/");
}
function AdminVideoManager() {
  const [videos, setVideos] = reactExports.useState(loadVideos);
  const [urlInput, setUrlInput] = reactExports.useState("");
  const [titleInput, setTitleInput] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const urlRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    saveVideos(videos);
  }, [videos]);
  const handleAdd = () => {
    var _a;
    setError("");
    const url = urlInput.trim();
    const title = titleInput.trim();
    if (!url) {
      setError("Please enter a YouTube URL.");
      return;
    }
    if (!isValidYouTubeUrl(url)) {
      setError(
        "URL must be a valid YouTube link (youtube.com/watch or youtu.be)."
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
    const newVideo = {
      id: Date.now(),
      url,
      title,
      addedAt: Date.now()
    };
    setVideos((prev) => [...prev, newVideo]);
    setUrlInput("");
    setTitleInput("");
    (_a = urlRef.current) == null ? void 0 : _a.focus();
  };
  const handleDelete = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(0,217,255,0.22)",
    color: "#f0f0f0",
    borderRadius: "0.6rem",
    padding: "0.6rem 0.9rem",
    fontSize: "0.85rem",
    fontFamily: "inherit",
    width: "100%",
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin-video-manager", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-5",
        style: {
          background: "rgba(0,217,255,0.04)",
          border: "1px solid rgba(0,217,255,0.2)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display font-semibold text-sm tracking-[0.14em] uppercase mb-4",
              style: { color: "#00D9FF" },
              children: "Add YouTube Video"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "yt-url",
                  className: "block font-mono text-[10px] tracking-widest uppercase mb-1.5 opacity-50",
                  children: "YouTube URL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: urlRef,
                  id: "yt-url",
                  type: "url",
                  value: urlInput,
                  onChange: (e) => setUrlInput(e.target.value),
                  placeholder: "https://youtube.com/watch?v=...",
                  style: inputStyle,
                  onFocus: (e) => {
                    e.currentTarget.style.borderColor = "rgba(0,217,255,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 14px rgba(0,217,255,0.18)";
                  },
                  onBlur: (e) => {
                    e.currentTarget.style.borderColor = "rgba(0,217,255,0.22)";
                    e.currentTarget.style.boxShadow = "none";
                  },
                  "data-ocid": "yt-url-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "yt-title",
                  className: "block font-mono text-[10px] tracking-widest uppercase mb-1.5 opacity-50",
                  children: "Video Title"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "yt-title",
                  type: "text",
                  value: titleInput,
                  onChange: (e) => setTitleInput(e.target.value),
                  placeholder: "e.g. 3D Product Visualization",
                  style: inputStyle,
                  onFocus: (e) => {
                    e.currentTarget.style.borderColor = "rgba(0,217,255,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 14px rgba(0,217,255,0.18)";
                  },
                  onBlur: (e) => {
                    e.currentTarget.style.borderColor = "rgba(0,217,255,0.22)";
                    e.currentTarget.style.boxShadow = "none";
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleAdd();
                  },
                  "data-ocid": "yt-title-input"
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs font-mono",
                style: { color: "rgba(255,100,100,0.9)" },
                children: error
              }
            ),
            videos.length >= MAX_VIDEOS && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xs font-mono",
                style: { color: "rgba(255,165,0,0.85)" },
                children: [
                  "⚠ Maximum of ",
                  MAX_VIDEOS,
                  " videos reached. Remove one to add more."
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleAdd,
                disabled: videos.length >= MAX_VIDEOS,
                className: "mt-1 px-5 py-2.5 rounded-lg font-display font-semibold text-sm tracking-[0.12em] uppercase disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200",
                style: {
                  background: "linear-gradient(135deg, rgba(0,217,255,0.22), rgba(0,180,220,0.12))",
                  border: "1px solid rgba(0,217,255,0.5)",
                  color: "#00D9FF",
                  boxShadow: "0 0 16px rgba(0,217,255,0.2)"
                },
                onMouseEnter: (e) => {
                  if (videos.length < MAX_VIDEOS) {
                    e.currentTarget.style.boxShadow = "0 0 28px rgba(0,217,255,0.45)";
                  }
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(0,217,255,0.2)";
                },
                "data-ocid": "yt-add-btn",
                children: "+ Add Video"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-[10px] tracking-widest uppercase opacity-50", children: "Added Videos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "font-mono text-[10px] tracking-wider",
            style: { color: "rgba(0,217,255,0.7)" },
            children: [
              videos.length,
              " / ",
              MAX_VIDEOS
            ]
          }
        )
      ] }),
      videos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-xl p-6 text-center",
          style: {
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.1)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm opacity-30", children: "No videos added yet. Add your first video above." })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "yt-video-list", children: videos.map((video) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 rounded-lg px-4 py-3 group",
          style: {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "border-color 0.2s ease"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "rgba(0,217,255,0.22)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-8 h-8 rounded-md flex-shrink-0 flex items-center justify-center",
                style: { background: "rgba(255,0,0,0.15)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "rgba(255,80,80,0.9)",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground/85 truncate", children: video.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] truncate mt-0.5 opacity-35", children: video.url })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => handleDelete(video.id),
                "aria-label": `Remove ${video.title}`,
                className: "flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity duration-200",
                style: {
                  background: "rgba(255,80,80,0.12)",
                  border: "1px solid rgba(255,80,80,0.2)",
                  color: "rgba(255,100,100,0.9)"
                },
                "data-ocid": "yt-delete-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    className: "w-3.5 h-3.5",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.8",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                )
              }
            )
          ]
        },
        video.id
      )) })
    ] })
  ] });
}
const CERTS_KEY = "jodex_certificates";
function loadCertificates() {
  try {
    const raw = localStorage.getItem(CERTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveCertificates(certs) {
  localStorage.setItem(CERTS_KEY, JSON.stringify(certs));
}
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });
}
function AdminCertificateManager() {
  const [certs, setCerts] = reactExports.useState(loadCertificates);
  const [uploading, setUploading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const handleFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
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
      const newCert = {
        id: `cert-${Date.now()}`,
        url,
        filename: file.name,
        uploadedAt: Date.now()
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
  const handleDelete = (id) => {
    const next = certs.filter((c) => c.id !== id);
    setCerts(next);
    saveCertificates(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "admin-certificate-manager", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-body text-sm",
          style: { color: "rgba(255,255,255,0.45)" },
          children: "Upload certificate images (max 4.5 MB each). They appear in a grid below the hero section."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono text-[10px] tracking-wider flex-shrink-0",
          style: { color: "rgba(0,217,255,0.7)" },
          children: [
            certs.length,
            " cert",
            certs.length !== 1 ? "s" : ""
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFileChange,
        "aria-label": "Upload certificate image",
        "data-ocid": "cert-upload-input"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        disabled: uploading,
        className: "flex items-center gap-2 px-4 py-2.5 rounded-lg font-display font-semibold text-xs tracking-[0.12em] uppercase mb-5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
        style: {
          background: "linear-gradient(135deg, rgba(0,217,255,0.16), rgba(0,180,220,0.08))",
          border: "1px solid rgba(0,217,255,0.4)",
          color: "#00D9FF",
          boxShadow: "0 0 12px rgba(0,217,255,0.15)"
        },
        onMouseEnter: (e) => {
          if (!uploading)
            e.currentTarget.style.boxShadow = "0 0 24px rgba(0,217,255,0.35)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.boxShadow = "0 0 12px rgba(0,217,255,0.15)";
        },
        "data-ocid": "cert-add-btn",
        children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0",
              style: { borderColor: "rgba(0,217,255,0.7)" }
            }
          ),
          "Uploading…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M12 4v16m-8-8h16"
                }
              )
            }
          ),
          "Add Certificate"
        ] })
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-mono text-[10px] mb-3",
        style: { color: "rgba(255,100,100,0.85)" },
        children: error
      }
    ),
    certs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl p-6 text-center",
        style: {
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.1)"
        },
        "data-ocid": "cert-empty",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm opacity-30", children: "No certificates uploaded yet." })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-3 sm:grid-cols-4 gap-3",
        "data-ocid": "cert-grid",
        children: certs.map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group aspect-square", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: cert.url,
              alt: cert.filename,
              className: "w-full h-full object-cover rounded-lg",
              style: { border: "1px solid rgba(0,217,255,0.12)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleDelete(cert.id),
              "aria-label": `Delete certificate ${cert.filename}`,
              className: "absolute inset-0 w-full h-full rounded-lg flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              style: {
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(2px)"
              },
              "data-ocid": `cert-delete-${cert.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    width: "18",
                    height: "18",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    stroke: "rgba(255,100,100,0.9)",
                    strokeWidth: "1.8",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-[9px] tracking-wider",
                    style: { color: "rgba(255,100,100,0.8)" },
                    children: "Delete"
                  }
                )
              ]
            }
          )
        ] }, cert.id))
      }
    )
  ] });
}
function AdminDashboard() {
  const { session, logout } = useAdminAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!session.isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [session.isAuthenticated, navigate]);
  if (!session.isAuthenticated) return null;
  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] px-6 py-12 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-5",
          style: {
            background: "radial-gradient(circle, rgba(0,217,255,0.6) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-5",
          style: {
            background: "radial-gradient(circle, rgba(255,0,255,0.6) 0%, transparent 70%)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "flex items-center justify-between mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-1", children: "Admin Dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-mono tracking-wider", children: "Jodex Production — Control Panel" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "secondary",
                onClick: handleLogout,
                "data-ocid": "admin-logout",
                children: "Logout"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.1 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-6", glow: "cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full glass-effect flex items-center justify-center glow-cyan shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: "w-5 h-5 text-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Welcome back, Admin." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5 font-mono", children: "Session active · Jodex Production" })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.18 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "p-6",
              glow: "none",
              "data-ocid": "admin-card-hero-panels",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 1.5,
                          d: "M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Hero 3D Panels" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AdminHeroPanelManager, {})
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.26 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "p-6",
              glow: "none",
              "data-ocid": "admin-card-certificates",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 1.5,
                          d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Certificates" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AdminCertificateManager, {})
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.34 },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: "p-6",
              glow: "none",
              "data-ocid": "admin-card-work-showcase",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 1.5,
                          d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        }
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Work Showcase" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AdminVideoManager, {})
              ]
            }
          )
        }
      )
    ] })
  ] });
}
export {
  AdminDashboard as default
};
