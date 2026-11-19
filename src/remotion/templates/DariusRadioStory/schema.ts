import { z } from "zod";
import { DARIUS_AVATAR_SVG } from "./darius-avatar";

export const DariusRadioStorySchema = z.object({
  // 1. Postać Dariusa
  characterName: z.string().default("Darius S."),
  characterRole: z.string().default("Pasjonat Muzyki • Niemcy 1984"),
  characterTag: z.string().default("ŚWIADEK / ODKRYWCA"),
  avatarUrl: z.string().default(DARIUS_AVATAR_SVG),
  accentColor: z.string().default("#f59e0b"), // ciepły bursztyn / złoto lat 80.
  borderColor: z.string().default("#ffffff"),
  circleSize: z.number().min(100).max(360).default(220),

  // Faza 1: Miłość do muzyki (Serduszko & Nuty)
  showHeartAndNotes: z.boolean().default(true),
  heartColor: z.string().default("#ef4444"),

  // Faza 2: Nagrywanie z radia na kasetę
  radioStationName: z.string().default("NDR 1 • 89.2 MHz"),
  radioShowName: z.string().default("Musik für junge Leute"),
  radioHostName: z.string().default("DJ: Paul Baskerville"),
  tapeLabel: z.string().default("BASF CR-E II 90 • 1984"),
  mixtapeTitle: z.string().default("MIXTAPE #4 • STRONA A"),
  showRadioSignalWaves: z.boolean().default(true),
  showRecBlinker: z.boolean().default(true),

  // Faza 3: Zapisywanie tytułów & wykonawców
  track1: z.string().default("1. The Cure - A Forest"),
  track2: z.string().default("2. Depeche Mode - People Are People"),
  track3: z.string().default("3. New Order - Blue Monday"),

  // Faza 4: Nieznany utwór & Znak Zapytania
  mysteryTrackNumber: z.string().default("4."),
  mysteryTrackPlaceholder: z.string().default("??? — ???"),
  mysteryTrackNote: z.string().default("[Brak zapowiedzi DJ-a!]"),
  showQuestionMark: z.boolean().default(true),
  questionMarkColor: z.string().default("#f59e0b"),

  // Oś czasu & klatki kluczowe (domyślnie 300 klatek = 10s przy 30fps)
  durationInFrames: z.number().min(90).max(600).default(300),
  dariusEnterFrame: z.number().min(0).max(60).default(5),
  heartNotesStartFrame: z.number().min(10).max(80).default(22),
  radioStartFrame: z.number().min(50).max(140).default(75),
  jcardStartFrame: z.number().min(110).max(210).default(150),
  mysteryQuestionStartFrame: z.number().min(170).max(280).default(215),

  // Opcje wizualne & przezroczystość
  transparentBackground: z.boolean().default(true),
  themeVariant: z.enum(["noir-dark", "retro-warm"]).default("retro-warm"),
});

export type DariusRadioStoryProps = z.infer<typeof DariusRadioStorySchema>;

export const defaultDariusRadioStoryProps: DariusRadioStoryProps = {
  characterName: "Darius S.",
  characterRole: "Pasjonat Muzyki • Niemcy 1984",
  characterTag: "ŚWIADEK / ODKRYWCA",
  avatarUrl: DARIUS_AVATAR_SVG,
  accentColor: "#f59e0b",
  borderColor: "#ffffff",
  circleSize: 220,

  showHeartAndNotes: true,
  heartColor: "#ef4444",

  radioStationName: "NDR 1 • 89.2 MHz",
  radioShowName: "Musik für junge Leute",
  radioHostName: "DJ: Paul Baskerville",
  tapeLabel: "BASF CR-E II 90 • 1984",
  mixtapeTitle: "MIXTAPE #4 • STRONA A",
  showRadioSignalWaves: true,
  showRecBlinker: true,

  track1: "1. The Cure - A Forest",
  track2: "2. Depeche Mode - People Are People",
  track3: "3. New Order - Blue Monday",

  mysteryTrackNumber: "4.",
  mysteryTrackPlaceholder: "??? — ???",
  mysteryTrackNote: "[Brak zapowiedzi DJ-a!]",
  showQuestionMark: true,
  questionMarkColor: "#f59e0b",

  durationInFrames: 300,
  dariusEnterFrame: 5,
  heartNotesStartFrame: 22,
  radioStartFrame: 75,
  jcardStartFrame: 150,
  mysteryQuestionStartFrame: 215,

  transparentBackground: true,
  themeVariant: "retro-warm",
};
