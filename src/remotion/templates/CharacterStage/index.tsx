import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CharacterStageProps } from "./schema";
import { CharacterBadge } from "./CharacterBadge";
import { ConnectionLine } from "./ConnectionLine";

function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export const CharacterStage: React.FC<CharacterStageProps> = ({
  sceneMode = "duo",
  backgroundStyle = "pitch-black",
  particlesEnabled = true,

  // Character 1
  c1_enabled = true,
  c1_name = "JAN KOWALSKI",
  c1_role = "Główny Świadek • 1984",
  c1_tag = "ŚWIADEK",
  c1_photoUrl,
  c1_borderColor = "#ffffff",
  c1_borderWidth = 4,
  c1_circleSize = 180,
  c1_scale = 1.0,
  c1_enterType = "from-bottom",
  c1_enterFrame = 0,
  c1_enterDuration = 22,
  c1_enableMovement = true,
  c1_startX = 50,
  c1_startY = 50,
  c1_endX = 33,
  c1_endY = 50,
  c1_moveStartFrame = 45,
  c1_moveDuration = 32,
  c1_idleBobbing = true,
  c1_talkingPulse = false,
  c1_pulseStartFrame = 20,
  c1_pulseDuration = 60,
  c1_isCrossedOut = false,
  c1_crossOutFrame = 80,
  c1_showClassifiedStamp = false,
  c1_stampText = "ŚCIŚLE TAJNE",

  // Character 2
  c2_enabled = true,
  c2_name = "INSP. MAREK NOWAK",
  c2_role = "Wydział Dochodzeniowo-Śledczy",
  c2_tag = "ŚLEDCZY",
  c2_photoUrl,
  c2_borderColor = "#38bdf8",
  c2_borderWidth = 4,
  c2_circleSize = 180,
  c2_scale = 1.0,
  c2_enterType = "from-bottom",
  c2_enterFrame = 10,
  c2_enterDuration = 22,
  c2_enableMovement = true,
  c2_startX = 67,
  c2_startY = 50,
  c2_endX = 67,
  c2_endY = 50,
  c2_moveStartFrame = 50,
  c2_moveDuration = 32,
  c2_idleBobbing = true,
  c2_talkingPulse = true,
  c2_pulseStartFrame = 75,
  c2_pulseDuration = 65,
  c2_isCrossedOut = false,
  c2_crossOutFrame = 95,
  c2_showClassifiedStamp = false,
  c2_stampText = "KLUCZOWY",

  // Connection
  showConnectionLine = true,
  lineStyle = "investigative-string",
  lineColor = "#ef4444",
  lineWidth = 3.5,
  lineLabel = "POŁĄCZENIE TELEFONICZNE • 1984",
  lineStartFrame = 75,
  lineDuration = 25,
  lineCurvature = -18,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Compute live current pixel coordinates of C1 center
  const c1Coords = useMemo(() => {
    let moveT = 0;
    if (c1_enableMovement && frame >= c1_moveStartFrame) {
      moveT = smootherStep((frame - c1_moveStartFrame) / c1_moveDuration);
    }
    const px = (c1_startX + (c1_endX - c1_startX) * moveT) / 100 * width;
    const py = (c1_startY + (c1_endY - c1_startY) * moveT) / 100 * height;
    const bob = c1_idleBobbing ? Math.sin((frame + c1_startX * 10) * 0.06) * 4.5 : 0;
    return { x: px, y: py + bob };
  }, [frame, c1_enableMovement, c1_moveStartFrame, c1_moveDuration, c1_startX, c1_endX, c1_startY, c1_endY, c1_idleBobbing, width, height]);

  // Compute live current pixel coordinates of C2 center
  const c2Coords = useMemo(() => {
    let moveT = 0;
    if (c2_enableMovement && frame >= c2_moveStartFrame) {
      moveT = smootherStep((frame - c2_moveStartFrame) / c2_moveDuration);
    }
    const px = (c2_startX + (c2_endX - c2_startX) * moveT) / 100 * width;
    const py = (c2_startY + (c2_endY - c2_startY) * moveT) / 100 * height;
    const bob = c2_idleBobbing ? Math.sin((frame + c2_startX * 10) * 0.06) * 4.5 : 0;
    return { x: px, y: py + bob };
  }, [frame, c2_enableMovement, c2_moveStartFrame, c2_moveDuration, c2_startX, c2_endX, c2_startY, c2_endY, c2_idleBobbing, width, height]);

  // Floating ambient dust particles
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 30; i++) {
      const seed = i * 137.5;
      const x = (Math.sin(seed) * 0.5 + 0.5) * width;
      const baseY = (Math.cos(seed * 1.3) * 0.5 + 0.5) * height;
      const speed = 0.3 + (i % 5) * 0.2;
      const size = 1.2 + (i % 3) * 1.1;
      const opacity = 0.2 + (i % 4) * 0.15;
      list.push({ id: i, x, baseY, speed, size, opacity });
    }
    return list;
  }, [width, height]);

  const isDuo = sceneMode === "duo" && c2_enabled;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor:
          backgroundStyle === "transparent"
            ? "transparent"
            : backgroundStyle === "noir-grid"
            ? "#08080d"
            : backgroundStyle === "investigative-corkboard"
            ? "#120e0c"
            : "#000000",
      }}
    >
      {/* Background Style Overlays */}
      {backgroundStyle === "noir-grid" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
      )}

      {backgroundStyle === "investigative-corkboard" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#181310",
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.06) 0%, transparent 75%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Floating Micro Dust Particles */}
      {particlesEnabled && backgroundStyle !== "transparent" && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          {particles.map((p) => {
            const currentY = (p.baseY - frame * p.speed * 0.8 + height) % height;
            const currentX = p.x + Math.sin((frame * 0.02) + p.id) * 15;
            return (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  left: currentX,
                  top: currentY,
                  width: p.size,
                  height: p.size,
                  borderRadius: "9999px",
                  backgroundColor: "#ffffff",
                  opacity: p.opacity,
                  filter: "blur(0.5px)",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Connection Line & Relationship Badge (Duo Mode) */}
      {isDuo && showConnectionLine && (
        <ConnectionLine
          frame={frame}
          x1={c1Coords.x}
          y1={c1Coords.y}
          x2={c2Coords.x}
          y2={c2Coords.y}
          lineStyle={lineStyle}
          lineColor={lineColor}
          lineWidth={lineWidth}
          lineLabel={lineLabel}
          lineStartFrame={lineStartFrame}
          lineDuration={lineDuration}
          lineCurvature={lineCurvature}
          canvasWidth={width}
          canvasHeight={height}
        />
      )}

      {/* Character 1 Badge */}
      {c1_enabled && (
        <CharacterBadge
          frame={frame}
          name={c1_name}
          role={c1_role}
          tag={c1_tag}
          photoUrl={c1_photoUrl}
          borderColor={c1_borderColor}
          borderWidth={c1_borderWidth}
          circleSize={c1_circleSize}
          scale={c1_scale}
          enterType={c1_enterType}
          enterFrame={c1_enterFrame}
          enterDuration={c1_enterDuration}
          enableMovement={c1_enableMovement}
          startX={c1_startX}
          startY={c1_startY}
          endX={c1_endX}
          endY={c1_endY}
          moveStartFrame={c1_moveStartFrame}
          moveDuration={c1_moveDuration}
          idleBobbing={c1_idleBobbing}
          talkingPulse={c1_talkingPulse}
          pulseStartFrame={c1_pulseStartFrame}
          pulseDuration={c1_pulseDuration}
          isCrossedOut={c1_isCrossedOut}
          crossOutFrame={c1_crossOutFrame}
          showClassifiedStamp={c1_showClassifiedStamp}
          stampText={c1_stampText}
          canvasWidth={width}
          canvasHeight={height}
          zIndex={10}
        />
      )}

      {/* Character 2 Badge (Duo Mode) */}
      {isDuo && (
        <CharacterBadge
          frame={frame}
          name={c2_name}
          role={c2_role}
          tag={c2_tag}
          photoUrl={c2_photoUrl}
          borderColor={c2_borderColor}
          borderWidth={c2_borderWidth}
          circleSize={c2_circleSize}
          scale={c2_scale}
          enterType={c2_enterType}
          enterFrame={c2_enterFrame}
          enterDuration={c2_enterDuration}
          enableMovement={c2_enableMovement}
          startX={c2_startX}
          startY={c2_startY}
          endX={c2_endX}
          endY={c2_endY}
          moveStartFrame={c2_moveStartFrame}
          moveDuration={c2_moveDuration}
          idleBobbing={c2_idleBobbing}
          talkingPulse={c2_talkingPulse}
          pulseStartFrame={c2_pulseStartFrame}
          pulseDuration={c2_pulseDuration}
          isCrossedOut={c2_isCrossedOut}
          crossOutFrame={c2_crossOutFrame}
          showClassifiedStamp={c2_showClassifiedStamp}
          stampText={c2_stampText}
          canvasWidth={width}
          canvasHeight={height}
          zIndex={11}
        />
      )}
    </div>
  );
};

