import { z } from "zod";

export const GabaskinsQuestSchema = z.object({
  // Postać Gabaskins
  characterName: z.string().default("GABASKINS"),
  characterSubtitle: z.string().default("REDDIT"),
  showSubtitle: z.boolean().default(true),
  characterColor: z.string().default("#22c55e"), // Zielony
  showAntenna: z.boolean().default(true),
  antennaColor: z.string().default("#ffffff"),
  circleSize: z.number().default(210),
  headSize: z.number().default(38),
  bodySize: z.number().default(75),
  headY: z.number().default(68),
  bodyY: z.number().default(166),
  characterScale: z.number().default(1.2),
  positionX: z.number().default(50),
  positionY: z.number().default(50),

  // Platformy: YouTube & Reddit
  showYouTube: z.boolean().default(true),
  showReddit: z.boolean().default(true),
  stylePreset: z.enum(["vibrant", "monochrome"]).default("vibrant"), // Żywe kolory vs biały wireframe
  youtubeColor: z.string().default("#ef4444"),
  redditColor: z.string().default("#ff4500"),
  platformsScale: z.number().default(1.1),
  youtubePosX: z.number().default(24),
  youtubePosY: z.number().default(50),
  redditPosX: z.number().default(76),
  redditPosY: z.number().default(50),

  // Tajemnicze nagranie / Kaseta
  showCassette: z.boolean().default(true),
  cassetteScale: z.number().default(0.85),
  cassetteColor: z.string().default("#facc15"),

  // Elementy publikacji (linie sygnału, bańki subredditów, fale)
  showBroadcastSignals: z.boolean().default(true),
  showSubredditBubbles: z.boolean().default(true),
  showBroadcastPings: z.boolean().default(true),

  // Styl graficzny
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().default(2.5),
  transparentBackground: z.boolean().default(true),
  idleBobbing: z.boolean().default(true),

  // Timing (klatki animacji)
  characterEnterFrame: z.number().default(5),
  cassetteEnterFrame: z.number().default(25),
  youtubeEnterFrame: z.number().default(48),
  redditEnterFrame: z.number().default(72),
  durationInFrames: z.number().default(240),
});

export type GabaskinsQuestProps = z.infer<typeof GabaskinsQuestSchema>;

export const defaultGabaskinsQuestProps: GabaskinsQuestProps = {
  characterName: "GABASKINS",
  characterSubtitle: "REDDIT",
  showSubtitle: true,
  characterColor: "#22c55e",
  showAntenna: true,
  antennaColor: "#ffffff",
  circleSize: 210,
  headSize: 38,
  bodySize: 75,
  headY: 68,
  bodyY: 166,
  characterScale: 1.2,
  positionX: 50,
  positionY: 50,

  showYouTube: true,
  showReddit: true,
  stylePreset: "vibrant",
  youtubeColor: "#ef4444",
  redditColor: "#ff4500",
  platformsScale: 1.1,
  youtubePosX: 24,
  youtubePosY: 50,
  redditPosX: 76,
  redditPosY: 50,

  showCassette: true,
  cassetteScale: 0.85,
  cassetteColor: "#facc15",

  showBroadcastSignals: true,
  showSubredditBubbles: true,
  showBroadcastPings: true,

  lineColor: "#ffffff",
  lineWidth: 2.5,
  transparentBackground: true,
  idleBobbing: true,

  characterEnterFrame: 5,
  cassetteEnterFrame: 25,
  youtubeEnterFrame: 48,
  redditEnterFrame: 72,
  durationInFrames: 240,
};
