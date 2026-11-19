// Built-in crisp SVG avatar for young 80s music enthusiast Darius S. with headphones
export const DARIUS_AVATAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="%231e2230"/>
      <stop offset="100%" stop-color="%230c0e14"/>
    </radialGradient>
    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%233b2819"/>
      <stop offset="100%" stop-color="%231a120b"/>
    </linearGradient>
    <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="%232563eb"/>
      <stop offset="100%" stop-color="%231e3a8a"/>
    </linearGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23fed7aa"/>
      <stop offset="100%" stop-color="%23fba96b"/>
    </linearGradient>
    <linearGradient id="phonesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23f59e0b"/>
      <stop offset="100%" stop-color="%23d97706"/>
    </linearGradient>
  </defs>

  <!-- Background Circle -->
  <circle cx="120" cy="120" r="118" fill="url(%23bgGrad)"/>
  <circle cx="120" cy="120" r="116" fill="none" stroke="%23334155" stroke-width="2"/>

  <!-- Subtle 80s Sound Grid Lines in BG -->
  <line x1="30" y1="120" x2="210" y2="120" stroke="%23ffffff" stroke-opacity="0.06" stroke-dasharray="4 4"/>
  <line x1="120" y1="30" x2="120" y2="210" stroke="%23ffffff" stroke-opacity="0.06" stroke-dasharray="4 4"/>

  <!-- Body / Denim Jacket -->
  <path d="M40 236 C45 180 75 160 120 160 C165 160 195 180 200 236 Z" fill="url(%23jacketGrad)"/>
  <!-- T-shirt collar -->
  <path d="M96 160 C96 178 144 178 144 160 Z" fill="%23f8fafc"/>
  <polygon points="120,166 112,192 128,192" fill="%23e2e8f0" opacity="0.6"/>

  <!-- Neck -->
  <rect x="106" y="132" width="28" height="34" rx="6" fill="url(%23skinGrad)"/>

  <!-- Head Base -->
  <ellipse cx="120" cy="100" rx="36" ry="42" fill="url(%23skinGrad)"/>

  <!-- 80s Wavy Hair -->
  <path d="M78 92 C74 54 94 40 120 40 C146 40 166 54 162 92 C158 72 150 64 136 62 C120 60 110 66 100 64 C88 62 82 74 78 92 Z" fill="url(%23hairGrad)"/>
  <!-- Sideburns & bangs -->
  <path d="M84 76 C94 72 110 74 116 78 C124 73 138 72 152 77 C144 68 132 64 120 64 C104 64 92 68 84 76 Z" fill="%232c1c11"/>

  <!-- Simple stylized facial features -->
  <!-- Eyebrows -->
  <path d="M96 90 Q106 88 114 91" stroke="%233b2819" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M126 91 Q134 88 144 90" stroke="%233b2819" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Eyes -->
  <ellipse cx="106" cy="98" rx="3.5" ry="4" fill="%230f172a"/>
  <ellipse cx="134" cy="98" rx="3.5" ry="4" fill="%230f172a"/>
  <circle cx="107" cy="96.5" r="1.2" fill="%23ffffff"/>
  <circle cx="135" cy="96.5" r="1.2" fill="%23ffffff"/>
  <!-- Nose -->
  <path d="M119 100 L117 110 L123 111" stroke="%23d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.6"/>
  <!-- Gentle Smile -->
  <path d="M110 120 Q120 127 130 120" stroke="%239a3412" stroke-width="2.5" stroke-linecap="round" fill="none"/>

  <!-- RETRO 80s VINTAGE HEADPHONES -->
  <!-- Metal Over-head band -->
  <path d="M68 96 C68 44 172 44 172 96" fill="none" stroke="%2394a3b8" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M74 96 C74 52 166 52 166 96" fill="none" stroke="%23cbd5e1" stroke-width="2" stroke-linecap="round"/>
  
  <!-- Left Orange Foam Earpad -->
  <g transform="translate(62, 84)">
    <rect x="0" y="0" width="18" height="42" rx="9" fill="url(%23phonesGrad)"/>
    <rect x="0" y="0" width="18" height="42" rx="9" fill="none" stroke="%23b45309" stroke-width="2"/>
    <line x1="9" y1="8" x2="9" y2="34" stroke="%23fef3c7" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
  </g>

  <!-- Right Orange Foam Earpad -->
  <g transform="translate(160, 84)">
    <rect x="0" y="0" width="18" height="42" rx="9" fill="url(%23phonesGrad)"/>
    <rect x="0" y="0" width="18" height="42" rx="9" fill="none" stroke="%23b45309" stroke-width="2"/>
    <line x1="9" y1="8" x2="9" y2="34" stroke="%23fef3c7" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
  </g>

  <!-- Headphone Cable leading down -->
  <path d="M70 126 C68 150 78 180 88 200 C94 212 98 226 96 240" fill="none" stroke="%231e293b" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;
