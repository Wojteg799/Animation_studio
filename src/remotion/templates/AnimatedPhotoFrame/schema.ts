import { z } from "zod";
import { SAMPLE_VINTAGE_TAPE } from "./default-images";

export const AnimatedPhotoFrameSchema = z.object({
  // Image & Dimensions
  imageUrl: z.string().default(SAMPLE_VINTAGE_TAPE),
  aspectRatio: z.enum(["16:9", "4:3", "1:1", "9:16"]).default("16:9"),
  frameWidth: z.number().min(380).max(1600).default(1020),
  frameColor: z.string().default("#ffffff"),
  strokeWidth: z.number().min(1).max(8).default(2),
  borderRadius: z.number().min(0).max(24).default(6),
  glowIntensity: z.number().min(0).max(1).default(0.4),

  // Motion & Dynamic Animation (Ruszająca się ramka)
  enableTravelingBeam: z.boolean().default(true), // Biegające białe światło / impuls po obwodzie ramki
  beamSpeed: z.number().min(0.2).max(3.0).default(1.0),
  enableGlassSheen: z.boolean().default(true), // Błysk / refleks światła przesuwający się po szkle zdjęcia
  sheenInterval: z.number().min(45).max(180).default(90),
  enable3DFloat: z.boolean().default(true), // Subtelne kinowe unoszenie i przechył w przestrzeni 3D
  floatIntensity: z.number().min(0.2).max(2.5).default(1.0),
  enableKenBurns: z.boolean().default(true), // Powolny kinowy mikro-zoom zdjęcia wewnątrz ramki
  kenBurnsScale: z.number().min(1.0).max(1.3).default(1.08),
  enableCornerBrackets: z.boolean().default(true), // Narożniki celownika / viewfindera `[ ]`
  showTechCrosshairs: z.boolean().default(true), // Precyzyjne znaczniki celownicze `+` w rogach

  // Labels & Documentary Metadata
  showLabel: z.boolean().default(true),
  labelText: z.string().default("ARCHIWALNA FOTOGRAFIA // DOKUMENTACJA 1984"),
  labelSubtext: z.string().default("NEGATYW 35MM • SYGNATURA: REF-84/NDR"),
  labelPosition: z.enum(["bottom", "top", "badge-corner"]).default("bottom"),

  // Entrance
  entranceType: z
    .enum(["draw-in", "expand-center", "slide-up", "pop-scale"])
    .default("draw-in"),
  entranceFrame: z.number().min(0).max(60).default(0),
  entranceDuration: z.number().min(10).max(60).default(24),

  // Background
  backgroundType: z
    .enum(["transparent", "pitch-black", "blurred-image", "noir-vignette"])
    .default("transparent"),

  // Duration
  durationInFrames: z.number().min(120).max(600).default(240),
});

export type AnimatedPhotoFrameProps = z.infer<typeof AnimatedPhotoFrameSchema>;

export const defaultAnimatedPhotoFrameProps: AnimatedPhotoFrameProps = {
  imageUrl: SAMPLE_VINTAGE_TAPE,
  aspectRatio: "16:9",
  frameWidth: 1020,
  frameColor: "#ffffff",
  strokeWidth: 2,
  borderRadius: 6,
  glowIntensity: 0.4,

  enableTravelingBeam: true,
  beamSpeed: 1.0,
  enableGlassSheen: true,
  sheenInterval: 90,
  enable3DFloat: true,
  floatIntensity: 1.0,
  enableKenBurns: true,
  kenBurnsScale: 1.08,
  enableCornerBrackets: true,
  showTechCrosshairs: true,

  showLabel: true,
  labelText: "ARCHIWALNA FOTOGRAFIA // DOKUMENTACJA 1984",
  labelSubtext: "NEGATYW 35MM • SYGNATURA: REF-84/NDR",
  labelPosition: "bottom",

  entranceType: "draw-in",
  entranceFrame: 0,
  entranceDuration: 24,

  backgroundType: "transparent",
  durationInFrames: 240, // 8s @ 30fps
};
