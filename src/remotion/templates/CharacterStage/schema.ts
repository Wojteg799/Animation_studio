import { z } from "zod";
import { DEFAULT_AVATAR_SILHOUETTE, AVATAR_PRESETS } from "./default-avatars";

export const CharacterStageSchema = z.object({
  // Global Scene Settings
  sceneMode: z.enum(["single", "duo"]).default("duo"),
  backgroundStyle: z
    .enum(["pitch-black", "transparent", "noir-grid", "investigative-corkboard"])
    .default("pitch-black"),
  particlesEnabled: z.boolean().default(true),

  // ==================== POSTAĆ 1 (CHARACTER 1) ====================
  c1_enabled: z.boolean().default(true),
  c1_name: z.string().default("JAN KOWALSKI"),
  c1_role: z.string().default("Główny Świadek • 1984"),
  c1_tag: z.string().default("ŚWIADEK"),
  c1_photoUrl: z.string().default(DEFAULT_AVATAR_SILHOUETTE),
  c1_borderColor: z.string().default("#ffffff"),
  c1_borderWidth: z.number().min(1).max(12).default(4),
  c1_circleSize: z.number().min(90).max(320).default(180),
  c1_scale: z.number().min(0.5).max(1.8).default(1.0),

  // C1: Wejście (Entrance)
  c1_enterType: z
    .enum(["from-bottom", "from-top", "from-left", "from-right", "pop-spring", "fade-zoom"])
    .default("from-bottom"),
  c1_enterFrame: z.number().min(0).max(120).default(0),
  c1_enterDuration: z.number().min(8).max(50).default(20),

  // C1: Ruch na scenie z punktu A do punktu B (Waypoint Movement)
  c1_enableMovement: z.boolean().default(true),
  c1_startX: z.number().min(5).max(95).default(50), // % szerokości ekranu (np. środek 50%)
  c1_startY: z.number().min(10).max(90).default(50),
  c1_endX: z.number().min(5).max(95).default(33), // po ruchu przesuwa się na lewo
  c1_endY: z.number().min(10).max(90).default(50),
  c1_moveStartFrame: z.number().min(0).max(180).default(45),
  c1_moveDuration: z.number().min(10).max(80).default(32),

  // C1: Efekty & Modyfikatory
  c1_idleBobbing: z.boolean().default(true),
  c1_talkingPulse: z.boolean().default(false),
  c1_pulseStartFrame: z.number().min(0).max(240).default(20),
  c1_pulseDuration: z.number().min(10).max(150).default(60),
  c1_isCrossedOut: z.boolean().default(false),
  c1_crossOutFrame: z.number().min(0).max(240).default(80),
  c1_showClassifiedStamp: z.boolean().default(false),
  c1_stampText: z.string().default("ŚCIŚLE TAJNE"),

  // ==================== POSTAĆ 2 (CHARACTER 2) ====================
  c2_enabled: z.boolean().default(true),
  c2_name: z.string().default("INSP. MAREK NOWAK"),
  c2_role: z.string().default("Wydział Dochodzeniowo-Śledczy"),
  c2_tag: z.string().default("ŚLEDCZY"),
  c2_photoUrl: z.string().default(AVATAR_PRESETS[2].svgDataUri),
  c2_borderColor: z.string().default("#38bdf8"),
  c2_borderWidth: z.number().min(1).max(12).default(4),
  c2_circleSize: z.number().min(90).max(320).default(180),
  c2_scale: z.number().min(0.5).max(1.8).default(1.0),

  // C2: Wejście (Entrance)
  c2_enterType: z
    .enum(["from-bottom", "from-top", "from-left", "from-right", "pop-spring", "fade-zoom"])
    .default("from-bottom"),
  c2_enterFrame: z.number().min(0).max(120).default(10),
  c2_enterDuration: z.number().min(8).max(50).default(20),

  // C2: Ruch na scenie z punktu A do punktu B
  c2_enableMovement: z.boolean().default(true),
  c2_startX: z.number().min(5).max(95).default(67),
  c2_startY: z.number().min(10).max(90).default(50),
  c2_endX: z.number().min(5).max(95).default(67),
  c2_endY: z.number().min(10).max(90).default(50),
  c2_moveStartFrame: z.number().min(0).max(180).default(50),
  c2_moveDuration: z.number().min(10).max(80).default(32),

  // C2: Efekty & Modyfikatory
  c2_idleBobbing: z.boolean().default(true),
  c2_talkingPulse: z.boolean().default(true),
  c2_pulseStartFrame: z.number().min(0).max(240).default(70),
  c2_pulseDuration: z.number().min(10).max(150).default(65),
  c2_isCrossedOut: z.boolean().default(false),
  c2_crossOutFrame: z.number().min(0).max(240).default(95),
  c2_showClassifiedStamp: z.boolean().default(false),
  c2_stampText: z.string().default("KLUCZOWY"),

  // ==================== INTERAKCJE & RELACJE (INTERACTIONS) ====================
  showConnectionLine: z.boolean().default(true),
  lineStyle: z
    .enum(["investigative-string", "dashed-pulse", "arrow-directed", "solid-glow"])
    .default("investigative-string"),
  lineColor: z.string().default("#ef4444"),
  lineWidth: z.number().min(1).max(8).default(3.5),
  lineLabel: z.string().default("POŁĄCZENIE TELEFONICZNE • 1984"),
  lineStartFrame: z.number().min(0).max(180).default(75),
  lineDuration: z.number().min(10).max(60).default(25),
  lineCurvature: z.number().min(-60).max(60).default(-18), // subtle natural arch curve

  // Composition Duration (240 frames = 8s @ 30fps)
  durationInFrames: z.number().min(90).max(900).default(240),
});

