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
    browserTitle = "ARCHIWUM KASETEK INTERNETOWYCH",
    audioSnippetName = "Snippet_RadioTape_10kHz.mp3",
    song1Title = "1. Christian Youth",
    song2Title = "2. Statues in the Park",
    song3Title = "3. Heart in Danger",
    mysterySongTitle = "4. ??? (Tajemnicza Piosenka)",

    dariusColor = "#facc15",
    lydiaColor = "#38bdf8",
    lineColor = "#ffffff",
    successColor = "#4ade80",

    websiteScale = 1.15,
    tracklistScale = 1.15,

    websiteStartFrame = 95,
    identifySong1Frame = 160,
    identifySong2Frame = 205,
    identifySong3Frame = 245,
    mysteryQuestionFrame = 285,

    showWebsite = true,
    showSolvedSongs = true,
    showMysteryQuestion = true,
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

  // Animowane słupki fal audio w odtwarzaczu (20 słupków)
  const waveBars = Array.from({ length: 22 }).map((_, i) => {
    const freq = 0.18 + (i % 5) * 0.04;
    const heightMod = Math.abs(Math.sin(frame * freq + i * 0.7));
    return 10 + heightMod * 32;
  });

  // Sprężyny wejścia kolejnych rozpoznanych piosenek
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

  // Sprężyna wejścia tajemniczej piosenki (znak zapytania)
  const mysterySpring = Math.max(
    0,
    Math.min(
      1,
      spring({
        frame: frame - mysteryQuestionFrame,
        fps,
        config: { damping: 10, stiffness: 130 },
      })
    )
  );
  const mysteryPulse = 1 + (frame >= mysteryQuestionFrame ? 0.08 * Math.sin(frame * 0.2) : 0);

  return (
    <div
      style={{
        position: "absolute",
        right: "5%",
        top: "50%",
        transform: `translateY(-50%) scale(${clampedWindow * websiteScale})`,
        transformOrigin: "center right",
        opacity: Math.min(1, clampedWindow * 1.6),
        width: 760,
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
          height: 48,
          backgroundColor: "#0d0d14",
          borderBottom: `2px solid ${lineColor}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 14,
        }}
      >
        {/* Przyciski okna (3 kropki) */}
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

        {/* Pasek adresu URL z globem i domeną */}
        <div
          style={{
            flex: 1,
            height: 30,
            backgroundColor: "#000000",
            border: `1.5px solid ${lineColor}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 8,
          }}
        >
          {/* Globus SVG */}
          <svg
            width="14"
            height="14"
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
              fontSize: 12,
              fontFamily: "monospace",
              color: "#ffffff",
              letterSpacing: 0.8,
            }}
          >
            https://{domainText}
          </span>
        </div>

        <div
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: lydiaColor,
            fontWeight: "bold",
          }}
        >
          [ONLINE]
        </div>
      </div>

      {/* ================= 2. ZAWARTOŚĆ STRONY ================= */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Tytuł nagłówka */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                fontFamily: "system-ui, sans-serif",
                color: lineColor,
                letterSpacing: 2,
              }}
            >
              {browserTitle}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              borderRadius: 4,
              border: `1.5px solid ${dariusColor}`,
              backgroundColor: "#161600",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: dariusColor,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: dariusColor,
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              SZUKANIE W SIECI
            </span>
          </div>
        </div>

        {/* ================= 3. ODTWARZACZ AUDIO Z KASETA & FALAMI ================= */}
        <div
          style={{
            backgroundColor: "#0d0d16",
            border: `2px solid ${lineColor}`,
            borderRadius: 10,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          {/* Mini Kaseta Magnetofonowa */}
          <div
            style={{
              width: 90,
              height: 56,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 6,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Etykieta */}
            <div
              style={{
                width: "80%",
                height: 22,
                backgroundColor: "#14141e",
                border: `1px solid ${dariusColor}`,
                borderRadius: 2,
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

            <div
              style={{
                position: "absolute",
                bottom: 3,
                fontSize: 8,
                fontFamily: "monospace",
                color: "#888888",
              }}
            >
              PLAY ►
            </div>
          </div>

          {/* Nazwa pliku i animowany korektor audio */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "#ffffff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {audioSnippetName}
              </span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: lydiaColor }}>
                AUDIO SNIPPET
              </span>
            </div>

            {/* Słupki Equalizera */}
            <div
              style={{
                height: 36,
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
        </div>

        {/* ================= 4. LISTA IDENTYFIKOWANYCH PIOSENEK ================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              color: "#a1a1aa",
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            Stan Identyfikacji Utworów w Sieci:
          </div>

          {/* Piosenka 1 */}
          <div
            style={{
              height: 40,
              backgroundColor: "#0d0d16",
              border: `1.5px solid ${frame >= identifySong1Frame ? successColor : "#333340"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {frame >= identifySong1Frame ? (
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: successColor,
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 13,
                    transform: `scale(${song1Spring})`,
                  }}
                >
                  ✓
                </div>
              ) : (
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "1.5px dashed #555566",
                  }}
                />
              )}

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "system-ui, sans-serif",
                  color: frame >= identifySong1Frame ? "#ffffff" : "#777788",
                }}
              >
                {song1Title}
              </span>
            </div>

            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: "bold",
                color: frame >= identifySong1Frame ? successColor : "#555566",
              }}
            >
              {frame >= identifySong1Frame ? "ROZPOZNANA (SOLVED)" : "SZUKANIE..."}
            </span>
          </div>

          {/* Piosenka 2 */}
          <div
            style={{
              height: 40,
              backgroundColor: "#0d0d16",
              border: `1.5px solid ${frame >= identifySong2Frame ? successColor : "#333340"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {frame >= identifySong2Frame ? (
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: successColor,
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 13,
                    transform: `scale(${song2Spring})`,
                  }}
                >
                  ✓
                </div>
              ) : (
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "1.5px dashed #555566",
                  }}
                />
              )}

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "system-ui, sans-serif",
                  color: frame >= identifySong2Frame ? "#ffffff" : "#777788",
                }}
              >
                {song2Title}
              </span>
            </div>

            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: "bold",
                color: frame >= identifySong2Frame ? successColor : "#555566",
              }}
            >
              {frame >= identifySong2Frame ? "ROZPOZNANA (SOLVED)" : "SZUKANIE..."}
            </span>
          </div>

          {/* Piosenka 3 */}
          <div
            style={{
              height: 40,
              backgroundColor: "#0d0d16",
              border: `1.5px solid ${frame >= identifySong3Frame ? successColor : "#333340"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {frame >= identifySong3Frame ? (
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: successColor,
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 13,
                    transform: `scale(${song3Spring})`,
                  }}
                >
                  ✓
                </div>
              ) : (
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "1.5px dashed #555566",
                  }}
                />
              )}

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: "system-ui, sans-serif",
                  color: frame >= identifySong3Frame ? "#ffffff" : "#777788",
                }}
              >
                {song3Title}
              </span>
            </div>

            <span
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: "bold",
                color: frame >= identifySong3Frame ? successColor : "#555566",
              }}
            >
              {frame >= identifySong3Frame ? "ROZPOZNANA (SOLVED)" : "SZUKANIE..."}
            </span>
          </div>

          {/* ================= 5. TAJEMNICZA PIOSENKA 4 (ZNAK ZAPYTANIA) ================= */}
          <div
            style={{
              height: 48,
              backgroundColor: frame >= mysteryQuestionFrame ? "#181400" : "#0d0d16",
              border: `2px solid ${frame >= mysteryQuestionFrame ? dariusColor : "#555566"}`,
              borderRadius: 8,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: frame >= mysteryQuestionFrame ? `scale(${mysteryPulse})` : "none",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {frame >= mysteryQuestionFrame ? (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: dariusColor,
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: 18,
                    transform: `scale(${mysterySpring})`,
                    boxShadow: "none",
                  }}
                >
                  ?
                </div>
              ) : (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "2px solid #555566",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#777788",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  ?
                </div>
              )}

              <div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    fontFamily: "system-ui, sans-serif",
                    color: frame >= mysteryQuestionFrame ? dariusColor : "#888899",
                    display: "block",
                  }}
                >
                  {mysterySongTitle}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: frame >= mysteryQuestionFrame ? "#fef08a" : "#666677",
                  }}
                >
                  Nikt nie zna wykonawcy ani tytułu
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 4,
                backgroundColor: frame >= mysteryQuestionFrame ? "#000000" : "transparent",
                border: `1.5px solid ${frame >= mysteryQuestionFrame ? dariusColor : "#444455"}`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  color: frame >= mysteryQuestionFrame ? dariusColor : "#777788",
                  letterSpacing: 1,
                }}
              >
                {frame >= mysteryQuestionFrame ? "NADAL ZAGADKA (!)" : "STATUS: ???"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
