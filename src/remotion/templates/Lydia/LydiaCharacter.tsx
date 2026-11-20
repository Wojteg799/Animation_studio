import React from "react";
import { spring, useVideoConfig } from "remotion";
import { LydiaProps } from "./schema";

interface LydiaCharacterProps {
  props: LydiaProps;
  frame: number;
}

export const LydiaCharacter: React.FC<LydiaCharacterProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    characterName = "LYDIA",
    characterColor = "#38bdf8",
    circleSize = 230,
    headSize = 42,
    bodySize = 78,
    headY = 55,
    bodyY = 164,
    characterScale = 1.35,
    positionX = 50,
    positionY = 50,
    lineColor = "#ffffff",
    lineWidth = 2.5,
    idleBobbing = true,
    characterEnterFrame = 5,
  } = props;

  // 1. Sprężyste wejście postaci na ekran (dokładnie jak w animacji z Antonem Riedlem)
  const enterSpring = spring({
    frame: frame - characterEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  if (frame < characterEnterFrame) {
    return null;
  }

  // 2. Organiczny oddech (idle bobbing)
  const bobY = idleBobbing ? Math.sin(frame * 0.08) * 3 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: `${positionX}%`,
        top: `${positionY}%`,
        transform: `translate(-50%, -50%) translateY(${bobY}px) scale(${clampedEnter * characterScale})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* ================= 1. KÓŁKO AVATARA LYDII ================= */}
      {/* Natywne klipowanie SVG + obwódka SVG (brak jakichkolwiek szpar i migania) */}
      <div
        style={{
          width: circleSize,
          height: circleSize,
          position: "relative",
          boxShadow: "none",
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          style={{
            display: "block",
            overflow: "visible",
          }}
        >
          <defs>
            <clipPath id="lydia-solo-avatar-clip">
              <circle cx="100" cy="100" r="99" />
            </clipPath>
          </defs>

          {/* Wnętrze avatara wycięte do kółka o promieniu 99 */}
          <g clipPath="url(#lydia-solo-avatar-clip)">
            {/* Tło kółka */}
            <circle cx="100" cy="100" r="100" fill="#000000" />

            {/* Czyste geometryczne koło tułowia Lydii */}
            <circle cx="100" cy={bodyY} r={bodySize} fill={characterColor} />

            {/* Czyste geometryczne koło głowy Lydii */}
            <circle cx="100" cy={headY} r={headSize} fill={characterColor} />
          </g>

          {/* Biała obwódka rysowana natywnie w SVG na wierzchu — idealnie szczelna */}
          <circle
            cx="100"
            cy="100"
            r="98.2"
            fill="none"
            stroke={lineColor}
            strokeWidth={lineWidth + 1}
          />
        </svg>
      </div>

      {/* ================= 2. PODPIS POSTACI ("LYDIA") ================= */}
      <div
        style={{
          marginTop: 14,
          backgroundColor: "#000000",
          border: `2px solid ${lineColor}`,
          borderRadius: 8,
          padding: "6px 24px",
          boxShadow: "none",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 900,
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            color: lineColor,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {characterName}
        </span>
      </div>
    </div>
  );
};
