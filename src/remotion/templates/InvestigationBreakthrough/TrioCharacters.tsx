import React from "react";
import { spring, useVideoConfig } from "remotion";
import { InvestigationBreakthroughProps } from "./schema";

interface TrioCharactersProps {
  props: InvestigationBreakthroughProps;
  frame: number;
}

export const TrioCharacters: React.FC<TrioCharactersProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    dariusName = "DARIUS",
    dariusColor = "#facc15",
    dariusX = 20,
    dariusY = 52,

    lydiaName = "LYDIA",
    lydiaColor = "#38bdf8",
    lydiaX = 50,
    lydiaY = 52,

    gabrielName = "GABRIEL",
    gabrielSubtitle = "GABASKINS",
    showGabrielSubtitle = true,
    gabrielColor = "#22c55e",
    gabrielShowAntenna = true,
    gabrielX = 80,
    gabrielY = 52,

    charactersScale = 0.95,
    circleSize = 180,
    headSize = 36,
    bodySize = 70,
    headY = 68,
    bodyY = 164,

    lineColor = "#ffffff",
    lineWidth = 2.5,
    idleBobbing = true,

    dariusEnterFrame = 5,
    lydiaEnterFrame = 48,
    gabrielEnterFrame = 140,
    messengerSendFrame = 180,
  } = props;

  // 1. Sprężyste wejście Dariusa
  const dariusEnter = spring({
    frame: frame - dariusEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });
  const clampedDarius = Math.max(0, Math.min(1, dariusEnter));
  const dariusBob = idleBobbing ? Math.sin(frame * 0.08) * 3 : 0;

  // 2. Sprężyste wejście Lydii
  const lydiaEnter = spring({
    frame: frame - lydiaEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });
  const clampedLydia = Math.max(0, Math.min(1, lydiaEnter));
  const lydiaBob = idleBobbing ? Math.sin((frame + 14) * 0.08) * 3 : 0;

  // 3. Sprężyste wejście Gabriela
  const gabrielEnter = spring({
    frame: frame - gabrielEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });
  const clampedGabriel = Math.max(0, Math.min(1, gabrielEnter));
  const gabrielBob = idleBobbing ? Math.sin((frame + 28) * 0.08) * 3 : 0;

  // Reakcja Gabriela po otrzymaniu wiadomości od Lydii
  const alertProgress = Math.max(
    0,
    Math.min(1, (frame - (messengerSendFrame + 20)) / 16)
  );
  const gabrielJump =
    frame >= messengerSendFrame + 20 && frame < messengerSendFrame + 48
      ? Math.sin((frame - (messengerSendFrame + 20)) * 0.3) * 6 * (1 - alertProgress)
      : 0;

  // Antenka Snoo
  const antennaAngle = Math.sin(frame * 0.12) * 4;

  return (
    <>
      {/* =========================================================
          POSTAĆ 1: DARIUS (ŻÓŁTY, ROZPOZNAJE KASETĘ Z RADIA)
          ========================================================= */}
      {frame >= dariusEnterFrame && (
        <div
          style={{
            position: "absolute",
            left: `${dariusX}%`,
            top: `${dariusY}%`,
            transform: `translate(-50%, -50%) translateY(${dariusBob}px) scale(${
              clampedDarius * charactersScale
            })`,
            opacity: Math.min(1, clampedDarius * 1.5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
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
                <clipPath id="trio-darius-clip">
                  <circle cx="100" cy="100" r="99" />
                </clipPath>
              </defs>
              <g clipPath="url(#trio-darius-clip)">
                <circle cx="100" cy="100" r="100" fill="#000000" />
                <circle cx="100" cy={bodyY} r={bodySize} fill={dariusColor} />
                <circle cx="100" cy={headY} r={headSize} fill={dariusColor} />
              </g>
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

          <div
            style={{
              marginTop: 12,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 8,
              padding: "5px 18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: lineColor,
                letterSpacing: 2,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {dariusName}
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          POSTAĆ 2: LYDIA (BŁĘKITNA, ŚLEDZTWO 2007 -> MESSENGER)
          ========================================================= */}
      {frame >= lydiaEnterFrame && (
        <div
          style={{
            position: "absolute",
            left: `${lydiaX}%`,
            top: `${lydiaY}%`,
            transform: `translate(-50%, -50%) translateY(${lydiaBob}px) scale(${
              clampedLydia * charactersScale
            })`,
            opacity: Math.min(1, clampedLydia * 1.5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
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
                <clipPath id="trio-lydia-clip">
                  <circle cx="100" cy="100" r="99" />
                </clipPath>
              </defs>
              <g clipPath="url(#trio-lydia-clip)">
                <circle cx="100" cy="100" r="100" fill="#000000" />
                <circle cx="100" cy={bodyY} r={bodySize} fill={lydiaColor} />
                <circle cx="100" cy={headY} r={headSize} fill={lydiaColor} />
              </g>
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

          <div
            style={{
              marginTop: 12,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 8,
              padding: "5px 18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: lineColor,
                letterSpacing: 2,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {lydiaName}
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          POSTAĆ 3: GABRIEL (ZIELONY, ANTENKA SNOO, ODBIERA WIADOMOŚĆ)
          ========================================================= */}
      {frame >= gabrielEnterFrame && (
        <div
          style={{
            position: "absolute",
            left: `${gabrielX}%`,
            top: `${gabrielY}%`,
            transform: `translate(-50%, -50%) translateY(${gabrielBob - gabrielJump}px) scale(${
              clampedGabriel * charactersScale
            })`,
            opacity: Math.min(1, clampedGabriel * 1.5),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
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
                <clipPath id="trio-gabriel-clip">
                  <circle cx="100" cy="100" r="99" />
                </clipPath>
              </defs>
              <g clipPath="url(#trio-gabriel-clip)">
                <circle cx="100" cy="100" r="100" fill="#000000" />
                <circle cx="100" cy={bodyY} r={bodySize} fill={gabrielColor} />
                <circle cx="100" cy={headY} r={headSize} fill={gabrielColor} />

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

          <div
            style={{
              marginTop: 12,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 8,
              padding: "5px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: lineColor,
                letterSpacing: 2,
                lineHeight: 1.1,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {gabrielName}
            </span>
            {showGabrielSubtitle && gabrielSubtitle && (
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: gabrielColor,
                  letterSpacing: 1.5,
                }}
              >
                {gabrielSubtitle}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
