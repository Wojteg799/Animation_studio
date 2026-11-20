import React from "react";
import { spring, useVideoConfig } from "remotion";
import { AntonRiedelProps } from "./schema";

interface DisguiseGlassesProps {
  props: AntonRiedelProps;
  frame: number;
}

export const DisguiseGlasses: React.FC<DisguiseGlassesProps> = ({ props, frame }) => {
  const { fps } = useVideoConfig();
  const {
    showGlasses = true,
    showNose = true,
    showMustache = true,
    showImpactLines = true,
    disguiseStyle = "wireframe-black",
    disguiseScale = 1.0,
    disguiseOffsetX = 0,
    disguiseOffsetY = 0,
    disguiseDropFrame = 18,
    lineColor = "#ffffff",
    lineWidth = 2.5,
  } = props;

  // Sprawdzamy czy okulary mają opadać z góry, czy być na stałe (gdy disguiseDropFrame <= 0)
  const isInstant = disguiseDropFrame <= 0;
  
  const dropSpring = isInstant
    ? 1
    : spring({
        frame: frame - disguiseDropFrame,
        fps,
        config: { damping: 10, stiffness: 130, mass: 0.65 },
      });

  const clampedDrop = isInstant ? 1 : Math.max(0, dropSpring);

  // Jeśli jeszcze nie nadeszła klatka opadania (i nie jest to tryb natychmiastowy)
  if (!isInstant && frame < disguiseDropFrame) {
    return null;
  }

  // Animacja opadania z góry: z Y = -140px do Y = 0px
  const dropY = isInstant ? 0 : (1 - clampedDrop) * -140;
  // Lekki obrót podczas lotu w dół, stabilizujący się na 0deg
  const dropRot = isInstant ? 0 : (1 - Math.min(1, clampedDrop)) * -18;

  // Efekt uderzenia (komiksowe iskierki po dotarciu na nos)
  const impactAge = frame - disguiseDropFrame;
  const isImpactActive = !isInstant && showImpactLines && impactAge >= 0 && impactAge < 14;
  const impactProgress = Math.min(1, impactAge / 12);
  const impactOpacity = 1 - impactProgress;

  // Dobór kolorów zależnie od stylu
  const frameFill = "#000000";
  const frameStroke = lineColor;
  const noseFill =
    disguiseStyle === "comedy-color"
      ? "#fda4af" // zabawny cielisty/różowawy nochal
      : disguiseStyle === "pure-white"
      ? "transparent"
      : "#000000";
  const mustacheFill = disguiseStyle === "pure-white" ? "transparent" : "#000000";

  return (
    <g
      transform={`translate(${disguiseOffsetX}, ${disguiseOffsetY + dropY}) rotate(${dropRot} 100 55) scale(${disguiseScale})`}
      style={{ transformOrigin: "100px 55px" }}
    >
      {/* ================= KOMIKSOWE KRESECZKI UDERZENIA (IMPACT LINES) ================= */}
      {isImpactActive && (
        <g opacity={impactOpacity}>
          {/* Lewa strona - rozbryzg */}
          <line
            x1={62 - impactProgress * 12}
            y1={46 - impactProgress * 8}
            x2={52 - impactProgress * 16}
            y2={42 - impactProgress * 12}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={60 - impactProgress * 14}
            y1={56}
            x2={48 - impactProgress * 18}
            y2={56}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={62 - impactProgress * 12}
            y1={66 + impactProgress * 8}
            x2={52 - impactProgress * 16}
            y2={70 + impactProgress * 12}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Prawa strona - rozbryzg */}
          <line
            x1={138 + impactProgress * 12}
            y1={46 - impactProgress * 8}
            x2={148 + impactProgress * 16}
            y2={42 - impactProgress * 12}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={140 + impactProgress * 14}
            y1={56}
            x2={152 + impactProgress * 18}
            y2={56}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <line
            x1={138 + impactProgress * 12}
            y1={66 + impactProgress * 8}
            x2={148 + impactProgress * 16}
            y2={70 + impactProgress * 12}
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* ================= 1. OPRAWKI OKULARÓW ================= */}
      {showGlasses && (
        <g>
          {/* Zaokrąglone oprawki (Lewa i Prawa) */}
          <ellipse
            cx="82"
            cy="50"
            rx="14.5"
            ry="14"
            fill={frameFill}
            stroke={frameStroke}
            strokeWidth={lineWidth + 0.5}
          />
          <ellipse
            cx="118"
            cy="50"
            rx="14.5"
            ry="14"
            fill={frameFill}
            stroke={frameStroke}
            strokeWidth={lineWidth + 0.5}
          />

          {/* Odblaski na szkłach (białe łuki refleksu) */}
          <path
            d="M 74 44 A 9 9 0 0 1 84 41"
            fill="none"
            stroke={lineColor}
            strokeWidth={1.8}
            strokeLinecap="round"
            opacity={0.7}
          />
          <path
            d="M 110 44 A 9 9 0 0 1 120 41"
            fill="none"
            stroke={lineColor}
            strokeWidth={1.8}
            strokeLinecap="round"
            opacity={0.7}
          />

          {/* Mostek okularów łączący oprawki */}
          <path
            d="M 96.5 48 Q 100 45 103.5 48"
            fill="none"
            stroke={frameStroke}
            strokeWidth={lineWidth + 1}
            strokeLinecap="round"
          />

          {/* Zauszniki biegnące do krawędzi */}
          <line
            x1="67.5"
            y1="50"
            x2="59"
            y2="49"
            stroke={frameStroke}
            strokeWidth={lineWidth}
            strokeLinecap="round"
          />
          <line
            x1="132.5"
            y1="50"
            x2="141"
            y2="49"
            stroke={frameStroke}
            strokeWidth={lineWidth}
            strokeLinecap="round"
          />
        </g>
      )}

      {/* ================= 2. GŁADKI NOS KAMUFLAŻU (CZYSTY MINIMALISTYCZNY OUTLINE) ================= */}
      {showNose && (
        <g>
          {/* Czysty, wyrazisty pękaty nochal komediowy bez zbędnych linii wewnętrznych */}
          <path
            d="M 94 48 C 91 58 84 64 88 72 C 92 78 108 78 112 72 C 116 64 109 58 106 48 Z"
            fill={noseFill}
            stroke={frameStroke}
            strokeWidth={lineWidth}
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* ================= 3. CZYSTY MINIMALISTYCZNY WĄS (JEDNOLITY KSZTAŁT BEZ DETALI) ================= */}
      {showMustache && (
        <g>
          {/* Klasyczny gęsty wąs o rozłożystych skrzydłach - gładki, bez kresek w środku */}
          <path
            d="M 100 73 C 92 68 76 71 65 77 C 60 82 68 88 80 84 C 91 80 97 76 100 75 C 103 76 109 80 120 84 C 132 88 140 82 135 77 C 124 71 108 68 100 73 Z"
            fill={mustacheFill}
            stroke={frameStroke}
            strokeWidth={lineWidth}
            strokeLinejoin="round"
          />
        </g>
      )}
    </g>
  );
};
