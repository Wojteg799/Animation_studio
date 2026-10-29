// Procedural High-Definition Paper Texture Engine for Dark Archival Documents

export interface PaperPalette {
  name: string;
  bgBase: string; // Base deep tone
  bgCenter: string; // Lamp illuminated center tone
  fiberLight: string; // Cellulose fibers (light threads)
  fiberDark: string; // Paper pulp shadows
  creaseColor: string; // Subtle document fold
}

export const PAPER_PALETTES: Record<string, PaperPalette> = {
  "charcoal-dossier": {
    name: "Charcoal Dossier",
    bgBase: "#0a0b0e",
    bgCenter: "#181b24",
    fiberLight: "rgba(225, 235, 250, 0.22)",
    fiberDark: "rgba(5, 6, 8, 0.65)",
    creaseColor: "rgba(255, 255, 255, 0.05)",
  },
  "aged-sepia": {
    name: "Aged Sepia Document",
    bgBase: "#0c0a07",
    bgCenter: "#221a12",
    fiberLight: "rgba(250, 225, 180, 0.24)",
    fiberDark: "rgba(8, 6, 4, 0.65)",
    creaseColor: "rgba(255, 220, 160, 0.06)",
  },
  "black-vellum": {
    name: "Black Archival Vellum",
    bgBase: "#070709",
    bgCenter: "#15151a",
    fiberLight: "rgba(240, 240, 245, 0.20)",
    fiberDark: "rgba(3, 3, 4, 0.7)",
    creaseColor: "rgba(255, 255, 255, 0.04)",
  },
  "midnight-ink": {
    name: "Midnight Ink Wash",
    bgBase: "#070b14",
    bgCenter: "#131d30",
    fiberLight: "rgba(180, 215, 255, 0.22)",
    fiberDark: "rgba(4, 7, 12, 0.65)",
    creaseColor: "rgba(160, 210, 255, 0.05)",
  },
};

// Deterministic Pseudo-Random Generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Draws an authentic, physical dark archival paper texture into a canvas
 */
