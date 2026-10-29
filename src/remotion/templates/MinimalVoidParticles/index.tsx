import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { MinimalVoidParticlesProps } from "./schema";
import {
  generateParticles,
  seededRandom,
} from "../CinematicParticlesBackground/particle-math";

interface ToneDef {
  baseColor: string;
  glowRgb: string;
}

const TONES: Record<string, ToneDef> = {
  "pure-black": {
    baseColor: "#000000",
    glowRgb: "255, 255, 255",
  },
  "cold-obsidian": {
    baseColor: "#030406",
    glowRgb: "30, 45, 70",
  },
  "warm-carbon": {
    baseColor: "#050403",
    glowRgb: "60, 45, 30",
  },
  "deep-navy": {
    baseColor: "#020408",
    glowRgb: "25, 45, 90",
  },
};

interface StarDustMote {
  id: number;
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  speedMultiplier: number;
  swayAmplitude: number;
  twinklePhase: number;
  twinkleFreq: number;
}

export const MinimalVoidParticles: React.FC<MinimalVoidParticlesProps> = ({
  preset = "pitch-black",
  colorTone = "pure-black",
  centerGlowIntensity = 0.0,
  glowRadius = 60,
  particleCount = 75,
  speed = 0.7,
  particleSize = 1.0,
  particleGlow = 1.2,
  bokehBlur = 2.5,
  direction = "up",
  showStarDust = false,
  starDustCount = 200,
  starDustOpacity = 0.35,
  loopDurationFrames = 3600,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Primary foreground/midground particles (deterministic & cyclic)
  const particles = useMemo(() => {
    return generateParticles(particleCount, seed);
  }, [particleCount, seed]);

  // StarDust micro-motes (Version 3: creates natural optical depth without gradient banding)
  const starDust = useMemo(() => {
    if (!showStarDust && preset !== "stardust-depth") return [];
    const motes: StarDustMote[] = [];
    for (let i = 0; i < starDustCount; i++) {
      const s1 = seededRandom(seed + i * 7.1 + 500);
      const s2 = seededRandom(seed + i * 13.9 + 501);
      const s3 = seededRandom(seed + i * 19.3 + 502);
      const s4 = seededRandom(seed + i * 31.7 + 503);
      motes.push({
        id: i,
        x: s1,
        y: s2,
        radius: 0.5 + s3 * 0.7, // 0.5px to 1.2px (subtle pinpoint stars)
        baseOpacity: 0.15 + s4 * 0.45,
        speedMultiplier: 0.2 + s3 * 0.3, // very slow drift
        swayAmplitude: 6 + s2 * 12,
        twinklePhase: s1 * Math.PI * 2,
        twinkleFreq: 6 + Math.floor(s4 * 16),
      });
    }
    return motes;
  }, [showStarDust, preset, starDustCount, seed]);

  const tone = TONES[colorTone] || TONES["pure-black"];

  // Seamless loop progress [0, 1)
  const currentLoopFrame = frame % loopDurationFrames;
  const loopProgress = currentLoopFrame / loopDurationFrames;

  const vMargin = 100;
  const totalVerticalSpan = height + vMargin * 2;

  // Background style:
  // If glow is 0, render 100% flat pitch black (#000000) - ZERO BANDING mathematically!
  const backgroundStyle = useMemo(() => {
    if (centerGlowIntensity <= 0.005) {
      return tone.baseColor;
    }
    const alpha = centerGlowIntensity.toFixed(3);
    const radius = Math.max(30, Math.min(100, glowRadius));
    return `radial-gradient(ellipse at 50% 50%, rgba(${tone.glowRgb}, ${alpha}) 0%, ${tone.baseColor} ${radius}%)`;
  }, [centerGlowIntensity, tone, glowRadius]);

  const isStardustActive = showStarDust || preset === "stardust-depth";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: tone.baseColor,
      }}
    >
      {/* 1. LAYER: Void Background (Flat #000000 in V1/V3, or ultra-subtle in V2) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: backgroundStyle,
        }}
      />

      {/* 2. LAYER: Star Dust Micro-Particles (Version 3: Deep ambient pinpoints) */}
      {isStardustActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {starDust.map((mote) => {
            const travelProgress = (loopProgress * mote.speedMultiplier * speed) % 1.0;
            let normY = (mote.y - travelProgress + 1.0) % 1.0;
            if (direction === "down") {
              normY = (mote.y + travelProgress) % 1.0;
            } else if (direction === "float-ambient") {
              normY = (mote.y + Math.sin(loopProgress * Math.PI * 2 * 2 + mote.twinklePhase) * 0.05 + 1.0) % 1.0;
            }

            const currentY = normY * height;
            const sway = Math.sin(loopProgress * Math.PI * 2 * 4 + mote.twinklePhase) * mote.swayAmplitude;
            const currentX = (mote.x * width + sway + width) % width;

            const twinkle = 0.6 + 0.4 * Math.cos(loopProgress * Math.PI * 2 * mote.twinkleFreq + mote.twinklePhase);
            const opacity = mote.baseOpacity * starDustOpacity * twinkle;

            return (
              <div
                key={`dust-${mote.id}`}
                style={{
                  position: "absolute",
                  left: `${currentX}px`,
                  top: `${currentY}px`,
                  width: `${mote.radius * 2}px`,
                  height: `${mote.radius * 2}px`,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  opacity,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}
        </div>
      )}

      {/* 3. LAYER: Primary Floating Glowing White Particles */}
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
            // Ambient floating drift
            const ambientFloat = Math.sin(loopProgress * Math.PI * 2 * p.travelCycles);
            yPosNorm = (p.initialY + ambientFloat * 0.15 + 1.0) % 1.0;
          }

          const currentY = yPosNorm * totalVerticalSpan - vMargin;

          // Horizontal sway with integer cyclic frequency
          const swayOffset =
            Math.sin(loopProgress * Math.PI * 2 * p.swayFrequency + p.swayPhase) *
            p.swayAmplitude;
          const currentX = p.initialX * width + swayOffset;

          // Edge Fade: smooth fade in/out near top and bottom boundaries
          const edgeDistY = Math.min(
            currentY + vMargin,
            height + vMargin - currentY
          );
          const edgeFade = Math.max(
            0,
            Math.min(1, edgeDistY / (vMargin * 1.2))
          );

          // Twinkle / Shimmer
          const twinkle =
            0.75 +
            0.25 *
              Math.cos(
                loopProgress * Math.PI * 2 * p.twinkleFrequency + p.twinklePhase
              );

          const finalOpacity = p.baseOpacity * edgeFade * twinkle;
          const finalRadius = p.baseRadius * particleSize;
          const finalBlur =
            p.layer === "foreground"
              ? (bokehBlur * (p.blurAmount / 4)).toFixed(1)
              : p.layer === "midground"
              ? (p.blurAmount * 0.35).toFixed(1)
              : "0";

          const glowRadiusPx = Math.max(2, finalRadius * 2.2 * particleGlow);

          return (
            <div
              key={`particle-${p.id}`}
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
                    ? `0 0 ${glowRadiusPx}px ${glowRadiusPx * 0.35}px rgba(255, 255, 255, ${0.6 * particleGlow})`
                    : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
