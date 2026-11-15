import React from "react";
import { spring, useVideoConfig } from "remotion";

export interface ConnectionLineProps {
  frame: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineStyle: "investigative-string" | "dashed-pulse" | "arrow-directed" | "solid-glow";
  lineColor: string;
  lineWidth: number;
  lineLabel?: string;
  lineStartFrame: number;
  lineDuration: number;
  lineCurvature?: number;
  canvasWidth: number;
  canvasHeight: number;
}

function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  frame,
  x1,
  y1,
  x2,
  y2,
  lineStyle,
  lineColor,
  lineWidth,
  lineLabel,
  lineStartFrame,
  lineDuration,
  lineCurvature = -15,
  canvasWidth,
  canvasHeight,
}) => {
  const { fps } = useVideoConfig();

  if (frame < lineStartFrame) {
    return null;
  }

  const rawProgress = (frame - lineStartFrame) / lineDuration;
  const drawProgress = smootherStep(rawProgress);

  // Compute curve geometry
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 10) return null;

  const nx = -dy / dist;
  const ny = dx / dist;

  // Control point for quadratic curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const ctrlX = midX + nx * lineCurvature * 2.5;
  const ctrlY = midY + ny * lineCurvature * 2.5;

  const pathD = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;

  // Approximate curve length
  const approxLen = dist * 1.15;
  const strokeDashoffset = approxLen * (1 - drawProgress);

  // Midpoint coordinate on quadratic bezier at t = 0.5
  const labelX = 0.25 * x1 + 0.5 * ctrlX + 0.25 * x2;
  const labelY = 0.25 * y1 + 0.5 * ctrlY + 0.25 * y2;

  // Label reveal spring
  const labelRelativeFrame = frame - (lineStartFrame + lineDuration * 0.5);
  const labelSpring = labelRelativeFrame >= 0
    ? spring({
        frame: labelRelativeFrame,
        fps,
        config: { damping: 12, mass: 0.6, stiffness: 140 },
      })
    : 0;

  // Moving dash offset for pulse effect
  const flowOffset = (frame * 2.5) % 36;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <svg
        width={canvasWidth}
        height={canvasHeight}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        <defs>
          {/* Arrowhead marker if arrow-directed */}
          {lineStyle === "arrow-directed" && (
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="8"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={lineColor} />
            </marker>
          )}

          {/* Glow filter */}
          {lineStyle === "solid-glow" && (
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Base shadow for 3D depth */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(0,0,0,0.75)"
          strokeWidth={lineWidth + 3}
          strokeLinecap="round"
          strokeDasharray={`${approxLen}`}
          strokeDashoffset={`${strokeDashoffset}`}
          style={{ transform: "translate(2px, 4px)" }}
        />

        {/* Main Drawn Path */}
        <path
          d={pathD}
          fill="none"
          stroke={lineColor}
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeDasharray={
            lineStyle === "dashed-pulse"
              ? "12, 8"
              : `${approxLen}`
          }
          strokeDashoffset={
            lineStyle === "dashed-pulse"
              ? `${-flowOffset}`
              : `${strokeDashoffset}`
          }
          style={{
            filter: lineStyle === "solid-glow" ? "url(#lineGlow)" : undefined,
          }}
          markerEnd={lineStyle === "arrow-directed" && drawProgress > 0.9 ? "url(#arrowhead)" : undefined}
        />

        {/* Corkboard Pushpins at line ends for investigative string */}
        {lineStyle === "investigative-string" && drawProgress > 0.1 && (
          <>
            {/* Pin 1 at Character 1 */}
            <circle cx={x1} cy={y1} r="5" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
            <circle cx={x1} cy={y1} r="3" fill={lineColor} />

            {/* Pin 2 at Character 2 */}
            {drawProgress > 0.85 && (
              <>
                <circle cx={x2} cy={y2} r="5" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))" />
                <circle cx={x2} cy={y2} r="3" fill={lineColor} />
              </>
            )}
          </>
        )}
      </svg>

      {/* Floating Center Badge / Label */}
      {lineLabel && labelSpring > 0.05 && (
        <div
          style={{
            position: "absolute",
            left: labelX,
            top: labelY,
            transform: `translate(-50%, -50%) scale(${labelSpring})`,
            backgroundColor: "#000000",
            border: "1.5px solid #ffffff",
            borderRadius: "9999px",
            padding: "4px 14px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.95), 0 0 10px rgba(255, 255, 255, 0.2)",
            whiteSpace: "nowrap",
            zIndex: 12,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {/* Small colored indicator dot */}
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "9999px",
              backgroundColor: lineColor,
              boxShadow: `0 0 6px ${lineColor}`,
            }}
          />
          <span
            style={{
              color: "#ffffff",
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: "800",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {lineLabel}
          </span>
        </div>
      )}
    </div>
  );
};
