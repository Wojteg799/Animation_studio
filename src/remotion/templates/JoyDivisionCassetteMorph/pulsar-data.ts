// Deterministic pseudo-random generator
function pseudoRand(seed: number): number {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export interface PulsarPoint {
  u: number; // 0.0 to 1.0 (normalized horizontal position across the wave)
  elevation: number; // upward displacement in pixels (0 is flat baseline, >0 is peak)
}

export interface PulsarLineDef {
  lineIndex: number; // 0 to 24
  points: PulsarPoint[];
}

/**
 * Generates the 25 iconic Joy Division (CP 1919 / PSR B1919+21) pulsar waveforms.
 * Each of the 25 lines has its unique mountain profile, twin peaks, and jagged radio noise.
 */
export function generateJoyDivisionPulsarData(
  samplesPerLine: number = 100,
  peakHeightMultiplier: number = 1.0,
  noiseIntensity: number = 1.0,
  frame: number = 0
): PulsarLineDef[] {
  const lines: PulsarLineDef[] = [];
  const TOTAL_LINES = 25;

  for (let i = 0; i < TOTAL_LINES; i++) {
    const points: PulsarPoint[] = [];

    // Line characteristics based on vertical index:
    // Lines 6-16 have the highest, most jagged mountain peaks, exactly like the album cover
    const centerFactor = 1.0 - Math.pow((i - 11) / 13, 2);
    const linePeakScale = (0.55 + Math.max(0, centerFactor) * 0.75) * peakHeightMultiplier;

    // Distinct peak positions for this specific line
    const leftPeakCenter = 0.41 + pseudoRand(i * 3.7 + 10) * 0.05;
    const rightPeakCenter = 0.57 + pseudoRand(i * 5.3 + 20) * 0.06;
    const midPeakCenter = 0.49 + pseudoRand(i * 7.1 + 30) * 0.03;

    // Relative heights of left/right/mid peaks
    const leftPeakAmp = (28 + pseudoRand(i * 11.2) * 26) * linePeakScale;
    const rightPeakAmp = (24 + pseudoRand(i * 13.5) * 28) * linePeakScale;
    const midPeakAmp = (12 + pseudoRand(i * 17.8) * 22) * linePeakScale;

    // Left cliff asymmetry (Joy Division waves famously have steeper left sides)
    const leftWidth = 0.045 + pseudoRand(i * 2.1) * 0.02;
    const rightWidth = 0.055 + pseudoRand(i * 4.3) * 0.025;

    for (let k = 0; k < samplesPerLine; k++) {
      const u = k / (samplesPerLine - 1);

      // Baseline envelope: completely flat on outer wings [0..0.25] and [0.75..1.0]
      let envelope = 0;
      if (u > 0.24 && u < 0.76) {
        // Smooth Tukey / cosine bell window for zero-derivative transition to flat line
        const normInWindow = (u - 0.24) / (0.76 - 0.24);
        envelope = Math.pow(Math.sin(normInWindow * Math.PI), 1.6);
      }

      if (envelope <= 0.001) {
        points.push({ u, elevation: 0 });
        continue;
      }

      // 1. Primary Left Spire Peak
      const distLeft = (u - leftPeakCenter) / leftWidth;
      const leftPeak = leftPeakAmp * Math.exp(-distLeft * distLeft * 0.5);

      // 2. Primary Right Spire Peak
      const distRight = (u - rightPeakCenter) / rightWidth;
      const rightPeak = rightPeakAmp * Math.exp(-distRight * distRight * 0.5);

      // 3. Middle Valley / Saddle Feature
      const distMid = (u - midPeakCenter) / 0.04;
      const midPeak = midPeakAmp * Math.exp(-distMid * distMid * 0.5);

      // 4. Jagged Radio Noise & High-Frequency Harmonics (PSR radio pulsar signal texture)
      const noiseFreq1 = Math.sin(u * 85 + i * 1.7) * 3.8;
      const noiseFreq2 = Math.sin(u * 140 + i * 2.9) * 2.2;
      const noiseFreq3 = Math.cos(u * 220 + i * 4.1) * 1.2;
      const radioNoise = (noiseFreq1 + noiseFreq2 + noiseFreq3) * noiseIntensity * linePeakScale;

      // 5. Subtle live radio breathing / micro-oscillation (deep space pulse)
      const livePulse = Math.sin(frame * 0.06 + i * 0.35 + u * 12) * 1.2 * envelope;

      // Aggregate raw elevation
      let rawElevation = (leftPeak + rightPeak + midPeak + radioNoise) * envelope + livePulse;
      rawElevation = Math.max(0, rawElevation); // Elevation is strictly upward

      points.push({ u, elevation: rawElevation });
    }

    lines.push({ lineIndex: i, points });
  }

  return lines;
}
