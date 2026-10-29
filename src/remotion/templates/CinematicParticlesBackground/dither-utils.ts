// Helper to interpolate RGB colors with cubic smoothstep easing to eliminate gradient banding

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

// Smoothstep cubic easing: 3t^2 - 2t^3
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

// Generates an ultra-smooth CSS radial-gradient string with 20 interpolated color stops
export function buildSmoothRadialGradient(
  centerHex: string,
  edgeHex: string,
  glowHex?: string
): string {
  const center = hexToRgb(centerHex);
  const edge = hexToRgb(edgeHex);
  const glow = glowHex ? hexToRgb(glowHex) : center;

  const stopsCount = 20;
  const stops: string[] = [];

  for (let i = 0; i <= stopsCount; i++) {
    const t = i / stopsCount;
    // Non-linear perceptual easing: gently spreads the mid-tones to prevent sharp banding rings
    const ease = smoothstep(t);
    const percent = (t * 100).toFixed(1);

    let r: number;
    let g: number;
    let b: number;

    if (t < 0.35) {
      // Core glow falloff
      const localT = t / 0.35;
      const localEase = smoothstep(localT);
      r = Math.round(glow.r + (center.r - glow.r) * localEase);
      g = Math.round(glow.g + (center.g - glow.g) * localEase);
      b = Math.round(glow.b + (center.b - glow.b) * localEase);
    } else {
      // Center to deep edge falloff
      const localT = (t - 0.35) / 0.65;
      const localEase = smoothstep(localT);
      r = Math.round(center.r + (edge.r - center.r) * localEase);
      g = Math.round(center.g + (edge.g - center.g) * localEase);
      b = Math.round(center.b + (edge.b - center.b) * localEase);
    }

    stops.push(`rgb(${r}, ${g}, ${b}) ${percent}%`);
  }

  return `radial-gradient(circle at 50% 50%, ${stops.join(", ")})`;
}

// Pre-generated SVG data-URI for triangular dither noise (neutral 128 mid-tone with TPDF noise)
// This pattern breaks 8-bit quantization steps in dark shades across all browsers and encoders
export const DITHER_SVG_DATA_URL =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
      <filter id="dither-noise" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="
          0.33 0.33 0.33 0 0
          0.33 0.33 0.33 0 0
          0.33 0.33 0.33 0 0
          0    0    0    1 0" />
      </filter>
      <rect width="256" height="256" filter="url(#dither-noise)" />
    </svg>
  `.trim());
