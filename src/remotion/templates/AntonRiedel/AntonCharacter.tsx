import React from "react";
import { spring, useVideoConfig } from "remotion";
import { AntonRiedelProps } from "./schema";
import { DisguiseGlasses } from "./DisguiseGlasses";

interface AntonCharacterProps {
  props: AntonRiedelProps;
  frame: number;
}

export const AntonCharacter: React.FC<AntonCharacterProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    characterName = "ANTON RIEDEL",
    originalName = "LYDIA",
    enableTransformation = false,
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
    disguiseDropFrame = 18,
  } = props;

  // 1. Wejście postaci na ekran (sprężysty wlot pop-in)
  const enterSpring = spring({
    frame: frame - characterEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  if (frame < characterEnterFrame) {
    return null;
  }

  // Organiczny oddech (idle bobbing)
  const bobY = idleBobbing ? Math.sin(frame * 0.08) * 3 : 0;

  // Transformacja tekstu (jeśli włączona opcja LYDIA -> ANTON RIEDEL)
  const isTransformed = !enableTransformation || frame >= disguiseDropFrame;
  const currentDisplayName = isTransformed ? characterName : originalName;

  // Animacja obrotu etykiety 3D przy zmianie tożsamości
  const flipProgress = enableTransformation
    ? Math.max(0, Math.min(1, (frame - disguiseDropFrame) / 10))
    : 1;
  const flipAngle = enableTransformation
    ? frame < disguiseDropFrame
      ? 0
      : (1 - flipProgress) * 90
    : 0;

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
      {/* ================= 1. KÓŁKO AVATARA Z POSTACIĄ I KAMUFLAŻEM ================= */}
      {/* Używamy natywnego klipowania SVG + obwódki w SVG, eliminując wszelkie migające paski / glicze na brzuszku */}
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
            <clipPath id="anton-avatar-clip">
              <circle cx="100" cy="100" r="99" />
            </clipPath>
          </defs>

          {/* Wnętrze avatara wycięte do kółka o promieniu 99 */}
          <g clipPath="url(#anton-avatar-clip)">
            {/* Tło kółka */}
            <circle cx="100" cy="100" r="100" fill="#000000" />

            {/* Czyste geometryczne koło tułowia Lydii (płynnie i szeroko wypełnia dół brzuszka) */}
            <circle cx="100" cy={bodyY} r={bodySize} fill={characterColor} />

            {/* Czyste geometryczne koło głowy Lydii */}
            <circle cx="100" cy={headY} r={headSize} fill={characterColor} />

            {/* Okulary Groucho z dużym nosem i wąsem nałożone na twarz */}
            <DisguiseGlasses props={props} frame={frame} />
          </g>

          {/* Biała obwódka rysowana natywnie w SVG na wierzchu — idealnie szczelna, zero szpar i migania */}
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

      {/* ================= 2. PODPIS POSTACI ("ANTON RIEDEL") ================= */}
      <div
        style={{
          marginTop: 14,
          backgroundColor: "#000000",
          border: `2px solid ${lineColor}`,
          borderRadius: 8,
          padding: "6px 24px",
          boxShadow: "none",
          transform: `perspective(400px) rotateX(${flipAngle}deg)`,
          transformOrigin: "center center",
          transition: "transform 0.15s ease-out",
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
          {currentDisplayName}
        </span>
      </div>
    </div>
  );
};
