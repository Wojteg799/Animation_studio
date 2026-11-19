import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";
import { DARIUS_AVATAR_SVG } from "./darius-avatar";

interface DariusCharacterProps {
  props: DariusRadioStoryProps;
  frame: number;
}

export const DariusCharacter: React.FC<DariusCharacterProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    characterName = "DARIUS",
    avatarUrl = DARIUS_AVATAR_SVG,
    accentColor = "#facc15",
    lineColor = "#ffffff",
    circleSize = 220,
    avatarScale = 1.35,
    heartScale = 1.25,
    questionMarkScale = 1.35,
    showHeartAndNotes = true,
    showQuestionMark = true,
    dariusEnterFrame = 5,
    heartNotesStartFrame = 22,
    heartNotesEndFrame = 75,
    radioStartFrame = 75,
    questionMarkStartFrame = 215,
  } = props;

  // 1. Wejście postaci Dariusa (sprężysty pop-in)
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

  // 2. Pozycja: Na początku na środku (X ~ 50%), a gdy wchodzi radio przesuwa się w lewo (X ~ 22%)
  const shiftProgress = Math.max(0, Math.min(1, (frame - (radioStartFrame - 8)) / 20));
  const shiftEased = shiftProgress * shiftProgress * (3 - 2 * shiftProgress);
  const posX = interpolate(shiftEased, [0, 1], [50, 22]);

  // Delikatny naturalny oddech (idle bobbing)
  const bobY = Math.sin(frame * 0.08) * 3.5;

  // 3. Faza Serca & Nutek (klatki heartNotesStartFrame do heartNotesEndFrame)
  const heartSpring = spring({
    frame: frame - heartNotesStartFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const heartExit = Math.max(0, Math.min(1, (frame - (heartNotesEndFrame - 10)) / 12));
  const heartOpacity = Math.max(0, heartSpring - heartExit);
  const heartPulse = 1 + 0.1 * Math.sin(frame * 0.22);

  // 4. Faza Pytajnika (od questionMarkStartFrame, ze zredukowanym subtelnym glowem)
  const questionSpring = spring({
    frame: frame - questionMarkStartFrame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const questionBob = Math.sin(frame * 0.14) * 4;

  if (frame < dariusEnterFrame) {
    return null;
  }

  const isCustomImage =
    Boolean(avatarUrl) &&
    avatarUrl !== DARIUS_AVATAR_SVG &&
    !avatarUrl.startsWith("data:image/svg+xml");

  return (
    <div
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: "50%",
        transform: `translate(-50%, -50%) translateY(${bobY}px) scale(${clampedEnter * avatarScale})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* ================= PROSTE SERCE & NUTY (BEZ ŻADNYCH TEKSTÓW!) ================= */}
      {showHeartAndNotes && heartOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            top: -circleSize * 0.38,
            opacity: heartOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            transform: `scale(${heartScale})`,
          }}
        >
          {/* Proste geometryczne serduszko w kolorze żółtym */}
          <div
            style={{
              transform: `scale(${heartSpring * heartPulse})`,
              filter: `drop-shadow(0 0 4px ${accentColor}40)`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill={accentColor}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Minimalistyczne białe nutki unoszące się w górę */}
          {[
            { symbol: "♪", x: -55, y: -12, delay: 0 },
            { symbol: "♫", x: 55, y: -16, delay: 8 },
            { symbol: "♩", x: -70, y: 26, delay: 14 },
          ].map((n, i) => {
            const prog = ((frame - heartNotesStartFrame + n.delay * 2) % 40) / 40;
            const floatY = n.y - prog * 32;
            const floatAlpha = Math.sin(prog * Math.PI) * heartOpacity;

            return (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: n.x,
                  top: floatY,
                  fontSize: 26,
                  fontWeight: 900,
                  color: lineColor,
                  opacity: floatAlpha,
                }}
              >
                {n.symbol}
              </span>
            );
          })}
        </div>
      )}

      {/* ================= WYRAZISTY ŻÓŁTY ZNAK ZAPYTANIA (ZREDUKOWANY GLOW) ================= */}
      {showQuestionMark && frame >= questionMarkStartFrame && (
        <div
          style={{
            position: "absolute",
            top: -circleSize * 0.45,
            right: -circleSize * 0.28,
            transform: `translateY(${questionBob}px) scale(${questionSpring * questionMarkScale})`,
            zIndex: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Czysty, ostry żółty badge z pytajnikiem — bez oślepiającego glow */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#000000",
              border: `3px solid ${accentColor}`,
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.8)",
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
                color: accentColor,
                lineHeight: 1,
                transform: "translateY(-1px)",
              }}
            >
              ?
            </span>
          </div>
        </div>
      )}

      {/* ================= KÓŁKO Z AVATAREM (PÓŁKOLE TUŁÓW + KOŁO GŁOWA NA ŻÓŁTO) ================= */}
      <div
        style={{
          width: circleSize,
          height: circleSize,
          position: "relative",
          borderRadius: "50%",
          border: `3.5px solid ${lineColor}`,
          overflow: "hidden",
          backgroundColor: "#000000",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.9)",
        }}
      >
        {isCustomImage ? (
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
        ) : (
          /* Czyste geometryczne koło jako głowa i półkole jako tułów na żółto */
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <circle cx="100" cy="100" r="100" fill="#000000" />
            {/* Głowa: koło na żółto */}
            <circle cx="100" cy="62" r="32" fill={accentColor} />
            {/* Tułów: półkole na żółto */}
            <path d="M 35 185 A 65 65 0 0 1 165 185 Z" fill={accentColor} />
          </svg>
        )}
      </div>

      {/* ================= JEDYNY NAPIS NA EKRANIE: "DARIUS" ================= */}
      <div
        style={{
          marginTop: 14,
          backgroundColor: "#000000",
          border: `2px solid ${lineColor}`,
          borderRadius: 8,
          padding: "5px 22px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.8)",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            color: lineColor,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          {characterName}
        </span>
      </div>
    </div>
  );
};
