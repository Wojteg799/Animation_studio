import React, { useMemo } from "react";
import { interpolate } from "remotion";
import { PulsarPoint } from "./pulsar-data";
import { CassetteWireframe } from "./CassetteWireframe";

interface MorphWaveLineProps {
  index: number; // 0 to 24
  totalLines: number; // 25
  points: PulsarPoint[];
  frame: number;
  canvasWidth: number;
  canvasHeight: number;
  initialLayout: "grid-5x5" | "vertical-stack" | "staggered-cluster";
  targetBounds: {
    centerX: number;
    width: number;
    baselineY: number;
  };
  strokeColor: string;
  strokeWidth: number;
  enableOcclusionFill: boolean;
  enableGlow: boolean;
  spoolSpinSpeed: number;
  alignStyle?: "natural-stack" | "adaptive-rows";
  // Cassette size & grid spacing
  cassetteScale?: number;
  gridSpacingX?: number;
  gridSpacingY?: number;
  // Card deal intro
  enableDealIntro?: boolean;
  dealStartFrame?: number;
  dealRowStagger?: number;
  dealRowDuration?: number;
  dealDirection?: "from-top" | "from-bottom" | "scale-snap" | "diagonal-deck";
  // Keyframe milestones
  alignStartFrame?: number;
  alignDuration?: number;
  flattenStartFrame?: number;
  flattenDuration?: number;
  mountainStartFrame?: number;
  mountainDuration?: number;
}

