import { z } from "zod";

export const DarkParchmentBackgroundSchema = z.object({
  // Paper texture styling
  paperStyle: z
    .enum(["charcoal-dossier", "aged-sepia", "black-vellum", "midnight-ink"])
    .default("charcoal-dossier"),
  textureIntensity: z.number().min(0.2).max(1.0).default(0.75),
  fiberDetail: z.number().min(0.2).max(1.0).default(0.65),
  agedEdgesStrength: z.number().min(0.2).max(1.0).default(0.8),

  // Lighting & atmosphere
  lightingMode: z
    .enum(["desk-lamp", "top-left-beam", "ambient-haze"])
    .default("desk-lamp"),
  lightingWarmth: z.number().min(0).max(1.0).default(0.4),
  lightBreathing: z.number().min(0).max(1.0).default(0.5),

  // Archival dust particles
  dustCount: z.number().min(15).max(180).default(60),
  dustSpeed: z.number().min(0.2).max(2.5).default(0.7),
  dustSize: z.number().min(0.5).max(2.5).default(1.0),
  dustGlow: z.number().min(0.2).max(2.0).default(1.1),
  dustBokehBlur: z.number().min(0).max(6).default(2.5),

  // Loop settings (3600 frames = 120s / 2 min at 30fps)
  loopDurationFrames: z.number().min(300).max(7200).default(3600),
  seed: z.number().default(108),
});

export type DarkParchmentBackgroundProps = z.infer<
  typeof DarkParchmentBackgroundSchema
>;

export const defaultDarkParchmentBackgroundProps: DarkParchmentBackgroundProps = {
  paperStyle: "charcoal-dossier",
  textureIntensity: 0.75,
  fiberDetail: 0.65,
  agedEdgesStrength: 0.8,
  lightingMode: "desk-lamp",
  lightingWarmth: 0.4,
  lightBreathing: 0.5,
  dustCount: 60,
  dustSpeed: 0.7,
  dustSize: 1.0,
  dustGlow: 1.1,
  dustBokehBlur: 2.5,
  loopDurationFrames: 3600,
  seed: 108,
};
