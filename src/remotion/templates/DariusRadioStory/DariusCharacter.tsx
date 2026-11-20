import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";
import { DARIUS_AVATAR_SVG } from "./darius-avatar";

interface DariusCharacterProps {
  props: DariusRadioStoryProps;
  frame: number;
}

// Czyste, wyraziste wektorowe nutki w stylu line-art
const NoteSingle = ({ color = "#ffffff", size = 24 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: "visible" }}
  >
    <ellipse cx="7.5" cy="17.5" rx="4.5" ry="3.2" fill={color} stroke="none" transform="rotate(-20 7.5 17.5)" />
    <path d="M10.8 17V3.5c0 0 1.2-0.5 4.5 1.5c2 1.2 2.7 3.2 2.7 3.2" />
  </svg>
);

const NoteDouble = ({ color = "#ffffff", size = 26 }: { color?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ overflow: "visible" }}
  >
    <ellipse cx="6" cy="18" rx="4" ry="2.8" fill={color} stroke="none" transform="rotate(-20 6 18)" />
    <ellipse cx="17.5" cy="15" rx="4" ry="2.8" fill={color} stroke="none" transform="rotate(-20 17.5 15)" />
    <path d="M9 17.5V4.5l11.5-3V14.5" />
    <path d="M9 7.5l11.5-3" strokeWidth="2.8" />
  </svg>
);

