// Deterministic pseudo-random number generator for stable particle seeds
export function seededRandom(seed: number) {
  let s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
}

export interface Particle {
  id: number;
  initialX: number; // 0 to 1 (normalized screen width)
  initialY: number; // 0 to 1 (normalized screen height)
  baseRadius: number; // in pixels
  baseOpacity: number;
  layer: "background" | "midground" | "foreground";
  blurAmount: number; // for bokeh
  travelCycles: number; // integer number of screen heights traversed in one loop
  swayFrequency: number; // integer number of horizontal sways in one loop
  swayAmplitude: number; // in pixels
  swayPhase: number; // in radians
  twinkleFrequency: number; // integer number of twinkle cycles in one loop
  twinklePhase: number; // in radians
  glowSpread: number; // box shadow spread / blur
}

export function generateParticles(count: number, seed: number = 42): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const s1 = seededRandom(seed + i * 11.3 + 1);
    const s2 = seededRandom(seed + i * 17.7 + 2);
    const s3 = seededRandom(seed + i * 23.1 + 3);
    const s4 = seededRandom(seed + i * 29.5 + 4);
    const s5 = seededRandom(seed + i * 37.9 + 5);
    const s6 = seededRandom(seed + i * 41.2 + 6);
    const s7 = seededRandom(seed + i * 47.6 + 7);
    const s8 = seededRandom(seed + i * 53.8 + 8);

    // Layer distribution: 45% background (fine dust), 40% midground (ambient motes), 15% foreground (bokeh motes)
    let layer: "background" | "midground" | "foreground" = "midground";
    let baseRadius = 2.0;
    let blurAmount = 0;
    let baseOpacity = 0.6;
    let baseCycles = 4;

    if (s3 < 0.45) {
      // Background: tiny, crisp, subtle, moves slowly
      layer = "background";
      baseRadius = 0.8 + s4 * 1.0;
      blurAmount = 0;
      baseOpacity = 0.18 + s5 * 0.35;
      baseCycles = 2 + Math.floor(s6 * 3); // 2 to 4 cycles
    } else if (s3 < 0.85) {
      // Midground: standard cinematic motes with soft glow
      layer = "midground";
      baseRadius = 1.8 + s4 * 1.6;
      blurAmount = 0.4 + s5 * 0.8;
      baseOpacity = 0.45 + s5 * 0.45;
      baseCycles = 3 + Math.floor(s6 * 4); // 3 to 6 cycles
    } else {
      // Foreground: large, dreamy bokeh floating close to camera lens
      layer = "foreground";
      baseRadius = 4.0 + s4 * 4.5;
      blurAmount = 2.5 + s5 * 3.5;
      baseOpacity = 0.25 + s5 * 0.4;
      baseCycles = 5 + Math.floor(s6 * 4); // 5 to 8 cycles
    }

    particles.push({
      id: i,
      initialX: s1,
      initialY: s2,
      baseRadius,
      baseOpacity,
      layer,
      blurAmount,
      // Must be strictly integers for seamless loop matching
      travelCycles: Math.max(1, baseCycles),
      swayFrequency: 6 + Math.floor(s7 * 14), // 6 to 19 sways per loop
      swayAmplitude: 12 + s8 * 28, // 12px to 40px sway
      swayPhase: s2 * Math.PI * 2,
      twinkleFrequency: 8 + Math.floor(s4 * 16), // 8 to 23 twinkles per loop
      twinklePhase: s5 * Math.PI * 2,
      glowSpread: baseRadius * (layer === "foreground" ? 2.5 : 1.8),
    });
  }

  return particles;
}
