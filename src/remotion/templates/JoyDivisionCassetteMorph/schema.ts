import { z } from "zod";

export const JoyDivisionCassetteMorphSchema = z.object({
  // Initial layout of the 25 cassettes before morph
  initialLayout: z
    .enum(["grid-5x5", "vertical-stack", "staggered-cluster"])
    .default("grid-5x5"),

  // Card Dealing Intro Animation ("Rozdawanie rządków kaset jak kart")
  enableDealIntro: z.boolean().default(true),
  dealStartFrame: z.number().min(0).max(30).default(4),
  dealRowStagger: z.number().min(2).max(16).default(6),
  dealRowDuration: z.number().min(6).max(28).default(14),
  dealDirection: z
    .enum(["from-top", "from-bottom", "scale-snap", "diagonal-deck"])
    .default("from-top"),

  // Cassette Sizing & Grid Spacing (delikatne powiększenie i mniejszy spacing bez wychodzenia poza ekran)
  cassetteScale: z.number().min(0.8).max(1.5).default(1.15),
  gridSpacingX: z.number().min(130).max(250).default(180),
  gridSpacingY: z.number().min(80).max(160).default(115),

  // Morph timing & speed (when alignment into rows begins)
  morphStartFrame: z.number().min(20).max(120).default(50),
  morphDurationFrames: z.number().min(30).max(120).default(70),

  // Sposób ułożenia w rzędzie:
  // "natural-stack": Kasety zachowują 100% naturalne proporcje bez deformacji podczas układania w rzędzie
  // "adaptive-rows": Kasety wstępnie zwężają się w pionie już podczas zjazdu do rzędów
  alignStyle: z.enum(["natural-stack", "adaptive-rows"]).default("natural-stack"),

  // Visual styling
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().min(1).max(3.5).default(1.8),
  peakHeightMultiplier: z.number().min(0.5).max(2.0).default(1.15),
  noiseIntensity: z.number().min(0).max(2.0).default(1.0),
  enableGlow: z.boolean().default(false),
  enableOcclusionFill: z.boolean().default(true), // black fill under each line for classic 3D contour

  // Cassette mechanics
  spoolSpinSpeed: z.number().min(0.2).max(3.0).default(1.0),

  // Composition duration (240 frames = 8 seconds at 30fps)
  durationInFrames: z.number().min(150).max(600).default(240),
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
  alignStyle: "natural-stack",
  morphStartFrame: 50,
  morphDurationFrames: 70,
  lineColor: "#ffffff",
  lineWidth: 1.8,
  peakHeightMultiplier: 1.15,
  noiseIntensity: 1.0,
  enableGlow: false,
  enableOcclusionFill: true,
  spoolSpinSpeed: 1.0,
  durationInFrames: 240, // 8 seconds at 30fps
};
