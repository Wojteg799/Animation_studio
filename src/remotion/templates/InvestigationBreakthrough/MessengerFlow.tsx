import React from "react";
import { spring, useVideoConfig } from "remotion";
import { InvestigationBreakthroughProps } from "./schema";

interface MessengerFlowProps {
  props: InvestigationBreakthroughProps;
  frame: number;
}

export const MessengerFlow: React.FC<MessengerFlowProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showMessengerMessage = true,
    showConnectionLines = true,
    messengerText = "WYJAŚNIENIE NAGRANIA",
    lydiaX = 50,
    lydiaY = 52,
    gabrielX = 80,
    gabrielY = 52,
    lydiaColor = "#38bdf8",
    gabrielColor = "#22c55e",
    lineColor = "#ffffff",
    gabrielEnterFrame = 140,
    messengerSendFrame = 180,
    idleBobbing = true,
  } = props;

  // 1. Linia połączenia Lydia <-> Gabriel
  const lineStartFrame = gabrielEnterFrame + 10;
  const lineOpacity = Math.max(0, Math.min(1, (frame - lineStartFrame) / 16));

  // 2. Animacja lotu wiadomości na Messengerze
  const msgSpring = spring({
    frame: frame - messengerSendFrame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });
  const msgProgress = Math.max(0, Math.min(1, msgSpring));

  // Pozycja lotu dymka: od Lydii (50% + 7%) do Gabriela (80% - 6%)
  const startX = lydiaX + 7;
  const endX = gabrielX - 6;
  const currentX = startX + (endX - startX) * msgProgress;
  const currentY = lydiaY - 6;
  const msgBob = idleBobbing ? Math.sin((frame + 20) * 0.1) * 2.5 : 0;

  // Potwierdzenie dostarczenia wiadomości
  const isDelivered = msgProgress >= 0.95;

  return (
    <>
      {/* =========================================================
          LINIA POŁĄCZENIA: LYDIA <-> GABRIEL (MESSENGER CHAT)
          ========================================================= */}
      {showConnectionLines && lineOpacity > 0.01 && (
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
          <line
            x1={lydiaX + 6}
            y1={lydiaY}
            x2={gabrielX - 6}
            y2={gabrielY}
            stroke={lineColor}
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
            strokeOpacity={lineOpacity * 0.7}
          />
        </svg>
      )}

      {/* =========================================================
          ANIMOWANY DYMEK MESSENGERA: LYDIA PISZE DO GABRIELA
          ========================================================= */}
      {showMessengerMessage && frame >= messengerSendFrame && (
        <div
          style={{
            position: "absolute",
            left: `${currentX}%`,
            top: `${currentY}%`,
            transform: `translate(-50%, -50%) translateY(${msgBob}px) scale(${Math.min(
              1,
              msgSpring * 1.05
            )})`,
            backgroundColor: "#000000",
            border: `2px solid ${isDelivered ? gabrielColor : lydiaColor}`,
            borderRadius: 16,
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
            gap: 7,
            zIndex: 26,
            boxShadow: "0 4px 18px rgba(0,0,0,0.85)",
            pointerEvents: "none",
          }}
        >
          {/* Ikona Messengera / dymka czatu */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: "#0084ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Piorun Messengera */}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff">
              <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.455 5.518 3.735 7.195V22l3.39-1.86c.91.252 1.88.39 2.875.39 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.05 12.355l-2.67-2.85-5.21 2.85 5.73-6.085 2.74 2.85 5.14-2.85-5.73 6.085z" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                color: "#a1a1aa",
                fontFamily: "monospace",
                letterSpacing: 1,
              }}
            >
              MESSENGER
            </span>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 900,
                color: "#ffffff",
                fontFamily: "monospace",
                letterSpacing: 1.1,
                whiteSpace: "nowrap",
              }}
            >
              {messengerText}
            </span>
          </div>

          {/* Znacznik dostarczenia (✓✓) po dotarciu do Gabriela */}
          {isDelivered && (
            <div
              style={{
                backgroundColor: gabrielColor,
                borderRadius: "50%",
                width: 14,
                height: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 2,
              }}
            >
              <svg viewBox="0 0 16 16" width="10" height="10" fill="#000000">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </div>
          )}
        </div>
      )}
    </>
  );
};
