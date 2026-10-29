import { z } from "zod";

export type VoidPresetType = "pitch-black" | "minimal-glow" | "stardust-depth";

export const MinimalVoidParticlesSchema = z.object({
  // Preset selector: "pitch-black" (V1) | "minimal-glow" (V2) | "stardust-depth" (V3)
  preset: z.enum(["pitch-black", "minimal-glow", "stardust-depth"]).default("pitch-black"),

  // Background Settings
  colorTone: z
    .enum(["pure-black", "cold-obsidian", "warm-carbon", "deep-navy"])
    .default("pure-black"),
  centerGlowIntensity: z.number().min(0).max(0.15).default(0.0), // 0 = 100% flat pitch black
  glowRadius: z.number().min(30).max(100).default(60), // % of screen

  // Foreground/Midground White Particles
  particleCount: z.number().min(15).max(250).default(80),
  speed: z.number().min(0.2).max(2.5).default(0.7),
  particleSize: z.number().min(0.5).max(3.0).default(1.0),
  particleGlow: z.number().min(0).max(2.5).default(1.2),
  bokehBlur: z.number().min(0).max(8).default(2.5),
  direction: z.enum(["up", "down", "float-ambient"]).default("up"),

  // Version 3 Special: Star Dust (Micro-drobiny w tle dające głębię bez żadnego gradientu)
  showStarDust: z.boolean().default(false),
  starDustCount: z.number().min(50).max(400).default(200),
  starDustOpacity: z.number().min(0.1).max(0.8).default(0.35),

  // Loop settings (3600 frames = 120s / 2 min at 30fps)
  loopDurationFrames: z.number().min(300).max(7200).default(3600),
  seed: z.number().default(42),
});

export type MinimalVoidParticlesProps = z.infer<
  typeof MinimalVoidParticlesSchema
>;

// Wersja 1: Czysta Płaska Czerń (Zero Banding - 100% #000000)
export const presetPitchBlack: MinimalVoidParticlesProps = {
  preset: "pitch-black",
  colorTone: "pure-black",
  centerGlowIntensity: 0.0, // Absolutne zero gradientu = fizycznie niemożliwy banding
  glowRadius: 60,
  particleCount: 75,
  speed: 0.7,
  particleSize: 1.0,
  particleGlow: 1.2,
  bokehBlur: 2.5,
  direction: "up",
  showStarDust: false,
  starDustCount: 200,
  starDustOpacity: 0.35,
  loopDurationFrames: 3600,
  seed: 42,
};

// Wersja 2: Subtelny Antracyt (Ultra-Minimal Glow, szeroki i płaski)
export const presetMinimalGlow: MinimalVoidParticlesProps = {
  preset: "minimal-glow",
  colorTone: "cold-obsidian",
  centerGlowIntensity: 0.035, // Delikatna, rozproszona mgiełka (zaledwie ~3.5%)
  glowRadius: 85,
  particleCount: 85,
  speed: 0.65,
  particleSize: 0.95,
  particleGlow: 1.0,
  bokehBlur: 2.0,
  direction: "up",
  showStarDust: false,
  starDustCount: 200,
  starDustOpacity: 0.35,
  loopDurationFrames: 3600,
  seed: 88,
};

// Wersja 3: Gwiezdny Pył 3D (Dual-Layer Dust - Głębia z mikro-cząsteczek, tło 100% czarne #000000)
export const presetStarDust: MinimalVoidParticlesProps = {
  preset: "stardust-depth",
  colorTone: "pure-black",
  centerGlowIntensity: 0.0, // 100% czarne tło (zero gradientu!)
  glowRadius: 60,
  particleCount: 65,
  speed: 0.7,
  particleSize: 1.1,
  particleGlow: 1.3,
  bokehBlur: 3.0,
  direction: "up",
  showStarDust: true, // Włącza drugą głęboką warstwę 200 mikro-drobin
  starDustCount: 220,
  starDustOpacity: 0.4,
  loopDurationFrames: 3600,
  seed: 123,
};

export const defaultMinimalVoidParticlesProps: MinimalVoidParticlesProps = presetPitchBlack;
