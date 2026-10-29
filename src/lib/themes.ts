import { ColorTheme } from "./types";

export const THEMES: ColorTheme[] = [
  {
    id: "cinematic-gold",
    name: "Cinematic Gold & Dark",
    description: "Prestigious documentary style with warm amber and brass accents",
    primary: "#f59e0b",
    secondary: "#d97706",
    cardBg: "rgba(15, 23, 42, 0.88)",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    accentGlow: "rgba(245, 158, 11, 0.35)",
  },
  {
    id: "investigative-noir",
    name: "Investigative Red / Noir",
    description: "Cold-case, classified archive with high-contrast crimson",
    primary: "#ef4444",
    secondary: "#991b1b",
    cardBg: "rgba(17, 24, 39, 0.92)",
    textPrimary: "#ffffff",
    textSecondary: "#9ca3af",
    accentGlow: "rgba(239, 68, 68, 0.4)",
  },
  {
    id: "vintage-sepia",
    name: "Vintage Sepia / Archive",
    description: "Historical archival feel, parchment gold and warm umber",
    primary: "#d4a373",
    secondary: "#a9714b",
    cardBg: "rgba(41, 37, 36, 0.90)",
    textPrimary: "#faedcd",
    textSecondary: "#d5c7b8",
    accentGlow: "rgba(212, 163, 115, 0.3)",
  },
  {
    id: "modern-blue",
    name: "Minimalist Modern Blue",
    description: "Vox / Johnny Harris clean geopolitical & science aesthetic",
    primary: "#38bdf8",
    secondary: "#0284c7",
    cardBg: "rgba(15, 23, 42, 0.85)",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
    accentGlow: "rgba(56, 189, 248, 0.35)",
  },
  {
    id: "emerald-intel",
    name: "Emerald Intel / Matrix",
    description: "Technical intelligence, radar, and cybersecurity data overlay",
    primary: "#10b981",
    secondary: "#059669",
    cardBg: "rgba(6, 30, 20, 0.90)",
    textPrimary: "#ecfdf5",
    textSecondary: "#6ee7b7",
    accentGlow: "rgba(16, 185, 129, 0.35)",
  },
];

export const getThemeById = (id: string): ColorTheme => {
  return THEMES.find((t) => t.id === id) || THEMES[0];
};