export type CharacterStageProps = z.infer<typeof CharacterStageSchema>;

export const defaultCharacterStageProps: CharacterStageProps = {
  sceneMode: "duo",
  backgroundStyle: "pitch-black",
  particlesEnabled: true,

  // Character 1
  c1_enabled: true,
  c1_name: "JAN KOWALSKI",
  c1_role: "Główny Świadek • 1984",
  c1_tag: "ŚWIADEK",
  c1_photoUrl: DEFAULT_AVATAR_SILHOUETTE,
  c1_borderColor: "#ffffff",
  c1_borderWidth: 4,
  c1_circleSize: 180,
  c1_scale: 1.0,
  c1_enterType: "from-bottom",
  c1_enterFrame: 0,
  c1_enterDuration: 22,
  c1_enableMovement: true,
  c1_startX: 50,
  c1_startY: 50,
  c1_endX: 33,
  c1_endY: 50,
  c1_moveStartFrame: 45,
  c1_moveDuration: 32,
  c1_idleBobbing: true,
  c1_talkingPulse: false,
  c1_pulseStartFrame: 20,
  c1_pulseDuration: 60,
  c1_isCrossedOut: false,
  c1_crossOutFrame: 80,
  c1_showClassifiedStamp: false,
  c1_stampText: "ŚCIŚLE TAJNE",

  // Character 2
  c2_enabled: true,
  c2_name: "INSP. MAREK NOWAK",
  c2_role: "Wydział Dochodzeniowo-Śledczy",
  c2_tag: "ŚLEDCZY",
  c2_photoUrl: AVATAR_PRESETS[2].svgDataUri,
  c2_borderColor: "#38bdf8",
  c2_borderWidth: 4,
  c2_circleSize: 180,
  c2_scale: 1.0,
  c2_enterType: "from-bottom",
  c2_enterFrame: 10,
  c2_enterDuration: 22,
  c2_enableMovement: true,
  c2_startX: 67,
  c2_startY: 50,
  c2_endX: 67,
  c2_endY: 50,
  c2_moveStartFrame: 50,
  c2_moveDuration: 32,
  c2_idleBobbing: true,
  c2_talkingPulse: true,
  c2_pulseStartFrame: 75,
  c2_pulseDuration: 65,
  c2_isCrossedOut: false,
  c2_crossOutFrame: 95,
  c2_showClassifiedStamp: false,
  c2_stampText: "KLUCZOWY",

  // Connection
  showConnectionLine: true,
  lineStyle: "investigative-string",
  lineColor: "#ef4444",
  lineWidth: 3.5,
  lineLabel: "POŁĄCZENIE TELEFONICZNE • 1984",
  lineStartFrame: 75,
  lineDuration: 25,
  lineCurvature: -18,

  durationInFrames: 240,
};

