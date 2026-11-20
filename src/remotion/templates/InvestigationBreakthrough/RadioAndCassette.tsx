import React from "react";
import { spring, useVideoConfig } from "remotion";
import { InvestigationBreakthroughProps } from "./schema";

interface RadioAndCassetteProps {
  props: InvestigationBreakthroughProps;
  frame: number;
}

export const RadioAndCassette: React.FC<RadioAndCassetteProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showRadio = true,
    showCassetteRecognition = true,
    dariusX = 20,
    dariusY = 52,
    dariusColor = "#facc15",
    lineColor = "#ffffff",
    radioStartFrame = 10,
    dariusRecognizeFrame = 32,
    idleBobbing = true,
  } = props;

  // 1. Wejście symbolu radia / audycji
  const radioSpring = spring({
    frame: frame - radioStartFrame,
    fps,
    config: { damping: 13, stiffness: 105 },
  });
  const clampedRadio = Math.max(0, Math.min(1.1, radioSpring));
  const radioBob = idleBobbing ? Math.sin(frame * 0.09) * 2.5 : 0;

  // Fale dźwiękowe z radia
  const waveProgress = ((frame - radioStartFrame) % 36) / 36;
  const waveScale = 1 + waveProgress * 0.45;
  const waveOpacity = Math.max(0, (1 - waveProgress) * 0.7);

  // 2. Wejście kasety z wykrzyknikiem (rozpoznanie nagrania przez Dariusa)
  const cassetteSpring = spring({
    frame: frame - dariusRecognizeFrame,
    fps,
    config: { damping: 12, stiffness: 110, mass: 0.75 },
  });
  const clampedCassette = Math.max(0, Math.min(1.15, cassetteSpring));
  const cassetteBob = idleBobbing ? Math.sin((frame + 18) * 0.1) * 3 : 0;

  // Rotacja szpul taśmy
  const spoolRotation = (frame * 3.5) % 360;

  return (
    <>
      {/* =========================================================
          AUDYCJA RADIOWA (NA ANTENIE: BASKERVILLE + PIOSENKA)
          ========================================================= */}
      {showRadio && frame >= radioStartFrame && (
        <div
          style={{
            position: "absolute",
            left: `${dariusX}%`,
            top: "22%",
            transform: `translate(-50%, -50%) translateY(${radioBob}px) scale(${clampedRadio})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          {/* Fale radiowe rozchodzące się na boki */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 54,
              height: 54,
              transform: `translate(-50%, -50%) scale(${waveScale})`,
              opacity: waveOpacity,
              border: `1.8px solid ${dariusColor}`,
              borderRadius: "50%",
            }}
          />

          {/* Kafel radia NDR */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Minimalistyczna ikona radia z antenką */}
            <svg viewBox="0 0 40 40" width="32" height="32">
              {/* Antena */}
              <line x1="12" y1="12" x2="28" y2="4" stroke={lineColor} strokeWidth="2" strokeLinecap="round" />
              {/* Obudowa */}
              <rect x="6" y="12" width="28" height="20" rx="4" fill="none" stroke={lineColor} strokeWidth="2" />
              {/* Głośnik */}
              <circle cx="16" cy="22" r="5" fill="none" stroke={dariusColor} strokeWidth="1.8" />
              {/* Pokrętła */}
              <circle cx="27" cy="18" r="2" fill={lineColor} />
              <circle cx="27" cy="26" r="2" fill={lineColor} />
            </svg>
          </div>

          <div
            style={{
              marginTop: 6,
              backgroundColor: "#000000",
              border: `1.2px solid ${dariusColor}`,
              borderRadius: 4,
              padding: "1px 8px",
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                color: dariusColor,
                fontFamily: "monospace",
                letterSpacing: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              AUDYCJA W RADIU
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          KASETA DARIUSA ("ROZPOZNAJE NAGRANIE ZE SWOJEJ KASETY")
          ========================================================= */}
      {showCassetteRecognition && frame >= dariusRecognizeFrame && (
        <div
          style={{
            position: "absolute",
            left: `${dariusX + 8}%`,
            top: `${dariusY - 18}%`,
            transform: `translate(-50%, -50%) translateY(${cassetteBob}px) scale(${clampedCassette})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 25,
            pointerEvents: "none",
          }}
        >
          {/* Miniaturowa kaseta wireframe ze szpulami */}
          <div
            style={{
              backgroundColor: "#000000",
              border: `2px solid ${dariusColor}`,
              borderRadius: 8,
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 4px 16px rgba(0,0,0,0.8)",
            }}
          >
            {/* Wektorowa minikaseta */}
            <svg viewBox="0 0 60 38" width="34" height="22">
              <rect x="2" y="2" width="56" height="34" rx="3" fill="#000" stroke={dariusColor} strokeWidth="2" />
              {/* Dwie kręcące się szpulki */}
              <g transform="translate(18, 19)">
                <circle cx="0" cy="0" r="5" fill="none" stroke={lineColor} strokeWidth="1.5" />
                <g transform={`rotate(${spoolRotation})`}>
                  <line x1="-3" y1="0" x2="3" y2="0" stroke={lineColor} strokeWidth="1.2" />
                </g>
              </g>
              <g transform="translate(42, 19)">
                <circle cx="0" cy="0" r="5" fill="none" stroke={lineColor} strokeWidth="1.5" />
                <g transform={`rotate(${spoolRotation})`}>
                  <line x1="-3" y1="0" x2="3" y2="0" stroke={lineColor} strokeWidth="1.2" />
                </g>
              </g>
            </svg>

            {/* Wykrzyknik rozpoznania */}
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: dariusColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#000000",
                  fontFamily: "monospace",
                }}
              >
                !
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 4,
              backgroundColor: "#000000",
              border: `1.2px solid ${lineColor}`,
              borderRadius: 4,
              padding: "1px 7px",
            }}
          >
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                color: lineColor,
                fontFamily: "monospace",
                letterSpacing: 1,
                whiteSpace: "nowrap",
              }}
            >
              MOJA KASETA 1984
            </span>
          </div>
        </div>
      )}
    </>
  );
};
