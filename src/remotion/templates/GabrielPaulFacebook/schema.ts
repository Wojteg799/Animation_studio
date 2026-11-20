import { z } from "zod";

export const GabrielPaulFacebookSchema = z.object({
  // Postać 1: Gabriel (Gabaskins)
  gabrielName: z.string().default("GABRIEL"),
  gabrielSubtitle: z.string().default("GABASKINS"),
  showGabrielSubtitle: z.boolean().default(true),
  gabrielColor: z.string().default("#22c55e"), // Zielony
  gabrielShowAntenna: z.boolean().default(true),
  gabrielX: z.number().default(26),
  gabrielY: z.number().default(50),

  // Postać 2: Paul Baskerville
  paulName: z.string().default("PAUL BASKERVILLE"),
  paulSubtitle: z.string().default("NDR • DZIENNIKARZ"),
  showPaulSubtitle: z.boolean().default(true),
  paulColor: z.string().default("#92400e"), // Brązowy
  paulShowHeadphones: z.boolean().default(true), // Słuchawki radiowe DJ
  paulHeadShake: z.boolean().default(true), // Puzzled shake przy braku rozpoznania
  paulX: z.number().default(74),
  paulY: z.number().default(50),

  // Facebook & Komunikacja
  showFacebook: z.boolean().default(true),
  facebookStyle: z.enum(["vibrant", "monochrome"]).default("vibrant"),
  facebookColor: z.string().default("#1877f2"),
  facebookScale: z.number().default(1.3), // Opcja powiększenia / skalowania logo Facebooka
  showFacebookLabel: z.boolean().default(false), // Samo logo bez podpisu
  facebookX: z.number().default(50),
  facebookY: z.number().default(42),
  showChatBubbles: z.boolean().default(true),
  showConnectionLines: z.boolean().default(true),

  // Pytajnik / Brak rozpoznania piosenki (uproszczony bez tekstu i bez kółka z tyłu)
  showQuestionMark: z.boolean().default(true),
  questionMarkText: z.string().default("?"),
  questionMarkColor: z.string().default("#facc15"),
  questionMarkScale: z.number().default(1.3),
  showQuestionText: z.boolean().default(false), // Bez tekstu pod pytajnikiem
  showQuestionPulse: z.boolean().default(false), // Bez pulsującego kółka z tyłu

  // Wspólne wymiary postaci
  charactersScale: z.number().default(1.15),
  circleSize: z.number().default(200),
  headSize: z.number().default(38),
  bodySize: z.number().default(75),
  headY: z.number().default(68),
  bodyY: z.number().default(166),

  // Styl i tło
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().default(2.5),
  transparentBackground: z.boolean().default(true),
  idleBobbing: z.boolean().default(true),

  // Timing (klatki animacji)
  charactersEnterFrame: z.number().default(5),
  facebookEnterFrame: z.number().default(28),
  messageSentFrame: z.number().default(46),
  messageReplyFrame: z.number().default(82),
  questionMarkFrame: z.number().default(116),
  durationInFrames: z.number().default(240),
});

export type GabrielPaulFacebookProps = z.infer<typeof GabrielPaulFacebookSchema>;

export const defaultGabrielPaulFacebookProps: GabrielPaulFacebookProps = {
  gabrielName: "GABRIEL",
  gabrielSubtitle: "GABASKINS",
  showGabrielSubtitle: true,
  gabrielColor: "#22c55e",
  gabrielShowAntenna: true,
  gabrielX: 26,
  gabrielY: 50,

  paulName: "PAUL BASKERVILLE",
  paulSubtitle: "NDR • DZIENNIKARZ",
  showPaulSubtitle: true,
  paulColor: "#92400e",
  paulShowHeadphones: true,
  paulHeadShake: true,
  paulX: 74,
  paulY: 50,

  showFacebook: true,
  facebookStyle: "vibrant",
  facebookColor: "#1877f2",
  facebookScale: 1.3,
  showFacebookLabel: false,
  facebookX: 50,
  facebookY: 42,
  showChatBubbles: true,
  showConnectionLines: true,

  showQuestionMark: true,
  questionMarkText: "?",
  questionMarkColor: "#facc15",
  questionMarkScale: 1.3,
  showQuestionText: false,
  showQuestionPulse: false,

  charactersScale: 1.15,
  circleSize: 200,
  headSize: 38,
  bodySize: 75,
  headY: 68,
  bodyY: 166,

  lineColor: "#ffffff",
  lineWidth: 2.5,
  transparentBackground: true,
  idleBobbing: true,

  charactersEnterFrame: 5,
  facebookEnterFrame: 28,
  messageSentFrame: 46,
  messageReplyFrame: 82,
  questionMarkFrame: 116,
  durationInFrames: 240,
};
