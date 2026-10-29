import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CinematicParticlesBackgroundProps } from "./schema";
import { generateParticles } from "./particle-math";
import {
  buildSmoothRadialGradient,
  DITHER_SVG_DATA_URL,
} from "./dither-utils";

interface TintPreset {
  centerColor: string;
  glowColor: string;
  edgeColor: string;
}

const TINT_PALETTES: Record<string, TintPreset> = {
  "deep-obsidian": {
    glowColor: "#1a2436",
    centerColor: "#111824",
    edgeColor: "#020306",
  },
  "midnight-blue": {
    glowColor: "#1c2b4d",
    centerColor: "#101b33",
    edgeColor: "#02040a",
  },
  "warm-charcoal": {
    glowColor: "#281f18",
    centerColor: "#1c1510",
    edgeColor: "#040302",
  },
  "emerald-void": {
    glowColor: "#152e23",
    centerColor: "#0c1d16",
    edgeColor: "#020504",
  },
  "pure-minimal": {
    glowColor: "#18181c",
    centerColor: "#111114",
    edgeColor: "#010102",
  },
};

export const CinematicParticlesBackground: React.FC<
  CinematicParticlesBackgroundProps
> = ({
  particleCount = 85,
  speed = 0.8,
  particleSize = 1.0,
  particleGlow = 1.0,
  bokehBlur = 3.5,
  direction = "up",
  tintStyle = "deep-obsidian",
  vignetteStrength = 0.75,
  grainIntensity = 0.14,
  ambientPulseIntensity = 0.6,
  loopDurationFrames = 3600,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Generate deterministic particles based on count and seed
  const particles = useMemo(() => {
    return generateParticles(particleCount, seed);
  }, [particleCount, seed]);

  const activeTint = TINT_PALETTES[tintStyle] || TINT_PALETTES["deep-obsidian"];

  // Precomputed mathematically eased 20-stop gradient that eliminates banding rings
  const smoothRadialGradient = useMemo(() => {
    return buildSmoothRadialGradient(
      activeTint.centerColor,
      activeTint.edgeColor,
      activeTint.glowColor
    );
  }, [activeTint]);

  // Normalized time in loop [0, 1)
  const currentLoopFrame = frame % loopDurationFrames;
  const loopProgress = currentLoopFrame / loopDurationFrames;

  // Ambient breathing light (exactly 4 breathing cycles across the 2-minute loop for seamlessness)
  const breathingCycle = Math.sin(loopProgress * Math.PI * 2 * 4);
  const ambientPulseScale = 1 + breathingCycle * 0.08 * ambientPulseIntensity;
  const ambientGlowOpacity = 0.88 + breathingCycle * 0.12 * ambientPulseIntensity;

  // Margin for offscreen wrapping so particles fade naturally
  const vMargin = 100;
  const totalVerticalSpan = height + vMargin * 2;

  // Smooth vignette with cosine falloff (no sharp ring stops)
  const smoothVignette = useMemo(() => {
    const vMid = (vignetteStrength * 0.35).toFixed(3);
    const vEdge = vignetteStrength.toFixed(3);
    return `radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,${vMid}) 65%, rgba(0,0,0,${vEdge}) 100%)`;
  }, [vignetteStrength]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: activeTint.edgeColor,
      }}
    >
      {/* 1. LAYER: Multi-Stop Smoothstep Eased Radial Gradient (Anti-Banding Base) */}
      <div
        style={{
          position: "absolute",
          inset: "-5%", // slight bleed to prevent edge clipping during pulse
          background: smoothRadialGradient,
          transform: `scale(${ambientPulseScale})`,
          transformOrigin: "center center",
          opacity: ambientGlowOpacity,
        }}
      />

      {/* 2. LAYER: High-Frequency Dither Shield (Eliminates 8-bit quantization steps) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${DITHER_SVG_DATA_URL}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "soft-light",
          opacity: Math.max(0.18, grainIntensity * 1.6),
          pointerEvents: "none",
        }}
      />

      {/* 2b. LAYER: Sub-Black Dither Lift (Stipples darkest shadow boundaries) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${DITHER_SVG_DATA_URL}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "screen",
          opacity: 0.045,
          pointerEvents: "none",
        }}
      />

      {/* 3. LAYER: Film Grain Simulation (Optional extra artistic noise) */}
      {grainIntensity > 0.05 && (
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: grainIntensity * 0.6,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        >
          <filter id="cinematic-grain" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" fill="#808080" filter="url(#cinematic-grain)" />
        </svg>
      )}

      {/* 4. LAYER: Particles Canvas (Seamless loop with Depth of Field) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {particles.map((p) => {
          const effectiveCycles = Math.round(p.travelCycles * speed);
          const travelProgress = (loopProgress * effectiveCycles) % 1.0;

          let yPosNorm: number;
          if (direction === "up") {
            yPosNorm = (p.initialY - travelProgress + 1.0) % 1.0;
          } else if (direction === "down") {
            yPosNorm = (p.initialY + travelProgress) % 1.0;
          } else {
            const ambientFloat = Math.sin(loopProgress * Math.PI * 2 * p.travelCycles);
            yPosNorm = (p.initialY + ambientFloat * 0.15 + 1.0) % 1.0;
          }

          const currentY = yPosNorm * totalVerticalSpan - vMargin;

          const swayOffset =
            Math.sin(loopProgress * Math.PI * 2 * p.swayFrequency + p.swayPhase) *
            p.swayAmplitude;
          const currentX = p.initialX * width + swayOffset;

          const edgeDistY = Math.min(
            currentY + vMargin,
            height + vMargin - currentY
          );
          const edgeFade = Math.max(
            0,
            Math.min(1, edgeDistY / (vMargin * 1.2))
          );

          const twinkle =
            0.7 +
            0.3 *
              Math.cos(
                loopProgress * Math.PI * 2 * p.twinkleFrequency + p.twinklePhase
              );

          const finalOpacity = p.baseOpacity * edgeFade * twinkle;
          const finalRadius = p.baseRadius * particleSize;
          const finalBlur =
            p.layer === "foreground"
              ? (bokehBlur * (p.blurAmount / 4)).toFixed(1)
              : p.layer === "midground"
              ? (p.blurAmount * 0.5).toFixed(1)
              : "0";

          const glowRadius = Math.max(2, finalRadius * 2 * particleGlow);

          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${currentX}px`,
                top: `${currentY}px`,
                width: `${finalRadius * 2}px`,
                height: `${finalRadius * 2}px`,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                opacity: finalOpacity,
                transform: "translate(-50%, -50%)",
                filter:
                  Number(finalBlur) > 0 ? `blur(${finalBlur}px)` : undefined,
                boxShadow:
                  particleGlow > 0
                    ? `0 0 ${glowRadius}px ${glowRadius * 0.4}px rgba(255, 255, 255, ${0.45 * particleGlow})`
                    : undefined,
              }}
            />
          );
        })}
      </div>

      {/* 5. LAYER: Heavy Cinematic Vignette with Smooth Eased Curve */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: smoothVignette,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
