import React, { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { JoyDivisionCassetteMorphProps } from "./schema";
import { generateJoyDivisionPulsarData } from "./pulsar-data";
import { MorphWaveLine } from "./MorphWaveLine";

export const JoyDivisionCassetteMorph: React.FC<JoyDivisionCassetteMorphProps> = ({
  initialLayout = "grid-5x5",
  enableDealIntro = true,
  dealStartFrame = 4,
  dealRowStagger = 6,
  dealRowDuration = 14,
  dealDirection = "from-top",
  cassetteScale = 1.15,
  gridSpacingX = 180,
  gridSpacingY = 115,
  alignStyle = "natural-stack",
  morphStartFrame = 50,
  morphDurationFrames = 70,
  lineColor = "#ffffff",
  lineWidth = 1.8,
  peakHeightMultiplier = 1.15,
  noiseIntensity = 1.0,
  enableGlow = false,
  enableOcclusionFill = true,
  spoolSpinSpeed = 1.0,
  durationInFrames = 240,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Milestone frame timing scaled proportionally to overall duration
  const timeScale = durationInFrames / 240;

  // Dealing intro finish frame
  const dealFinishFrame = enableDealIntro
    ? dealStartFrame + 4 * dealRowStagger + dealRowDuration
    : 0;

  // Stage 1 -> 2: Align into 25 rows (starts at morphStartFrame, ensuring cards have landed)
  const alignStartFrame = Math.max(
    Math.round((dealFinishFrame + 6) * timeScale),
    Math.round(morphStartFrame * timeScale)
  );
  const alignDuration = Math.round(38 * timeScale);

  // Stage 2 -> 3: Stretch horizontally & squash into flat lines
  const flattenStartFrame = alignStartFrame + alignDuration;
  const flattenDuration = Math.round(45 * timeScale);

  // Stage 3 -> 4: Mountain peaks rise upwards
  const mountainStartFrame = flattenStartFrame + flattenDuration;
  const mountainDuration = Math.round(52 * timeScale);

  // Generate the 25 unique Joy Division CP 1919 pulsar waveforms
  const pulsarLines = useMemo(() => {
    return generateJoyDivisionPulsarData(
      110, // 110 sample points per line for high vector fidelity
      peakHeightMultiplier,
      noiseIntensity,
      frame
    );
  }, [peakHeightMultiplier, noiseIntensity, frame]);

  // Center Joy Division waveform box dimensions
  const waveWidth = Math.min(780, width * 0.44);
  const waveTopY = height * 0.16;
  const waveBottomY = height * 0.76;
  const waveStepY = (waveBottomY - waveTopY) / 24;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000000", // 100% pitch black void
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG Canvas for all 25 Lines & Cassettes */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        <defs>
          {/* Subtle analog neon glow filter */}
          {enableGlow && (
            <filter id="joyDivisionGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Render all 25 items from top (0) to bottom (24) so lower lines occlude upper lines */}
        {pulsarLines.map((lineData) => {
          const baselineY = waveTopY + lineData.lineIndex * waveStepY;
          return (
            <MorphWaveLine
              key={`morph-line-${lineData.lineIndex}`}
              index={lineData.lineIndex}
              totalLines={25}
              points={lineData.points}
              initialLayout={initialLayout}
              targetBounds={{
                centerX: width * 0.5,
                width: waveWidth,
                baselineY,
              }}
              canvasWidth={width}
              canvasHeight={height}
              strokeColor={lineColor}
              strokeWidth={lineWidth}
              enableOcclusionFill={enableOcclusionFill}
              enableGlow={enableGlow}
              spoolSpinSpeed={spoolSpinSpeed}
              alignStyle={alignStyle}
              cassetteScale={cassetteScale}
              gridSpacingX={gridSpacingX}
              gridSpacingY={gridSpacingY}
              enableDealIntro={enableDealIntro}
              dealStartFrame={dealStartFrame}
              dealRowStagger={dealRowStagger}
              dealRowDuration={dealRowDuration}
              dealDirection={dealDirection}
              frame={frame}
              alignStartFrame={alignStartFrame}
              alignDuration={alignDuration}
              flattenStartFrame={flattenStartFrame}
              flattenDuration={flattenDuration}
              mountainStartFrame={mountainStartFrame}
              mountainDuration={mountainDuration}
            />
          );
        })}
      </svg>
    </div>
  );
};
