import { z } from "zod";

export const MusicForumScrollSchema = z.object({
  // Forum Style Variant (Modern Dark vs Retro 2007 Windows XP)
  forumThemeVariant: z
    .enum(["modern-dark", "retro-xp-2007"])
    .default("modern-dark"),
  xpWindowTitle: z
    .string()
    .default("LOSTWAVE.ARCHIVE - Forum Muzyczne 1984 - Microsoft Internet Explorer"),
  xpUrl: z
    .string()
    .default("http://forum.lostwave-archive.pl/viewtopic.php?t=1984"),
  signatureText: z
    .string()
    .default('Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7'),

  // Forum Header Information
  forumTitle: z.string().default("LOSTWAVE.ARCHIVE // MUZYCZNE FORUM DYSKUSYJNE"),
  threadTitle: z
    .string()
    .default("Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy"),
  threadCategory: z
    .string()
    .default("GŁÓWNA DYSKUSJA / IDENTYFIKACJA UTWORÓW"),
  threadDate: z
    .string()
    .default("Wątek założony: 14.10.2007 • 142 odpowiedzi"),

  // Post 1 (Original Post / Question)
  post1_author: z.string().default("bl4nk_tape"),
  post1_role: z.string().default("Archiwista Kaset"),
  post1_date: z.string().default("14 paź 2007, 21:40"),
  post1_content: z
    .string()
    .default(
      "Znalazłem starą kasetę z nagraniem z niemieckiego radia NDR (ok. 1984). Ktoś rozpoznaje ten wokal i syntezator? Załączam zgrany fragment."
    ),
  post1_hasAudio: z.boolean().default(true),
  post1_audioFile: z.string().default("radio_rip_ndr_1984.mp3 [1.4 MB]"),
  post1_avatarColor: z.string().default("#38bdf8"),

  // Post 2
  post2_author: z.string().default("synth_seeker"),
  post2_role: z.string().default("Ekspert Sprzętu 80s"),
  post2_date: z.string().default("15 paź 2007, 00:15"),
  post2_content: z
    .string()
    .default(
      "Syntezator w tle to klasyczny Yamaha DX7. Brzmienie perkusji wskazuje na LinnDrum. Styl post-punk / new wave z Europy Środkowej."
    ),
  post2_hasAudio: z.boolean().default(false),
  post2_audioFile: z.string().default("sample_snippet.mp3 [0.6 MB]"),
  post2_avatarColor: z.string().default("#eab308"),

  // Post 3
  post3_author: z.string().default("vinyl_hunter_99"),
  post3_role: z.string().default("Poszukiwacz Winyli"),
  post3_date: z.string().default("15 paź 2007, 10:22"),
  post3_content: z
    .string()
    .default(
      "Sprawdziłem niemieckie archiwa GEMA i katalogi wytwórni ZYX. Żadnych oficjalnych wydań. To musiało być nagranie demo nadesłane bezpośrednio do stacji."
    ),
  post3_hasAudio: z.boolean().default(false),
  post3_audioFile: z.string().default("radio_rip_ndr_1984.mp3 [1.4 MB]"),
  post3_avatarColor: z.string().default("#ef4444"),

  // Post 4
  post4_author: z.string().default("lostwave_mod"),
  post4_role: z.string().default("Moderator Forum"),
  post4_date: z.string().default("16 paź 2007, 18:05"),
  post4_content: z
    .string()
    .default(
      "Podbijam temat. Przesłuchujemy audycje 'Musik für junge Leute'. Otwieramy oficjalny arkusz z poszlakami i wykluczonymi zespołami."
    ),
  post4_hasAudio: z.boolean().default(false),
  post4_audioFile: z.string().default("voice_note.mp3 [0.4 MB]"),
  post4_avatarColor: z.string().default("#10b981"),

  // Scroll & Animation
  enableScroll: z.boolean().default(true),
  scrollStartFrame: z.number().min(0).max(90).default(20),
  scrollDuration: z.number().min(30).max(240).default(150),
  scrollDistance: z.number().min(0).max(800).default(420),
  highlightPostIndex: z.number().min(0).max(4).default(1),

  // Transparency & Background
  transparentBackground: z.boolean().default(true),

  // Low Poly & 3D Perspective
  enable3DTilt: z.boolean().default(true),
  tiltAngleX: z.number().min(-25).max(25).default(11),
  tiltAngleY: z.number().min(-25).max(25).default(-7),
  tiltAngleZ: z.number().min(-10).max(10).default(1),
  depthPerspective: z.number().min(600).max(2400).default(1300),
  lowPolyMeshIntensity: z.number().min(0).max(1).default(0),
  showFloatingPolygons: z.boolean().default(false),
  colorTheme: z
    .enum(["dark-graphite", "cyber-amber", "classic-blue", "vaporwave"])
    .default("dark-graphite"),
  showScanlines: z.boolean().default(false),

  // Focus & Target Post Effect ("CZY KTOŚ WIE KTO TO ŚPIEWA?")
  enablePostFocus: z.boolean().default(true),
  focusPostIndex: z.number().min(1).max(4).default(3), // Domyślnie post 3
  focusStartFrame: z.number().min(0).max(240).default(110),
  autoSyncFocusWithScroll: z.boolean().default(true), // Synchronizuj moment focusu z zatrzymaniem scrolla
  focusScale: z.number().min(1.0).max(1.15).default(1.04), // Powiększenie wyróżnionego postu
  focusGlowColor: z.string().default("#f59e0b"), // Złoty / bursztynowy kolor ramki focusu
  dimOtherPosts: z.boolean().default(true), // Przyciemnienie pozostałych wpisów
  dimOpacity: z.number().min(0.1).max(0.8).default(0.35),
  enableTextMarker: z.boolean().default(true), // Animowany żółty zakreślacz tekstu
  targetQuestionText: z.string().default("CZY KTOŚ WIE KTO TO ŚPIEWA?"), // Nagłówek pytania

  // Video Duration
  durationInFrames: z.number().min(120).max(600).default(240),
});

