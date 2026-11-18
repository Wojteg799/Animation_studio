import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AnimatedPhotoFrameProps } from "./schema";
import { FrameCorners } from "./FrameCorners";

function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export const AnimatedPhotoFrame: React.FC<AnimatedPhotoFrameProps> = ({
  imageUrl,
  aspectRatio = "16:9",
  frameWidth = 1020,
  frameColor = "#ffffff",
  strokeWidth = 2,
  borderRadius = 6,
  glowIntensity = 0.4,

  enableTravelingBeam = true,
  beamSpeed = 1.0,
  enableGlassSheen = true,
  sheenInterval = 90,
  enable3DFloat = true,
  floatIntensity = 1.0,
  enableKenBurns = true,
  kenBurnsScale = 1.08,
  enableCornerBrackets = true,
  showTechCrosshairs = true,

  showLabel = true,
  labelText = "ARCHIWALNA FOTOGRAFIA // DOKUMENTACJA 1984",
  labelSubtext = "NEGATYW 35MM • SYGNATURA: REF-84/NDR",
  labelPosition = "bottom",

  entranceType = "draw-in",
  entranceFrame = 0,
  entranceDuration = 24,

  backgroundType = "transparent",
}) => {
  const frame = useCurrentFrame();
  const { width: canvasWidth, height: canvasHeight, fps } = useVideoConfig();

  // 1. Dimensions based on Aspect Ratio
  const { width, height } = useMemo(() => {
    let h = Math.round((frameWidth * 9) / 16);
    if (aspectRatio === "4:3") h = Math.round((frameWidth * 3) / 4);
    else if (aspectRatio === "1:1") h = frameWidth;
    else if (aspectRatio === "9:16") h = Math.round((frameWidth * 16) / 9);
    return { width: frameWidth, height: h };
  }, [frameWidth, aspectRatio]);

  // Perimeter for stroke animation
  const perimeter = 2 * (width + height);

  // 2. Entrance Animation
  const enterRelative = frame - entranceFrame;
  const enterSpring = spring({
    frame: Math.max(0, enterRelative),
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const enterSmooth = smootherStep(enterRelative / entranceDuration);

  // Entrance modifiers
  let enterScale = 1;
  let enterOffsetY = 0;
  let enterOpacity = 1;
  let drawProgress = 1;

  if (frame < entranceFrame) {
    enterOpacity = 0;
    drawProgress = 0;
  } else if (entranceType === "draw-in") {
    drawProgress = enterSmooth;
    enterOpacity = Math.min(1, enterRelative / 8);
    enterScale = 0.95 + 0.05 * enterSmooth;
  } else if (entranceType === "expand-center") {
    enterScale = enterSpring;
    enterOpacity = Math.min(1, enterRelative / 6);
  } else if (entranceType === "slide-up") {
    enterOffsetY = (1 - enterSpring) * 160;
    enterOpacity = Math.min(1, enterRelative / 8);
  } else if (entranceType === "pop-scale") {
    enterScale = enterSpring;
    enterOpacity = Math.min(1, enterRelative / 5);
  }

  // 3. Traveling Perimeter Beam ("Ruszające się światło")
  const beamLength = Math.max(80, Math.round(perimeter * 0.16));
  const beamOffset = -((frame * 4.5 * beamSpeed) % perimeter);

  // 4. Glass Sheen Reflection Glint
  const sheenCycleFrame = frame % sheenInterval;
  const sheenProgress = smootherStep(sheenCycleFrame / 28);
  // Sheen is active during the first 28 frames of each interval
  const isSheenActive = enableGlassSheen && sheenCycleFrame < 28;
  const sheenTranslateX = isSheenActive ? (sheenProgress * 250 - 50) : -100;

  // 5. 3D Float / Breathing
  const floatRotX = enable3DFloat
    ? Math.sin(frame * 0.035) * 2.2 * floatIntensity
    : 0;
  const floatRotY = enable3DFloat
    ? Math.cos(frame * 0.03) * 2.8 * floatIntensity
    : 0;
  const floatOffsetY = enable3DFloat
    ? Math.sin(frame * 0.05) * 4.0 * floatIntensity
    : 0;

  // 6. Ken Burns Image Zoom inside frame
  const kenBurnsCurrentScale = enableKenBurns
    ? 1.0 + (kenBurnsScale - 1.0) * smootherStep(frame / 200)
    : 1.0;
  const kenBurnsPanX = enableKenBurns ? Math.sin(frame * 0.015) * 1.5 : 0;
  const kenBurnsPanY = enableKenBurns ? Math.cos(frame * 0.018) * 1.2 : 0;

  // 7. Background Style
  const bgStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (backgroundType === "pitch-black") {
    bgStyle.backgroundColor = "#000000";
  } else if (backgroundType === "noir-vignette") {
    bgStyle.backgroundColor = "#08080d";
    bgStyle.backgroundImage =
      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.85) 100%)";
  } else if (backgroundType === "blurred-image") {
    bgStyle.backgroundColor = "#050508";
  } else {
    bgStyle.backgroundColor = "transparent";
  }

  return (
    <div style={bgStyle}>
      {/* Blurred background image layer if requested */}
      {backgroundType === "blurred-image" && (
        <div
          style={{
            position: "absolute",
            inset: -40,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(35px) brightness(0.22) saturate(1.2)",
            opacity: 0.9,
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* CENTER STAGE: 3D FLOATING PHOTO FRAME */}
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
          perspective: "1200px",
          transform: `translate3d(0, ${enterOffsetY + floatOffsetY}px, 0) scale(${enterScale})`,
          opacity: enterOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform, opacity",
        }}
      >
        {/* Animated Corner Brackets & Crosshairs */}
        <FrameCorners
          frame={frame}
          width={width}
          height={height}
          color={frameColor}
          enableBrackets={enableCornerBrackets}
          enableCrosshairs={showTechCrosshairs}
          opacity={drawProgress}
        />

        {/* 3D Tilted Card Body */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: `${borderRadius}px`,
            position: "relative",
            transform: `rotateX(${floatRotX}deg) rotateY(${floatRotY}deg)`,
            transformStyle: "preserve-3d",
            boxShadow: `
              0 25px 60px rgba(0, 0, 0, 0.92),
              0 0 ${glowIntensity * 35}px ${frameColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, "0")}
            `,
            backgroundColor: "#0d0d14",
          }}
        >
          {/* PHOTO CONTAINER (CLIPPED WITH KEN BURNS) */}
          <div
            style={{
              position: "absolute",
              inset: `${strokeWidth}px`,
              borderRadius: `${Math.max(0, borderRadius - 1)}px`,
              overflow: "hidden",
              backgroundColor: "#08080c",
            }}
          >
            {/* The Image with Ken Burns drift */}
            <img
              src={imageUrl}
              alt="Framed asset"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: `scale(${kenBurnsCurrentScale}) translate3d(${kenBurnsPanX}%, ${kenBurnsPanY}%, 0)`,
                transformOrigin: "center center",
                willChange: "transform",
              }}
            />

            {/* Subtle inner dark vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 35px rgba(0,0,0,0.55)",
                pointerEvents: "none",
              }}
            />

            {/* Moving Glass Sheen Reflection Glint */}
            {isSheenActive && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%)",
                  transform: `translateX(${sheenTranslateX}%)`,
                  mixBlendMode: "screen",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>

          {/* SVG BORDER OVERLAY (White Base Border + Traveling Light Beam) */}
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "visible",
              borderRadius: `${borderRadius}px`,
            }}
          >
            <defs>
              <filter id="beamGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Base crisp white frame stroke */}
            <rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={width - strokeWidth}
              height={height - strokeWidth}
              rx={borderRadius}
              ry={borderRadius}
              fill="none"
              stroke={frameColor}
              strokeWidth={strokeWidth}
              strokeDasharray={perimeter}
              strokeDashoffset={perimeter * (1 - drawProgress)}
              opacity={0.88}
            />

            {/* 2. Traveling Energetic Light Beam along Perimeter */}
            {enableTravelingBeam && drawProgress > 0.8 && (
              <rect
                x={strokeWidth / 2}
                y={strokeWidth / 2}
                width={width - strokeWidth}
                height={height - strokeWidth}
                rx={borderRadius}
                ry={borderRadius}
                fill="none"
                stroke="#ffffff"
                strokeWidth={strokeWidth + 1.8}
                strokeLinecap="round"
                strokeDasharray={`${beamLength} ${perimeter - beamLength}`}
                strokeDashoffset={beamOffset}
                style={{
                  filter: "url(#beamGlow)",
                }}
              />
            )}
          </svg>

          {/* Integrated Corner Badge (if labelPosition === "badge-corner") */}
          {showLabel && labelPosition === "badge-corner" && drawProgress > 0.6 && (
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                border: "1.5px solid #ffffff",
                borderRadius: "4px",
                padding: "4px 10px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.8)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: "800",
                  letterSpacing: "1px",
                }}
              >
                {labelText}
              </span>
              {labelSubtext && (
                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "8px",
                    fontFamily: "monospace",
                  }}
                >
                  {labelSubtext}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 8. EXTERNAL LABELS (TOP OR BOTTOM) */}
        {showLabel && labelPosition !== "badge-corner" && drawProgress > 0.4 && (
          <div
            style={{
              position: "absolute",
              [labelPosition === "top" ? "bottom" : "top"]: `calc(100% + 14px)`,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              border: "1.5px solid #ffffff",
              borderRadius: "8px",
              padding: "6px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.9), 0 0 12px rgba(255,255,255,0.12)",
              pointerEvents: "none",
              zIndex: 25,
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: "12px",
                fontFamily: "monospace",
                fontWeight: "800",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              {labelText}
            </div>
            {labelSubtext && (
              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  marginTop: "2px",
                  opacity: 0.85,
                }}
              >
                {labelSubtext}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
