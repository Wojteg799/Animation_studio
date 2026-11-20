import { z } from "zod";

export const AntonRiedelSchema = z.object({
  // Podpis i tożsamość
  characterName: z.string().default("ANTON RIEDEL"),
  originalName: z.string().default("LYDIA"),
  enableTransformation: z.boolean().default(false), // zmiana LYDIA -> ANTON RIEDEL przy opadnięciu okularów
  characterColor: z.string().default("#38bdf8"), // błękitny Lydii
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

  // Opcje kamuflażu (Okulary, Nos, Wąsy)
  showGlasses: z.boolean().default(true),
  showNose: z.boolean().default(true),
  showMustache: z.boolean().default(true),
  showImpactLines: z.boolean().default(true),
  disguiseStyle: z.enum(["wireframe-black", "comedy-color", "pure-white"]).default("wireframe-black"),
  disguiseScale: z.number().min(0.5).max(2.0).default(1.0),
  disguiseOffsetX: z.number().min(-40).max(40).default(0),
  disguiseOffsetY: z.number().min(-40).max(40).default(0),

  // Stylistyka wektorowa
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().min(1.5).max(5.0).default(2.5),
  transparentBackground: z.boolean().default(true),
  idleBobbing: z.boolean().default(true),

  // Harmonogram Osi Czasu (Timing w klatkach @ 30fps)
  durationInFrames: z.number().min(60).max(3600).default(180), // 6 sekund
  characterEnterFrame: z.number().min(0).max(3600).default(5),
  disguiseDropFrame: z.number().min(0).max(3600).default(18), // 0 = od razu na twarzy
});

export type AntonRiedelProps = z.infer<typeof AntonRiedelSchema>;

export const defaultAntonRiedelProps: AntonRiedelProps = {
  characterName: "ANTON RIEDEL",
  originalName: "LYDIA",
  enableTransformation: false,
  characterColor: "#38bdf8", // klasyczny błękit Lydii
  circleSize: 230,

  headSize: 42,
  bodySize: 78,
  headY: 55,
  bodyY: 164,

  characterScale: 1.35,
  positionX: 50,
  positionY: 50,

  showGlasses: true,
  showNose: true,
  showMustache: true,
  showImpactLines: true,
  disguiseStyle: "wireframe-black",
  disguiseScale: 1.0,
  disguiseOffsetX: 0,
  disguiseOffsetY: 0,

  lineColor: "#ffffff",
  lineWidth: 2.5,
  transparentBackground: true,
  idleBobbing: true,

  durationInFrames: 180, // 6s
  characterEnterFrame: 5,
  disguiseDropFrame: 18,
};