export type MusicForumScrollProps = z.infer<typeof MusicForumScrollSchema>;

export const defaultMusicForumScrollProps: MusicForumScrollProps = {
  forumTitle: "LOSTWAVE.ARCHIVE // MUZYCZNE FORUM DYSKUSYJNE",
  threadTitle: "Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy",
  threadCategory: "GŁÓWNA DYSKUSJA / IDENTYFIKACJA UTWORÓW",
  threadDate: "Wątek założony: 14.10.2007 • 142 odpowiedzi",

  post1_author: "analog_master84",
  post1_role: "Kolekcjoner Taśm",
  post1_date: "14 paź 2007, 18:20",
  post1_content:
    "Przeglądam stare nagrania radiowe z lat 80. Czy ktoś ma jeszcze zgrane audycje z niemieckiego radia NDR z tego okresu? Szukam ciekawych autorskich audycji.",
  post1_hasAudio: false,
  post1_audioFile: "intro_tape.mp3 [0.8 MB]",
  post1_avatarColor: "#64748b",

  post2_author: "tape_collector",
  post2_role: "Kolekcjoner Kaset",
  post2_date: "14 paź 2007, 19:45",
  post2_content:
    "Mam kilkanaście kaset Stilon i BASF nagranych z radia w latach 1982-1986. Głównie new wave i synth-pop, ale jest też parę rzeczy zupełnie bez opisu.",
  post2_hasAudio: false,
  post2_audioFile: "sample_snippet.mp3 [0.6 MB]",
  post2_avatarColor: "#ef4444",

  // POST 3: KLUCZOWY WPIS Z PYTANIEM (TARGET POST)
  post3_author: "bl4nk_tape",
  post3_role: "Archiwista Kaset",
  post3_date: "14 paź 2007, 21:40",
  post3_content:
    "Znalazłem na kasecie z radia NDR (ok. 1984) ten niesamowity utwór. Przeszukałem całe archiwa i nikt ze znajomych nie kojarzy zespołu ani tytułu. Załączam zgrany fragment mp3!",
  post3_hasAudio: true,
  post3_audioFile: "radio_rip_ndr_1984.mp3 [1.4 MB]",
  post3_avatarColor: "#38bdf8",

  post4_author: "synth_seeker",
  post4_role: "Ekspert Sprzętu 80s",
  post4_date: "14 paź 2007, 22:15",
  post4_content:
    "Syntezator w tle to klasyczny Yamaha DX7. Brzmienie perkusji wskazuje na LinnDrum. Stylistyka post-punk / new wave z Europy Środkowej.",
  post4_hasAudio: false,
  post4_audioFile: "voice_note.mp3 [0.4 MB]",
  post4_avatarColor: "#10b981",

  enableScroll: true,
  scrollStartFrame: 15,
  scrollDuration: 95,
  scrollDistance: 380,
  highlightPostIndex: 3,

  // Focus & Spotlight Effect
  enablePostFocus: true,
  focusPostIndex: 3,
  focusStartFrame: 110,
  autoSyncFocusWithScroll: true,
  focusScale: 1.04,
  focusGlowColor: "#f59e0b",
  dimOtherPosts: true,
  dimOpacity: 0.35,
  enableTextMarker: true,
  targetQuestionText: "CZY KTOŚ WIE KTO TO ŚPIEWA?",

  transparentBackground: true,
  enable3DTilt: true,
  tiltAngleX: 11,
  tiltAngleY: -7,
  tiltAngleZ: 1,
  depthPerspective: 1300,
  lowPolyMeshIntensity: 0,
  showFloatingPolygons: false,
  colorTheme: "dark-graphite",
  showScanlines: false,

  forumThemeVariant: "modern-dark",
  xpWindowTitle:
    "LOSTWAVE.ARCHIVE - Forum Muzyczne 1984 - Microsoft Internet Explorer",
  xpUrl: "http://forum.lostwave-archive.pl/viewtopic.php?t=1984",
  signatureText:
    'Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7',

  durationInFrames: 240, // 8s at 30fps
};

export const defaultMusicForum2007XPProps: MusicForumScrollProps = {
  ...defaultMusicForumScrollProps,
  forumThemeVariant: "retro-xp-2007",
  forumTitle: "LOSTWAVE-FORUM.PL // POLSKIE ARCHIWUM KASETOWE",
  threadTitle: "Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy",
  threadCategory: "GŁÓWNA DYSKUSJA / IDENTYFIKACJA UTWORÓW Z LAT 80.",
  threadDate: "Wysłany: Niedziela, 14 Paź 2007, 21:40 • 142 odpowiedzi",
  xpWindowTitle:
    "LOSTWAVE.ARCHIVE - Forum Muzyczne 1984 - Microsoft Internet Explorer",
  xpUrl: "http://forum.lostwave-archive.pl/viewtopic.php?t=1984",
  signatureText:
    'Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7',
  transparentBackground: true,
  enable3DTilt: true,
  tiltAngleX: 7,
  tiltAngleY: -5,
  tiltAngleZ: 0.5,
  depthPerspective: 1350,
  lowPolyMeshIntensity: 0,
  showFloatingPolygons: false,
  showScanlines: false,
};

