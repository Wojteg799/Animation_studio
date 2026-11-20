import React from "react";
import { spring, useVideoConfig } from "remotion";
import { InvestigationBreakthroughProps } from "./schema";

interface Forum2007BadgeProps {
  props: InvestigationBreakthroughProps;
  frame: number;
}

export const Forum2007Badge: React.FC<Forum2007BadgeProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showForum2007Badge = true,
    showConnectionLines = true,
    forum2007Text = "WPISY Z 2007 ROKU",
    dariusX = 20,
    dariusY = 52,
    lydiaX = 50,
    lydiaY = 52,
    lydiaColor = "#38bdf8",
    lineColor = "#ffffff",
    investigation2007Frame = 90,
    lydiaEnterFrame = 48,
    idleBobbing = true,
  } = props;

  // 1. Linia połączenia Dariusa z Lydią
  const lineStartFrame = lydiaEnterFrame + 8;
  const lineOpacity = Math.max(0, Math.min(1, (frame - lineStartFrame) / 14));

  // 2. Wejście karty archiwum 2007
  const badgeSpring = spring({
    frame: frame - investigation2007Frame,
    fps,
    config: { damping: 12, stiffness: 105, mass: 0.8 },
  });
  const clampedBadge = Math.max(0, Math.min(1.15, badgeSpring));
  const badgeBob = idleBobbing ? Math.sin((frame + 10) * 0.09) * 2.5 : 0;

  return (
    <>
      {/* =========================================================
          LINIA POŁĄCZENIA: DARIUS <-> LYDIA (WSPÓLNE SPRAWDZANIE)
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
            x1={dariusX + 6}
            y1={dariusY}
            x2={lydiaX - 6}
            y2={lydiaY}
            stroke={lineColor}
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
            strokeOpacity={lineOpacity * 0.7}
          />
        </svg>
      )}

      {/* =========================================================
          KARTA ARCHIWUM: "WPISY Z 2007 ROKU" (ŚLEDZTWO LYDII)
          ========================================================= */}
      {showForum2007Badge && frame >= investigation2007Frame && (
        <div
          style={{
            position: "absolute",
            left: "35%",
            top: "24%",
            transform: `translate(-50%, -50%) translateY(${badgeBob}px) scale(${clampedBadge})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 26,
            pointerEvents: "none",
            filter: "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8))",
          }}
        >
          {/* Główny boks karty śledztwa */}
          <div
            style={{
              backgroundColor: "#000000",
              border: `2px solid ${lydiaColor}`,
              borderRadius: 10,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Ikona wyszukiwania / lupy */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={lydiaColor} strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  color: "#a1a1aa",
                  fontFamily: "monospace",
                  letterSpacing: 1.5,
                }}
              >
                ŚLEDZTWO INTERNETOWE
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: "#ffffff",
                  fontFamily: "monospace",
                  letterSpacing: 1.2,
                }}
              >
                {forum2007Text}
              </span>
            </div>
          </div>

          {/* Mały tag łączący w dół do Lydii */}
          <div
            style={{
              marginTop: 4,
              backgroundColor: "#000000",
              border: `1.2px solid ${lineColor}`,
              borderRadius: 4,
              padding: "1px 8px",
            }}
          >
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                color: lydiaColor,
                fontFamily: "monospace",
                letterSpacing: 1,
                whiteSpace: "nowrap",
              }}
            >
              ŹRÓDŁO ZAGADKI
            </span>
          </div>
        </div>
      )}
    </>
  );
};