export function drawDarkPaperTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: {
    paperStyle: string;
    textureIntensity: number; // 0.2 to 1.0
    fiberDetail: number; // 0.2 to 1.0
    agedEdgesStrength: number; // 0.2 to 1.0
    lightingMode: "desk-lamp" | "top-left-beam" | "ambient-haze";
    lightingWarmth: number; // 0 to 1
    seed: number;
  }
) {
  const {
    paperStyle,
    textureIntensity,
    fiberDetail,
    agedEdgesStrength,
    lightingMode,
    lightingWarmth,
    seed,
  } = options;

  const palette = PAPER_PALETTES[paperStyle] || PAPER_PALETTES["charcoal-dossier"];

  // 1. BASE: Deep paper background tone
  ctx.fillStyle = palette.bgBase;
  ctx.fillRect(0, 0, width, height);

  // 2. DESK LAMP / AMBIENT LIGHTING SPOTLIGHT
  let gradCenterX = width * 0.5;
  let gradCenterY = height * 0.46;
  let gradRadius = Math.max(width, height) * 0.75;

  if (lightingMode === "top-left-beam") {
    gradCenterX = width * 0.22;
    gradCenterY = height * 0.22;
    gradRadius = Math.max(width, height) * 0.9;
  } else if (lightingMode === "ambient-haze") {
    gradRadius = Math.max(width, height) * 1.1;
  }

  const lightGrad = ctx.createRadialGradient(
    gradCenterX,
    gradCenterY,
    0,
    gradCenterX,
    gradCenterY,
    gradRadius
  );

  lightGrad.addColorStop(0, palette.bgCenter);
  lightGrad.addColorStop(0.45, palette.bgCenter);
  lightGrad.addColorStop(0.75, palette.bgBase);
  lightGrad.addColorStop(1, "#000000");

  ctx.fillStyle = lightGrad;
  ctx.fillRect(0, 0, width, height);

  // Warmth cast from the desk lamp
  if (lightingWarmth > 0) {
    const warmthGrad = ctx.createRadialGradient(
      gradCenterX,
      gradCenterY,
      0,
      gradCenterX,
      gradCenterY,
      gradRadius * 0.7
    );
    warmthGrad.addColorStop(0, `rgba(255, 210, 160, ${0.08 * lightingWarmth})`);
    warmthGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = warmthGrad;
    ctx.fillRect(0, 0, width, height);
  }

  // 3. ORGANIC PAPER PULP STIPPLE (Cold-press paper texture)
  // We draw thousands of tiny micro-pulp dots with varied density
  const pulpCount = Math.floor(28000 * textureIntensity);
  ctx.save();
  for (let i = 0; i < pulpCount; i++) {
    const s1 = seededRandom(seed + i * 7.1 + 1);
    const s2 = seededRandom(seed + i * 13.3 + 2);
    const s3 = seededRandom(seed + i * 19.9 + 3);
    const s4 = seededRandom(seed + i * 27.7 + 4);

    const x = s1 * width;
    const y = s2 * height;
    const r = 0.6 + s3 * 1.4;

    // 60% dark pulp depressions, 40% light pulp grain highlights
    if (s4 > 0.4) {
      ctx.fillStyle = palette.fiberDark;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = palette.fiberLight;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // 4. CELLULOSE FIBERS (Real visible, tangible threads embedded in the paper)
  // Curved micro-threads that give the undeniable look of authentic pressed rag/cotton paper
  const fiberCount = Math.floor(950 * fiberDetail * textureIntensity);
  ctx.save();
  ctx.lineWidth = 1.0;
  ctx.lineCap = "round";

  for (let i = 0; i < fiberCount; i++) {
    const s1 = seededRandom(seed + i * 31.7 + 5);
    const s2 = seededRandom(seed + i * 37.9 + 6);
    const s3 = seededRandom(seed + i * 43.1 + 7);
    const s4 = seededRandom(seed + i * 49.3 + 8);
    const s5 = seededRandom(seed + i * 53.9 + 9);

    const startX = s1 * width;
    const startY = s2 * height;
    const length = 12 + s3 * 35; // 12px to 47px length
    const angle = s4 * Math.PI * 2;
    const bend = (s5 - 0.5) * 16; // curve deviation

    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;
    const ctrlX = (startX + endX) / 2 + Math.cos(angle + Math.PI / 2) * bend;
    const ctrlY = (startY + endY) / 2 + Math.sin(angle + Math.PI / 2) * bend;

    // Fibers can be light cellulose or dark embedded threads
    const isLight = s3 > 0.35;
    const alpha = (0.08 + s4 * 0.18) * textureIntensity;

    ctx.strokeStyle = isLight
      ? palette.fiberLight.replace(/[\d.]+\)$/, `${alpha})`)
      : palette.fiberDark.replace(/[\d.]+\)$/, `${alpha * 1.5})`);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
    ctx.stroke();
  }
  ctx.restore();

  // 5. SUBTLE DOCUMENT FOLD / CREASE (Dyskretna linia zagięcia starego dokumentu)
  ctx.save();
  const creaseY = height * 0.52;
  const creaseGrad = ctx.createLinearGradient(0, creaseY - 12, 0, creaseY + 12);
  creaseGrad.addColorStop(0, "transparent");
  creaseGrad.addColorStop(0.48, "rgba(0, 0, 0, 0.45)");
  creaseGrad.addColorStop(0.52, palette.creaseColor);
  creaseGrad.addColorStop(1, "transparent");

  ctx.fillStyle = creaseGrad;
  ctx.fillRect(0, creaseY - 12, width, 24);
  ctx.restore();

  // 6. AGED BURNT EDGES & PERIMETER VIGNETTE
  ctx.save();
  const edgeVignette = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    Math.min(width, height) * 0.35,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.72
  );
  const maxBurn = agedEdgesStrength;
  edgeVignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  edgeVignette.addColorStop(0.55, `rgba(0, 0, 0, ${0.35 * maxBurn})`);
  edgeVignette.addColorStop(0.85, `rgba(0, 0, 0, ${0.75 * maxBurn})`);
  edgeVignette.addColorStop(1, `rgba(0, 0, 0, ${0.98 * maxBurn})`);

  ctx.fillStyle = edgeVignette;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}
