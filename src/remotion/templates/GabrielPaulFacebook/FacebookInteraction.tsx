import React from "react";
import { spring, useVideoConfig } from "remotion";
import { GabrielPaulFacebookProps } from "./schema";

interface FacebookInteractionProps {
  props: GabrielPaulFacebookProps;
  frame: number;
}

export const FacebookInteraction: React.FC<FacebookInteractionProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showFacebook = true,
    facebookStyle = "vibrant",
    facebookColor = "#1877f2",
    facebookScale = 1.3,
    showFacebookLabel = false,
    facebookX = 50,
    facebookY = 42,
    showChatBubbles = true,
    showConnectionLines = true,
    gabrielX = 26,
    gabrielY = 50,
    paulX = 74,
    paulY = 50,
    gabrielColor = "#22c55e",
    paulColor = "#92400e",
    lineColor = "#ffffff",
    idleBobbing = true,
    facebookEnterFrame = 28,
    messageSentFrame = 46,
    messageReplyFrame = 82,
  } = props;

  const isMonochrome = facebookStyle === "monochrome";
  const effectiveFbColor = isMonochrome ? "#ffffff" : facebookColor;

  // 1. Płynne wejście Logo Facebooka (stabilne, bez pulsowania i gliczów)
  const fbEnterSpring = spring({
    frame: frame - facebookEnterFrame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });
  const clampedFbEnter = Math.max(0, Math.min(1, fbEnterSpring));
  const fbBob = idleBobbing ? Math.sin((frame + 8) * 0.08) * 2.5 : 0;

  // 2. Wiadomość 1 (Gabriel wysyła pytanie z próbką do Facebooka)
  const msg1Spring = spring({
    frame: frame - messageSentFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const msg1Progress = Math.max(0, Math.min(1, msg1Spring));
  // Lot od Gabriela (26%) do Facebooka (50%)
  const msg1CurrentX = gabrielX + 8 + (facebookX - (gabrielX + 8)) * msg1Progress;
  const msg1CurrentY = gabrielY - 4 + (facebookY - (gabrielY - 4)) * msg1Progress;

  // 4. Wiadomość 2 (Odpowiedź Paula przez Facebooka)
  const msg2Spring = spring({
    frame: frame - messageReplyFrame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });
  const msg2Progress = Math.max(0, Math.min(1, msg2Spring));
  // Lot od Paula (74%) do Facebooka / Gabriela
  const msg2CurrentX = paulX - 8 - ((paulX - 8) - (facebookX + 4)) * msg2Progress;
  const msg2CurrentY = paulY - 4 + (facebookY - (paulY - 4)) * msg2Progress;

  // Linie transmisyjne
  const line1Opacity = Math.max(0, Math.min(1, (frame - messageSentFrame) / 12));
  const line2Opacity = Math.max(0, Math.min(1, (frame - messageReplyFrame) / 12));

  return (
    <>
      {/* =========================================================
          LINIE SYGNAŁU CZATU (GABRIEL -> FACEBOOK -> PAUL)
          ========================================================= */}
      {showConnectionLines && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 16,
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Linia od Gabriela do Facebooka */}
          {line1Opacity > 0.01 && (
            <g opacity={line1Opacity}>
              <line
                x1={gabrielX + 7}
                y1={gabrielY}
                x2={facebookX - 4}
                y2={facebookY + 3}
                stroke={lineColor}
                strokeWidth="0.3"
                strokeDasharray="1.2 1.2"
                strokeOpacity="0.6"
              />
            </g>
          )}

          {/* Linia od Paula do Facebooka */}
          {line2Opacity > 0.01 && (
            <g opacity={line2Opacity}>
              <line
                x1={paulX - 7}
                y1={paulY}
                x2={facebookX + 4}
                y2={facebookY + 3}
                stroke={lineColor}
                strokeWidth="0.3"
                strokeDasharray="1.2 1.2"
                strokeOpacity="0.6"
              />
            </g>
          )}
        </svg>
      )}

      {/* =========================================================
          CENTRUM: LOGO FACEBOOKA / MESSENGER
          ========================================================= */}
      {showFacebook && frame >= facebookEnterFrame && (
        <div
          style={{
            position: "absolute",
            left: `${facebookX}%`,
            top: `${facebookY}%`,
            transform: `translate(-50%, -50%) translateY(${fbBob}px) scale(${
              clampedFbEnter * facebookScale
            })`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          {/* Kafel logo Facebooka - czyste, stabilne wektory bez żadnego pulsowania i cieni */}
          <div
            style={{
              width: 74,
              height: 74,
              backgroundColor: isMonochrome ? "#000000" : effectiveFbColor,
              border: `2.5px solid #ffffff`,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "none",
            }}
          >
            {/* Wektorowa ikona litery "f" Facebooka */}
            <svg viewBox="0 0 80 80" width="56" height="56">
              <path
                d="M 52,24 H 43 C 37,24 34,27 34,33 V 40 H 26 V 49 H 34 V 74 H 44 V 49 H 52 L 53.5,40 H 44 V 34 C 44,31.5 45.5,30 48,30 H 52 Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Opcjonalny podpis FACEBOOK (wyłączony domyślnie - samo logo) */}
          {showFacebookLabel && (
            <div
              style={{
                marginTop: 10,
                backgroundColor: "#000000",
                border: `1.8px solid ${lineColor}`,
                borderRadius: 6,
                padding: "3px 14px",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: lineColor,
                  letterSpacing: 2,
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                FACEBOOK
              </span>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          ANIMOWANE DYMKI WIADOMOŚCI CZATU
          ========================================================= */}
      {showChatBubbles && (
        <>
          {/* Dymek 1: Gabriel przesyła zapytanie / nagranie do Paula */}
          {frame >= messageSentFrame && (
            <div
              style={{
                position: "absolute",
                left: `${msg1CurrentX}%`,
                top: `${msg1CurrentY}%`,
                transform: `translate(-50%, -50%) scale(${Math.min(1, msg1Progress)})`,
                backgroundColor: "#000000",
                border: `2px solid ${gabrielColor}`,
                borderRadius: 16,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                zIndex: 25,
                boxShadow: "0 4px 16px rgba(0,0,0,0.8)",
                pointerEvents: "none",
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill={gabrielColor}>
                {/* Ikona nutki / audio */}
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "monospace",
                  letterSpacing: 1,
                }}
              >
                1984 TRACK ?
              </span>
            </div>
          )}

          {/* Dymek 2: Odpowiedź Paula Baskerville'a ("dziennikarz odpowiada") */}
          {frame >= messageReplyFrame && (
            <div
              style={{
                position: "absolute",
                left: `${msg2CurrentX}%`,
                top: `${msg2CurrentY}%`,
                transform: `translate(-50%, -50%) scale(${Math.min(1, msg2Progress)})`,
                backgroundColor: "#000000",
                border: `2px solid ${paulColor}`,
                borderRadius: 16,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                zIndex: 25,
                boxShadow: "0 4px 16px rgba(0,0,0,0.8)",
                pointerEvents: "none",
              }}
            >
              {/* Ikona dymka odpowiedzi z 3 kropkami */}
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: 4.5,
                    height: 4.5,
                    borderRadius: "50%",
                    backgroundColor: paulColor,
                  }}
                />
                <span
                  style={{
                    width: 4.5,
                    height: 4.5,
                    borderRadius: "50%",
                    backgroundColor: lineColor,
                  }}
                />
                <span
                  style={{
                    width: 4.5,
                    height: 4.5,
                    borderRadius: "50%",
                    backgroundColor: paulColor,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  marginLeft: 2,
                }}
              >
                REPLY
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};
