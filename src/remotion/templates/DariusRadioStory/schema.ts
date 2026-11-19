import { z } from "zod";
import { DARIUS_AVATAR_SVG } from "./darius-avatar";

export const DariusRadioStorySchema = z.object({
  // Podpis jedyny na ekranie: "DARIUS"
  characterName: z.string().default("DARIUS"),
  avatarUrl: z.string().default(DARIUS_AVATAR_SVG),
  circleSize: z.number().min(120).max(400).default(220),

  // Skalowanie poszczególnych elementów animacji (zwiększanie / zmniejszanie)
  avatarScale: z.number().min(0.5).max(3.0).default(1.35), // Większy avatar Dariusa
  radioScale: z.number().min(0.5).max(2.5).default(1.2), // Większe radio i kaseta
  tracklistScale: z.number().min(0.5).max(2.5).default(1.15), // Większa karta notatek i ołówek
  heartScale: z.number().min(0.5).max(2.5).default(1.25), // Większe serce i nutki
  questionMarkScale: z.number().min(0.5).max(3.0).default(1.35), // Większy wyrazisty pytajnik

  // Kolorystyka czarno-biała z żółtymi akcentami
  accentColor: z.string().default("#facc15"), // charakterystyczny żółty akcent
  lineColor: z.string().default("#ffffff"), // czysta biel linii
  lineWidth: z.number().min(1.5).max(5.0).default(2.5),

  // Elementy animacji
  showHeartAndNotes: z.boolean().default(true),
  showRadioAndCassette: z.boolean().default(true),
  showWritingPencil: z.boolean().default(true),
  showQuestionMark: z.boolean().default(true),

  // Oś czasu (klatki kluczowe)
  durationInFrames: z.number().min(90).max(600).default(300),
  dariusEnterFrame: z.number().min(0).max(60).default(5),
  heartNotesStartFrame: z.number().min(10).max(80).default(22),
  heartNotesEndFrame: z.number().min(50).max(120).default(75),
  radioStartFrame: z.number().min(50).max(140).default(75),
  writingStartFrame: z.number().min(110).max(210).default(145),
  questionMarkStartFrame: z.number().min(170).max(280).default(215),

  // Przezroczyste tło do montażu
  transparentBackground: z.boolean().default(true),
});

export type DariusRadioStoryProps = z.infer<typeof DariusRadioStorySchema>;

export const defaultDariusRadioStoryProps: DariusRadioStoryProps = {
  characterName: "DARIUS",
  avatarUrl: DARIUS_AVATAR_SVG,
  circleSize: 220,

  avatarScale: 1.35,
  radioScale: 1.2,
  tracklistScale: 1.15,
  heartScale: 1.25,
  questionMarkScale: 1.35,

  accentColor: "#facc15", // Żółty akcent
  lineColor: "#ffffff", // Białe wektory
  lineWidth: 2.5,

  showHeartAndNotes: true,
  showRadioAndCassette: true,
  showWritingPencil: true,
  showQuestionMark: true,

  durationInFrames: 300,
  dariusEnterFrame: 5,
  heartNotesStartFrame: 22,
  heartNotesEndFrame: 75,
  radioStartFrame: 75,
  writingStartFrame: 145,
  questionMarkStartFrame: 215,

  transparentBackground: true,
};
