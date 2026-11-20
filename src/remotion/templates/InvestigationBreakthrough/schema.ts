import { z } from "zod";

export const InvestigationBreakthroughSchema = z.object({
  // Postać 1: Darius (Żółty)
  dariusName: z.string().default("DARIUS"),
  dariusColor: z.string().default("#facc15"),
  dariusX: z.number().default(20),
  dariusY: z.number().default(52),

  // Postać 2: Lydia (Błękitna)
  lydiaName: z.string().default("LYDIA"),
  lydiaColor: z.string().default("#38bdf8"),
  lydiaX: z.number().default(50),
  lydiaY: z.number().default(52),

  // Postać 3: Gabriel / Gabaskins (Zielony)
  gabrielName: z.string().default("GABRIEL"),
  gabrielSubtitle: z.string().default("GABASKINS"),
  showGabrielSubtitle: z.boolean().default(true),
  gabrielColor: z.string().default("#22c55e"),
  gabrielShowAntenna: z.boolean().default(true),
  gabrielX: z.number().default(80),
  gabrielY: z.number().default(52),

  // Radio i Kaseta (Audycja Baskerville'a -> Darius rozpoznaje nagranie)
  showRadio: z.boolean().default(true),
  showCassetteRecognition: z.boolean().default(true),

  // Śledztwo: Wpisy z 2007 roku
  showForum2007Badge: z.boolean().default(true),
  forum2007Text: z.string().default("WPISY Z 2007 ROKU"),

  // Wiadomość Messenger (Lydia pisze do Gabriela)
  showMessengerMessage: z.boolean().default(true),
  messengerText: z.string().default("WYJAŚNIENIE NAGRANIA"),
  showConnectionLines: z.boolean().default(true),

  // Rozmiary i styl
  charactersScale: z.number().default(0.95),
  circleSize: z.number().default(180),
  headSize: z.number().default(36),
  bodySize: z.number().default(70),
  headY: z.number().default(68),
  bodyY: z.number().default(164),

  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().default(2.5),
  transparentBackground: z.boolean().default(true),
  idleBobbing: z.boolean().default(true),

  // Timing (Klatki sekwencji zdarzeń)
  dariusEnterFrame: z.number().default(5),
  radioStartFrame: z.number().default(10),
  dariusRecognizeFrame: z.number().default(32),
  lydiaEnterFrame: z.number().default(48),
  investigation2007Frame: z.number().default(90),
  gabrielEnterFrame: z.number().default(140),
  messengerSendFrame: z.number().default(180),
  durationInFrames: z.number().default(300),
});

export type InvestigationBreakthroughProps = z.infer<
  typeof InvestigationBreakthroughSchema
>;

export const defaultInvestigationBreakthroughProps: InvestigationBreakthroughProps = {
  dariusName: "DARIUS",
  dariusColor: "#facc15",
  dariusX: 20,
  dariusY: 52,

  lydiaName: "LYDIA",
  lydiaColor: "#38bdf8",
  lydiaX: 50,
  lydiaY: 52,

  gabrielName: "GABRIEL",
  gabrielSubtitle: "GABASKINS",
  showGabrielSubtitle: true,
  gabrielColor: "#22c55e",
  gabrielShowAntenna: true,
  gabrielX: 80,
  gabrielY: 52,

  showRadio: true,
  showCassetteRecognition: true,

  showForum2007Badge: true,
  forum2007Text: "WPISY Z 2007 ROKU",

  showMessengerMessage: true,
  messengerText: "WYJAŚNIENIE NAGRANIA",
  showConnectionLines: true,

  charactersScale: 0.95,
  circleSize: 180,
  headSize: 36,
  bodySize: 70,
  headY: 68,
  bodyY: 164,

  lineColor: "#ffffff",
  lineWidth: 2.5,
  transparentBackground: true,
  idleBobbing: true,

  dariusEnterFrame: 5,
  radioStartFrame: 10,
  dariusRecognizeFrame: 32,
  lydiaEnterFrame: 48,
  investigation2007Frame: 90,
  gabrielEnterFrame: 140,
  messengerSendFrame: 180,
  durationInFrames: 300,
};
