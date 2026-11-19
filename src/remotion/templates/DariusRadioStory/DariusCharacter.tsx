import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";

interface DariusCharacterProps {
  props: DariusRadioStoryProps;
  frame: number;
}

export const DariusCharacter: React.FC<DariusCharacterProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    characterName,
    characterRole,
    characterTag,
    avatarUrl,
    accentColor,
    borderColor,
    circleSize = 220,
    showHeartAndNotes,
    heartColor,
    showQuestionMark,
    questionMarkColor,
    dariusEnterFrame = 5,
    heartNotesStartFrame = 22,
    radioStartFrame = 75,
    mysteryQuestionStartFrame = 215,
  } = props;

  // 1. Entrance animation (pop-in with spring)
  const enterSpring = spring({
    frame: frame - dariusEnterFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 95,
      mass: 0.8,
    },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  // 2. Horizontal position shift: Starts near center (X ~ 50%), then shifts smoothly to the left (X ~ 25%) when the radio scene starts
  const shiftProgress = Math.max(
    0,
    Math.min(1, (frame - (radioStartFrame - 8)) / 22)
  );
  // Smootherstep ease
  const shiftEased =
    shiftProgress * shiftProgress * (3 - 2 * shiftProgress);

  const posX = interpolate(shiftEased, [0, 1], [50, 24]); // in %
  const posY = 50; // vertically centered in %

  // Subtle natural idle breathing / bobbing
  const bobY = Math.sin(frame * 0.07) * 4.5;
  const bobRotate = Math.sin(frame * 0.04) * 0.8;

  // 3. Heart & Notes phase (active between heartNotesStartFrame and radioStartFrame)
  const heartSpring = spring({
    frame: frame - heartNotesStartFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const heartExit = Math.max(0, Math.min(1, (frame - (radioStartFrame - 10)) / 12));
  const heartOpacity = Math.max(0, (heartSpring - heartExit));
  const heartScale = (0.7 + 0.3 * heartSpring) * (1 + 0.08 * Math.sin(frame * 0.18));

  // 4. Mystery Question Mark Phase (starts at mysteryQuestionStartFrame)
  const questionSpring = spring({
    frame: frame - mysteryQuestionStartFrame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });
  const questionOpacity = Math.max(0, Math.min(1, (frame - mysteryQuestionStartFrame) / 8));
  const questionBob = Math.sin(frame * 0.12) * 5;
  const questionRotate = Math.sin(frame * 0.08) * 4;

  if (frame < dariusEnterFrame) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `translate(-50%, -50%) translateY(${bobY}px) rotate(${bobRotate}deg) scale(${clampedEnter})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 20,
        pointerEvents: "none",
        transition: "left 0.1s linear",
      }}
    >
      {/* ================= HEART & FLOATING MUSIC NOTES (STAGE 1) ================= */}
      {showHeartAndNotes && heartOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            top: -circleSize * 0.42,
            opacity: heartOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {/* Main Pulsing Heart */}
          <div
            style={{
              transform: `scale(${heartScale})`,
              filter: `drop-shadow(0 0 16px ${heartColor}90)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill={heartColor}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Subtitle tag: WIELKI FAN MUZYKI */}
          <div
            style={{
              marginTop: 4,
              backgroundColor: "rgba(10, 10, 15, 0.88)",
              border: `1px solid ${accentColor}80`,
              borderRadius: 9999,
              padding: "2px 10px",
              boxShadow: `0 4px 14px rgba(0,0,0,0.6), 0 0 10px ${accentColor}30`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                fontWeight: 700,
                color: accentColor,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              ♥ Wielki Fan Muzyki
            </span>
          </div>

          {/* Floating musical notes around Darius */}
          {[
            { symbol: "♪", x: -65, y: -15, delay: 0, scale: 1.1, color: "#38bdf8" },
            { symbol: "♫", x: 70, y: -20, delay: 6, scale: 1.3, color: accentColor },
            { symbol: "♬", x: -85, y: 30, delay: 12, scale: 1.0, color: "#a855f7" },
            { symbol: "♩", x: 80, y: 35, delay: 18, scale: 0.95, color: "#f43f5e" },
          ].map((note, i) => {
            const noteProg = ((frame - heartNotesStartFrame + note.delay * 2) % 45) / 45;
            const floatY = note.y - noteProg * 35;
            const floatX = note.x + Math.sin(noteProg * Math.PI * 2) * 8;
            const noteAlpha = Math.sin(noteProg * Math.PI) * heartOpacity;

            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: floatX,
                  top: floatY,
                  fontSize: 22 * note.scale,
                  fontWeight: "bold",
                  color: note.color,
                  opacity: noteAlpha,
                  textShadow: `0 0 12px ${note.color}`,
                  transform: `rotate(${Math.sin(frame * 0.1 + i) * 15}deg)`,
                }}
              >
                {note.symbol}
              </span>
            );
          })}
        </div>
      )}

      {/* ================= MYSTERY QUESTION MARK (STAGE 4) ================= */}
      {showQuestionMark && frame >= mysteryQuestionStartFrame && (
        <div
          style={{
            position: "absolute",
            top: -circleSize * 0.46,
            right: -circleSize * 0.28,
            transform: `translateY(${questionBob}px) rotate(${questionRotate}deg) scale(${questionSpring})`,
            opacity: questionOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 35,
          }}
        >
          {/* Big Glowing Question Mark Bubble */}
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              backgroundColor: "#101018",
              border: `3px solid ${questionMarkColor}`,
              boxShadow: `0 0 25px ${questionMarkColor}90, 0 8px 24px rgba(0,0,0,0.8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 42,
                fontWeight: 900,
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: questionMarkColor,
                lineHeight: 1,
                textShadow: `0 0 16px ${questionMarkColor}`,
                transform: "translateY(-1px)",
              }}
            >
              ?
            </span>
          </div>

          {/* Mini Mystery Label */}
          <div
            style={{
              marginTop: 4,
              backgroundColor: "rgba(220, 38, 38, 0.95)",
              color: "#ffffff",
              fontSize: 9,
              fontWeight: 800,
              fontFamily: "monospace",
              padding: "2px 8px",
              borderRadius: 6,
              letterSpacing: 0.8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            NIEZNANY TYTUŁ!
          </div>
        </div>
      )}

      {/* ================= CIRCLE AVATAR & BORDER ================= */}
      <div
        style={{
          width: circleSize,
          height: circleSize,
          position: "relative",
          borderRadius: "50%",
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px ${accentColor}35`,
        }}
      >
        {/* Outer Accent Ring */}
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `2px solid ${accentColor}`,
            opacity: 0.85,
            boxShadow: `0 0 15px ${accentColor}60`,
          }}
        />

        {/* Inner Solid White/Border Ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `3.5px solid ${borderColor}`,
            overflow: "hidden",
            backgroundColor: "#0d0e14",
          }}
        >
          {/* Avatar Image */}
          <img
            src={avatarUrl}
            alt={characterName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Small live audio indicator pulse (headphone icon) */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: "#0f172a",
            border: `2px solid ${accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 2px 10px rgba(0,0,0,0.7), 0 0 10px ${accentColor}50`,
          }}
        >
          <span style={{ fontSize: 15, transform: "translateY(-1px)" }}>🎧</span>
        </div>
      </div>

      {/* ================= NAME BADGE PLAQUE (VOX / DOCUMENTARY STYLE) ================= */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Main Name Plaque */}
        <div
          style={{
            backgroundColor: "rgba(10, 10, 16, 0.95)",
            border: `2px solid ${borderColor}`,
            borderRadius: 12,
            padding: "6px 20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              color: "#ffffff",
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            {characterName}
          </span>

          {characterTag && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                fontFamily: "monospace",
                color: accentColor,
                backgroundColor: `${accentColor}18`,
                border: `1px solid ${accentColor}40`,
                padding: "2px 6px",
                borderRadius: 4,
                letterSpacing: 0.8,
              }}
            >
              {characterTag}
            </span>
          )}
        </div>

        {/* Role / Subtitle */}
        {characterRole && (
          <span
            style={{
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 500,
              color: "rgba(226, 232, 240, 0.8)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "2px 10px",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              textShadow: "0 1px 4px rgba(0,0,0,0.9)",
            }}
          >
            {characterRole}
          </span>
        )}
      </div>
    </div>
  );
};