export const DariusCharacter: React.FC<DariusCharacterProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    characterName = "DARIUS",
    avatarUrl = DARIUS_AVATAR_SVG,
    accentColor = "#facc15",
    lineColor = "#ffffff",
    circleSize = 220,
    avatarHeadSize = 42,
    avatarBodySize = 75,
    avatarHeadY = 55,
    avatarBodyY = 168,
    avatarScale = 1.35,
    heartScale = 1.25,
    heartOffsetY = 0,
    questionMarkScale = 1.35,
    showHeartAndNotes = true,
    showQuestionMark = true,
    dariusEnterFrame = 5,
    heartNotesStartFrame = 22,
    heartNotesEndFrame = 80,
    radioStartFrame = 80,
    questionMarkStartFrame = 235,
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
  const shiftProgress = Math.max(0, Math.min(1, (frame - (radioStartFrame - 8)) / 22));
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
  const heartExit = Math.max(0, Math.min(1, (frame - (heartNotesEndFrame - 10)) / 14));
  const heartOpacity = Math.max(0, heartSpring - heartExit);

  // Naturalny, organiczny rytm bicia serca (lub-dub ... pauza)
  const beatCycle = 32;
  const beatProgress = Math.max(0, (frame - heartNotesStartFrame) % beatCycle);
  let beatScale = 1.0;
  if (beatProgress < 4) {
    // 1. Szybkie sprężyste powiększenie (lub)
    beatScale = interpolate(beatProgress, [0, 4], [1.0, 1.2]);
  } else if (beatProgress < 7) {
    // Lekki powrót
    beatScale = interpolate(beatProgress, [4, 7], [1.2, 1.05]);
  } else if (beatProgress < 11) {
    // 2. Drugie uderzenie (dub)
    beatScale = interpolate(beatProgress, [7, 11], [1.05, 1.14]);
  } else if (beatProgress < 17) {
    // Płynny powrót do spoczynku
    beatScale = interpolate(beatProgress, [11, 17], [1.14, 1.0]);
  } else {
    // Spokojny odpoczynek (rest)
    beatScale = 1.0;
  }

  // Podczas wejścia sprężyna dominuje, a puls płynnie się włącza
  const entranceDamp = Math.min(1, Math.max(0, (frame - heartNotesStartFrame) / 10));
  const heartScaleMultiplier = 1 + (beatScale - 1) * entranceDamp;

  // 4. Faza Pytajnika (od questionMarkStartFrame, ZERO glow - czysty minimalistyczny line-art)
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
      {/* ================= PROSTE SERCE & NUTY (ZERO GLOW) ================= */}
      {showHeartAndNotes && heartOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            top: -circleSize * 0.44 + heartOffsetY,
            opacity: heartOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            transform: `scale(${heartScale})`,
          }}
        >
          {/* Czyste, wyraziste geometryczne serduszko w kolorze żółtym */}
          <div
            style={{
              transform: `scale(${heartSpring * heartScaleMultiplier})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
            }}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill={accentColor}
              stroke="#000000"
              strokeWidth="1.2"
              strokeLinejoin="round"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Płynnie unoszące się nutki muzyczne */}
          {[
            { isDouble: false, baseX: -44, startY: 10, endY: -78, driftX: -22, duration: 48, delay: 0, size: 24, color: lineColor },
            { isDouble: true,  baseX: 38,  startY: 14, endY: -84, driftX: 24,  duration: 52, delay: 10, size: 26, color: accentColor },
            { isDouble: true,  baseX: -26, startY: 18, endY: -92, driftX: -16, duration: 46, delay: 20, size: 22, color: lineColor },
            { isDouble: false, baseX: 48,  startY: 8,  endY: -88, driftX: 20,  duration: 50, delay: 30, size: 24, color: lineColor },
            { isDouble: false, baseX: -12, startY: 16, endY: -98, driftX: 14,  duration: 54, delay: 40, size: 20, color: accentColor },
          ].map((n, i) => {
            const timeSinceStart = frame - heartNotesStartFrame - n.delay;
            if (timeSinceStart < 0) return null;

            const cycleTime = timeSinceStart % n.duration;
            const prog = cycleTime / n.duration; // 0 do 1

            // Płynny wznios z delikatnym zwolnieniem
            const easedProg = prog * (2 - prog);
            const floatY = interpolate(easedProg, [0, 1], [n.startY, n.endY]);

            // Organiczne falowanie na boki (S-curve)
            const sway = Math.sin(prog * Math.PI * 2) * 12;
            const floatX = interpolate(prog, [0, 1], [n.baseX, n.baseX + n.driftX]) + sway;

            // Delikatny przechył
            const rot = Math.sin(prog * Math.PI * 2) * 16;

            // Płynna zmiana wielkości
            const noteScale = interpolate(prog, [0, 0.25, 0.75, 1], [0.4, 1.0, 1.0, 0.8]);

            // Całkowicie płynny łuk przezroczystości bez przeskoków
            const alphaCurve = Math.sin(prog * Math.PI);
            const floatAlpha = alphaCurve * alphaCurve * heartOpacity;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: floatX,
                  top: floatY,
                  transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${noteScale})`,
                  opacity: floatAlpha,
                  pointerEvents: "none",
                }}
              >
                {n.isDouble ? (
                  <NoteDouble color={n.color} size={n.size} />
                ) : (
                  <NoteSingle color={n.color} size={n.size} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= WYRAZISTY ŻÓŁTY ZNAK ZAPYTANIA (ZERO GLOW) ================= */}
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
          {/* Czysty, ostry żółty badge z pytajnikiem — bez jakiegokolwiek glow */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#000000",
              border: `3px solid ${accentColor}`,
              boxShadow: "none",
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

      {/* ================= KÓŁKO Z AVATAREM (POWIĘKSZONE KOŁO GŁOWA + KOŁO TUŁÓW NA ŻÓŁTO) ================= */}
      <div
        style={{
          width: circleSize,
          height: circleSize,
          position: "relative",
          borderRadius: "50%",
          border: `3.5px solid ${lineColor}`,
          overflow: "hidden",
          backgroundColor: "#000000",
          boxShadow: "none",
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
          /* Czyste geometryczne koła: tułów i głowa na żółto, dotykające się bez odcięcia od dołu */
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <circle cx="100" cy="100" r="100" fill="#000000" />
            {/* Kółko tułowia — płynnie wypełnia dół */}
            <circle cx="100" cy={avatarBodyY} r={avatarBodySize} fill={accentColor} />
            {/* Kółko głowy — dotyka tułowia */}
            <circle cx="100" cy={avatarHeadY} r={avatarHeadSize} fill={accentColor} />
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
          boxShadow: "none",
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
