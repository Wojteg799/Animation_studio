import React from "react";
import { spring, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";

interface CassetteTracklistCardProps {
  props: DariusRadioStoryProps;
  frame: number;
}

export const CassetteTracklistCard: React.FC<CassetteTracklistCardProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    writingStartFrame = 150,
    questionMarkStartFrame = 235,
    accentColor = "#facc15",
    lineColor = "#ffffff",
    lineWidth = 2.5,
    tracklistScale = 1.15,
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

  // Obliczenie proporcjonalnego tempa rysowania linii zależnie od czasu trwania
  const availableFrames = Math.max(45, questionMarkStartFrame - writingStartFrame);
  const lineDur = Math.max(14, Math.floor(availableFrames * 0.22));
  const gapDur = Math.max(6, Math.floor(availableFrames * 0.08));

  const line1Start = writingStartFrame + 8;
  const line1End = line1Start + lineDur;

  const line2Start = line1End + gapDur;
  const line2End = line2Start + lineDur;

  const line3Start = line2End + gapDur;
  const line3End = line3Start + lineDur;

  const line4Arrival = Math.max(line3End + gapDur, questionMarkStartFrame);

  // Progresy rysowania 3 linii utworów (od 0 do 1)
  const line1Prog = Math.max(0, Math.min(1, (frame - line1Start) / lineDur));
  const line2Prog = Math.max(0, Math.min(1, (frame - line2Start) / lineDur));
  const line3Prog = Math.max(0, Math.min(1, (frame - line3Start) / lineDur));

  // Ołówek dochodzi do 4. linii w klatce line4Arrival (wahanie i wyjście)
  const isMysteryPhase = frame >= line4Arrival;
  const pencilExit = Math.max(0, Math.min(1, (frame - line4Arrival) / 18));

  // Dokładna pozycja końcówki (czubka) długopisu/ołówka w pikselach:
  // Karta ma szerokość 320, padding poziomy 20px, kropka 14px, odstęp 12px.
  // Linia zaczyna się na X=46, a kończy na X=300 (długość 254px).
  // Środki pionowe kolejnych wierszy: Row 1 = 23px, Row 2 = 51px, Row 3 = 79px, Row 4 = 107px.
  let tipX = 46;
  let tipY = 23;

  if (frame < line1Start) {
    // Czekanie na start pisania linii 1
    tipX = 46;
    tipY = 23;
  } else if (frame < line1End) {
    // Rysowanie linii 1: czubek ołówka DOKŁADNIE na końcu białej linii
    tipX = 46 + line1Prog * 254;
    tipY = 23;
  } else if (frame < line2Start) {
    // Przenoszenie ołówka z końca linii 1 na początek linii 2
    const t = (frame - line1End) / (line2Start - line1End);
    const ease = t * t * (3 - 2 * t);
    tipX = 300 - ease * (300 - 46);
    tipY = 23 + ease * (51 - 23);
  } else if (frame < line2End) {
    // Rysowanie linii 2
    tipX = 46 + line2Prog * 254;
    tipY = 51;
  } else if (frame < line3Start) {
    // Przenoszenie ołówka z końca linii 2 na początek linii 3
    const t = (frame - line2End) / (line3Start - line2End);
    const ease = t * t * (3 - 2 * t);
    tipX = 300 - ease * (300 - 46);
    tipY = 51 + ease * (79 - 51);
  } else if (frame < line3End) {
    // Rysowanie linii 3
    tipX = 46 + line3Prog * 254;
    tipY = 79;
  } else if (frame < line4Arrival) {
    // Przenoszenie ołówka z końca linii 3 na początek linii 4 (tajemniczy utwór)
    const t = (frame - line3End) / (line4Arrival - line3End);
    const ease = t * t * (3 - 2 * t);
    tipX = 300 - ease * (300 - 46);
    tipY = 79 + ease * (107 - 79);
  } else {
    // Linia 4: wahanie ołówka (nie wie co wpisać!) przed wyjściem
    const pencilShake = Math.sin((frame - line4Arrival) * 0.6) * 4;
    tipX = 46 + pencilShake;
    tipY = 107;
  }

  // Migający kursor na pustej 4. linii (ZERO GLOW)
  const isCursorBlink = Math.floor(frame / 10) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: "67%",
        top: "72%",
        transform: `translate(-50%, -50%) scale(${clampedEnter * tracklistScale})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        zIndex: 25,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ================= MINIMALIST WIREFRAME TRACKLIST CARD (ZERO GLOW) ================= */}
      <div
        style={{
          width: 320,
          backgroundColor: "#000000",
          border: `${lineWidth}px solid ${lineColor}`,
          borderRadius: 12,
          padding: "16px 20px",
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
          {/* Rysująca się linia utworu (długość 254px) */}
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
              backgroundColor: "transparent",
              border: `1.5px dashed ${isMysteryPhase ? accentColor : lineColor}`,
              flexShrink: 0,
            }}
          />

          {/* Przerywana, pusta linia z migającym kursorem (ZERO GLOW) */}
          <div style={{ flex: 1, height: 16, display: "flex", alignItems: "center", position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: 2,
                backgroundImage: `repeating-linear-gradient(90deg, ${isMysteryPhase ? accentColor : lineColor} 0px, ${isMysteryPhase ? accentColor : lineColor} 6px, transparent 6px, transparent 12px)`,
                opacity: isMysteryPhase ? 0.9 : 0.3,
              }}
            />

            {/* Migający kursor wskazujący na brak zapisu (ZERO GLOW) */}
            {isMysteryPhase && isCursorBlink && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: 3,
                  height: 14,
                  backgroundColor: accentColor,
                }}
              />
            )}
          </div>
        </div>

        {/* ================= WEKTOROWY DŁUGOPIS / OŁÓWEK (IDEALNY STYK CZUBKA Z LINIĄ) ================= */}
        {pencilExit < 0.99 && (
          <div
            style={{
              position: "absolute",
              left: tipX,
              top: tipY,
              width: 0,
              height: 0,
              pointerEvents: "none",
              opacity: 1 - pencilExit,
              zIndex: 30,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transformOrigin: "0 0",
                transform: `rotate(-40deg) scale(${1 - pencilExit * 0.4})`,
              }}
            >
              <svg width="46" height="20" viewBox="0 0 46 20" style={{ position: "absolute", left: 0, top: -10 }}>
                {/* Ostrze / grafit długopisu precyzyjnie w punkcie (0, 10), czyli (0, 0) */}
                <polygon points="0,10 8,6 8,14" fill="#000000" stroke={lineColor} strokeWidth="1.8" />
                <polygon points="0,10 4,8 4,12" fill={accentColor} />
                {/* Korpus długopisu */}
                <rect x="8" y="6" width="30" height="8" rx="1.5" fill="#000000" stroke={lineColor} strokeWidth="1.8" />
                {/* Żółta opaska uchwytu */}
                <rect x="18" y="7" width="12" height="6" fill={accentColor} />
                {/* Przycisk na końcu */}
                <rect x="38" y="8" width="4" height="4" rx="1" fill={lineColor} />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
