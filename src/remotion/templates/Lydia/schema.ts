import { z } from "zod";

export const LydiaSchema = z.object({
  // Podpis i tożsamość
  characterName: z.string().default("LYDIA"),
  characterColor: z.string().default("#38bdf8"), // ikoniczny błękit Lydii
  circleSize: z.number().min(120).max(400).default(230),

  // Geometria avatara
  headSize: z.number().min(15).max(75).default(42),
  bodySize: z.number().min(30).max(130).default(78),
  headY: z.number().min(20).max(95).default(55),
  bodyY: z.number().min(100).max(220).default(164),

  // Skalowanie i pozycja postaci na ekranie
  characterScale: z.number().min(0.5).max(3.0).default(1.35),
  positionX: z.number().min(10).max(90).default(50),
  positionY: z.number().min(10).max(90).default(50),

  // Stylistyka wektorowa
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().min(1.5).max(5.0).default(2.5),
  transparentBackground: z.boolean().default(true),
  idleBobbing: z.boolean().default(true),

  // Harmonogram Osi Czasu (Timing w klatkach @ 30fps)
  durationInFrames: z.number().min(60).max(3600).default(180), // 6 sekund
  characterEnterFrame: z.number().min(0).max(3600).default(5),
});

export type LydiaProps = z.infer<typeof LydiaSchema>;

export const defaultLydiaProps: LydiaProps = {
  characterName: "LYDIA",
  characterColor: "#38bdf8", // klasyczny błękit Lydii
  circleSize: 230,

  headSize: 42,
  bodySize: 78,
  headY: 55,
  bodyY: 164,

  characterScale: 1.35,
  positionX: 50,
  positionY: 50,

  lineColor: "#ffffff",
  lineWidth: 2.5,
  transparentBackground: true,
  idleBobbing: true,

  durationInFrames: 180, // 6s
  characterEnterFrame: 5,
};
