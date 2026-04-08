export interface AdminSession {
  token: string;
  isAuthenticated: boolean;
}

export interface YouTubeVideo {
  id: number;
  url: string;
  title: string;
  addedAt: number;
}

export interface HeroPanel {
  index: number; // 0-5
  url: string; // direct URL from object-storage (image or video)
  type: "image" | "video";
  filename: string;
}

export interface Certificate {
  id: string;
  url: string;
  filename: string;
  uploadedAt: number;
}

export interface OEmbedData {
  title: string;
  author_name: string;
  author_url: string;
  thumbnail_url: string;
  html: string;
}
