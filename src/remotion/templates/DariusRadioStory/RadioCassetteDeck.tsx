import React from "react";
import { spring, useVideoConfig } from "remotion";
import { DariusRadioStoryProps } from "./schema";

interface RadioCassetteDeckProps {
  props: DariusRadioStoryProps;
  frame: number;
}

export const RadioCassetteDeck: React.FC<RadioCassetteDeckProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    radioStartFrame = 75,
    writingStartFrame = 145,
    accentColor = "#facc15",
    lineColor = "#ffffff",
    lineWidth = 2.5,
  } = props;

  // Wejście sprężyste radia i kasety
  const enterSpring = spring({
    frame: frame - radioStartFrame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.85 },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  if (frame < radioStartFrame) {
    return null;
  }

  // Obroty szpulek taśmy (kręcą się podczas nagrywania)
  const spoolSpinAngle = (frame * 3.8) % 360;

  // Fale radiowe przemieszczające się z radia do kasety
  const wave1 = ((frame * 0.08) % 1);
  const wave2 = (((frame * 0.08) + 0.33) % 1);
  const wave3 = (((frame * 0.08) + 0.66) % 1);

  // Dioda nagrywania migająca żółto/czerwono
  const isRecBlink = Math.floor(frame / 12) % 2 === 0;

  // Płynne przesunięcie w lewo/górę gdy wchodzi faza pisania
  const writingProgress = Math.max(0, Math.min(1, (frame - (writingStartFrame - 5)) / 18));
  const writingEased = writingProgress * writingProgress * (3 - 2 * writingProgress);
  const posY = 50 - writingEased * 8; // lekko do góry, by zrobić miejsce na notowanie

  return (
    <div
      style={{
        position: "absolute",
        left: "67%",
        top: `${posY}%`,
        transform: `translate(-50%, -50%) scale(${clampedEnter})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        zIndex: 15,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: 36,
      }}
    >
      {/* ================= 1. MINIMALIST WIREFRAME RADIO ================= */}
      <div style={{ position: "relative" }}>
        {/* Antenna with radio signal waves */}
        <div style={{ position: "absolute", top: -38, right: 18 }}>
          {/* Antena wznosząca się pod kątem */}
          <svg width="60" height="42" viewBox="0 0 60 42" fill="none">
            <line x1="12" y1="40" x2="48" y2="4" stroke={lineColor} strokeWidth={lineWidth} strokeLinecap="round" />
            <circle cx="48" cy="4" r="3" fill={accentColor} />

            {/* Fale radiowe wychodzące z anteny w stronę kasety */}
            {[wave1, wave2, wave3].map((w, idx) => (
              <path
                key={idx}
                d="M 52 2 A 16 16 0 0 1 52 24"
                stroke={accentColor}
                strokeWidth={2}
                strokeLinecap="round"
                opacity={1 - w}
                transform={`scale(${1 + w * 0.8})`}
                transform-origin="48 4"
              />
            ))}
          </svg>
        </div>

        {/* Radio Body (Wireframe) */}
        <div
          style={{
            width: 140,
            height: 100,
            backgroundColor: "#000000",
            border: `${lineWidth}px solid ${lineColor}`,
            borderRadius: 12,
            boxShadow: "0 15px 35px rgba(0,0,0,0.8)",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Radio Top Scale Window */}
          <div
            style={{
              height: 22,
              border: `1.5px solid ${lineColor}`,
              borderRadius: 4,
              backgroundColor: "#000000",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Minimalist scale tick marks */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(90deg, ${lineColor} 0px, ${lineColor} 1px, transparent 1px, transparent 8px)`,
                opacity: 0.35,
              }}
            />
            {/* Yellow Tuning Needle */}
            <div
              style={{
                position: "absolute",
                left: "40%",
                top: 0,
                bottom: 0,
                width: 2.5,
                backgroundColor: accentColor,
                boxShadow: `0 0 6px ${accentColor}`,
              }}
            />
          </div>

          {/* Radio Bottom Row: Speaker Grille + Tuning Knobs */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
            {/* Minimalist Speaker Grille (3 horizontal slots) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ width: 48, height: 2.5, backgroundColor: lineColor, borderRadius: 2, opacity: 0.8 }} />
              <div style={{ width: 48, height: 2.5, backgroundColor: lineColor, borderRadius: 2, opacity: 0.8 }} />
              <div style={{ width: 48, height: 2.5, backgroundColor: lineColor, borderRadius: 2, opacity: 0.8 }} />
            </div>

            {/* Two Circular Knobs */}
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `2px solid ${lineColor}`,
                  backgroundColor: "#000000",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: 9,
                    width: 2,
                    height: 6,
                    backgroundColor: accentColor,
                  }}
                />
              </div>

              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: `2px solid ${lineColor}`,
                  backgroundColor: "#000000",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: 9,
                    width: 2,
                    height: 6,
                    backgroundColor: lineColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MINIMALIST WIREFRAME CASSETTE (JOY DIVISION STYLE) ================= */}
      <div style={{ position: "relative" }}>
        {/* Blinking Recording Dot ● (Yellow/Red) */}
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: isRecBlink ? accentColor : "transparent",
            boxShadow: isRecBlink ? `0 0 10px ${accentColor}` : "none",
          }}
        />

        {/* Cassette Wireframe Body */}
        <div
          style={{
            width: 175,
            height: 110,
            backgroundColor: "#000000",
            border: `${lineWidth}px solid ${lineColor}`,
            borderRadius: 10,
            boxShadow: "0 15px 35px rgba(0,0,0,0.8)",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Label Area (Wireframe rectangle) */}
          <div
            style={{
              width: "100%",
              height: 24,
              border: `1.5px solid ${lineColor}`,
              borderRadius: 4,
              opacity: 0.6,
            }}
          />

          {/* Central Tape Reel Window */}
          <div
            style={{
              width: 120,
              height: 44,
              border: `1.5px solid ${lineColor}`,
              borderRadius: 6,
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 14px",
              position: "relative",
            }}
          >
            {/* Magnetic Tape Line */}
            <div
              style={{
                position: "absolute",
                left: 28,
                right: 28,
                height: 8,
                backgroundColor: lineColor,
                opacity: 0.25,
              }}
            />

            {/* Left Spinning Reel */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: `2px solid ${lineColor}`,
                position: "relative",
                transform: `rotate(${spoolSpinAngle}deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  style={{
                    position: "absolute",
                    width: 2,
                    height: 5,
                    backgroundColor: accentColor,
                    transform: `rotate(${deg}deg) translateY(-6px)`,
                  }}
                />
              ))}
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: lineColor }} />
            </div>

            {/* Right Spinning Reel */}
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: `2px solid ${lineColor}`,
                position: "relative",
                transform: `rotate(${spoolSpinAngle}deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  style={{
                    position: "absolute",
                    width: 2,
                    height: 5,
                    backgroundColor: accentColor,
                    transform: `rotate(${deg}deg) translateY(-6px)`,
                  }}
                />
              ))}
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: lineColor }} />
            </div>
          </div>

          {/* Bottom trapezoid notch wireframe */}
          <div
            style={{
              width: 75,
              height: 12,
              borderTop: `1.5px solid ${lineColor}`,
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
