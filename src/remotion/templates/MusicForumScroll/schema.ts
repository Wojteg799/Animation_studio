import { z } from "zod";

export const MusicForumScrollSchema = z.object({
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
  post4_avatarColor: z.string().default("#10b981"),

  // Scroll & Animation
  enableScroll: z.boolean().default(true),
  scrollStartFrame: z.number().min(0).max(90).default(20),
  scrollDuration: z.number().min(30).max(240).default(150),
  scrollDistance: z.number().min(0).max(800).default(420),
  highlightPostIndex: z.number().min(0).max(4).default(1),

  // Low Poly & 3D Perspective
  enable3DTilt: z.boolean().default(true),
  tiltAngleX: z.number().min(-25).max(25).default(11),
  tiltAngleY: z.number().min(-25).max(25).default(-7),
  tiltAngleZ: z.number().min(-10).max(10).default(1),
  depthPerspective: z.number().min(600).max(2400).default(1300),
  lowPolyMeshIntensity: z.number().min(0).max(1).default(0.7),
  showFloatingPolygons: z.boolean().default(true),
  colorTheme: z
    .enum(["dark-graphite", "cyber-amber", "classic-blue", "vaporwave"])
    .default("dark-graphite"),
  showScanlines: z.boolean().default(true),

  // Video Duration
  durationInFrames: z.number().min(120).max(600).default(240),
});

export type MusicForumScrollProps = z.infer<typeof MusicForumScrollSchema>;

export const defaultMusicForumScrollProps: MusicForumScrollProps = {
  forumTitle: "LOSTWAVE.ARCHIVE // MUZYCZNE FORUM DYSKUSYJNE",
  threadTitle: "Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy",
  threadCategory: "GŁÓWNA DYSKUSJA / IDENTYFIKACJA UTWORÓW",
  threadDate: "Wątek założony: 14.10.2007 • 142 odpowiedzi",

  post1_author: "bl4nk_tape",
  post1_role: "Archiwista Kaset",
  post1_date: "14 paź 2007, 21:40",
  post1_content:
    "Znalazłem starą kasetę z nagraniem z niemieckiego radia NDR (ok. 1984). Ktoś rozpoznaje ten wokal i syntezator? Załączam zgrany fragment.",
  post1_hasAudio: true,
  post1_audioFile: "radio_rip_ndr_1984.mp3 [1.4 MB]",
  post1_avatarColor: "#38bdf8",

  post2_author: "synth_seeker",
  post2_role: "Ekspert Sprzętu 80s",
  post2_date: "15 paź 2007, 00:15",
  post2_content:
    "Syntezator w tle to klasyczny Yamaha DX7. Brzmienie perkusji wskazuje na LinnDrum. Styl post-punk / new wave z Europy Środkowej.",
  post2_hasAudio: false,
  post2_avatarColor: "#eab308",

  post3_author: "vinyl_hunter_99",
  post3_role: "Poszukiwacz Winyli",
  post3_date: "15 paź 2007, 10:22",
  post3_content:
    "Sprawdziłem niemieckie archiwa GEMA i katalogi wytwórni ZYX. Żadnych oficjalnych wydań. To musiało być nagranie demo nadesłane bezpośrednio do stacji.",
  post3_hasAudio: false,
  post3_avatarColor: "#ef4444",

  post4_author: "lostwave_mod",
  post4_role: "Moderator Forum",
  post4_date: "16 paź 2007, 18:05",
  post4_content:
    "Podbijam temat. Przesłuchujemy audycje 'Musik für junge Leute'. Otwieramy oficjalny arkusz z poszlakami i wykluczonymi zespołami.",
  post4_hasAudio: false,
  post4_avatarColor: "#10b981",

  enableScroll: true,
  scrollStartFrame: 20,
  scrollDuration: 150,
  scrollDistance: 420,
  highlightPostIndex: 1,

  enable3DTilt: true,
  tiltAngleX: 11,
  tiltAngleY: -7,
  tiltAngleZ: 1,
  depthPerspective: 1300,
  lowPolyMeshIntensity: 0.7,
  showFloatingPolygons: true,
  colorTheme: "dark-graphite",
  showScanlines: true,

  durationInFrames: 240, // 8s at 30fps
};

