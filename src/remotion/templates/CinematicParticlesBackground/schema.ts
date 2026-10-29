import { z } from "zod";

export const CinematicParticlesBackgroundSchema = z.object({
  // Particle counts and physics
  particleCount: z.number().min(20).max(250).default(85),
  speed: z.number().min(0.2).max(3.0).default(0.8),
  particleSize: z.number().min(0.5).max(3.0).default(1.0),
  particleGlow: z.number().min(0.1).max(2.5).default(1.0),
  bokehBlur: z.number().min(0).max(10).default(3.5),
  direction: z.enum(["up", "down", "float-ambient"]).default("up"),

  // Background atmosphere and depth
  tintStyle: z
    .enum([
      "deep-obsidian",
      "midnight-blue",
      "warm-charcoal",
      "emerald-void",
      "pure-minimal",
    ])
    .default("deep-obsidian"),
  customCenterGlow: z.string().optional(),
  vignetteStrength: z.number().min(0.2).max(1.0).default(0.75),
  grainIntensity: z.number().min(0).max(0.4).default(0.14),
  ambientPulseIntensity: z.number().min(0).max(1.0).default(0.6),

  // Loop duration in frames (3600 frames = 120s / 2 min at 30fps)
  loopDurationFrames: z.number().min(300).max(7200).default(3600),
  seed: z.number().default(42),
});

export type CinematicParticlesBackgroundProps = z.infer<
  typeof CinematicParticlesBackgroundSchema
>;

export const defaultCinematicParticlesBackgroundProps: CinematicParticlesBackgroundProps = {
  particleCount: 85,
  speed: 0.8,
  particleSize: 1.0,
  particleGlow: 1.0,
  bokehBlur: 3.5,
  direction: "up",
  tintStyle: "deep-obsidian",
  vignetteStrength: 0.75,
  grainIntensity: 0.14,
  ambientPulseIntensity: 0.6,
  loopDurationFrames: 3600, // 2 minutes at 30fps
  seed: 42,
};
