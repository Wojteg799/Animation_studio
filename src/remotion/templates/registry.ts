import { DocumentaryLowerThird } from "./DocumentaryLowerThird";
import {
  DocumentaryLowerThirdProps,
  defaultDocumentaryLowerThirdProps,
} from "./DocumentaryLowerThird/schema";
import { JoyDivisionCassetteMorph } from "./JoyDivisionCassetteMorph";
import {
  JoyDivisionCassetteMorphProps,
  defaultJoyDivisionCassetteMorphProps,
} from "./JoyDivisionCassetteMorph/schema";
import { RetroCassetteIntro } from "./RetroCassetteIntro";
import {
  RetroCassetteIntroProps,
  defaultRetroCassetteIntroProps,
} from "./RetroCassetteIntro/schema";
import { MinimalVoidParticles } from "./MinimalVoidParticles";
import {
  MinimalVoidParticlesProps,
  defaultMinimalVoidParticlesProps,
  presetPitchBlack,
  presetMinimalGlow,
  presetStarDust,
} from "./MinimalVoidParticles/schema";
import { CinematicParticlesBackground } from "./CinematicParticlesBackground";
import {
  CinematicParticlesBackgroundProps,
  defaultCinematicParticlesBackgroundProps,
} from "./CinematicParticlesBackground/schema";
import { DarkParchmentBackground } from "./DarkParchmentBackground";
import {
  DarkParchmentBackgroundProps,
  defaultDarkParchmentBackgroundProps,
} from "./DarkParchmentBackground/schema";

export type TemplateCategory =
  | "Czołówki & Intro (Intros)"
  | "Tła (Backgrounds)"
  | "Dolne Belki (Lower Thirds)"
  | "Osi Czasu & Mapy"
  | "Dane & Statystyki";

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  component: React.FC<any>;
  defaultProps: any;
  defaultDurationInFrames: number;
  tags: string[];
  isBackground?: boolean;
}

export const TEMPLATES: TemplateDefinition[] = [
  // 1. JOY DIVISION: 25 KASET -> UNKNOWN PLEASURES
  {
    id: "joy-division-cassette-morph",
    name: "Joy Division: 25 Kaset → Unknown Pleasures",
    category: "Czołówki & Intro (Intros)",
    description: "25 kaset w minimalistycznym białym outline, które płynnie przeistaczają się w 25 ikonicznych linii gór z okładki Unknown Pleasures Joy Division (pulsar PSR B1919+21).",
    component: JoyDivisionCassetteMorph,
    defaultProps: defaultJoyDivisionCassetteMorphProps,
    defaultDurationInFrames: 240, // 8 seconds at 30fps
    tags: ["Joy Division", "Unknown Pleasures", "25 Kaset", "Morph", "Pulsar", "Retro", "Minimalizm"],
    isBackground: false,
  },

  // 2. RETRO KASETA INTRO & PISMO ODRECZNE
  {
    id: "retro-cassette-intro",
    name: "Intro: Kaseta Magnetofonowa",
    category: "Czołówki & Intro (Intros)",
    description: "Animacja intro: napis 'Horyzont Zdarzeń Prezentuje', wjeżdżająca vintage kaseta magnetofonowa z wirującymi szpulkami taśmy i animowany długopis podpisujący tytuł na etykiecie.",
    component: RetroCassetteIntro,
    defaultProps: defaultRetroCassetteIntroProps,
    defaultDurationInFrames: 210, // 7 seconds at 30fps
    tags: ["Intro", "Czołówka", "Kaseta", "Retro", "Tajemnicza Piosenka", "Pismo Odręczne"],
    isBackground: false,
  },

  // WERSJA 1: Absolutna płaska czerń (Zero Banding)
  {
    id: "minimal-void-particles",
    name: "Wersja 1: Czysta Czerń #000000",
    category: "Tła (Backgrounds)",
    description: "100% płaska, smolista czerń bez żadnego gradientu i winiety. Zero bandingu, krystaliczne białe cząsteczki z delikatnym bokeh w pętli 2 min.",
    component: MinimalVoidParticles,
    defaultProps: presetPitchBlack,
    defaultDurationInFrames: 3600, // 2 minutes at 30fps
    tags: ["Wersja 1", "Płaska Czerń", "Zero Banding", "Pitch Black", "Pętla 2 min"],
    isBackground: true,
  },

  // WERSJA 2: Subtelny Antracyt (Minimal Glow)
  {
    id: "minimal-void-glow",
    name: "Wersja 2: Subtelny Antracyt",
    category: "Tła (Backgrounds)",
    description: "Głęboka czerń z ultra-szeroką, mikroskopijną mgiełką światła (zaledwie ~3.5% poświaty). Bardzo delikatna głębia bez ostrych pierścieni.",
    component: MinimalVoidParticles,
    defaultProps: presetMinimalGlow,
    defaultDurationInFrames: 3600, // 2 minutes at 30fps
    tags: ["Wersja 2", "Minimal Glow", "Subtelna Mgiełka", "Particles", "Pętla 2 min"],
    isBackground: true,
  },

  // WERSJA 3: Gwiezdny Pył 3D (Dual-Layer Dust - Głębia z cząsteczek bez gradientu)
  {
    id: "minimal-void-stardust",
    name: "Wersja 3: Gwiezdny Pył 3D",
    category: "Tła (Backgrounds)",
    description: "Tło 100% czarne #000000 (zero gradientu!), a głębię budują dwie warstwy cząsteczek: 200 mikro-drobin gwiezdnego pyłu w dali + pływające drobinki z przodu.",
    component: MinimalVoidParticles,
    defaultProps: presetStarDust,
    defaultDurationInFrames: 3600, // 2 minutes at 30fps
    tags: ["Wersja 3", "Gwiezdny Pył", "Głębia 3D", "Zero Banding", "Dual-Layer", "Pętla 2 min"],
    isBackground: true,
  },

  // Poprzednie wersje tła
  {
    id: "cinematic-particles-background",
    name: "Czarne Tło z Gradientem (Starsze)",
    category: "Tła (Backgrounds)",
    description: "Ciemne tło z klasycznym gradientem radialnym i winietą.",
    component: CinematicParticlesBackground,
    defaultProps: defaultCinematicParticlesBackgroundProps,
    defaultDurationInFrames: 3600,
    tags: ["Archiwum", "Gradient", "Vignette"],
    isBackground: true,
  },
  {
    id: "dark-parchment-background",
    name: "Ciemny Papier Archiwalny (Starsze)",
    category: "Tła (Backgrounds)",
    description: "Faktura ciemnego papieru archiwalnego, włókna celulozy i powolny kurz.",
    component: DarkParchmentBackground,
    defaultProps: defaultDarkParchmentBackgroundProps,
    defaultDurationInFrames: 3600,
    tags: ["Archiwum", "Papier", "Tekstura"],
    isBackground: true,
  },

  // Nakładki
  {
    id: "documentary-lower-third",
    name: "Archival Dossier / Lower Third",
    category: "Dolne Belki (Lower Thirds)",
    description: "Dokumentalna dolna belka z przezroczystym tłem, znacznikiem tajności, nagłówkiem, rolą, stemplem i wycinkiem zdjęcia.",
    component: DocumentaryLowerThird,
    defaultProps: defaultDocumentaryLowerThirdProps,
    defaultDurationInFrames: 180, // 6 seconds at 30fps
    tags: ["Investigative", "Vox Style", "Biography", "History", "Classified"],
    isBackground: false,
  },
];

export const getTemplateById = (id: string): TemplateDefinition => {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
};
