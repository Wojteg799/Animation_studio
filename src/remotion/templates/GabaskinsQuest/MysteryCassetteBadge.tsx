import React from "react";
import { spring, useVideoConfig } from "remotion";
import { GabaskinsQuestProps } from "./schema";

interface MysteryCassetteBadgeProps {
  props: GabaskinsQuestProps;
  frame: number;
}

export const MysteryCassetteBadge: React.FC<MysteryCassetteBadgeProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showCassette = true,
    cassetteScale = 0.85,
    cassetteColor = "#facc15",
    lineColor = "#ffffff",
    cassetteEnterFrame = 25,
    idleBobbing = true,
  } = props;

  if (!showCassette || frame < cassetteEnterFrame) {
    return null;
  }

  // Sprężyste wejście kasety / próbki nagrania
  const enterSpring = spring({
    frame: frame - cassetteEnterFrame,
    fps,
    config: { damping: 13, stiffness: 110, mass: 0.7 },
  });
  const clampedEnter = Math.max(0, Math.min(1.15, enterSpring));

  // Płynne lewitowanie
  const floatBob = idleBobbing ? Math.sin((frame + 18) * 0.09) * 4 : 0;
  // Rotacja szpul taśmy
  const spoolRotation = (frame * 3.5) % 360;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "62%",
        transform: `translate(-50%, -50%) translateY(${floatBob}px) scale(${
          clampedEnter * cassetteScale
        })`,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8))",
      }}
    >
      <svg
        viewBox="0 0 140 90"
        width="112"
        height="72"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Tło korpusu kasety */}
        <rect
          x="4"
          y="4"
          width="132"
          height="82"
          rx="6"
          ry="6"
          fill="#000000"
          stroke={lineColor}
          strokeWidth="2.5"
        />

        {/* Etykieta kasety */}
        <rect
          x="16"
          y="12"
          width="108"
          height="32"
          rx="3"
          ry="3"
          fill="#111115"
          stroke={lineColor}
          strokeWidth="1.5"
        />

        {/* Znak zapytania lub napis tajemnicy */}
        <text
          x="70"
          y="26"
          fill={cassetteColor}
          fontSize="12"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
          dominantBaseline="central"
          letterSpacing="2"
        >
          ????
        </text>

        {/* Dolny trapez / zwężenie kasety */}
        <polygon
          points="24,84 116,84 104,50 36,50"
          fill="#09090b"
          stroke={lineColor}
          strokeWidth="1.5"
        />

        {/* Lewa szpula taśmy ze złotymi ząbkami */}
        <g transform="translate(48, 64)">
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke={cassetteColor}
            strokeWidth="2"
          />
          <g transform={`rotate(${spoolRotation})`}>
            <line x1="-6" y1="0" x2="6" y2="0" stroke={cassetteColor} strokeWidth="1.8" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke={cassetteColor} strokeWidth="1.8" />
          </g>
        </g>

        {/* Prawa szpula taśmy */}
        <g transform="translate(92, 64)">
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke={cassetteColor}
            strokeWidth="2"
          />
          <g transform={`rotate(${spoolRotation})`}>
            <line x1="-6" y1="0" x2="6" y2="0" stroke={cassetteColor} strokeWidth="1.8" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke={cassetteColor} strokeWidth="1.8" />
          </g>
        </g>

        {/* Okienko podglądu taśmy */}
        <rect
          x="40"
          y="56"
          width="60"
          height="16"
          rx="2"
          fill="none"
          stroke={lineColor}
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
      </svg>

      {/* Mała minimalistyczna etykietka "1984 CASSETTE" */}
      <div
        style={{
          marginTop: -6,
          backgroundColor: "#000000",
          border: `1.5px solid ${cassetteColor}`,
          borderRadius: 4,
          padding: "1px 8px",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 1.5,
            color: cassetteColor,
            fontFamily: "monospace",
          }}
        >
          AUDIO TRACK
        </span>
      </div>
    </div>
  );
};
