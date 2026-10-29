import { z } from "zod";

export const RetroCassetteIntroSchema = z.object({
  // 1. Górny napis wstępu
  headerText: z.string().default("HORYZONT ZDARZEŃ PREZENTUJE"),
  headerFont: z.enum(["cinzel", "inter", "space-mono"]).default("cinzel"),
  headerColor: z.string().default("#ffffff"),
  showHeader: z.boolean().default(true),

  // 2. Podpis odręczny na kasecie
  cassetteTitle: z
    .string()
    .default("Najbardziej tajemnicza piosenka w historii internetu"),
  handwritingFont: z.enum(["caveat", "permanent-marker"]).default("caveat"),
  inkColor: z.enum(["blue", "black", "red"]).default("blue"),
  showPen: z.boolean().default(true),
  penType: z.enum(["ballpoint-blue", "marker-black"]).default("ballpoint-blue"),

  // 3. Wygląd i mechanika kasety
  cassetteColor: z
    .enum(["vintage-black", "retro-cream", "dark-charcoal"])
    .default("vintage-black"),
  spoolSpeed: z.number().min(0.2).max(3.0).default(1.0),
  side: z.enum(["A", "B"]).default("A"),
  tapeFormat: z.string().default("C-90 • NORMAL BIAS"),
  scale: z.number().min(0.6).max(1.4).default(1.0),

  // 4. Tło i kompozycja
  backgroundMode: z
    .enum(["cinematic-black", "transparent-alpha", "subtle-glow"])
    .default("cinematic-black"),

  // Czas trwania animacji (np. 210 klatek = 7 sek. przy 30fps)
  durationInFrames: z.number().min(120).max(600).default(210),
});

export type RetroCassetteIntroProps = z.infer<
  typeof RetroCassetteIntroSchema
>;

export const defaultRetroCassetteIntroProps: RetroCassetteIntroProps = {
  headerText: "HORYZONT ZDARZEŃ PREZENTUJE",
  headerFont: "cinzel",
  headerColor: "#ffffff",
  showHeader: true,
  cassetteTitle: "Najbardziej tajemnicza piosenka w historii internetu",
  handwritingFont: "caveat",
  inkColor: "blue",
  showPen: true,
  penType: "ballpoint-blue",
  cassetteColor: "vintage-black",
  spoolSpeed: 1.0,
  side: "A",
  tapeFormat: "C-90 • NORMAL BIAS",
  scale: 1.0,
  backgroundMode: "cinematic-black",
  durationInFrames: 210, // 7 seconds at 30fps
};
