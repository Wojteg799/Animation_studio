import React, { useRef, useEffect, useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { DarkParchmentBackgroundProps } from "./schema";
import { drawDarkPaperTexture, PAPER_PALETTES } from "./paper-texture";
import { generateParticles } from "../CinematicParticlesBackground/particle-math";

export const DarkParchmentBackground: React.FC<
  DarkParchmentBackgroundProps
> = ({
  paperStyle = "charcoal-dossier",
  textureIntensity = 0.75,
  fiberDetail = 0.65,
  agedEdgesStrength = 0.8,
  lightingMode = "desk-lamp",
  lightingWarmth = 0.4,
  lightBreathing = 0.5,
  dustCount = 60,
  dustSpeed = 0.7,
  dustSize = 1.0,
  dustGlow = 1.1,
  dustBokehBlur = 2.5,
  loopDurationFrames = 3600,
  seed = 108,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const palette = PAPER_PALETTES[paperStyle] || PAPER_PALETTES["charcoal-dossier"];

  // Draw procedural dark paper texture synchronously on canvas
  const renderCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawDarkPaperTexture(ctx, width, height, {
      paperStyle,
      textureIntensity,
      fiberDetail,
      agedEdgesStrength,
      lightingMode,
      lightingWarmth,
      seed,
    });
  };

  useEffect(() => {
    renderCanvas(canvasRef.current);
  }, [
    width,
    height,
    paperStyle,
    textureIntensity,
    fiberDetail,
    agedEdgesStrength,
    lightingMode,
    lightingWarmth,
    seed,
  ]);

  // Deterministic dust motes floating above the parchment
  const dustParticles = useMemo(() => {
    return generateParticles(dustCount, seed);
  }, [dustCount, seed]);

  // Normalized time in loop [0, 1)
  const currentLoopFrame = frame % loopDurationFrames;
  const loopProgress = currentLoopFrame / loopDurationFrames;

  // Subtle breathing cycle for the desk lamp light (3 cycles over 2 minutes)
  const breathingCycle = Math.sin(loopProgress * Math.PI * 2 * 3);
  const lampPulse = 1 + breathingCycle * 0.05 * lightBreathing;
  const lampOpacity = 0.92 + breathingCycle * 0.08 * lightBreathing;

  // Margin for offscreen wrapping so dust fades naturally
  const vMargin = 80;
  const totalVerticalSpan = height + vMargin * 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: palette.bgBase,
      }}
    >
      {/* 1. LAYER: True Physical Dark Paper Canvas (Fibers, Pulp, Creases, Lamp) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${lampPulse})`,
          transformOrigin:
            lightingMode === "top-left-beam" ? "20% 20%" : "50% 46%",
          opacity: lampOpacity,
        }}
      >
        <canvas
          ref={(node) => {
            canvasRef.current = node;
            if (node) renderCanvas(node);
          }}
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </div>

      {/* 2. LAYER: Floating Archival Dust Motes (Seamless 2-min loop) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {dustParticles.map((p) => {
          const effectiveCycles = Math.round(p.travelCycles * dustSpeed);
          const travelProgress = (loopProgress * effectiveCycles) % 1.0;

          const yPosNorm = (p.initialY - travelProgress + 1.0) % 1.0;
          const currentY = yPosNorm * totalVerticalSpan - vMargin;

          const swayOffset =
            Math.sin(loopProgress * Math.PI * 2 * p.swayFrequency + p.swayPhase) *
            (p.swayAmplitude * 0.75);
          const currentX = p.initialX * width + swayOffset;

          const edgeDistY = Math.min(
            currentY + vMargin,
            height + vMargin - currentY
          );
          const edgeFade = Math.max(
            0,
            Math.min(1, edgeDistY / (vMargin * 1.2))
          );

          const shimmer =
            0.65 +
            0.35 *
              Math.cos(
                loopProgress * Math.PI * 2 * p.twinkleFrequency + p.twinklePhase
              );

          const finalOpacity = p.baseOpacity * edgeFade * shimmer * 0.9;
          const finalRadius = p.baseRadius * dustSize;
          const finalBlur =
            p.layer === "foreground"
              ? (dustBokehBlur * (p.blurAmount / 4)).toFixed(1)
              : "0";

          const dustColor =
            paperStyle === "aged-sepia"
              ? "rgba(255, 240, 215, 0.95)"
              : "rgba(240, 245, 255, 0.9)";

          const glowSpread = Math.max(2, finalRadius * 2 * dustGlow);

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
                backgroundColor: dustColor,
                opacity: finalOpacity,
                transform: "translate(-50%, -50%)",
                filter:
                  Number(finalBlur) > 0 ? `blur(${finalBlur}px)` : undefined,
                boxShadow:
                  dustGlow > 0
                    ? `0 0 ${glowSpread}px ${glowSpread * 0.3}px ${dustColor}`
                    : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
