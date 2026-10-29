import React from "react";

interface CassetteWireframeProps {
  width?: number; // e.g. 98
  height?: number; // e.g. 62
  strokeColor?: string;
  strokeWidth?: number;
  spoolRotation?: number; // in degrees
  opacity?: number;
  detailsOpacity?: number; // 1 = full details, 0 = only chassis lines (for squash)
  squashFactor?: number; // 1 = normal height, 0 = completely flat line
  chassisFill?: string; // e.g. "#000000"
}

export const CassetteWireframe: React.FC<CassetteWireframeProps> = ({
  width = 98,
  height = 62,
  strokeColor = "#ffffff",
  strokeWidth = 1.5,
  spoolRotation = 0,
  opacity = 1,
  detailsOpacity = 1,
  squashFactor = 1,
  chassisFill = "#000000",
}) => {
  // If completely flattened, render single flat horizontal line
  if (squashFactor <= 0.01) {
    return (
      <line
        x1={0}
        y1={0}
        x2={width}
        y2={0}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  }

  // Base internal viewBox: 240 x 152
  const currentHeight = height * Math.max(0.01, squashFactor);

  return (
    <svg
      width={width}
      height={currentHeight}
      viewBox="0 0 240 152"
      preserveAspectRatio="none"
      fill="none"
      style={{
        overflow: "visible",
        opacity,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Outer Chassis Contour */}
      <rect
        x="2"
        y="2"
        width="236"
        height="148"
        rx={Math.min(9, 9 * squashFactor)}
        ry={Math.min(9, 9 * squashFactor)}
        fill={chassisFill}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />

      {/* 2. Inner Rim Line */}
      {detailsOpacity > 0.05 && (
        <rect
          x="6"
          y="6"
          width="228"
          height="140"
          rx={Math.min(6, 6 * squashFactor)}
          ry={Math.min(6, 6 * squashFactor)}
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.65}
          strokeOpacity={0.4 * detailsOpacity}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* 3. Bottom Head Section Trapezoidal Notch */}
      {detailsOpacity > 0.1 && (
        <path
          d="M 40 150 L 52 114 L 188 114 L 200 150"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeOpacity={detailsOpacity}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* 4. Bottom Guide Holes & Head Opening */}
      {detailsOpacity > 0.25 && (
        <g opacity={detailsOpacity}>
          <circle
            cx="68"
            cy="132"
            r="4.5"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.8}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="172"
            cy="132"
            r="4.5"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.8}
            vectorEffect="non-scaling-stroke"
          />
          <rect
            x="108"
            y="124"
            width="24"
            height="22"
            rx="2"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.8}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      )}

      {/* 5. Center Transparent Tape Window */}
      {detailsOpacity > 0.15 && (
        <rect
          x="54"
          y="42"
          width="132"
          height="58"
          rx={Math.min(6, 6 * squashFactor)}
          fill={chassisFill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeOpacity={detailsOpacity}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* 6. LEFT SPOOL HUB (Animated 6-tooth gear) */}
      {detailsOpacity > 0.2 && (
        <g
          transform={`translate(86, 71) rotate(${spoolRotation})`}
          opacity={detailsOpacity}
        >
          <circle
            cx="0"
            cy="0"
            r="15"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="0"
            cy="0"
            r="6.5"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.8}
            vectorEffect="non-scaling-stroke"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={`left-cog-${deg}`}
              d="M -1.8 -14 L -1 -6.5 L 1 -6.5 L 1.8 -14 Z"
              fill={strokeColor}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      )}

      {/* 7. RIGHT SPOOL HUB (Animated 6-tooth gear) */}
      {detailsOpacity > 0.2 && (
        <g
          transform={`translate(154, 71) rotate(${spoolRotation})`}
          opacity={detailsOpacity}
        >
          <circle
            cx="0"
            cy="0"
            r="15"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="0"
            cy="0"
            r="6.5"
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.8}
            vectorEffect="non-scaling-stroke"
          />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={`right-cog-${deg}`}
              d="M -1.8 -14 L -1 -6.5 L 1 -6.5 L 1.8 -14 Z"
              fill={strokeColor}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      )}

      {/* 8. 4 Corner Screws */}
      {detailsOpacity > 0.3 && (
        <g opacity={detailsOpacity}>
          {[
            { cx: 12, cy: 12 },
            { cx: 228, cy: 12 },
            { cx: 16, cy: 140 },
            { cx: 224, cy: 140 },
          ].map((pos, idx) => (
            <g key={`screw-${idx}`}>
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r="3"
                stroke={strokeColor}
                strokeWidth={strokeWidth * 0.65}
                strokeOpacity={0.6}
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={pos.cx - 2}
                y1={pos.cy}
                x2={pos.cx + 2}
                y2={pos.cy}
                stroke={strokeColor}
                strokeWidth={strokeWidth * 0.6}
                strokeOpacity={0.7}
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={pos.cx}
                y1={pos.cy - 2}
                x2={pos.cx}
                y2={pos.cy + 2}
                stroke={strokeColor}
                strokeWidth={strokeWidth * 0.6}
                strokeOpacity={0.7}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </g>
      )}

      {/* 9. Top Label Indicator Line */}
      {detailsOpacity > 0.2 && (
        <line
          x1="32"
          y1="24"
          x2="208"
          y2="24"
          stroke={strokeColor}
          strokeWidth={strokeWidth * 0.6}
          strokeOpacity={0.35 * detailsOpacity}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
};
