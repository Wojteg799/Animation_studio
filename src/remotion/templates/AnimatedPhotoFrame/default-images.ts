// High-quality stylized SVG sample photos for documentary framing
// Used out-of-the-box before the user uploads their own image

export interface SampleImagePreset {
  id: string;
  name: string;
  description: string;
  url: string;
}

// 1. Vintage Studio Cassette & Reels (High aesthetic documentary photo)
export const SAMPLE_VINTAGE_TAPE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="%232d3748"/>
      <stop offset="60%" stop-color="%23111827"/>
      <stop offset="100%" stop-color="%23030712"/>
    </radialGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"/>
      <feBlend mode="screen" in="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(%23bgGrad)"/>
  
  <!-- Desk surface line -->
  <line x1="0" y1="520" x2="1200" y2="520" stroke="%23374151" stroke-width="2"/>
  
  <!-- Vintage Audio Cassette in center -->
  <g transform="translate(420, 210)">
    <!-- Cassette Body -->
    <rect x="0" y="0" width="360" height="225" rx="14" fill="%2318181b" stroke="%2352525b" stroke-width="4"/>
    <rect x="25" y="25" width="310" height="155" rx="8" fill="%23f4f4f5"/>
    <rect x="55" y="45" width="250" height="70" fill="%23ef4444" opacity="0.9"/>
    <text x="180" y="88" fill="%23ffffff" font-family="monospace" font-size="16" font-weight="900" text-anchor="middle" letter-spacing="2">RADIO NDR RECORDING // 1984</text>
    
    <!-- Spool windows -->
    <rect x="90" y="125" width="180" height="45" rx="6" fill="%2327272a"/>
    <circle cx="130" cy="147" r="16" fill="%23ffffff"/>
    <circle cx="130" cy="147" r="8" fill="%2327272a"/>
    <circle cx="230" cy="147" r="16" fill="%23ffffff"/>
    <circle cx="230" cy="147" r="8" fill="%2327272a"/>
    <line x1="146" y1="147" x2="214" y2="147" stroke="%2371717a" stroke-width="4"/>
    
    <!-- Screws -->
    <circle cx="14" cy="14" r="3.5" fill="%2371717a"/>
    <circle cx="346" cy="14" r="3.5" fill="%2371717a"/>
    <circle cx="14" cy="211" r="3.5" fill="%2371717a"/>
    <circle cx="346" cy="211" r="3.5" fill="%2371717a"/>
  </g>
  
  <!-- Studio lighting smudges -->
  <ellipse cx="600" cy="180" rx="300" ry="120" fill="%2360a5fa" opacity="0.08"/>
  <text x="60" y="620" fill="%239ca3af" font-family="monospace" font-size="14" letter-spacing="3">ARCHIVAL MASTER TAPE • TRACK #01 // BASKET EX-1</text>
</svg>`;

// 2. Archival Evidence / Dossier File
export const SAMPLE_DOSSIER_FILE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <rect width="1200" height="675" fill="%230c0a09"/>
  <!-- Archival Folder -->
  <g transform="translate(360, 80)">
    <rect x="0" y="0" width="480" height="520" rx="8" fill="%23e7e5e4"/>
    <rect x="0" y="0" width="480" height="50" rx="4" fill="%23d6d3d1"/>
    <text x="24" y="32" fill="%2344403c" font-family="monospace" font-size="14" font-weight="900" letter-spacing="2">FEDERAL INVESTIGATION DOSSIER #84-A</text>
    
    <!-- Document contents -->
    <line x1="40" y1="90" x2="440" y2="90" stroke="%2378716c" stroke-width="2"/>
    <line x1="40" y1="120" x2="380" y2="120" stroke="%23a8a29e" stroke-width="1.5"/>
    <line x1="40" y1="145" x2="420" y2="145" stroke="%23a8a29e" stroke-width="1.5"/>
    
    <!-- Redacted black bars -->
    <rect x="40" y="180" width="260" height="16" fill="%231c1917"/>
    <rect x="315" y="180" width="110" height="16" fill="%231c1917"/>
    <rect x="40" y="210" width="390" height="16" fill="%231c1917"/>
    
    <!-- Attached Photo with paperclip -->
    <g transform="translate(180, 270)">
      <rect x="0" y="0" width="180" height="180" fill="%231c1917" stroke="%23fafaf9" stroke-width="6"/>
      <circle cx="90" cy="70" r="32" fill="%2378716c"/>
      <path d="M40 160 C45 120 70 100 90 100 C110 100 135 120 140 160 Z" fill="%2357534e"/>
      <rect x="30" y="55" width="120" height="20" fill="%23000000"/>
      <!-- Red stamp -->
      <g transform="translate(60, 90) rotate(-15)">
        <rect x="0" y="0" width="110" height="32" fill="none" stroke="%23dc2626" stroke-width="3"/>
        <text x="55" y="22" fill="%23dc2626" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">CONFIDENTIAL</text>
      </g>
    </g>
  </g>
</svg>`;

// 3. Vintage Vinyl & Turntable Noir
export const SAMPLE_VINYL_NOIR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <rect width="1200" height="675" fill="%2309090b"/>
  <g transform="translate(600, 337)">
    <!-- Vinyl Grooves -->
    <circle cx="0" cy="0" r="280" fill="%2318181b" stroke="%2327272a" stroke-width="2"/>
    <circle cx="0" cy="0" r="250" fill="none" stroke="%2327272a" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="220" fill="none" stroke="%2327272a" stroke-width="1"/>
    <circle cx="0" cy="0" r="190" fill="none" stroke="%2327272a" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="160" fill="none" stroke="%2327272a" stroke-width="1"/>
    <circle cx="0" cy="0" r="130" fill="none" stroke="%2327272a" stroke-width="1.5"/>
    <!-- Center Label -->
    <circle cx="0" cy="0" r="95" fill="%23ea580c"/>
    <circle cx="0" cy="0" r="90" fill="%23c2410c"/>
    <text x="0" y="-15" fill="%23ffffff" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="2">UNKNOWN 45 RPM</text>
    <text x="0" y="8" fill="%23fed7aa" font-family="sans-serif" font-size="10" text-anchor="middle">SUB-POP ARCHIVE • 1984</text>
    <circle cx="0" cy="0" r="12" fill="%2309090b"/>
  </g>
</svg>`;

export const SAMPLE_PRESETS: SampleImagePreset[] = [
  {
    id: "vintage-tape",
    name: "Kaseta NDR 1984 (Retro Audio)",
    description: "Klimatyczne ujęcie kasety magnetofonowej ze studyjnym oświetleniem",
    url: SAMPLE_VINTAGE_TAPE,
  },
  {
    id: "dossier-file",
    name: "Teczka Śledcza (Dossier)",
    description: "Utajniony dokument ze stemplem CONFIDENTIAL i zdjęciem świadka",
    url: SAMPLE_DOSSIER_FILE,
  },
  {
    id: "vinyl-noir",
    name: "Czarny Winyl 45 RPM (Noir)",
    description: "Makro ujęcie analogowej płyty winylowej z pomarańczową etykietą",
    url: SAMPLE_VINYL_NOIR,
  },
];
