import React, { useMemo } from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { RetroCassetteIntroProps } from "./schema";
import { CassetteSVG } from "./CassetteSVG";
import { HandwritingText } from "./HandwritingText";

export const RetroCassetteIntro: React.FC<RetroCassetteIntroProps> = ({
  headerText = "HORYZONT ZDARZEŃ PREZENTUJE",
  headerFont = "cinzel",
  headerColor = "#ffffff",
  showHeader = true,
  cassetteTitle = "Najbardziej tajemnicza piosenka w historii internetu",
  handwritingFont = "caveat",
  inkColor = "blue",
  showPen = true,
  cassetteColor = "vintage-black",
  spoolSpeed = 1.0,
  side = "A",
  tapeFormat = "C-90 • NORMAL BIAS",
  scale = 1.0,
  backgroundMode = "cinematic-black",
  durationInFrames = 210,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Progress across the entire duration [0, 1]
  const progress = Math.min(1, frame / durationInFrames);

  // 1. HEADER ENTRANCE ANIMATION (Frames 0 - 45)
  const headerEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 85, mass: 0.9 },
  });

  const headerOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headerLetterSpacing = interpolate(
    frame,
    [0, 60],
    [0.15, 0.35],
    { extrapolateRight: "clamp" }
  );

  const headerFontFamily =
    headerFont === "cinzel"
      ? "'Cinzel', serif"
      : headerFont === "space-mono"
      ? "'Space Mono', monospace"
      : "'Inter', sans-serif";

  // 2. CASSETTE ENTRANCE ANIMATION (Frames 18 - 60)
  const cassetteEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 90, mass: 1.1 },
  });

  const cassetteTranslateY = interpolate(
    cassetteEntrance,
    [0, 1],
    [360, 0]
  );

  const cassetteRotate = interpolate(
    cassetteEntrance,
    [0, 1],
    [-3.0, 0]
  );

  const cassetteScaleVal =
    interpolate(cassetteEntrance, [0, 1], [0.88, 1.0]) * scale;

  // Background style
  const backgroundStyle = useMemo(() => {
    if (backgroundMode === "transparent-alpha") {
      return "transparent";
    }
    if (backgroundMode === "subtle-glow") {
      return "radial-gradient(ellipse at 50% 55%, #141724 0%, #050608 75%)";
    }
    // "cinematic-black"
    return "#050508";
  }, [backgroundMode]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: backgroundMode === "transparent-alpha" ? "transparent" : "#050508",
        background: backgroundStyle,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Optional subtle vintage vignette for cinematic depth */}
      {backgroundMode !== "transparent-alpha" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.8) 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* ================= 1. GÓRNY NAPIS INTRO ================= */}
      {showHeader && (
        <div
          style={{
            position: "absolute",
            top: "14%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: headerOpacity,
            transform: `translateY(${interpolate(
              headerEntrance,
              [0, 1],
              [-20, 0]
            )}px)`,
            zIndex: 10,
          }}
        >
          {/* Header Subtitle Badge */}
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "4px",
              color: "#f59e0b",
              textTransform: "uppercase",
              marginBottom: "8px",
              opacity: 0.9,
            }}
          >
            • DOKUMENT ARCHIWALNY •
          </div>

          {/* Main White Title */}
          <h1
            style={{
              fontFamily: headerFontFamily,
              fontSize: "34px",
              fontWeight: 800,
              color: headerColor,
              textTransform: "uppercase",
              letterSpacing: `${headerLetterSpacing}em`,
              textAlign: "center",
              margin: 0,
              padding: "0 20px",
              textShadow:
                "0 0 25px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(0,0,0,0.8)",
            }}
          >
            {headerText}
          </h1>

          {/* Thin Gold/White Accent Line */}
          <div
            style={{
              width: `${interpolate(headerEntrance, [0, 1], [0, 240])}px`,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%)",
              marginTop: "12px",
              opacity: 0.85,
            }}
          />
        </div>
      )}

      {/* ================= 2. ANIMOWANA KASETA MAGNETOFONOWA ================= */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "50%",
          width: "740px",
          height: "472px",
          transform: `translate(-50%, -50%) translateY(${cassetteTranslateY}px) rotate(${cassetteRotate}deg) scale(${cassetteScaleVal})`,
          transformOrigin: "center center",
          zIndex: 20,
        }}
      >
        {/* Scalable SVG Cassette Body */}
        <CassetteSVG
          props={{
            headerText,
            headerFont,
            headerColor,
            showHeader,
            cassetteTitle,
            handwritingFont,
            inkColor,
            showPen,
            penType: "ballpoint-blue",
            cassetteColor,
            spoolSpeed,
            side,
            tapeFormat,
            scale,
            backgroundMode,
            durationInFrames,
          }}
          frame={frame}
          progress={progress}
        />

        {/* ================= 3. ODRECZNY PODPIS DŁUGOPISEM ================= */}
        <HandwritingText
          props={{
            headerText,
            headerFont,
            headerColor,
            showHeader,
            cassetteTitle,
            handwritingFont,
            inkColor,
            showPen,
            penType: "ballpoint-blue",
            cassetteColor,
            spoolSpeed,
            side,
            tapeFormat,
            scale,
            backgroundMode,
            durationInFrames,
          }}
          frame={frame}
          startFrame={50}
          durationFrames={100}
        />
      </div>
    </div>
  );
};
