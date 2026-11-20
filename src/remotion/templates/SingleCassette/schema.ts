import { z } from "zod";

export const SingleCassetteSchema = z.object({
  // Skórka / Wariant kasety
  skinPreset: z
    .enum(["mystery-gold", "classic-wireframe", "full-gold", "cyan-cyber"])
    .default("mystery-gold"),

  // Etykieta kasety (napis np. ????)
  showLabel: z.boolean().default(true),
  labelText: z.string().default("????"),
  labelColor: z.string().default("#ffffff"),

  // Kolor szpulek (złote kółka)
  spoolColor: z.string().default("#facc15"), // charakterystyczny złoty / żółty

  // Skalowanie i wymiary kasety
  cassetteWidth: z.number().min(240).max(1200).default(640),
  cassetteHeight: z.number().min(150).max(760).default(405),
  cassetteScale: z.number().min(0.5).max(2.5).default(1.15),
  positionX: z.number().min(10).max(90).default(50), // % ekranu
  positionY: z.number().min(10).max(90).default(50), // % ekranu

  // Stylistyka wektorowa (Joy Division Wireframe)
  lineColor: z.string().default("#ffffff"),
  lineWidth: z.number().min(1.0).max(5.0).default(2.2),
  chassisFill: z.string().default("#000000"), // czerń wewnątrz obudowy kasety
  transparentBackground: z.boolean().default(true), // przezroczyste tło do DaVinci / Premiere

  // Ruch i animacja
  spoolSpeed: z.number().min(0).max(15).default(3.8), // prędkość obrotu szpulek taśmy
  reverseSpools: z.boolean().default(false), // kierunek obrotu taśmy
  idleBobbing: z.boolean().default(true), // delikatne unoszenie w przestrzeni
  bobbingAmount: z.number().min(0).max(15).default(4.0),
  showScrews: z.boolean().default(true), // śrubki w 4 rogach
  detailsOpacity: z.number().min(0).max(1).default(1.0),

  // Wejście na ekran
  enterType: z.enum(["spring-pop", "smooth-fade", "slide-up", "none"]).default("spring-pop"),
  enterFrame: z.number().min(0).max(3600).default(5),

  // Czas trwania
  durationInFrames: z.number().min(60).max(3600).default(240), // 8 sekund @ 30fps
});

export type SingleCassetteProps = z.infer<typeof SingleCassetteSchema>;

export const defaultSingleCassetteProps: SingleCassetteProps = {
  skinPreset: "mystery-gold",
  showLabel: true,
  labelText: "????",
  labelColor: "#ffffff",
  spoolColor: "#facc15", // złote kółka

  cassetteWidth: 640,
  cassetteHeight: 405,
  cassetteScale: 1.15,
  positionX: 50,
  positionY: 50,

  lineColor: "#ffffff",
  lineWidth: 2.2,
  chassisFill: "#000000",
  transparentBackground: true,

  spoolSpeed: 3.8,
  reverseSpools: false,
  idleBobbing: true,
  bobbingAmount: 4.0,
  showScrews: true,
  detailsOpacity: 1.0,

  enterType: "spring-pop",
  enterFrame: 5,

  durationInFrames: 240, // 8s
};
