// Built-in stylized documentary SVG avatars so characters look great out-of-the-box
// Can be used when user has not uploaded a photo yet

export interface AvatarPreset {
  id: string;
  name: string;
  description: string;
  svgDataUri: string;
}

// Crisp modern monochrome documentary silhouettes / icons encoded as clean SVG data URIs
export const DEFAULT_AVATAR_SILHOUETTE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="%231a1a24"><rect width="200" height="200" fill="%23111118"/><circle cx="100" cy="78" r="42" fill="%23cbd5e1"/><path d="M28 186 c0-42 32-72 72-72 s72 30 72 72 Z" fill="%2394a3b8"/><circle cx="100" cy="100" r="95" fill="none" stroke="%23334155" stroke-width="3"/></svg>`;

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: "silhouette",
    name: "Tajemnicza Postać (Cień)",
    description: "Neutralna sylwetka dokumentalna",
    svgDataUri: DEFAULT_AVATAR_SILHOUETTE,
  },
  {
    id: "suspect",
    name: "Podejrzany / Tajemnica",
    description: "Mroczna sylwetka w kapeluszu i kołnierzu noir",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%230f0f15"/><ellipse cx="100" cy="58" rx="60" ry="14" fill="%23334155"/><path d="M60 58 Q100 25 140 58 Z" fill="%23475569"/><ellipse cx="100" cy="92" rx="36" ry="40" fill="%2394a3b8"/><path d="M40 185 L70 120 L100 145 L130 120 L160 185 Z" fill="%231e293b"/><path d="M20 190 C30 145 70 125 100 125 C130 125 170 145 180 190 Z" fill="%23334155"/></svg>`,
  },
  {
    id: "detective",
    name: "Detektyw / Śledczy",
    description: "Profil badacza z lupą i identyfikatorem",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%2314171f"/><circle cx="100" cy="74" r="38" fill="%23cbd5e1"/><path d="M72 70 Q100 66 128 70" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/><circle cx="85" cy="76" r="4" fill="%230f172a"/><circle cx="115" cy="76" r="4" fill="%230f172a"/><path d="M40 188 C40 140 70 120 100 120 C130 120 160 140 160 188 Z" fill="%2338bdf8" opacity="0.85"/><polygon points="90,122 110,122 105,175 95,175" fill="%23e0f2fe"/></svg>`,
  },
  {
    id: "witness",
    name: "Świadek / Cywil",
    description: "Zamaskowana tożsamość z paskiem anonimizacji",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23181822"/><circle cx="100" cy="75" r="42" fill="%23f1f5f9"/><rect x="55" y="65" width="90" height="20" fill="%23000000" rx="3"/><path d="M30 190 C35 145 70 125 100 125 C130 125 165 145 170 190 Z" fill="%2364748b"/><text x="100" y="79" fill="%23ffffff" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle" letter-spacing="1">ANONIM</text></svg>`,
  },
  {
    id: "official",
    name: "Polityk / Urzędnik",
    description: "Formalna sylwetka w garniturze i krawacie",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%230b0f19"/><circle cx="100" cy="70" r="38" fill="%23f8fafc"/><polygon points="80,115 120,115 108,185 92,185" fill="%23dc2626"/><polygon points="65,115 90,140 70,185 30,190" fill="%231e293b"/><polygon points="135,115 110,140 130,185 170,190" fill="%231e293b"/><polygon points="90,115 100,135 110,115" fill="%23ffffff"/></svg>`,
  },
  {
    id: "scientist",
    name: "Naukowiec / Ekspert",
    description: "Postać w okularach i laboratoryjnym stylu",
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23091e1d"/><circle cx="100" cy="72" r="40" fill="%23e2e8f0"/><circle cx="83" cy="70" r="14" fill="none" stroke="%2310b981" stroke-width="4"/><circle cx="117" cy="70" r="14" fill="none" stroke="%2310b981" stroke-width="4"/><line x1="97" y1="70" x2="103" y2="70" stroke="%2310b981" stroke-width="4"/><path d="M35 190 C40 140 70 120 100 120 C130 120 160 140 165 190 Z" fill="%23f8fafc"/><polygon points="90,120 110,120 115,190 85,190" fill="%23059669"/></svg>`,
  },
];

