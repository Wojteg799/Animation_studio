import { z } from "zod";

export const JoyDivisionCassetteMorphSchema = z.object({
  // Initial layout of the 25 cassettes before morph
  initialLayout: z
    .enum(["grid-5x5", "vertical-stack", "staggered-cluster"])
    .default("grid-5x5"),

  // Card Dealing Intro Animation ("Rozdawanie rządków kaset jak kart")
  enableDealIntro: z.boolean().default(true),
  dealStartFrame: z.number().min(0).max(3600).default(4),
  dealRowStagger: z.number().min(1).max(60).default(6),
  dealRowDuration: z.number().min(4).max(180).default(14),
  dealDirection: z
    .enum(["from-top", "from-bottom", "scale-snap", "diagonal-deck"])
    .default("from-top"),

  // Cassette Sizing & Grid Spacing (delikatne powiększenie i mniejszy spacing bez wychodzenia poza ekran)
  cassetteScale: z.number().min(0.5).max(3.0).default(1.15),
  gridSpacingX: z.number().min(60).max(400).default(180),
  gridSpacingY: z.number().min(40).max(300).default(115),

  // Morph timing & speed (when alignment into rows begins)
  alignStartFrame: z.number().min(0).max(3600).default(50),
  alignDuration: z.number().min(5).max(1800).default(38),

  flattenStartFrame: z.number().min(0).max(3600).default(88),
  flattenDuration: z.number().min(5).max(1800).default(45),

  mountainStartFrame: z.number().min(0).max(3600).default(133),
  mountainDuration: z.number().min(5).max(1800).default(52),

  morphStartFrame: z.number().min(0).max(3600).default(50),
  morphDurationFrames: z.number().min(10).max(3600).default(70),

  // Sposób ułożenia w rzędzie:
  // "natural-stack": Kasety zachowują 100% naturalne proporcje bez deformacji podczas układania w rzędzie
  // "adaptive-rows": Kasety wstępnie zwężają się w pionie już podczas zjazdu do rzędów
  alignStyle: z.enum(["natural-stack", "adaptive-rows"]).default("natural-stack"),

  // Visual styling
  transparentBackground: z.boolean().default(true),
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().min(1).max(3.5).default(1.8),
  peakHeightMultiplier: z.number().min(0.5).max(2.0).default(1.15),
  noiseIntensity: z.number().min(0).max(2.0).default(1.0),
  enableGlow: z.boolean().default(false),
  enableOcclusionFill: z.boolean().default(true), // czarna maska 3D pod falami

  // Cassette mechanics
  spoolSpinSpeed: z.number().min(0.2).max(3.0).default(1.0),

  // Composition duration (unlocked from 60 to 3600 frames, e.g. 2s to 120s)
  durationInFrames: z.number().min(60).max(3600).default(240),
});

export type JoyDivisionCassetteMorphProps = z.infer<
  typeof JoyDivisionCassetteMorphSchema
>;

export const defaultJoyDivisionCassetteMorphProps: JoyDivisionCassetteMorphProps = {
  initialLayout: "grid-5x5",
  enableDealIntro: true,
  dealStartFrame: 4,
  dealRowStagger: 6,
  dealRowDuration: 14,
  dealDirection: "from-top",
  cassetteScale: 1.15,
  gridSpacingX: 180,
  gridSpacingY: 115,
  alignStartFrame: 50,
  alignDuration: 38,
  flattenStartFrame: 88,
  flattenDuration: 45,
  mountainStartFrame: 133,
  mountainDuration: 52,
  morphStartFrame: 50,
  morphDurationFrames: 70,
  alignStyle: "natural-stack",
  transparentBackground: true,
  lineColor: "#ffffff",
  lineWidth: 1.8,
  peakHeightMultiplier: 1.15,
  noiseIntensity: 1.0,
  enableGlow: false,
  enableOcclusionFill: true,
  spoolSpinSpeed: 1.0,
  durationInFrames: 240, // 8 seconds at 30fps
};
