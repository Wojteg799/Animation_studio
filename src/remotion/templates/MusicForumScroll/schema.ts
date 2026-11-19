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
  post1_author: z.string().default("analog_master84"),
  post1_role: z.string().default("Kolekcjoner Taśm"),
  post1_date: z.string().default("14 paź 2007, 18:20"),
  post1_subject: z
    .string()
    .default("Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy"),
  post1_location: z.string().default("Hamburg, Niemcy"),
  post1_joined: z.string().default("Sie 2004"),
  post1_postsCount: z.string().default("1,420"),
  post1_reputation: z.string().default("Pomógł: 42 razy"),
  post1_warnings: z.string().default("Ostrzeżenia: [ 0 / 3 ]"),
  post1_signature: z
    .string()
    .default('Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7'),
  post1_editNote: z.string().default(""),
  post1_content: z
    .string()
    .default(
      "Przeglądam stare nagrania radiowe z lat 80. Czy ktoś ma jeszcze zgrane audycje z niemieckiego radia [b]NDR[/b] z tego okresu?\nSzukam autorskich audycji [i]Musik für junge Leute[/i]. [spoiler]Kolekcja zawiera taśmy oznaczone symbolem #X-84[/spoiler]"
    ),
  post1_hasAudio: z.boolean().default(false),
  post1_audioFile: z.string().default("intro_tape.mp3 [0.8 MB]"),
  post1_avatarColor: z.string().default("#64748b"),

  // Post 2
  post2_author: z.string().default("tape_collector"),
  post2_role: z.string().default("Kolekcjoner Kaset"),
  post2_date: z.string().default("14 paź 2007, 19:45"),
  post2_subject: z
    .string()
    .default("Re: Tajemnicza piosenka z radia NDR (1984)"),
  post2_location: z.string().default("Bremen / Studio"),
  post2_joined: z.string().default("Kwi 2006"),
  post2_postsCount: z.string().default("389"),
  post2_reputation: z.string().default("Pochwały: 18"),
  post2_warnings: z.string().default("Ostrzeżenia: [ 1 / 3 ]"),
  post2_signature: z
    .string()
    .default('tape_collector | "Stilon Gorzów to klasyka." | [s]Nie szukajcie w katalogu ZYX[/s]'),
  post2_editNote: z.string().default(""),
  post2_content: z
    .string()
    .default(
      "[quote=analog_master84]Czy ktoś ma jeszcze zgrane audycje z niemieckiego radia NDR?[/quote]\nMam kilkanaście kaset [b]BASF[/b] i [b]Stilon[/b] z lat 1982-1986. [s]To nie było zgrane z radia[/s] [color=#38bdf8]Jeden utwór nie pasuje do żadnego znanego zespołu![/color] :shock:\n\n[code]INDEX: TAPE_04 // FREQ: 10.45 kHz // BIAS: HIGH[/code]"
    ),
  post2_hasAudio: z.boolean().default(false),
  post2_audioFile: z.string().default("sample_snippet.mp3 [0.6 MB]"),
  post2_avatarColor: z.string().default("#ef4444"),

  // Post 3
  post3_author: z.string().default("bl4nk_tape"),
  post3_role: z.string().default("Archiwista Kaset"),
  post3_date: z.string().default("14 paź 2007, 21:40"),
  post3_subject: z
    .string()
    .default("PILNE: Znalazłem nagranie! Odsłuchajcie załącznik mp3"),
  post3_location: z.string().default("Piwnica z kasetami"),
  post3_joined: z.string().default("Paź 2007"),
  post3_postsCount: z.string().default("14"),
  post3_reputation: z.string().default("Nowy poszukiwacz"),
  post3_warnings: z.string().default("Ostrzeżenia: [ 0 / 3 ]"),
  post3_signature: z
    .string()
    .default('bl4nk_tape | "Kaseta BASF LH-EI 90 | Ostatnia nadzieja na identyfikację"'),
  post3_editNote: z
    .string()
    .default(
      "Ostatnio zmieniony przez bl4nk_tape dnia 14 paź 2007, 22:04, łącznie zmieniany 2 razy. Powód: usunięto wzmiankę o taśmie nr 4"
    ),
  post3_content: z
    .string()
    .default(
      "Znalazłem na kasecie ten niesamowity utwór. Przeszukałem archiwa [u]GEMA[/u] i katalogi [b]ZYX Music[/b] – [color=#ef4444]ZERO WYNIKÓW[/color] :O\nZałączam surowy plik zgrany bezpośrednio z magnetofonu.\n[spoiler]POSZLAKA: W 0:38 słychać niemieckiego prezentera mówiącego o zespole z Hamburga[/spoiler]"
    ),
  post3_hasAudio: z.boolean().default(true),
  post3_audioFile: z.string().default("radio_rip_ndr_1984.mp3 [1.4 MB]"),
  post3_avatarColor: z.string().default("#38bdf8"),

  // Post 4
  post4_author: z.string().default("synth_seeker"),
  post4_role: z.string().default("Ekspert Sprzętu 80s"),
  post4_date: z.string().default("14 paź 2007, 22:15"),
  post4_subject: z
    .string()
    .default("Re: Tajemnicza piosenka z radia NDR (1984) - Poszlaki"),
  post4_location: z.string().default("Baza Danych NDR"),
  post4_joined: z.string().default("Maj 2003"),
  post4_postsCount: z.string().default("4,892"),
  post4_reputation: z.string().default("Pomógł: 512 razy"),
  post4_warnings: z.string().default("Czyste konto (MODERATOR)"),
  post4_signature: z
    .string()
    .default('lostwave_mod | "Przestrzegaj regulaminu! Nie publikuj numerów telefonów." // [b]LOSTWAVE 2007[/b]'),
  post4_editNote: z.string().default(""),
  post4_content: z
    .string()
    .default(
      "[badge=ADMIN]MODERACJA[/badge] Podbijam temat. Sprawdziłem syntezator w tle – to klasyczny [b]Yamaha DX7[/b].\n[code]STATUS: ŚLEDZTWO W TOKU // PODEJRZANI WYKLUCZENI: 12[/code]\n[s]Nie piszcie do stacji radiowej[/s] Przesłuchujemy kolejne taśmy :D"
    ),
  post4_hasAudio: z.boolean().default(false),
  post4_audioFile: z.string().default("voice_note.mp3 [0.4 MB]"),
  post4_avatarColor: z.string().default("#10b981"),

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
  threadTitle: "Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy",
  threadCategory: "GŁÓWNA DYSKUSJA / IDENTYFIKACJA UTWORÓW",
  threadDate: "Wątek założony: 14.10.2007 • 142 odpowiedzi",

  post1_author: "analog_master84",
  post1_role: "Kolekcjoner Taśm",
  post1_date: "14 paź 2007, 18:20",
  post1_subject: "Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy",
  post1_location: "Hamburg, Niemcy",
  post1_joined: "Sie 2004",
  post1_postsCount: "1,420",
  post1_reputation: "Pomógł: 42 razy",
  post1_warnings: "Ostrzeżenia: [ 0 / 3 ]",
  post1_signature: 'Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7',
  post1_editNote: "",
  post1_content:
    "Przeglądam stare nagrania radiowe z lat 80. Czy ktoś ma jeszcze zgrane audycje z niemieckiego radia [b]NDR[/b] z tego okresu?\nSzukam autorskich audycji [i]Musik für junge Leute[/i]. [spoiler]Kolekcja zawiera taśmy oznaczone symbolem #X-84[/spoiler]",
  post1_hasAudio: false,
  post1_audioFile: "intro_tape.mp3 [0.8 MB]",
  post1_avatarColor: "#64748b",

  post2_author: "tape_collector",
  post2_role: "Kolekcjoner Kaset",
  post2_date: "14 paź 2007, 19:45",
  post2_subject: "Re: Tajemnicza piosenka z radia NDR (1984)",
  post2_location: "Bremen / Studio",
  post2_joined: "Kwi 2006",
  post2_postsCount: "389",
  post2_reputation: "Pochwały: 18",
  post2_warnings: "Ostrzeżenia: [ 1 / 3 ]",
  post2_signature: 'tape_collector | "Stilon Gorzów to klasyka." | [s]Nie szukajcie w katalogu ZYX[/s]',
  post2_editNote: "",
  post2_content:
    "[quote=analog_master84]Czy ktoś ma jeszcze zgrane audycje z niemieckiego radia NDR?[/quote]\nMam kilkanaście kaset [b]BASF[/b] i [b]Stilon[/b] z lat 1982-1986. [s]To nie było zgrane z radia[/s] [color=#38bdf8]Jeden utwór nie pasuje do żadnego znanego zespołu![/color] :shock:\n\n[code]INDEX: TAPE_04 // FREQ: 10.45 kHz // BIAS: HIGH[/code]",
  post2_hasAudio: false,
  post2_audioFile: "sample_snippet.mp3 [0.6 MB]",
  post2_avatarColor: "#ef4444",

  // POST 3: KLUCZOWY WPIS Z PYTANIEM (TARGET POST)
  post3_author: "bl4nk_tape",
  post3_role: "Archiwista Kaset",
  post3_date: "14 paź 2007, 21:40",
  post3_subject: "PILNE: Znalazłem nagranie! Odsłuchajcie załącznik mp3",
  post3_location: "Piwnica z kasetami",
  post3_joined: "Paź 2007",
  post3_postsCount: "14",
  post3_reputation: "Nowy poszukiwacz",
  post3_warnings: "Ostrzeżenia: [ 0 / 3 ]",
  post3_signature: 'bl4nk_tape | "Kaseta BASF LH-EI 90 | Ostatnia nadzieja na identyfikację"',
  post3_editNote:
    "Ostatnio zmieniony przez bl4nk_tape dnia 14 paź 2007, 22:04, łącznie zmieniany 2 razy. Powód: usunięto wzmiankę o taśmie nr 4",
  post3_content:
    "Znalazłem na kasecie ten niesamowity utwór. Przeszukałem archiwa [u]GEMA[/u] i katalogi [b]ZYX Music[/b] – [color=#ef4444]ZERO WYNIKÓW[/color] :O\nZałączam surowy plik zgrany bezpośrednio z magnetofonu.\n[spoiler]POSZLAKA: W 0:38 słychać niemieckiego prezentera mówiącego o zespole z Hamburga[/spoiler]",
  post3_hasAudio: true,
  post3_audioFile: "radio_rip_ndr_1984.mp3 [1.4 MB]",
  post3_avatarColor: "#38bdf8",

  post4_author: "synth_seeker",
  post4_role: "Ekspert Sprzętu 80s",
  post4_date: "14 paź 2007, 22:15",
  post4_subject: "Re: Tajemnicza piosenka z radia NDR (1984) - Poszlaki",
  post4_location: "Baza Danych NDR",
  post4_joined: "Maj 2003",
  post4_postsCount: "4,892",
  post4_reputation: "Pomógł: 512 razy",
  post4_warnings: "Czyste konto (MODERATOR)",
  post4_signature: 'lostwave_mod | "Przestrzegaj regulaminu! Nie publikuj numerów telefonów." // [b]LOSTWAVE 2007[/b]',
  post4_editNote: "",
  post4_content:
    "[badge=ADMIN]MODERACJA[/badge] Podbijam temat. Sprawdziłem syntezator w tle – to klasyczny [b]Yamaha DX7[/b].\n[code]STATUS: ŚLEDZTWO W TOKU // PODEJRZANI WYKLUCZENI: 12[/code]\n[s]Nie piszcie do stacji radiowej[/s] Przesłuchujemy kolejne taśmy :D",
  post4_hasAudio: false,
  post4_audioFile: "voice_note.mp3 [0.4 MB]",
  post4_avatarColor: "#10b981",

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

