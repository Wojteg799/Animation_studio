import React from "react";

export interface FrameCornersProps {
  frame: number;
  width: number;
  height: number;
  color: string;
  enableBrackets: boolean;
  enableCrosshairs: boolean;
  opacity: number;
}

export const FrameCorners: React.FC<FrameCornersProps> = ({
  frame,
  width,
  height,
  color,
  enableBrackets,
  enableCrosshairs,
  opacity,
}) => {
  if (!enableBrackets && !enableCrosshairs) return null;

  // Organic micro-breathing pulsation
  const pulse = Math.sin(frame * 0.08) * 1.5;
  const bracketSize = 22;
  const offset = 12 + pulse; // dynamic distance from the photo frame
  const crossSize = 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: `-${offset}px`,
        pointerEvents: "none",
        opacity,
        zIndex: 15,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        {/* Top-Left Bracket */}
        {enableBrackets && (
          <path
            d={`M 0 ${bracketSize} L 0 0 L ${bracketSize} 0`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {enableCrosshairs && (
          <g transform={`translate(-6, -6)`}>
            <line x1={-crossSize} y1={0} x2={crossSize} y2={0} stroke={color} strokeWidth="1.2" />
            <line x1={0} y1={-crossSize} x2={0} y2={crossSize} stroke={color} strokeWidth="1.2" />
          </g>
        )}

        {/* Top-Right Bracket */}
        {enableBrackets && (
          <path
            d={`M calc(100% - ${bracketSize}px) 0 L 100% 0 L 100% ${bracketSize}px`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {enableCrosshairs && (
          <g style={{ transform: "translate(calc(100% + 6px), -6px)" }}>
            <line x1={-crossSize} y1={0} x2={crossSize} y2={0} stroke={color} strokeWidth="1.2" />
            <line x1={0} y1={-crossSize} x2={0} y2={crossSize} stroke={color} strokeWidth="1.2" />
          </g>
        )}

        {/* Bottom-Left Bracket */}
        {enableBrackets && (
          <path
            d={`M 0 calc(100% - ${bracketSize}px) L 0 100% L ${bracketSize}px 100%`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {enableCrosshairs && (
          <g style={{ transform: "translate(-6px, calc(100% + 6px))" }}>
            <line x1={-crossSize} y1={0} x2={crossSize} y2={0} stroke={color} strokeWidth="1.2" />
            <line x1={0} y1={-crossSize} x2={0} y2={crossSize} stroke={color} strokeWidth="1.2" />
          </g>
        )}

        {/* Bottom-Right Bracket */}
        {enableBrackets && (
          <path
            d={`M calc(100% - ${bracketSize}px) 100% L 100% 100% L 100% calc(100% - ${bracketSize}px)`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {enableCrosshairs && (
          <g style={{ transform: "translate(calc(100% + 6px), calc(100% + 6px))" }}>
            <line x1={-crossSize} y1={0} x2={crossSize} y2={0} stroke={color} strokeWidth="1.2" />
            <line x1={0} y1={-crossSize} x2={0} y2={crossSize} stroke={color} strokeWidth="1.2" />
          </g>
        )}
      </svg>
    </div>
  );
};
