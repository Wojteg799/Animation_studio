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
  forumSubtitle: z
    .string()
    .default(
      "Największe polskie archiwum zagadek radiowych i kasetowych z lat 80."
    ),
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
  post1_author: z.string().default("analog_master84"),
  post1_role: z.string().default("Kolekcjoner Taśm"),
  post1_date: z.string().default("14 paź 2007, 18:20"),
  post1_content: z
    .string()
    .default(
      "Przeglądam stare nagrania radiowe z lat 80. Czy ktoś ma jeszcze zgrane audycje z niemieckiego radia NDR z tego okresu? Szukam ciekawych autorskich audycji."
    ),
  post1_hasAudio: z.boolean().default(false),
  post1_audioFile: z.string().default("intro_tape.mp3 [0.8 MB]"),
  post1_avatarColor: z.string().default("#64748b"),
  post1_avatarUrl: z.string().optional(),
  post1_signature: z
    .string()
    .default('analog_master84 | "Szukam audycji z lat 80."'),
  post1_joined: z.string().default("Wrz 2004"),
  post1_postsCount: z.string().default("542"),
  post1_location: z.string().default("Gdańsk"),
  post1_hasQuote: z.boolean().default(false),
  post1_quoteAuthor: z.string().default(""),
  post1_quoteContent: z.string().default(""),

  // Post 2
  post2_author: z.string().default("tape_collector"),
  post2_role: z.string().default("Kolekcjoner Kaset"),
  post2_date: z.string().default("14 paź 2007, 19:45"),
  post2_content: z
    .string()
    .default(
      "Mam kilkanaście kaset Stilon i BASF nagranych z radia w latach 1982-1986. Głównie new wave i synth-pop, ale jest też parę rzeczy zupełnie bez opisu."
    ),
  post2_hasAudio: z.boolean().default(false),
  post2_audioFile: z.string().default("sample_snippet.mp3 [0.6 MB]"),
  post2_avatarColor: z.string().default("#ef4444"),
  post2_avatarUrl: z.string().optional(),
  post2_signature: z
    .string()
    .default('tape_collector | "Stilon Gorzów to klasyka."'),
  post2_joined: z.string().default("Paź 2005"),
  post2_postsCount: z.string().default("1240"),
  post2_location: z.string().default("Polska"),
  post2_hasQuote: z.boolean().default(true),
  post2_quoteAuthor: z.string().default("analog_master84"),
  post2_quoteContent: z
    .string()
    .default("Przeglądam stare nagrania radiowe z lat 80..."),

  // Post 3 (Kluczowy wpis z pytaniem)
  post3_author: z.string().default("bl4nk_tape"),
  post3_role: z.string().default("Archiwista Kaset"),
  post3_date: z.string().default("14 paź 2007, 21:40"),
  post3_content: z
    .string()
    .default(
      "Znalazłem na kasecie z radia NDR (ok. 1984) ten niesamowity utwór. Przeszukałem całe archiwa i nikt ze znajomych nie kojarzy zespołu ani tytułu. Załączam zgrany fragment mp3!"
    ),
  post3_hasAudio: z.boolean().default(true),
  post3_audioFile: z.string().default("radio_rip_ndr_1984.mp3 [1.4 MB]"),
  post3_avatarColor: z.string().default("#38bdf8"),
  post3_avatarUrl: z.string().optional(),
  post3_signature: z
    .string()
    .default('bl4nk_tape | "Taśmy z radia nigdy nie kłamią."'),
  post3_joined: z.string().default("Cze 2006"),
  post3_postsCount: z.string().default("890"),
  post3_location: z.string().default("Berlin / Poznań"),
  post3_hasQuote: z.boolean().default(false),
  post3_quoteAuthor: z.string().default(""),
  post3_quoteContent: z.string().default(""),

  // Post 4
  post4_author: z.string().default("synth_seeker"),
  post4_role: z.string().default("Ekspert Sprzętu 80s"),
  post4_date: z.string().default("14 paź 2007, 22:15"),
  post4_content: z
    .string()
    .default(
      "Syntezator w tle to klasyczny Yamaha DX7. Brzmienie perkusji wskazuje na LinnDrum. Stylistyka post-punk / new wave z Europy Środkowej."
    ),
  post4_hasAudio: z.boolean().default(false),
  post4_audioFile: z.string().default("voice_note.mp3 [0.4 MB]"),
  post4_avatarColor: z.string().default("#10b981"),
  post4_avatarUrl: z.string().optional(),
  post4_signature: z
    .string()
    .default('synth_seeker | "Yamaha DX7 to król lat 80."'),
  post4_joined: z.string().default("Sty 2007"),
  post4_postsCount: z.string().default("430"),
  post4_location: z.string().default("Wrocław"),
  post4_hasQuote: z.boolean().default(false),
  post4_quoteAuthor: z.string().default(""),
  post4_quoteContent: z.string().default(""),

  // Scroll & Animation Timing
  enableScroll: z.boolean().default(true),
  postsToSkip: z.number().min(0).max(3).default(2), // Liczba postów ominiętych przed zatrzymaniem (0, 1, 2, 3)
  scrollStartFrame: z.number().min(0).max(200).default(15),
  scrollDuration: z.number().min(20).max(300).default(90),
  scrollDistance: z.number().min(0).max(1000).default(380),
  highlightPostIndex: z.number().min(0).max(4).default(3),

  // Initial Entrance Blur & Focus
  enableInitialBlur: z.boolean().default(true), // Rozmycie na starcie
  initialBlurStartFrame: z.number().min(0).max(120).default(0), // Klatka, od której zaczyna się wyostrzanie
  initialBlurDuration: z.number().min(5).max(120).default(25), // Czas trwania wyostrzania w klatkach
  initialBlurAmount: z.number().min(0).max(30).default(10), // Maksymalna siła rozmycia (px)

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
  focusStartFrame: z.number().min(0).max(500).default(105), // Klatka rozpoczęcia powiększenia & spotlightu
  focusDuration: z.number().min(5).max(120).default(22), // Czas trwania powiększania w klatkach
  autoSyncFocusWithScroll: z.boolean().default(false), // Czy ma automatycznie zsynchronizować się ze scrollem czy ręcznie
  focusScale: z.number().min(1.0).max(1.15).default(1.04), // Powiększenie wyróżnionego postu
  focusGlowColor: z.string().default("#f59e0b"), // Złoty / bursztynowy kolor ramki focusu
  dimOtherPosts: z.boolean().default(true), // Przyciemnienie pozostałych wpisów
  dimOpacity: z.number().min(0.05).max(0.8).default(0.35),
  dimBlurAmount: z.number().min(0).max(10).default(1.5), // Subtelny blur na niefokusowane posty

  // Question Marker Sweep
  enableTextMarker: z.boolean().default(true), // Animowany żółty zakreślacz tekstu
  markerStartFrame: z.number().min(0).max(500).default(118), // Klatka, w której zakreślacz zaczyna podkreślać
  markerDuration: z.number().min(5).max(120).default(26), // Czas trwania pociągnięcia zakreślaczem
  targetQuestionText: z.string().default("CZY KTOŚ WIE KTO TO ŚPIEWA?"), // Nagłówek pytania

  // Raw Static Attachment (Bez ruchomych fal i play button)
  rawFileAttachment: z.boolean().default(true),

  // Video Duration
  durationInFrames: z.number().min(60).max(900).default(240),
});

