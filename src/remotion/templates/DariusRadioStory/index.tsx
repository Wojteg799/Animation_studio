import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";
import { DariusCharacter } from "./DariusCharacter";
import { RadioCassetteDeck } from "./RadioCassetteDeck";
import { CassetteTracklistCard } from "./CassetteTracklistCard";

export const DariusRadioStory: React.FC<DariusRadioStoryProps> = (rawProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const props: DariusRadioStoryProps = {
    ...rawProps,
  };

  const {
    transparentBackground = true,
    themeVariant = "retro-warm",
    mysteryQuestionStartFrame = 215,
  } = props;

  // Background styling:
  // If transparent: 100% transparent (alpha channel for video overlay in DaVinci / Premiere)
  // If not transparent: rich deep documentary noir background with subtle radial glow
  const bgColor = transparentBackground
    ? "transparent"
    : themeVariant === "retro-warm"
    ? "#090a0f"
    : "#050508";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background cinematic vignette & grid (only when not transparent) */}
      {!transparentBackground && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.45) 0%, rgba(5, 7, 12, 0.95) 100%)",
            pointerEvents: "none",
          }}
        >
          {/* Subtle archival grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.7,
            }}
          />
        </div>
      )}

      {/* Stage Narrative Hint Ribbon at the Top (Vox / Documentary chapter header) */}
      <div
        style={{
          position: "absolute",
          top: 35,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(10, 11, 18, 0.82)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 9999,
          padding: "6px 22px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
          zIndex: 30,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: frame >= mysteryQuestionStartFrame ? "#ef4444" : "#f59e0b",
            boxShadow: `0 0 10px ${frame >= mysteryQuestionStartFrame ? "#ef4444" : "#f59e0b"}`,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {frame < 75
            ? "PROLOG: DARIUS — PASJONAT MUZYKI (1984)"
            : frame < 150
            ? "NAGRYWANIE Z RADIA NDR 1 NA KASETE (MIXTAPE)"
            : frame < mysteryQuestionStartFrame
            ? "DOKŁADNE NOTOWANIE TYTUŁÓW I WYKONAWCÓW"
            : "TAJEMNICA: BRAK ZAPISU NAZWY PIOSENKI I ZESPOŁU!"}
        </span>
      </div>

      {/* ================= COMPONENT 1: DARIUS CHARACTER (LEFT / CENTER) ================= */}
      <DariusCharacter props={props} frame={frame} />

      {/* ================= COMPONENT 2: 80s RADIO TUNER & CASSETTE DECK (STAGE 2) ================= */}
      <RadioCassetteDeck props={props} frame={frame} />

      {/* ================= COMPONENT 3: CASSETTE J-CARD TRACKLIST (STAGE 3 & 4) ================= */}
      <CassetteTracklistCard props={props} frame={frame} />
    </div>
  );
};
