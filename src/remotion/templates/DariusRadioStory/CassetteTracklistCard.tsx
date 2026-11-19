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
    jcardStartFrame = 150,
    mysteryQuestionStartFrame = 215,
    track1,
    track2,
    track3,
    mysteryTrackNumber,
    mysteryTrackPlaceholder,
    mysteryTrackNote,
    accentColor,
    questionMarkColor,
  } = props;

  // Entrance spring animation
  const enterSpring = spring({
    frame: frame - jcardStartFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 95,
      mass: 0.85,
    },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  if (frame < jcardStartFrame) {
    return null;
  }

  // Positioning: bottom-right overlay or centered overlay beside Darius
  const posX = 74; // in %
  const posY = 56; // in %
  const scale = 0.8 + 0.2 * clampedEnter;

  // Staggered writing animation for tracks:
  // Track 1 appears around jcardStartFrame + 6
  const t1Prog = Math.max(0, Math.min(1, (frame - (jcardStartFrame + 6)) / 16));
  // Track 2 appears around jcardStartFrame + 24
  const t2Prog = Math.max(0, Math.min(1, (frame - (jcardStartFrame + 24)) / 16));
  // Track 3 appears around jcardStartFrame + 42
  const t3Prog = Math.max(0, Math.min(1, (frame - (jcardStartFrame + 42)) / 16));

  // Mystery Track 4 appears at mysteryQuestionStartFrame
  const t4Prog = Math.max(0, Math.min(1, (frame - mysteryQuestionStartFrame) / 12));
  const t4Spring = spring({
    frame: frame - mysteryQuestionStartFrame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Blinking mystery cursor when track 4 is empty
  const isCursorBlinking = Math.floor(frame / 12) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        zIndex: 25,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Vintage Cassette J-Card / Paper Tracklist Insert */}
      <div
        style={{
          width: 460,
          backgroundColor: "#fdfbf7", // Warm vintage paper / card stock
          borderRadius: 12,
          border: "2px solid #e2d9cc",
          boxShadow:
            "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0,0,0,0.1), inset 0 0 40px rgba(217, 197, 168, 0.3)",
          overflow: "hidden",
          color: "#1e293b",
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        {/* J-Card Red/Blue Index Header Strip */}
        <div
          style={{
            backgroundColor: "#dc2626", // Classic 80s red spine header
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: 1.5 }}>
              CASSETTE J-CARD • SPIS UTWORÓW
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: "rgba(0,0,0,0.25)",
              padding: "2px 6px",
              borderRadius: 3,
              letterSpacing: 0.8,
            }}
          >
            STRONA A • 1984
          </span>
        </div>

        {/* Radio Broadcast source note */}
        <div
          style={{
            backgroundColor: "#f1ede4",
            padding: "4px 16px",
            borderBottom: "1px dashed #cbd5e1",
            fontSize: 9.5,
            color: "#64748b",
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>ŹRÓDŁO: RADIO NDR 1 (Paul Baskerville)</span>
          <span>ZAPIS ODRECZNY</span>
        </div>

        {/* Tracklist Lines Table */}
        <div
          style={{
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Track 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 6,
              borderBottom: "1px solid #e2e8f0",
              opacity: t1Prog,
              transform: `translateX(${(1 - t1Prog) * -12}px)`,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: 13.5,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: 0.4,
                }}
              >
                {track1}
              </span>
            </div>
          </div>

          {/* Track 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 6,
              borderBottom: "1px solid #e2e8f0",
              opacity: t2Prog,
              transform: `translateX(${(1 - t2Prog) * -12}px)`,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: 13.5,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: 0.4,
                }}
              >
                {track2}
              </span>
            </div>
          </div>

          {/* Track 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 6,
              borderBottom: "1px solid #e2e8f0",
              opacity: t3Prog,
              transform: `translateX(${(1 - t3Prog) * -12}px)`,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: 13.5,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: 0.4,
                }}
              >
                {track3}
              </span>
            </div>
          </div>

          {/* Track 4: THE UNKNOWN MYSTERY TRACK */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 8px",
              borderRadius: 8,
              backgroundColor:
                frame >= mysteryQuestionStartFrame
                  ? "rgba(239, 68, 68, 0.08)"
                  : "transparent",
              border:
                frame >= mysteryQuestionStartFrame
                  ? "1.5px dashed #ef4444"
                  : "1px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            {/* Number indicator / Question mark */}
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor:
                  frame >= mysteryQuestionStartFrame ? "#ef4444" : "#94a3b8",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform:
                  frame >= mysteryQuestionStartFrame
                    ? `scale(${Math.min(1.2, t4Spring)})`
                    : "scale(1)",
              }}
            >
              {frame >= mysteryQuestionStartFrame ? "?" : "4"}
            </div>

            {/* Track Line Content */}
            <div style={{ flex: 1 }}>
              {frame < mysteryQuestionStartFrame ? (
                // Blank dotted line waiting for write-in
                <div
                  style={{
                    height: 14,
                    borderBottom: "1.5px dotted #94a3b8",
                    width: "80%",
                  }}
                />
              ) : (
                // Animated Unknown Mystery Title
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: t4Prog,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#dc2626",
                        letterSpacing: 0.8,
                      }}
                    >
                      {mysteryTrackNumber} {mysteryTrackPlaceholder}
                    </span>
                    {isCursorBlinking && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 2,
                          height: 14,
                          backgroundColor: "#dc2626",
                        }}
                      />
                    )}
                  </div>

                  {mysteryTrackNote && (
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 800,
                        color: "#b91c1c",
                        backgroundColor: "rgba(239, 68, 68, 0.15)",
                        padding: "2px 6px",
                        borderRadius: 4,
                        letterSpacing: 0.5,
                      }}
                    >
                      {mysteryTrackNote}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info: "Darius nie zanotował tytułu ani zespołu" */}
        {frame >= mysteryQuestionStartFrame && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              borderTop: "1.5px solid #fca5a5",
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: t4Prog,
            }}
          >
            <span style={{ fontSize: 13 }}>⚠️</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#991b1b",
                letterSpacing: 0.4,
              }}
            >
              BRAK DANYCH: Nie zanotowano nazwy piosenki ani zespołu!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
