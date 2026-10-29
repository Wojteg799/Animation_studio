export type AspectRatioType = "16:9" | "9:16" | "4K";

export interface ResolutionConfig {
  width: number;
  height: number;
  label: string;
  badge: string;
}

export const RESOLUTIONS: Record<AspectRatioType, ResolutionConfig> = {
  "16:9": {
    width: 1920,
    height: 1080,
    label: "Full HD (16:9)",
    badge: "1080p",
  },
  "4K": {
    width: 3840,
    height: 2160,
    label: "Ultra HD (4K 16:9)",
    badge: "4K UHD",
  },
  "9:16": {
    width: 1080,
    height: 1920,
    label: "Vertical Shorts / Reels (9:16)",
    badge: "Shorts",
  },
};

export type RenderFormat = "prores4444" | "webm" | "mp4";

export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  primary: string;
  secondary: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accentGlow: string;
}

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

export interface RenderJobStatus {
  id: string;
  status: "idle" | "bundling" | "rendering" | "encoding" | "completed" | "failed";
  progress: number; // 0 to 1
  renderedFrames: number;
  totalFrames: number;
  format: RenderFormat;
  resolution: AspectRatioType;
  fps: number;
  error?: string;
  downloadUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
  startedAt?: number;
  completedAt?: number;
}
