import React from "react";
import { spring, useVideoConfig } from "remotion";
import { GabaskinsQuestProps } from "./schema";

interface GabaskinsCharacterProps {
  props: GabaskinsQuestProps;
  frame: number;
}

export const GabaskinsCharacter: React.FC<GabaskinsCharacterProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    characterName = "GABASKINS",
    characterSubtitle = "REDDIT",
    showSubtitle = true,
    characterColor = "#22c55e",
    showAntenna = true,
    antennaColor = "#ffffff",
    circleSize = 210,
    headSize = 38,
    bodySize = 75,
    headY = 68,
    bodyY = 166,
    characterScale = 1.2,
    positionX = 50,
    positionY = 50,
    lineColor = "#ffffff",
    lineWidth = 2.5,
    idleBobbing = true,
    characterEnterFrame = 5,
  } = props;

  // Sprężyste wejście postaci na ekran
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

  // Sprężyste machnięcie antenki po wejściu na scenę
  const antennaWobbleSpring = spring({
    frame: frame - (characterEnterFrame + 4),
    fps,
    config: { damping: 7, stiffness: 80, mass: 0.6 },
  });
  const antennaAngle = (1 - Math.min(1, antennaWobbleSpring)) * 14 * Math.sin(frame * 0.4);

  return (
    <div
      style={{
        position: "absolute",
        left: `${positionX}%`,
        top: `${positionY}%`,
        transform: `translate(-50%, -50%) translateY(${bobY}px) scale(${
          clampedEnter * characterScale
        })`,
        opacity: Math.min(1, clampedEnter * 1.5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* ================= 1. KÓŁKO AVATARA GABASKINSA (ZIELONY + ANTENKA REDDIT) ================= */}
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
            <clipPath id="gabaskins-avatar-clip">
              <circle cx="100" cy="100" r="99" />
            </clipPath>
          </defs>

          {/* Wnętrze avatara (klipowane do idealnego koła, bez żadnych pasków i gliczów) */}
          <g clipPath="url(#gabaskins-avatar-clip)">
            {/* Tło kółka */}
            <circle cx="100" cy="100" r="100" fill="#000000" />

            {/* Czyste geometryczne koło tułowia Gabaskinsa (soczysta zieleń #22c55e) */}
            <circle cx="100" cy={bodyY} r={bodySize} fill={characterColor} />

            {/* Czyste geometryczne koło głowy Gabaskinsa */}
            <circle cx="100" cy={headY} r={headSize} fill={characterColor} />

            {/* Ikoniczna antenka Reddit Snoo wyrastająca ze środka głowy */}
            {showAntenna && (
              <g
                transform={`translate(100, ${headY - headSize + 4}) rotate(${antennaAngle}) translate(-100, -${headY - headSize + 4})`}
              >
                {/* Łodyga antenki: wygięta w prawo z załamaniem jak u maskotki Reddita Snoo */}
                <path
                  d="M 100,34 L 105,18 L 123,22"
                  fill="none"
                  stroke={antennaColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Kuleczka / końcówka antenki */}
                <circle
                  cx="127"
                  cy="23"
                  r="6"
                  fill={characterColor}
                  stroke={antennaColor}
                  strokeWidth="2.5"
                />
              </g>
            )}
          </g>

          {/* Biała obwódka rysowana natywnie w SVG na wierzchu — idealna szczelność */}
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

      {/* ================= 2. PODPIS POSTACI ("GABASKINS") ================= */}
      <div
        style={{
          marginTop: 14,
          backgroundColor: "#000000",
          border: `2px solid ${lineColor}`,
          borderRadius: 8,
          padding: "6px 22px",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
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
            lineHeight: 1.1,
          }}
        >
          {characterName}
        </span>

        {showSubtitle && characterSubtitle && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              fontFamily: "monospace",
              color: characterColor,
              letterSpacing: 2,
              marginTop: 1,
            }}
          >
            {characterSubtitle}
          </span>
        )}
      </div>
    </div>
  );
};
