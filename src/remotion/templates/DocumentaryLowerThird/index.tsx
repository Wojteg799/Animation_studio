import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { DocumentaryLowerThirdProps } from "./schema";
import { getThemeById } from "../../../lib/themes";

export const DocumentaryLowerThird: React.FC<DocumentaryLowerThirdProps> = ({
  title,
  subtitle,
  badgeText,
  dateLocation,
  themeId,
  customPrimary,
  customSecondary,
  customCardBg,
  customTextPrimary,
  customTextSecondary,
  photoUrl,
  photoShape,
  styleVariant = "dossier",
  springDamping = 14,
  springStiffness = 120,
  springMass = 0.8,
  scale = 1.0,
  offsetX = 90,
  offsetY = 780,
  entranceFrames = 24,
  exitFrames = 22,
  showScanline = true,
  showCrosshair = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Resolve active theme colors
  const baseTheme = getThemeById(themeId);
  const primaryColor = customPrimary || baseTheme.primary;
  const secondaryColor = customSecondary || baseTheme.secondary;
  const cardBg = customCardBg || baseTheme.cardBg;
  const textPrimary = customTextPrimary || baseTheme.textPrimary;
  const textSecondary = customTextSecondary || baseTheme.textSecondary;
  const accentGlow = baseTheme.accentGlow;

  // Entrance spring animation
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: springDamping,
      stiffness: springStiffness,
      mass: springMass,
    },
  });

  // Staggered springs for sub-elements
  const badgeSpring = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: {
      damping: springDamping + 2,
      stiffness: springStiffness + 10,
      mass: springMass,
    },
  });

  const textSpring = spring({
    frame: Math.max(0, frame - 7),
    fps,
    config: {
      damping: springDamping,
      stiffness: springStiffness,
      mass: springMass,
    },
  });

  const metaSpring = spring({
    frame: Math.max(0, frame - 11),
    fps,
    config: {
      damping: springDamping + 4,
      stiffness: springStiffness,
      mass: springMass,
    },
  });

  // Exit animation calculation
  const exitStartFrame = durationInFrames - exitFrames;
  const exitProgress = spring({
    frame: Math.max(0, frame - exitStartFrame),
    fps,
    config: {
      damping: 18,
      stiffness: 140,
      mass: 0.8,
    },
  });

  // Combined transforms
  const isExiting = frame >= exitStartFrame;
  const exitSlide = interpolate(exitProgress, [0, 1], [0, -40]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  const slideX = interpolate(entranceProgress, [0, 1], [-70, 0]) + (isExiting ? exitSlide : 0);
  const mainOpacity = interpolate(entranceProgress, [0, 0.4, 1], [0, 0.7, 1]) * (isExiting ? exitOpacity : 1);
  const cardScale = interpolate(entranceProgress, [0, 1], [0.94, 1]) * scale;

  // Line drawing animation
  const lineScaleY = interpolate(entranceProgress, [0, 0.8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineWidthX = interpolate(entranceProgress, [0.3, 1], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient scanning line effect
  const scanlineOffset = interpolate(frame % 90, [0, 90], [0, 100]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "transparent", // Critical: transparent background for ProRes alpha channel
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Animated Lower Third Container */}
      <div
        style={{
          position: "absolute",
          left: `${offsetX}px`,
          top: `${offsetY}px`,
          transform: `translate3d(${slideX}px, 0, 0) scale(${cardScale})`,
          transformOrigin: "bottom left",
          opacity: mainOpacity,
          display: "flex",
          alignItems: "stretch",
          gap: "18px",
          maxWidth: "1400px",
          pointerEvents: "none",
        }}
      >
        {/* Left Vertical Accent Pillar */}
        <div
          style={{
            position: "relative",
            width: "5px",
            borderRadius: "4px",
            background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            transform: `scaleY(${lineScaleY})`,
            transformOrigin: "top",
            boxShadow: `0 0 20px ${accentGlow}`,
            flexShrink: 0,
          }}
        >
          {showCrosshair && (
            <div
              style={{
                position: "absolute",
                top: "-14px",
                left: "-5px",
                width: "15px",
                height: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: primaryColor,
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "monospace",
                opacity: entranceProgress,
              }}
            >
              +
            </div>
          )}
        </div>

        {/* Optional Avatar / Archival Image Cutout */}
        {photoUrl && photoShape !== "none" && (
          <div
            style={{
              position: "relative",
              width: "92px",
              height: "92px",
              flexShrink: 0,
              alignSelf: "center",
              borderRadius:
                photoShape === "circle"
                  ? "50%"
                  : photoShape === "stamp"
                  ? "4px"
                  : "10px",
              overflow: "hidden",
              border: `2px solid ${primaryColor}`,
              boxShadow: `0 12px 30px rgba(0,0,0,0.5), 0 0 15px ${accentGlow}`,
              backgroundColor: "rgba(0,0,0,0.4)",
              transform: `scale(${interpolate(badgeSpring, [0, 1], [0.7, 1])})`,
              opacity: badgeSpring,
            }}
          >
            <Img
              src={photoUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: styleVariant === "dossier" ? "sepia(0.2) contrast(1.1)" : "none",
              }}
            />
            {/* Paper stamp edge simulation */}
            {photoShape === "stamp" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px dashed rgba(255,255,255,0.4)",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        )}

        {/* Main Content Card */}
        <div
          style={{
            position: "relative",
            backgroundColor: cardBg,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: styleVariant === "dossier" ? "3px" : "12px",
            border: `1px solid rgba(255, 255, 255, 0.12)`,
            borderLeft: "none",
            boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px ${accentGlow}`,
            padding: "16px 26px 18px 22px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Subtle Ambient Scanline effect */}
          {showScanline && (
            <div
              style={{
                position: "absolute",
                top: `${scanlineOffset}%`,
                left: 0,
                right: 0,
                height: "1px",
                background: `linear-gradient(90deg, transparent, ${primaryColor}66, transparent)`,
                pointerEvents: "none",
                opacity: 0.6,
              }}
            />
          )}

          {/* Top Badge & Archival Record Bar */}
          {badgeText && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
                transform: `translate3d(0, ${interpolate(badgeSpring, [0, 1], [-10, 0])}px, 0)`,
                opacity: badgeSpring,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 9px",
                  borderRadius: "4px",
                  backgroundColor: `${primaryColor}22`,
                  border: `1px solid ${primaryColor}66`,
                  color: primaryColor,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: primaryColor,
                    boxShadow: `0 0 8px ${primaryColor}`,
                  }}
                />
                {badgeText}
              </div>

              {/* Technical dossier corner mark */}
              {showCrosshair && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "monospace",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                  }}
                >
                  [REC // SEC.8]
                </span>
              )}
            </div>
          )}

          {/* Main Title / Name */}
          <div
            style={{
              transform: `translate3d(0, ${interpolate(textSpring, [0, 1], [15, 0])}px, 0)`,
              opacity: textSpring,
            }}
          >
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontSize: styleVariant === "modern-minimal" ? "36px" : "32px",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                color: textPrimary,
                lineHeight: 1.15,
                textTransform: "uppercase",
                textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              }}
            >
              {title}
            </h1>
          </div>

          {/* Subtitle / Role */}
          {subtitle && (
            <div
              style={{
                marginTop: "4px",
                transform: `translate3d(0, ${interpolate(textSpring, [0, 1], [12, 0])}px, 0)`,
                opacity: textSpring,
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "18px",
                  fontWeight: 500,
                  color: textSecondary,
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                }}
              >
                {subtitle}
              </p>
            </div>
          )}

          {/* Bottom Timestamp / Geolocation bar */}
          {dateLocation && (
            <div
              style={{
                marginTop: "10px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transform: `translate3d(0, ${interpolate(metaSpring, [0, 1], [8, 0])}px, 0)`,
                opacity: metaSpring,
              }}
            >
              {/* Animated bottom mini line */}
              <div
                style={{
                  height: "2px",
                  width: `${lineWidthX}%`,
                  maxWidth: "40px",
                  backgroundColor: primaryColor,
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: primaryColor,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
                }}
              >
                {dateLocation}
              </span>
            </div>
          )}

          {/* Technical Corner Bracket in dossier style */}
          {showCrosshair && (
            <div
              style={{
                position: "absolute",
                bottom: "6px",
                right: "8px",
                fontFamily: "monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                pointerEvents: "none",
              }}
            >
              ◤ ALPHA-PRORES-4444
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