// Smootherstep (Ken Perlin's C2 continuous ease-in-out, zero jerk)
function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export const MorphWaveLine: React.FC<MorphWaveLineProps> = ({
  index,
  totalLines,
  points,
  frame,
  canvasWidth,
  canvasHeight,
  initialLayout,
  targetBounds,
  strokeColor,
  strokeWidth,
  enableOcclusionFill,
  enableGlow,
  spoolSpinSpeed,
  alignStyle = "natural-stack",
  cassetteScale = 1.15,
  gridSpacingX = 180,
  gridSpacingY = 115,
  enableDealIntro = true,
  dealStartFrame = 4,
  dealRowStagger = 6,
  dealRowDuration = 14,
  dealDirection = "from-top",
  alignStartFrame = 50,
  alignDuration = 38,
  flattenStartFrame = 88,
  flattenDuration = 45,
  mountainStartFrame = 133,
  mountainDuration = 52,
}) => {
  // 1. Initial Position of Cassette (Compact spacing, no overflowing the screen)
  const initialPos = useMemo(() => {
    // Proportional dimensions based on cassetteScale
    const baseW = Math.round(98 * cassetteScale);
    const baseH = Math.round(62 * cassetteScale);

    if (initialLayout === "vertical-stack") {
      const topY = canvasHeight * 0.16;
      const bottomY = canvasHeight * 0.76;
      const stepY = (bottomY - topY) / (totalLines - 1);
      return {
        x: canvasWidth * 0.5,
        y: topY + index * stepY,
        width: baseW,
        height: baseH,
        rotation: 0,
      };
    } else if (initialLayout === "staggered-cluster") {
      const row = Math.floor(index / 5);
      const col = index % 5;
      const jitterX = Math.sin(index * 3.7) * 25;
      const jitterY = Math.cos(index * 2.9) * 15;
      const centerX = canvasWidth * 0.5;
      const centerY = canvasHeight * 0.48;
      return {
        x: centerX + (col - 2) * gridSpacingX + jitterX,
        y: centerY + (row - 2) * gridSpacingY + jitterY,
        width: baseW,
        height: baseH,
        rotation: Math.sin(index * 1.5) * 4,
      };
    } else {
      // "grid-5x5" (Centered, compact 5x5 grid with safe margins on all sides)
      const col = index % 5; // 0, 1, 2, 3, 4
      const row = Math.floor(index / 5); // 0, 1, 2, 3, 4
      const centerX = canvasWidth * 0.5;
      const centerY = canvasHeight * 0.48; // Centered with generous breathing room
      return {
        x: centerX + (col - 2) * gridSpacingX,
        y: centerY + (row - 2) * gridSpacingY,
        width: baseW,
        height: baseH,
        rotation: 0,
      };
    }
  }, [initialLayout, index, totalLines, canvasWidth, canvasHeight, cassetteScale, gridSpacingX, gridSpacingY]);

  // STAGE PROGRESS CALCULATIONS:

  // STAGE 0: CARD DEALING INTRO (deals entire 5-cassette row simultaneously)
  const row = Math.floor(index / 5);
  const col = index % 5;
  const rowStart = dealStartFrame + row * dealRowStagger;
  const rawDeal = (frame - rowStart) / dealRowDuration;
  const dealProgress = Math.max(0, Math.min(1, rawDeal));

  // Back ease-out for realistic card-drop snap onto felt table
  const dealEased = enableDealIntro
    ? 1 + 1.25 * Math.pow(dealProgress - 1, 3) + 0.25 * Math.pow(dealProgress - 1, 2)
    : 1;

  let dealOffsetX = 0;
  let dealOffsetY = 0;
  let dealRotation = 0;
  let dealScale = 1.0;
  let dealOpacity = 1.0;

  if (enableDealIntro && rawDeal < 1.0) {
    if (frame < rowStart) {
      dealOpacity = 0;
    } else {
      const unlanded = 1 - dealEased;
      dealOpacity = Math.min(1, dealProgress * 3.2);

      if (dealDirection === "from-bottom") {
        dealOffsetY = unlanded * 260;
        dealOffsetX = unlanded * (col - 2) * 16;
        dealRotation = unlanded * (col - 2) * -2.5;
        dealScale = 0.88 + 0.12 * Math.min(1, dealEased);
      } else if (dealDirection === "scale-snap") {
        dealOffsetY = unlanded * -50;
        dealRotation = unlanded * (col - 2) * 3;
        dealScale = 0.5 + 0.5 * dealEased;
      } else if (dealDirection === "diagonal-deck") {
        dealOffsetY = unlanded * -340;
        dealOffsetX = unlanded * -420;
        dealRotation = unlanded * -10;
        dealScale = 0.8 + 0.2 * dealEased;
      } else {
        // "from-top" (Default - deals row from top onto the table with subtle fanning)
        dealOffsetY = unlanded * -260;
        dealOffsetX = unlanded * (col - 2) * 16;
        dealRotation = unlanded * (col - 2) * 2.5;
        dealScale = 0.88 + 0.12 * Math.min(1, dealEased);
      }
    }
  }

  // STAGE 2: Align into 25 rows ("ułuż je tak ładnie w rzędzie")
  const alignStagger = (index / (totalLines - 1)) * 6; // subtle natural stagger
  const rawAlign = (frame - (alignStartFrame + alignStagger)) / alignDuration;
  const alignT = smootherStep(rawAlign);

  // STAGE 3: Stretch horizontally & squash/flatten vertically down to flat line ("rozciągnij je i spłaszcz")
  const rawFlatten = (frame - flattenStartFrame) / flattenDuration;
  const flattenT = smootherStep(rawFlatten);

  // STAGE 4: Mountain peaks erupt from the flat lines ("i na koncu zrob te góry")
  const lineStagger = index * 0.7; // organic top-to-bottom wave cascade
  const rawMountain = (frame - (mountainStartFrame + lineStagger)) / mountainDuration;
  const mountainT = smootherStep(rawMountain);

  // Interpolated center coordinates
  const currentCenterX = initialPos.x + (targetBounds.centerX - initialPos.x) * alignT;
  const currentCenterY = initialPos.y + (targetBounds.baselineY - initialPos.y) * alignT;
  const currentRotation = initialPos.rotation * (1 - alignT);

  // Height and squash calculation based on alignStyle:
  // "natural-stack": Kasety zachowują w 100% naturalne wymiary (98x62px) bez żadnej deformacji podczas układania w rzędzie
  // "adaptive-rows": Kasety zwężają się do 25px już podczas zjazdu do rzędów
  const rowFittedHeight = 25;
  const targetBaseHeight =
    alignStyle === "adaptive-rows" ? rowFittedHeight : initialPos.height;
  const baseHeightForSquash =
    initialPos.height + (targetBaseHeight - initialPos.height) * alignT;

  // Stretched width (from 98px to waveWidth e.g. 760px)
  const currentWidth =
    initialPos.width + (targetBounds.width - initialPos.width) * flattenT;

  // Squash factor: 1.0 (normal) down to 0.0 (completely flat line)
  const squashFactor = Math.max(0, 1.0 - flattenT);
  const currentRenderHeight = baseHeightForSquash * squashFactor;

  // Internal cassette details fade out smoothly as flattening begins
  const detailsOpacity = Math.max(0, 1.0 - Math.pow(flattenT, 1.3));

  // Spool spin angle (slows to rest as it flattens)
  const spoolSpinModifier = Math.max(0, 1.0 - flattenT * 0.8);
  const spoolAngle = (frame * spoolSpinSpeed * (3.0 + alignT * 3.0) * spoolSpinModifier) % 360;

  // Left coordinate for wave/line
  const waveStartLeft = targetBounds.centerX - targetBounds.width * 0.5;

  // Once the cassette has completely flattened (flattenT >= 0.999), switch to the Joy Division wave
  const isFlattened = flattenT >= 0.999;

  // Joy Division Pulsar Wave Path
  const wavePathD = useMemo(() => {
    if (!isFlattened && mountainT <= 0) return "";
    let d = "";
    points.forEach((pt, idx) => {
      const px = waveStartLeft + pt.u * targetBounds.width;
      const py = targetBounds.baselineY - pt.elevation * mountainT;
      if (idx === 0) {
        d += `M ${px.toFixed(1)} ${py.toFixed(1)}`;
      } else {
        d += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
      }
    });
    return d;
  }, [isFlattened, mountainT, points, waveStartLeft, targetBounds.width, targetBounds.baselineY]);

  // Occlusion mask (black fill underneath the wave to occlude lines behind it)
  const occlusionPathD = useMemo(() => {
    if (!enableOcclusionFill || mountainT <= 0.01 || !wavePathD) return "";
    const rightX = waveStartLeft + targetBounds.width;
    const bottomCoverY = targetBounds.baselineY + 45;
    return `${wavePathD} L ${rightX.toFixed(1)} ${bottomCoverY.toFixed(1)} L ${waveStartLeft.toFixed(1)} ${bottomCoverY.toFixed(1)} Z`;
  }, [enableOcclusionFill, mountainT, wavePathD, waveStartLeft, targetBounds.width, targetBounds.baselineY]);

  return (
    <g style={{ overflow: "visible" }}>
      {/* ================= STAGE 4 & 5: JOY DIVISION WAVE (FLAT LINE -> RISING MOUNTAIN PEAKS) ================= */}
      {isFlattened && (
        <g>
          {/* Black Occlusion Mask underneath the wave (creates iconic 3D layered mountain ridge) */}
          {enableOcclusionFill && mountainT > 0.01 && (
            <path d={occlusionPathD} fill="#000000" stroke="none" />
          )}

          {/* White Pulsar Line Stroke */}
          <path
            d={wavePathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={enableGlow ? "url(#joyDivisionGlow)" : undefined}
          />
        </g>
      )}

      {/* ================= STAGE 1, 2, 3: CASSETTE (DEALING -> GRID -> ALIGNED -> STRETCHING & SQUASHING) ================= */}
      {!isFlattened && dealOpacity > 0.001 && (
        <g
          transform={`translate(${currentCenterX + dealOffsetX}, ${currentCenterY + dealOffsetY}) rotate(${currentRotation + dealRotation}) scale(${dealScale}) translate(${-currentWidth * 0.5}, ${-currentRenderHeight * 0.5})`}
          style={{ pointerEvents: "none", opacity: dealOpacity }}
        >
          <CassetteWireframe
            width={currentWidth}
            height={baseHeightForSquash}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            spoolRotation={spoolAngle}
            detailsOpacity={detailsOpacity}
            squashFactor={squashFactor}
          />
        </g>
      )}
    </g>
  );
};
