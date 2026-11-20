import React from "react";
import { spring, useVideoConfig } from "remotion";
import { GabrielPaulFacebookProps } from "./schema";

interface GabrielPaulCharactersProps {
  props: GabrielPaulFacebookProps;
  frame: number;
}

export const GabrielPaulCharacters: React.FC<GabrielPaulCharactersProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    gabrielName = "GABRIEL",
    gabrielSubtitle = "GABASKINS",
    showGabrielSubtitle = true,
    gabrielColor = "#22c55e",
    gabrielShowAntenna = true,
    gabrielX = 26,
    gabrielY = 50,

    paulName = "PAUL BASKERVILLE",
    paulSubtitle = "NDR • DZIENNIKARZ",
    showPaulSubtitle = true,
    paulColor = "#92400e",
    paulShowHeadphones = true,
    paulHeadShake = true,
    paulX = 74,
    paulY = 50,

    charactersScale = 1.15,
    circleSize = 200,
    headSize = 38,
    bodySize = 75,
    headY = 68,
    bodyY = 166,

    lineColor = "#ffffff",
    lineWidth = 2.5,
    idleBobbing = true,

    charactersEnterFrame = 5,
    messageReplyFrame = 82,
    questionMarkFrame = 116,
  } = props;

  // 1. Sprężyste wejście postaci
  const enterSpring = spring({
    frame: frame - charactersEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });
  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  if (frame < charactersEnterFrame) {
    return null;
  }

  // 2. Idle bobbing (organiczny oddech z przesunięciem fazy)
  const gabrielBob = idleBobbing ? Math.sin(frame * 0.08) * 3 : 0;
  const paulBob = idleBobbing ? Math.sin((frame + 16) * 0.08) * 3 : 0;

  // 3. Radość Gabriela po otrzymaniu odpowiedzi od dziennikarza ("Ku jego radości...")
  const joyProgress = Math.max(0, Math.min(1, (frame - messageReplyFrame) / 18));
  const joyJump =
    frame >= messageReplyFrame && frame < messageReplyFrame + 30
      ? Math.sin((frame - messageReplyFrame) * 0.28) * 7 * (1 - joyProgress)
      : 0;

  // 4. Zakłopotane potrząśnięcie głową Paula ("nie rozpoznaje utworu...")
  const shakeProgress = Math.max(0, Math.min(1, (frame - questionMarkFrame) / 36));
  const paulShakeAngle =
    paulHeadShake && frame >= questionMarkFrame && frame < questionMarkFrame + 45
      ? Math.sin((frame - questionMarkFrame) * 0.45) * 6.5 * (1 - shakeProgress)
      : 0;

  // 5. Bujanie antenki Snoo Gabriela
  const antennaAngle = Math.sin(frame * 0.12) * 4;

  return (
    <>
      {/* =========================================================
          POSTAĆ 1: GABRIEL (ZIELONY, ANTENKA REDDITA SNOO)
          ========================================================= */}
      <div
        style={{
          position: "absolute",
          left: `${gabrielX}%`,
          top: `${gabrielY}%`,
          transform: `translate(-50%, -50%) translateY(${gabrielBob - joyJump}px) scale(${
            clampedEnter * charactersScale
          })`,
          opacity: Math.min(1, clampedEnter * 1.5),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        {/* Kółko awatara Gabriela */}
        <div
          style={{
            width: circleSize,
            height: circleSize,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              <clipPath id="gabriel-avatar-clip">
                <circle cx="100" cy="100" r="99" />
              </clipPath>
            </defs>

            {/* Wnętrze avatara klipowane szczelnie w SVG */}
            <g clipPath="url(#gabriel-avatar-clip)">
              <circle cx="100" cy="100" r="100" fill="#000000" />
              {/* Tułów Gabriela (soczysta zieleń) */}
              <circle cx="100" cy={bodyY} r={bodySize} fill={gabrielColor} />
              {/* Głowa Gabriela */}
              <circle cx="100" cy={headY} r={headSize} fill={gabrielColor} />

              {/* Antenka Reddit Snoo */}
              {gabrielShowAntenna && (
                <g
                  transform={`translate(100, ${headY - headSize + 4}) rotate(${antennaAngle}) translate(-100, -${headY - headSize + 4})`}
                >
                  <path
                    d="M 100,34 L 105,18 L 123,22"
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="127"
                    cy="23"
                    r="5.5"
                    fill={gabrielColor}
                    stroke={lineColor}
                    strokeWidth="2.2"
                  />
                </g>
              )}
            </g>

            {/* Biała obwódka avatara */}
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

        {/* Podpis postaci "GABRIEL" */}
        <div
          style={{
            marginTop: 14,
            backgroundColor: "#000000",
            border: `2px solid ${lineColor}`,
            borderRadius: 8,
            padding: "5px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              color: lineColor,
              letterSpacing: 2.2,
              lineHeight: 1.1,
            }}
          >
            {gabrielName}
          </span>
          {showGabrielSubtitle && gabrielSubtitle && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: "monospace",
                color: gabrielColor,
                letterSpacing: 1.8,
              }}
            >
              {gabrielSubtitle}
            </span>
          )}
        </div>
      </div>

      {/* =========================================================
          POSTAĆ 2: PAUL BASKERVILLE (CIEPŁY BRĄZ, RADIOWIEC NDR)
          ========================================================= */}
      <div
        style={{
          position: "absolute",
          left: `${paulX}%`,
          top: `${paulY}%`,
          transform: `translate(-50%, -50%) translateY(${paulBob}px) rotate(${paulShakeAngle}deg) scale(${
            clampedEnter * charactersScale
          })`,
          transformOrigin: "center center",
          opacity: Math.min(1, clampedEnter * 1.5),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        {/* Kółko awatara Paula Baskerville'a */}
        <div
          style={{
            width: circleSize,
            height: circleSize,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            style={{ display: "block", overflow: "visible" }}
          >
            <defs>
              <clipPath id="paul-avatar-clip">
                <circle cx="100" cy="100" r="99" />
              </clipPath>
            </defs>

            {/* Wnętrze avatara klipowane */}
            <g clipPath="url(#paul-avatar-clip)">
              <circle cx="100" cy="100" r="100" fill="#000000" />
              {/* Tułów Paula (ciepły brąz) */}
              <circle cx="100" cy={bodyY} r={bodySize} fill={paulColor} />
              {/* Głowa Paula */}
              <circle cx="100" cy={headY} r={headSize} fill={paulColor} />

              {/* Minimalistyczne słuchawki studyjne DJ (ikona radiowca NDR) */}
              {paulShowHeadphones && (
                <g>
                  {/* Pałąk słuchawek nad głową */}
                  <path
                    d={`M ${100 - headSize - 4},${headY + 6} A ${headSize + 4} ${headSize + 4} 0 0 1 ${100 + headSize + 4},${headY + 6}`}
                    fill="none"
                    stroke={lineColor}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Lewa poduszka nauszna */}
                  <rect
                    x={100 - headSize - 8}
                    y={headY - 4}
                    width="7"
                    height="18"
                    rx="3.5"
                    fill={lineColor}
                  />
                  {/* Prawa poduszka nauszna */}
                  <rect
                    x={100 + headSize + 1}
                    y={headY - 4}
                    width="7"
                    height="18"
                    rx="3.5"
                    fill={lineColor}
                  />
                </g>
              )}
            </g>

            {/* Biała obwódka avatara */}
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

        {/* Podpis postaci "PAUL BASKERVILLE" */}
        <div
          style={{
            marginTop: 14,
            backgroundColor: "#000000",
            border: `2px solid ${lineColor}`,
            borderRadius: 8,
            padding: "5px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              color: lineColor,
              letterSpacing: 2.2,
              lineHeight: 1.1,
            }}
          >
            {paulName}
          </span>
          {showPaulSubtitle && paulSubtitle && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                fontFamily: "monospace",
                color: paulColor,
                letterSpacing: 1.8,
              }}
            >
              {paulSubtitle}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
