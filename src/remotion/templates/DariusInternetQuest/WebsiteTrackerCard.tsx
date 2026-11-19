import React from "react";
import { spring, useVideoConfig } from "remotion";
import { DariusInternetQuestProps } from "./schema";

interface WebsiteTrackerCardProps {
  props: DariusInternetQuestProps;
  frame: number;
}

export const WebsiteTrackerCard: React.FC<WebsiteTrackerCardProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    domainText = "www.unknown-song.net",
    song1Title = "1. Christian Youth",
    song2Title = "2. Statues in the Park",
    song3Title = "3. Heart in Danger",
    mysterySongTitle = "4. ???",

    dariusColor = "#facc15",
    lineColor = "#ffffff",
    successColor = "#4ade80",

    websiteScale = 1.15,

    websiteStartFrame = 95,
    identifySong1Frame = 160,
    identifySong2Frame = 205,
    identifySong3Frame = 245,
    mysteryQuestionFrame = 285,

    showWebsite = true,
  } = props;

  if (!showWebsite || frame < websiteStartFrame) {
    return null;
  }

  // Wjazd okna strony internetowej od prawej strony
  const windowSpring = spring({
    frame: frame - websiteStartFrame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.85 },
  });
  const clampedWindow = Math.max(0, Math.min(1, windowSpring));

  // Animacja obrotu szpuli kasety w odtwarzaczu
  const spoolRotation = (frame * 3.5) % 360;

  // Animowane słupki fal audio w odtwarzaczu (26 słupków)
  const waveBars = Array.from({ length: 28 }).map((_, i) => {
    const freq = 0.18 + (i % 6) * 0.035;
    const heightMod = Math.abs(Math.sin(frame * freq + i * 0.65));
    return 8 + heightMod * 30;
  });

  // Sprężyny wejścia ptaszków sukcesu
  const song1Spring = Math.max(
    0,
    Math.min(
      1,
      spring({
        frame: frame - identifySong1Frame,
        fps,
        config: { damping: 12, stiffness: 120 },
      })
    )
  );

  const song2Spring = Math.max(
    0,
    Math.min(
      1,
      spring({
        frame: frame - identifySong2Frame,
        fps,
        config: { damping: 12, stiffness: 120 },
      })
    )
  );

  const song3Spring = Math.max(
    0,
    Math.min(
      1,
      spring({
        frame: frame - identifySong3Frame,
        fps,
        config: { damping: 12, stiffness: 120 },
      })
    )
  );

  // Wejście żółtego pytajnika przy utworze 4 (stabilne, bez niepotrzebnego pulsowania)
  const isMysteryActive = frame >= mysteryQuestionFrame;
  const mysterySpring = Math.max(
    0,
    Math.min(
      1,
      spring({
        frame: frame - mysteryQuestionFrame,
        fps,
        config: { damping: 12, stiffness: 120 },
      })
    )
  );

  return (
    <div
      style={{
        position: "absolute",
        right: "6%",
        top: "50%",
        transform: `translateY(-50%) scale(${clampedWindow * websiteScale})`,
        transformOrigin: "center right",
        opacity: Math.min(1, clampedWindow * 1.6),
        width: 660,
        backgroundColor: "#000000",
        border: `3px solid ${lineColor}`,
        borderRadius: 16,
        overflow: "hidden",
        zIndex: 18,
        boxShadow: "none",
        pointerEvents: "none",
      }}
    >
      {/* ================= 1. GÓRNY PASEK PRZEGLĄDARKI ================= */}
      <div
        style={{
          height: 46,
          backgroundColor: "#0d0d14",
          borderBottom: `2px solid ${lineColor}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 14,
        }}
      >
        {/* Przyciski okna (3 minimalistyczne kropki) */}
        <div style={{ display: "flex", gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#27c93f",
            }}
          />
        </div>

        {/* Pasek adresu URL: tylko domena internetowa z globem */}
        <div
          style={{
            flex: 1,
            height: 30,
            backgroundColor: "#000000",
            border: `1.5px solid ${lineColor}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
          }}
        >
          {/* Globus SVG */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke={dariusColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontFamily: "monospace",
              color: "#ffffff",
              letterSpacing: 0.8,
              fontWeight: 700,
            }}
          >
            {domainText}
          </span>
        </div>
      </div>

      {/* ================= 2. ZAWARTOŚĆ STRONY ================= */}
      <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* ================= 3. ODTWARZACZ AUDIO (KASETA & FALE AUDIO) ================= */}
        <div
          style={{
            backgroundColor: "#0d0d16",
            border: `2px solid ${lineColor}`,
            borderRadius: 10,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Czysta wektorowa kaseta magnetofonowa bez żadnego tekstu */}
          <div
            style={{
              width: 86,
              height: 52,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 6,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Etykieta kasety */}
            <div
              style={{
                width: "82%",
                height: 24,
                backgroundColor: "#14141e",
                border: `1px solid ${dariusColor}`,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 6px",
              }}
            >
              {/* Szpula lewa */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: `1.5px solid ${lineColor}`,
                  transform: `rotate(${spoolRotation}deg)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 3, height: 3, backgroundColor: lineColor }} />
              </div>

              {/* Okienko taśmy */}
              <div
                style={{
                  width: 18,
                  height: 6,
                  border: `1px solid ${lineColor}`,
                  backgroundColor: "#000000",
                }}
              />

              {/* Szpula prawa */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: `1.5px solid ${lineColor}`,
                  transform: `rotate(${spoolRotation}deg)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 3, height: 3, backgroundColor: lineColor }} />
              </div>
            </div>
          </div>

          {/* Animowany korektor audio (fale dźwiękowe na pełną szerokość) */}
          <div
            style={{
              flex: 1,
              height: 40,
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              padding: "2px 0",
            }}
          >
            {waveBars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}px`,
                  backgroundColor: i % 2 === 0 ? dariusColor : lineColor,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* ================= 4. LISTA UTWORÓW (TYLKO NAZWY PIOSENEK, BEZ ZBĘDNEGO TEKSTU) ================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {/* Piosenka 1 */}
          <div
            style={{
              height: 42,
              backgroundColor: "#0d0d16",
              border: `1.5px solid ${frame >= identifySong1Frame ? successColor : "#333340"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 12,
              transition: "border-color 0.2s",
            }}
          >
            {frame >= identifySong1Frame ? (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: successColor,
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                  transform: `scale(${song1Spring})`,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
            ) : (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "1.5px dashed #444455",
                  flexShrink: 0,
                }}
              />
            )}

            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
                color: frame >= identifySong1Frame ? "#ffffff" : "#666677",
                letterSpacing: 0.5,
              }}
            >
              {song1Title}
            </span>
          </div>

          {/* Piosenka 2 */}
          <div
            style={{
              height: 42,
              backgroundColor: "#0d0d16",
              border: `1.5px solid ${frame >= identifySong2Frame ? successColor : "#333340"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 12,
              transition: "border-color 0.2s",
            }}
          >
            {frame >= identifySong2Frame ? (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: successColor,
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                  transform: `scale(${song2Spring})`,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
            ) : (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "1.5px dashed #444455",
                  flexShrink: 0,
                }}
              />
            )}

            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
                color: frame >= identifySong2Frame ? "#ffffff" : "#666677",
                letterSpacing: 0.5,
              }}
            >
              {song2Title}
            </span>
          </div>

          {/* Piosenka 3 */}
          <div
            style={{
              height: 42,
              backgroundColor: "#0d0d16",
              border: `1.5px solid ${frame >= identifySong3Frame ? successColor : "#333340"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 12,
              transition: "border-color 0.2s",
            }}
          >
            {frame >= identifySong3Frame ? (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: successColor,
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 14,
                  transform: `scale(${song3Spring})`,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
            ) : (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "1.5px dashed #444455",
                  flexShrink: 0,
                }}
              />
            )}

            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
                color: frame >= identifySong3Frame ? "#ffffff" : "#666677",
                letterSpacing: 0.5,
              }}
            >
              {song3Title}
            </span>
          </div>

          {/* ================= 5. TAJEMNICZA PIOSENKA 4 (ŚWIECI NA ŻÓŁTO, BEZ PULSOWANIA) ================= */}
          <div
            style={{
              height: 44,
              backgroundColor: isMysteryActive ? "#161400" : "#0d0d16",
              border: `2px solid ${isMysteryActive ? dariusColor : "#444455"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 12,
            }}
          >
            {isMysteryActive ? (
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: dariusColor,
                  color: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 17,
                  transform: `scale(${mysterySpring})`,
                  flexShrink: 0,
                }}
              >
                ?
              </div>
            ) : (
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "2px solid #444455",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666677",
                  fontSize: 14,
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                ?
              </div>
            )}

            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                fontFamily: "system-ui, sans-serif",
                color: isMysteryActive ? dariusColor : "#666677",
                letterSpacing: 1,
              }}
            >
              {mysterySongTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
