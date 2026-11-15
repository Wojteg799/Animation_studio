import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";

export interface CharacterBadgeProps {
  frame: number;
  name: string;
  role?: string;
  tag?: string;
  photoUrl: string;
  borderColor: string;
  borderWidth: number;
  circleSize: number;
  scale: number;
  // Entrance
  enterType: "from-bottom" | "from-top" | "from-left" | "from-right" | "pop-spring" | "fade-zoom";
  enterFrame: number;
  enterDuration: number;
  // Movement A -> B
  enableMovement: boolean;
  startX: number; // in % (0 - 100)
  startY: number; // in % (0 - 100)
  endX: number;
  endY: number;
  moveStartFrame: number;
  moveDuration: number;
  // Modifiers
  idleBobbing?: boolean;
  talkingPulse?: boolean;
  pulseStartFrame?: number;
  pulseDuration?: number;
  isCrossedOut?: boolean;
  crossOutFrame?: number;
  showClassifiedStamp?: boolean;
  stampText?: string;
  // Canvas size
  canvasWidth: number;
  canvasHeight: number;
  zIndex?: number;
}

function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export const CharacterBadge: React.FC<CharacterBadgeProps> = ({
  frame,
  name,
  role,
  tag,
  photoUrl,
  borderColor,
  borderWidth,
  circleSize,
  scale,
  enterType,
  enterFrame,
  enterDuration,
  enableMovement,
  startX,
  startY,
  endX,
  endY,
  moveStartFrame,
  moveDuration,
  idleBobbing = true,
  talkingPulse = false,
  pulseStartFrame = 20,
  pulseDuration = 60,
  isCrossedOut = false,
  crossOutFrame = 80,
  showClassifiedStamp = false,
  stampText = "ŚCIŚLE TAJNE",
  canvasWidth,
  canvasHeight,
  zIndex = 10,
}) => {
  const { fps } = useVideoConfig();

  // If before enterFrame, do not render
  if (frame < enterFrame) {
    return null;
  }

  // 1. Entrance Progress & Spring Physics
  const enterRelativeFrame = frame - enterFrame;
  const enterSpring = spring({
    frame: enterRelativeFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 110,
    },
  });

  const enterSmooth = smootherStep(enterRelativeFrame / enterDuration);

  // Entrance offsets
  let enterOffsetX = 0;
  let enterOffsetY = 0;
  let enterScale = 1;
  let enterOpacity = 1;

  if (enterType === "from-bottom") {
    enterOffsetY = (1 - enterSpring) * (canvasHeight * 0.45);
    enterOpacity = Math.min(1, enterRelativeFrame / 8);
  } else if (enterType === "from-top") {
    enterOffsetY = (1 - enterSpring) * -(canvasHeight * 0.45);
    enterOpacity = Math.min(1, enterRelativeFrame / 8);
  } else if (enterType === "from-left") {
    enterOffsetX = (1 - enterSpring) * -(canvasWidth * 0.4);
    enterOpacity = Math.min(1, enterRelativeFrame / 8);
  } else if (enterType === "from-right") {
    enterOffsetX = (1 - enterSpring) * (canvasWidth * 0.4);
    enterOpacity = Math.min(1, enterRelativeFrame / 8);
  } else if (enterType === "pop-spring") {
    enterScale = enterSpring;
    enterOpacity = Math.min(1, enterRelativeFrame / 6);
  } else if (enterType === "fade-zoom") {
    enterScale = 0.8 + 0.2 * enterSmooth;
    enterOpacity = enterSmooth;
  }

  // 2. Waypoint Movement (A -> B)
  let moveT = 0;
  if (enableMovement && frame >= moveStartFrame) {
    const rawMove = (frame - moveStartFrame) / moveDuration;
    moveT = smootherStep(rawMove);
  }

  const currentPercentX = startX + (endX - startX) * moveT;
  const currentPercentY = startY + (endY - startY) * moveT;

  const currentPixelX = (currentPercentX / 100) * canvasWidth;
  const currentPixelY = (currentPercentY / 100) * canvasHeight;

  // 3. Idle bobbing (subtle organic breathing)
  const bobbingOffsetY = idleBobbing
    ? Math.sin((frame + startX * 10) * 0.06) * 4.5
    : 0;

  // 4. Talking pulse waves
  const isPulsing =
    talkingPulse &&
    frame >= (pulseStartFrame || 0) &&
    frame <= (pulseStartFrame || 0) + (pulseDuration || 60);

  const pulsePhase = isPulsing
    ? ((frame - pulseStartFrame) % 24) / 24
    : 0;

  // 5. Cross-out animation (Czerwone X)
  const crossOutRelative = frame - (crossOutFrame || 80);
  const crossOutT = isCrossedOut && crossOutRelative >= 0
    ? Math.min(1, crossOutRelative / 10)
    : 0;

  // 6. Classified Stamp Animation
  const stampRelative = frame - (crossOutFrame ? crossOutFrame - 15 : 60);
  const stampSpring = showClassifiedStamp && stampRelative >= 0
    ? spring({
        frame: stampRelative,
        fps,
        config: { damping: 10, mass: 0.5, stiffness: 180 },
      })
    : 0;

  // Final coordinates
  const finalX = currentPixelX + enterOffsetX;
  const finalY = currentPixelY + enterOffsetY + bobbingOffsetY;
  const finalScale = scale * enterScale;

  return (
    <div
      style={{
        position: "absolute",
        left: finalX,
        top: finalY,
        transform: `translate(-50%, -50%) scale(${finalScale})`,
        opacity: enterOpacity,
        zIndex,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        willChange: "transform, opacity",
      }}
    >
      {/* Soundwave Talking Ripple Rings */}
      {isPulsing && (
        <>
          <div
            style={{
              position: "absolute",
              top: circleSize / 2,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: circleSize + pulsePhase * 70,
              height: circleSize + pulsePhase * 70,
              borderRadius: "9999px",
              border: `2px solid ${borderColor}`,
              opacity: (1 - pulsePhase) * 0.7,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: circleSize / 2,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: circleSize + ((pulsePhase + 0.5) % 1) * 70,
              height: circleSize + ((pulsePhase + 0.5) % 1) * 70,
              borderRadius: "9999px",
              border: `1.5px solid ${borderColor}`,
              opacity: (1 - ((pulsePhase + 0.5) % 1)) * 0.5,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* 1. KÓŁKO POSTACI (CIRCULAR AVATAR WITH COLORED BORDER) */}
      <div
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: "9999px",
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow: `0 0 25px ${borderColor}55, 0 10px 30px rgba(0, 0, 0, 0.85)`,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0d0d14",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {/* Photo / Silhouette image */}
        <img
          src={photoUrl}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            // fallback to inline svg if image fails
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23334155'><circle cx='50' cy='38' r='20'/><path d='M15 90 c0-25 15-40 35-40 s35 15 35 40 Z'/></svg>";
          }}
        />

        {/* Subtle inner vignette / glass shadow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.65)",
            pointerEvents: "none",
          }}
        />

        {/* Optional Classified Stamp on Photo */}
        {showClassifiedStamp && stampSpring > 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(-18deg) scale(${stampSpring})`,
              border: "3px solid #ef4444",
              color: "#ef4444",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              padding: "4px 10px",
              fontSize: "13px",
              fontFamily: "monospace",
              fontWeight: "900",
              letterSpacing: "2px",
              textTransform: "uppercase",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.6)",
              whiteSpace: "nowrap",
              zIndex: 3,
            }}
          >
            {stampText}
          </div>
        )}

        {/* Optional Cross-Out X Effect (Czerwony X wyeliminowania) */}
        {isCrossedOut && crossOutT > 0 && (
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 4,
              pointerEvents: "none",
            }}
            viewBox="0 0 100 100"
          >
            {/* First diagonal line */}
            <line
              x1="18"
              y1="18"
              x2="82"
              y2="82"
              stroke="#ef4444"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="90"
              strokeDashoffset={90 * (1 - crossOutT)}
              style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.9))" }}
            />
            {/* Second diagonal line */}
            {crossOutT > 0.4 && (
              <line
                x1="82"
                y1="18"
                x2="18"
                y2="82"
                stroke="#ef4444"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="90"
                strokeDashoffset={90 * (1 - (crossOutT - 0.4) / 0.6)}
                style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.9))" }}
              />
            )}
          </svg>
        )}
      </div>

      {/* 2. PODPIS (BIAŁY PODPIS W CZARNYM ZAOKRĄGLONYM KWADRACIE Z BIAŁĄ OBWÓDKĄ) */}
      <div
        style={{
          marginTop: "12px",
          backgroundColor: "#000000",
          border: "2px solid #ffffff",
          borderRadius: "14px",
          padding: "8px 18px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.9), 0 0 12px rgba(255, 255, 255, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minWidth: "150px",
          maxWidth: "260px",
          position: "relative",
        }}
      >
        {/* Optional Tag badge above name */}
        {tag && (
          <div
            style={{
              backgroundColor: borderColor,
              color: "#000000",
              fontSize: "9px",
              fontFamily: "monospace",
              fontWeight: "900",
              letterSpacing: "1.5px",
              padding: "2px 8px",
              borderRadius: "4px",
              textTransform: "uppercase",
              marginBottom: "4px",
              boxShadow: `0 0 8px ${borderColor}66`,
            }}
          >
            {tag}
          </div>
        )}

        {/* White Main Name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: "800",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            lineHeight: 1.25,
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
          }}
        >
          {name}
        </div>

        {/* Subtitle / Role below */}
        {role && (
          <div
            style={{
              color: "#cbd5e1",
              fontSize: "11px",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: "500",
              marginTop: "3px",
              lineHeight: 1.2,
              opacity: 0.9,
            }}
          >
            {role}
          </div>
        )}
      </div>
    </div>
  );
};