export type MusicForumScrollProps = z.infer<typeof MusicForumScrollSchema>;

export const defaultMusicForumScrollProps: MusicForumScrollProps = {
  forumTitle: "LOSTWAVE.ARCHIVE // MUZYCZNE FORUM DYSKUSYJNE",
  forumSubtitle:
    "Największe polskie archiwum zagadek radiowych i kasetowych z lat 80.",
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
  post1_avatarUrl: undefined,
  post1_signature: 'analog_master84 | "Szukam audycji z lat 80."',
  post1_joined: "Wrz 2004",
  post1_postsCount: "542",
  post1_location: "Gdańsk",
  post1_hasQuote: false,
  post1_quoteAuthor: "",
  post1_quoteContent: "",

  post2_author: "tape_collector",
  post2_role: "Kolekcjoner Kaset",
  post2_date: "14 paź 2007, 19:45",
  post2_content:
    "Mam kilkanaście kaset Stilon i BASF nagranych z radia w latach 1982-1986. Głównie new wave i synth-pop, ale jest też parę rzeczy zupełnie bez opisu.",
  post2_hasAudio: false,
  post2_audioFile: "sample_snippet.mp3 [0.6 MB]",
  post2_avatarColor: "#ef4444",
  post2_avatarUrl: undefined,
  post2_signature: 'tape_collector | "Stilon Gorzów to klasyka."',
  post2_joined: "Paź 2005",
  post2_postsCount: "1240",
  post2_location: "Polska",
  post2_hasQuote: true,
  post2_quoteAuthor: "analog_master84",
  post2_quoteContent: "Przeglądam stare nagrania radiowe z lat 80...",

  // POST 3: KLUCZOWY WPIS Z PYTANIEM (TARGET POST)
  post3_author: "bl4nk_tape",
  post3_role: "Archiwista Kaset",
  post3_date: "14 paź 2007, 21:40",
  post3_content:
    "Znalazłem na kasecie z radia NDR (ok. 1984) ten niesamowity utwór. Przeszukałem całe archiwa i nikt ze znajomych nie kojarzy zespołu ani tytułu. Załączam zgrany fragment mp3!",
  post3_hasAudio: true,
  post3_audioFile: "radio_rip_ndr_1984.mp3 [1.4 MB]",
  post3_avatarColor: "#38bdf8",
  post3_avatarUrl: undefined,
  post3_signature: 'bl4nk_tape | "Taśmy z radia nigdy nie kłamią."',
  post3_joined: "Cze 2006",
  post3_postsCount: "890",
  post3_location: "Berlin / Poznań",
  post3_hasQuote: false,
  post3_quoteAuthor: "",
  post3_quoteContent: "",

  post4_author: "synth_seeker",
  post4_role: "Ekspert Sprzętu 80s",
  post4_date: "14 paź 2007, 22:15",
  post4_content:
    "Syntezator w tle to klasyczny Yamaha DX7. Brzmienie perkusji wskazuje na LinnDrum. Stylistyka post-punk / new wave z Europy Środkowej.",
  post4_hasAudio: false,
  post4_audioFile: "voice_note.mp3 [0.4 MB]",
  post4_avatarColor: "#10b981",
  post4_avatarUrl: undefined,
  post4_signature: 'synth_seeker | "Yamaha DX7 to król lat 80."',
  post4_joined: "Sty 2007",
  post4_postsCount: "430",
  post4_location: "Wrocław",
  post4_hasQuote: false,
  post4_quoteAuthor: "",
  post4_quoteContent: "",

  enableScroll: true,
  postsToSkip: 2,
  scrollStartFrame: 15,
  scrollDuration: 90,
  scrollDistance: 380,
  highlightPostIndex: 3,

  // Initial Entrance Blur
  enableInitialBlur: true,
  initialBlurStartFrame: 0,
  initialBlurDuration: 25,
  initialBlurAmount: 10,

  // Focus & Spotlight Effect
  enablePostFocus: true,
  focusPostIndex: 3,
  focusStartFrame: 105,
  focusDuration: 22,
  autoSyncFocusWithScroll: false,
  focusScale: 1.04,
  focusGlowColor: "#f59e0b",
  dimOtherPosts: true,
  dimOpacity: 0.35,
  dimBlurAmount: 1.5,

  // Question Marker Sweep
  enableTextMarker: true,
  markerStartFrame: 118,
  markerDuration: 26,
  targetQuestionText: "CZY KTOŚ WIE KTO TO ŚPIEWA?",

  // Raw Static Attachment
  rawFileAttachment: true,

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
  forumSubtitle: "Największe polskie archiwum zagadek radiowych i kasetowych z lat 80.",
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

