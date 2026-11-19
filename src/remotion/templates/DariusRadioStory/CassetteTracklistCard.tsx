import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";

interface CassetteTracklistCardProps {
  props: DariusRadioStoryProps;
  frame: number;
}

export const CassetteTracklistCard: React.FC<CassetteTracklistCardProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    writingStartFrame = 145,
    questionMarkStartFrame = 215,
    accentColor = "#facc15",
    lineColor = "#ffffff",
    lineWidth = 2.5,
  } = props;

  // Wejście karty z notatkami (sprężysty wjazd od dołu)
  const enterSpring = spring({
    frame: frame - writingStartFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  if (frame < writingStartFrame) {
    return null;
  }

  // Animacja rysowania linii przez ołówek (3 kolejne linie piosenek)
  // Linia 1: klatki 150 - 168
  const line1Prog = Math.max(0, Math.min(1, (frame - (writingStartFrame + 6)) / 18));
  // Linia 2: klatki 170 - 188
  const line2Prog = Math.max(0, Math.min(1, (frame - (writingStartFrame + 24)) / 18));
  // Linia 3: klatki 190 - 208
  const line3Prog = Math.max(0, Math.min(1, (frame - (writingStartFrame + 42)) / 18));

  // Ołówek dochodzi do 4. linii w klatce ~215 (punkt kulminacyjny: wahanie i brak zapisu)
  const isMysteryPhase = frame >= questionMarkStartFrame;
  const pencilExit = Math.max(0, Math.min(1, (frame - questionMarkStartFrame) / 14));

  // Pozycja ołówka na bazie aktualnie rysowanej linii
  let pencilTargetY = 24;
  let pencilTargetX = line1Prog * 180;
  if (frame >= writingStartFrame + 42) {
    pencilTargetY = 72;
    pencilTargetX = line3Prog * 180;
  } else if (frame >= writingStartFrame + 24) {
    pencilTargetY = 48;
    pencilTargetX = line2Prog * 180;
  }

  // Wahanie ołówka przy linii 4 (przed zniknięciem)
  const pencilShake = isMysteryPhase ? Math.sin(frame * 0.5) * 6 : 0;

  // Migający kursor na pustej 4. linii
  const isCursorBlink = Math.floor(frame / 10) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: "67%",
        top: "68%",
        transform: `translate(-50%, -50%) scale(${clampedEnter})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        zIndex: 25,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ================= MINIMALIST WIREFRAME TRACKLIST CARD ================= */}
      <div
        style={{
          width: 320,
          backgroundColor: "#000000",
          border: `${lineWidth}px solid ${lineColor}`,
          borderRadius: 12,
          padding: "16px 20px",
          boxShadow: "0 18px 45px rgba(0,0,0,0.85)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          position: "relative",
        }}
      >
        {/* Linia 1 (Piosenka 1 - zapisana) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Numer 1 / kropka */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: line1Prog > 0.5 ? accentColor : "transparent",
              border: `1.5px solid ${lineColor}`,
              flexShrink: 0,
            }}
          />
          {/* Rysująca się linia utworu */}
          <div style={{ flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                width: `${line1Prog * 100}%`,
                height: "100%",
                backgroundColor: lineColor,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Linia 2 (Piosenka 2 - zapisana) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: line2Prog > 0.5 ? accentColor : "transparent",
              border: `1.5px solid ${lineColor}`,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                width: `${line2Prog * 100}%`,
                height: "100%",
                backgroundColor: lineColor,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Linia 3 (Piosenka 3 - zapisana) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: line3Prog > 0.5 ? accentColor : "transparent",
              border: `1.5px solid ${lineColor}`,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                width: `${line3Prog * 100}%`,
                height: "100%",
                backgroundColor: lineColor,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Linia 4: TAJEMNICZY UTWÓR — PUSTA LINIA / BRAK ZAPISU */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: isMysteryPhase ? "transparent" : "transparent",
              border: `1.5px dashed ${isMysteryPhase ? accentColor : lineColor}`,
              flexShrink: 0,
            }}
          />

          {/* Przerywana, pusta linia z migającym kursorem */}
          <div style={{ flex: 1, height: 16, display: "flex", alignItems: "center", position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: 2,
                backgroundImage: `repeating-linear-gradient(90deg, ${isMysteryPhase ? accentColor : lineColor} 0px, ${isMysteryPhase ? accentColor : lineColor} 6px, transparent 6px, transparent 12px)`,
                opacity: isMysteryPhase ? 0.9 : 0.3,
              }}
            />

            {/* Migający kursor wskazujący na brak zapisu */}
            {isMysteryPhase && isCursorBlink && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: 3,
                  height: 14,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 8px ${accentColor}`,
                }}
              />
            )}
          </div>
        </div>

        {/* ================= MINIMALISTYCZNY WEKTOROWY OŁÓWEK / DŁUGOPIS ================= */}
        {pencilExit < 0.99 && (
          <div
            style={{
              position: "absolute",
              left: 48 + pencilTargetX + pencilShake,
              top: pencilTargetY - 14,
              transform: `rotate(-35deg) scale(${1 - pencilExit * 0.5})`,
              opacity: 1 - pencilExit,
              transition: "left 0.08s linear, top 0.15s ease",
            }}
          >
            {/* Wektorowy ołówek line-art */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {/* Trzonek ołówka */}
              <rect x="8" y="14" width="26" height="7" rx="1.5" fill="#000000" stroke={lineColor} strokeWidth="2" />
              {/* Żółty akcent na ołówku */}
              <rect x="18" y="15" width="10" height="5" fill={accentColor} />
              {/* Czubek / grafit */}
              <polygon points="8,14 8,21 1,17.5" fill="#000000" stroke={lineColor} strokeWidth="2" strokeLinejoin="round" />
              <polygon points="4,16 4,19 1,17.5" fill={accentColor} />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
