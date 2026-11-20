import React from "react";
import { spring, useVideoConfig } from "remotion";
import { GabrielPaulFacebookProps } from "./schema";

interface MysteryResponseBadgeProps {
  props: GabrielPaulFacebookProps;
  frame: number;
}

export const MysteryResponseBadge: React.FC<MysteryResponseBadgeProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showQuestionMark = true,
    questionMarkText = "?",
    questionMarkColor = "#facc15",
    questionMarkScale = 1.3,
    showQuestionText = false,
    showQuestionPulse = false,
    paulX = 74,
    paulY = 50,
    lineColor = "#ffffff",
    idleBobbing = true,
    questionMarkFrame = 116,
  } = props;

  if (!showQuestionMark || frame < questionMarkFrame) {
    return null;
  }

  // Sprężyste wejście znaku zapytania
  const popSpring = spring({
    frame: frame - questionMarkFrame,
    fps,
    config: { damping: 11, stiffness: 120, mass: 0.7 },
  });
  const clampedPop = Math.max(0, Math.min(1.2, popSpring));

  // Płynne lewitowanie
  const floatY = idleBobbing ? Math.sin((frame + 30) * 0.1) * 4 : 0;

  // Impuls fali pytajnika (opcjonalny)
  const pulseProgress = ((frame - questionMarkFrame) % 45) / 45;
  const pulseScale = 1 + pulseProgress * 0.45;
  const pulseOpacity = Math.max(0, (1 - pulseProgress) * 0.6);

  return (
    <div
      style={{
        position: "absolute",
        left: `${paulX + 9}%`,
        top: `${paulY - 22}%`,
        transform: `translate(-50%, -50%) translateY(${floatY}px) scale(${
          clampedPop * questionMarkScale
        })`,
        zIndex: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8))",
      }}
    >
      {/* Opcjonalny pierścień fali (wyłączony domyślnie dla maksymalnego minimalizmu) */}
      {showQuestionPulse && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 58,
            height: 58,
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            opacity: pulseOpacity,
            border: `2px solid ${questionMarkColor}`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Czysty minimalistyczny kafel / bańka ze znakiem zapytania */}
      <div
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          backgroundColor: "#000000",
          border: `2.5px solid ${questionMarkColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 20px ${questionMarkColor}33`,
        }}
      >
        <span
          style={{
            fontSize: questionMarkText.length > 1 ? 22 : 32,
            fontWeight: 900,
            color: questionMarkColor,
            fontFamily: "monospace",
            lineHeight: 1,
            textShadow: `0 0 10px ${questionMarkColor}66`,
          }}
        >
          {questionMarkText}
        </span>
      </div>

      {/* Opcjonalny podpis pod pytajnikiem (wyłączony domyślnie) */}
      {showQuestionText && (
        <div
          style={{
            marginTop: 6,
            backgroundColor: "#000000",
            border: `1.5px solid ${lineColor}`,
            borderRadius: 4,
            padding: "2px 8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 1.2,
              color: lineColor,
              fontFamily: "monospace",
              whiteSpace: "nowrap",
            }}
          >
            NIE ROZPOZNAJE
          </span>
        </div>
      )}
    </div>
  );
};
