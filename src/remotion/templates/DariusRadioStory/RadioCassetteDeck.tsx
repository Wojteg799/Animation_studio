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
    jcardStartFrame = 150,
    radioStationName,
    radioShowName,
    radioHostName,
    tapeLabel,
    mixtapeTitle,
    showRadioSignalWaves,
    showRecBlinker,
    accentColor,
  } = props;

  // Entrance spring animation
  const enterSpring = spring({
    frame: frame - radioStartFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
      mass: 0.9,
    },
  });

  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  // Exit / Shift when J-Card tracklist appears (shrinks or shifts slightly to leave room for the card)
  const jcardProgress = Math.max(0, Math.min(1, (frame - (jcardStartFrame - 5)) / 20));
  const jcardEased = jcardProgress * jcardProgress * (3 - 2 * jcardProgress);

  // Position: centered on the right half of the canvas
  const posX = 68 - jcardEased * 8; // shifts slightly left (68% -> 60%) to balance with tracklist
  const posY = 50 - jcardEased * 4; // slight vertical adjustment
  const scale = (0.75 + 0.25 * clampedEnter) * (1.0 - jcardEased * 0.12);

  if (frame < radioStartFrame) {
    return null;
  }

  // Blinking REC diode (every 16 frames: 8 on, 8 off)
  const isRecOn = showRecBlinker && (Math.floor(frame / 14) % 2 === 0);

  // Spool spin angle (spinning tape spools)
  const spoolSpinAngle = (frame * 3.6) % 360;

  // VU-meter audio meter level simulation (reacting like 80s music is playing)
  const vuLeft = 40 + Math.sin(frame * 0.35) * 25 + Math.cos(frame * 0.72) * 15;
  const vuRight = 38 + Math.sin(frame * 0.42 + 1) * 24 + Math.cos(frame * 0.61) * 16;

  // Floating radio waves / transmission signal
  const wavePulse1 = (frame * 0.1) % 1;
  const wavePulse2 = ((frame * 0.1) + 0.5) % 1;

  return (
    <div
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: `${posY}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: Math.min(1, clampedEnter * 1.5),
        zIndex: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {/* Radio Transmission Waves (FM Broadcast waves going from radio to cassette) */}
      {showRadioSignalWaves && (
        <div
          style={{
            position: "absolute",
            top: -45,
            left: 55,
            display: "flex",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
          }}
        >
          {/* Animated radio waves expanding outwards */}
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            {/* Wave arc 1 */}
            <path
              d="M 20 35 A 15 15 0 0 1 20 5"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={1 - wavePulse1}
              transform={`scale(${1 + wavePulse1 * 0.4})`}
              transform-origin="10 20"
            />
            {/* Wave arc 2 */}
            <path
              d="M 32 38 A 24 24 0 0 1 32 2"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={1 - wavePulse2}
              transform={`scale(${1 + wavePulse2 * 0.4})`}
              transform-origin="10 20"
            />
            {/* Signal text */}
            <text
              x="48"
              y="24"
              fill="#38bdf8"
              fontFamily="monospace"
              fontSize="11"
              fontWeight="bold"
              letterSpacing="1"
            >
              FM AUDIO SIGNAL 89.2 MHz
            </text>
          </svg>
        </div>
      )}

      {/* Main Vintage Radio & Cassette Unit Enclosure */}
      <div
        style={{
          width: 520,
          backgroundColor: "#13141d",
          borderRadius: 20,
          border: "2px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* ================= UNIT TOP: RADIO TUNER & FREQUENCY DIAL ================= */}
        <div
          style={{
            backgroundColor: "#0a0b10",
            borderRadius: 14,
            border: "1.5px solid rgba(255, 255, 255, 0.1)",
            padding: "10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          {/* Header Row: Station Name + Stereo Indicator + Antenna */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "between",
              width: "100%",
            }}
          >
            {/* Left: Station info */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: 0.8,
                }}
              >
                RADIO TUNER: {radioStationName}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  color: "#38bdf8",
                  padding: "1px 6px",
                  borderRadius: 4,
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                FM STEREO
              </span>
            </div>

            {/* Right: Show info */}
            <div
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: accentColor,
                fontWeight: 700,
              }}
            >
              {radioShowName}
            </div>
          </div>

          {/* Tuner Frequency Glass Scale Bar */}
          <div
            style={{
              height: 28,
              backgroundColor: "#161824",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            {/* Frequency Numbers */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                fontSize: 9,
                fontFamily: "monospace",
                color: "rgba(255, 255, 255, 0.4)",
                fontWeight: 600,
                zIndex: 2,
              }}
            >
              <span>88</span>
              <span style={{ color: "#ffffff", fontWeight: 800 }}>89.2 MHz (NDR)</span>
              <span>92</span>
              <span>96</span>
              <span>100</span>
              <span>104</span>
              <span>108</span>
            </div>

            {/* Orange Frequency Tuning Needle (tuned exactly to 89.2) */}
            <div
              style={{
                position: "absolute",
                left: "22%",
                top: 0,
                bottom: 0,
                width: 2.5,
                backgroundColor: "#f59e0b",
                boxShadow: "0 0 8px #f59e0b",
                zIndex: 3,
              }}
            />

            {/* Frequency tick marks */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)",
                zIndex: 1,
              }}
            />
          </div>

          {/* Sub-row: DJ Host and VU Meters */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#94a3b8" }}>
              Audycja prowadzona przez: <strong style={{ color: "#ffffff" }}>{radioHostName}</strong>
            </span>

            {/* Mini Dual VU Meters */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 8, fontFamily: "monospace", color: "#64748b" }}>VU</span>
              <div
                style={{
                  width: 60,
                  height: 6,
                  backgroundColor: "#000000",
                  borderRadius: 3,
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, vuLeft)}%`,
                    backgroundColor: vuLeft > 75 ? "#ef4444" : vuLeft > 50 ? "#f59e0b" : "#22c55e",
                    height: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  width: 60,
                  height: 6,
                  backgroundColor: "#000000",
                  borderRadius: 3,
                  overflow: "hidden",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: `${Math.min(100, vuRight)}%`,
                    backgroundColor: vuRight > 75 ? "#ef4444" : vuRight > 50 ? "#f59e0b" : "#22c55e",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= UNIT BOTTOM: CASSETTE RECORDER DECK ================= */}
        <div
          style={{
            backgroundColor: "#0c0d14",
            borderRadius: 14,
            border: "1.5px solid rgba(255, 255, 255, 0.1)",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Deck Header: REC indicator & Tape format */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Blinking REC indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  backgroundColor: isRecOn ? "#ef4444" : "#450a0a",
                  boxShadow: isRecOn ? "0 0 12px #ef4444, 0 0 20px #ef444480" : "none",
                  transition: "all 0.1s ease",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  color: isRecOn ? "#ef4444" : "#991b1b",
                  letterSpacing: 1.2,
                }}
              >
                ● REC [NAGRYWANIE NA KASETĘ]
              </span>
            </div>

            {/* Tape brand / label */}
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#e2e8f0",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                padding: "2px 8px",
                borderRadius: 4,
              }}
            >
              {tapeLabel}
            </span>
          </div>

          {/* Realistic Cassette Well / Well Window with Spinning Spools */}
          <div
            style={{
              height: 115,
              backgroundColor: "#161722",
              borderRadius: 10,
              border: "1px solid rgba(255, 255, 255, 0.12)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 4px 14px rgba(0,0,0,0.8)",
            }}
          >
            {/* Cassette Shell Body */}
            <div
              style={{
                width: 380,
                height: 95,
                backgroundColor: "#1c1e29",
                borderRadius: 8,
                border: "2px solid rgba(255, 255, 255, 0.18)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 14px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
              }}
            >
              {/* Cassette Label Header */}
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#2a2d3d",
                  borderRadius: 4,
                  padding: "3px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    fontWeight: 800,
                    color: accentColor,
                    letterSpacing: 0.8,
                  }}
                >
                  {mixtapeTitle}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#ffffff",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "1px 6px",
                    borderRadius: 3,
                  }}
                >
                  SIDE A
                </span>
              </div>

              {/* Center Window with Dual Spinning Reels */}
              <div
                style={{
                  width: 220,
                  height: 48,
                  backgroundColor: "#0d0e15",
                  borderRadius: 6,
                  border: "1.5px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  position: "relative",
                }}
              >
                {/* Magnetic tape connecting reels */}
                <div
                  style={{
                    position: "absolute",
                    left: 45,
                    right: 45,
                    height: 12,
                    backgroundColor: "#3e2723",
                    borderRadius: 2,
                    opacity: 0.85,
                  }}
                />

                {/* Left Spool Reel (Spinning) */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#f8fafc",
                    border: "3px solid #64748b",
                    position: "relative",
                    transform: `rotate(${spoolSpinAngle}deg)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.7)",
                  }}
                >
                  {/* Spool Teeth */}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                      key={deg}
                      style={{
                        position: "absolute",
                        width: 4,
                        height: 8,
                        backgroundColor: "#1e293b",
                        transform: `rotate(${deg}deg) translateY(-10px)`,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  {/* Center Hole */}
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#0f172a",
                    }}
                  />
                </div>

                {/* Tape Counter in Center */}
                <div
                  style={{
                    backgroundColor: "#000000",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 3,
                    padding: "2px 6px",
                    fontFamily: "monospace",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: 1,
                    zIndex: 2,
                  }}
                >
                  {String(Math.floor(frame * 0.4)).padStart(3, "0")}
                </div>

                {/* Right Spool Reel (Spinning) */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "#f8fafc",
                    border: "3px solid #64748b",
                    position: "relative",
                    transform: `rotate(${spoolSpinAngle}deg)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.7)",
                  }}
                >
                  {/* Spool Teeth */}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                      key={deg}
                      style={{
                        position: "absolute",
                        width: 4,
                        height: 8,
                        backgroundColor: "#1e293b",
                        transform: `rotate(${deg}deg) translateY(-10px)`,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  {/* Center Hole */}
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#0f172a",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
