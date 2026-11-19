import { z } from "zod";

export const DariusInternetQuestSchema = z.object({
  // Bohaterowie
  dariusName: z.string().default("DARIUS"),
  lydiaName: z.string().default("LYDIA"),
  dariusColor: z.string().default("#facc15"), // charakterystyczny żółty
  lydiaColor: z.string().default("#38bdf8"), // błękitny Lydii
  circleSize: z.number().min(120).max(400).default(230),

  // Geometria avatara Dariusa
  dariusHeadSize: z.number().min(15).max(75).default(42),
  dariusBodySize: z.number().min(30).max(130).default(75),
  dariusHeadY: z.number().min(20).max(95).default(55),
  dariusBodyY: z.number().min(100).max(220).default(168),

  // Geometria avatara Lydii
  lydiaHeadSize: z.number().min(15).max(75).default(42),
  lydiaBodySize: z.number().min(30).max(130).default(75),
  lydiaHeadY: z.number().min(20).max(95).default(55),
  lydiaBodyY: z.number().min(100).max(220).default(168),

  // Skalowanie elementów (zwiększanie / zmniejszanie)
  charactersScale: z.number().min(0.5).max(3.0).default(1.35),
  dariusScale: z.number().min(0.5).max(3.0).default(1.0),
  lydiaScale: z.number().min(0.5).max(3.0).default(1.0),
  giftBoxScale: z.number().min(0.5).max(2.5).default(1.2),
  websiteScale: z.number().min(0.5).max(2.5).default(1.15),
  tracklistScale: z.number().min(0.5).max(2.5).default(1.15),
  questionMarkScale: z.number().min(0.5).max(3.0).default(1.35),

  // Treści i etykiety
  domainText: z.string().default("www.unknown-song.net"),
  browserTitle: z.string().default("ARCHIWUM KASETEK INTERNETOWYCH"),
  audioSnippetName: z.string().default("Snippet_RadioTape_10kHz.mp3"),
  song1Title: z.string().default("1. Christian Youth"),
  song2Title: z.string().default("2. Statues in the Park"),
  song3Title: z.string().default("3. Heart in Danger"),
  mysterySongTitle: z.string().default("????"),

  // Przełączniki elementów
  showGift: z.boolean().default(true),
  showWebsite: z.boolean().default(true),
  showSolvedSongs: z.boolean().default(true),
  showMysteryQuestion: z.boolean().default(true),

  // Stylistyka wektorowa
  lineColor: z.string().default("#ffffff"),
  successColor: z.string().default("#4ade80"), // zielona fajka sukcesu
  lineWidth: z.number().min(1.5).max(5.0).default(2.5),
  transparentBackground: z.boolean().default(true),

  // Precyzyjny Harmonogram Osi Czasu (Timing w klatkach @ 30fps)
  durationInFrames: z.number().min(60).max(3600).default(360), // 12 sekund
  charactersEnterFrame: z.number().min(0).max(3600).default(5),
  giftOpenFrame: z.number().min(0).max(3600).default(28),
  giftEndFrame: z.number().min(0).max(3600).default(90),
  websiteStartFrame: z.number().min(0).max(3600).default(95),
  identifySong1Frame: z.number().min(0).max(3600).default(160),
  identifySong2Frame: z.number().min(0).max(3600).default(205),
  identifySong3Frame: z.number().min(0).max(3600).default(245),
  mysteryQuestionFrame: z.number().min(0).max(3600).default(285),
});

export type DariusInternetQuestProps = z.infer<typeof DariusInternetQuestSchema>;

export const defaultDariusInternetQuestProps: DariusInternetQuestProps = {
  dariusName: "DARIUS",
  lydiaName: "LYDIA",
  dariusColor: "#facc15",
  lydiaColor: "#38bdf8",
  circleSize: 230,

  dariusHeadSize: 42,
  dariusBodySize: 75,
  dariusHeadY: 55,
  dariusBodyY: 168,

  lydiaHeadSize: 42,
  lydiaBodySize: 75,
  lydiaHeadY: 55,
  lydiaBodyY: 168,

  charactersScale: 1.35,
  dariusScale: 1.0,
  lydiaScale: 1.0,
  giftBoxScale: 1.2,
  websiteScale: 1.15,
  tracklistScale: 1.15,
  questionMarkScale: 1.35,

  domainText: "www.unknown-song.net",
  browserTitle: "ARCHIWUM KASETEK INTERNETOWYCH",
  audioSnippetName: "Snippet_RadioTape_10kHz.mp3",
  song1Title: "1. Christian Youth",
  song2Title: "2. Statues in the Park",
  song3Title: "3. Heart in Danger",
  mysterySongTitle: "????",

  showGift: true,
  showWebsite: true,
  showSolvedSongs: true,
  showMysteryQuestion: true,

  lineColor: "#ffffff",
  successColor: "#4ade80",
  lineWidth: 2.5,
  transparentBackground: true,

  durationInFrames: 360, // 12s
  charactersEnterFrame: 5,
  giftOpenFrame: 28,
  giftEndFrame: 90,
  websiteStartFrame: 95,
  identifySong1Frame: 160,
  identifySong2Frame: 205,
  identifySong3Frame: 245,
  mysteryQuestionFrame: 285,
};
