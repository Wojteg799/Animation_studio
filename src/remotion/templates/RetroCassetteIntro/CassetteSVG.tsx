import React from "react";
import { RetroCassetteIntroProps } from "./schema";

interface CassetteSVGProps {
  props: RetroCassetteIntroProps;
  frame: number;
  progress: number; // 0 to 1 over the duration
}

export const CassetteSVG: React.FC<CassetteSVGProps> = ({
  props,
  frame,
  progress,
}) => {
  const {
    cassetteColor = "vintage-black",
    spoolSpeed = 1.0,
    side = "A",
    tapeFormat = "C-90 • NORMAL BIAS",
  } = props;

  // Rotation angles for left and right cassette spools (60fps / 30fps smooth rotation)
  // Both spools spin counter-clockwise or clockwise in cassette playback direction (counter-clockwise)
  const spoolRotation = (frame * spoolSpeed * 3.2) % 360;

  // Realistic tape thickness change: left reel slowly unrolls, right reel slowly takes up tape
  const leftTapeRadius = Math.max(52, 86 - progress * 14);
  const rightTapeRadius = Math.min(84, 54 + progress * 14);

  // Shell themes
  const shellFill =
    cassetteColor === "retro-cream"
      ? "url(#creamShellGrad)"
      : cassetteColor === "dark-charcoal"
      ? "url(#charcoalShellGrad)"
      : "url(#blackShellGrad)";

  const shellBorder =
    cassetteColor === "retro-cream"
      ? "#a89f8d"
      : cassetteColor === "dark-charcoal"
      ? "#383a42"
      : "#2c2e35";

  return (
    <svg
      viewBox="0 0 800 510"
      className="w-full h-full select-none"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Drop shadow for entire cassette */}
        <filter id="cassetteShadow" x="-15%" y="-15%" width="130%" height="135%">
          <feDropShadow
            dx="0"
            dy="28"
            stdDeviation="36"
            floodColor="#000000"
            floodOpacity="0.85"
          />
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="14"
            floodColor="#000000"
            floodOpacity="0.6"
          />
        </filter>

        {/* 1. Vintage Black Shell Gradient */}
        <linearGradient id="blackShellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#25272e" />
          <stop offset="3%" stopColor="#1a1b20" />
          <stop offset="50%" stopColor="#131417" />
          <stop offset="97%" stopColor="#0f1012" />
          <stop offset="100%" stopColor="#1c1d22" />
        </linearGradient>

        {/* 2. Retro Cream Shell Gradient */}
        <linearGradient id="creamShellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e5ddcb" />
          <stop offset="4%" stopColor="#d6ccb7" />
          <stop offset="95%" stopColor="#c5baa5" />
          <stop offset="100%" stopColor="#b3a792" />
        </linearGradient>

        {/* 3. Charcoal Shell Gradient */}
        <linearGradient id="charcoalShellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#32343b" />
          <stop offset="50%" stopColor="#22242a" />
          <stop offset="100%" stopColor="#191a1e" />
        </linearGradient>

        {/* Screw Metallic Gradient */}
        <radialGradient id="screwMetal" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#c0c2c8" />
          <stop offset="80%" stopColor="#50535c" />
          <stop offset="100%" stopColor="#282a30" />
        </radialGradient>

        {/* Magnetic Tape Texture Gradient */}
        <radialGradient id="tapeRollGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1f110b" />
          <stop offset="45%" stopColor="#2c1a11" />
          <stop offset="75%" stopColor="#3a2217" />
          <stop offset="90%" stopColor="#28170f" />
          <stop offset="100%" stopColor="#170c07" />
        </radialGradient>

        {/* Smoked Window Glass Reflection */}
        <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.01)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>

        {/* Paper Label Texture Filter / Tone */}
        <linearGradient id="labelPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#faf7f0" />
          <stop offset="50%" stopColor="#f3eee3" />
          <stop offset="100%" stopColor="#ebe4d5" />
        </linearGradient>
      </defs>

      {/* ================= 1. MAIN CASSETTE CHASSIS ================= */}
      <g filter="url(#cassetteShadow)">
        {/* Outer Body (Rounded Rect 800 x 510) */}
        <rect
          x="0"
          y="0"
          width="800"
          height="510"
          rx="26"
          ry="26"
          fill={shellFill}
          stroke={shellBorder}
          strokeWidth="3.5"
        />

        {/* Embossed Outer Rim Line */}
        <rect
          x="12"
          y="12"
          width="776"
          height="486"
          rx="18"
          ry="18"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1.5"
        />

        {/* Top Edge Grip Ridges (classic ribbed tape texture) */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="2">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={`ridge-${i}`}
              x1={180 + i * 18}
              y1="4"
              x2={180 + i * 18}
              y2="10"
            />
          ))}
        </g>

        {/* Bottom Recessed Tape Head Section (Trapezoid Cutout) */}
        <path
          d="M 130 510 L 160 385 L 640 385 L 670 510 Z"
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="3"
        />
        <path
          d="M 132 510 L 161 387 L 639 387 L 668 510 Z"
          fill="rgba(0,0,0,0.25)"
        />

        {/* Tape Head Openings & Capstan Guide Holes */}
        <circle cx="215" cy="450" r="14" fill="#0d0e11" stroke="#25272e" strokeWidth="2" />
        <circle cx="585" cy="450" r="14" fill="#0d0e11" stroke="#25272e" strokeWidth="2" />
        
        {/* Center Magnetic Head Window */}
        <rect
          x="355"
          y="420"
          width="90"
          height="75"
          rx="6"
          fill="#0a0a0d"
          stroke="#2a2c33"
          strokeWidth="2"
        />
        {/* Felt Pressure Pad in head window */}
        <rect x="382" y="440" width="36" height="12" rx="2" fill="#c29a6a" opacity="0.8" />
        <rect x="385" y="443" width="30" height="6" rx="1" fill="#dfb888" opacity="0.9" />

        {/* 5 Corner / Central Screws */}
        {[
          { cx: 38, cy: 38 },
          { cx: 762, cy: 38 },
          { cx: 55, cy: 472 },
          { cx: 745, cy: 472 },
          { cx: 400, cy: 494 },
        ].map((s, idx) => (
          <g key={`screw-${idx}`}>
            <circle cx={s.cx} cy={s.cy} r="8.5" fill="url(#screwMetal)" stroke="#111" strokeWidth="1" />
            <circle cx={s.cx} cy={s.cy} r="6.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            {/* Phillips Cross groove */}
            <line
              x1={s.cx - 4.5}
              y1={s.cy}
              x2={s.cx + 4.5}
              y2={s.cy}
              stroke="#1a1c22"
              strokeWidth="1.6"
            />
            <line
              x1={s.cx}
              y1={s.cy - 4.5}
              x2={s.cx}
              y2={s.cy + 4.5}
              stroke="#1a1c22"
              strokeWidth="1.6"
            />
          </g>
        ))}

        {/* ================= 2. RETRO PAPER LABEL ================= */}
        <g>
          {/* Label Base (Recessed in the plastic frame) */}
          <rect
            x="60"
            y="52"
            width="680"
            height="316"
            rx="14"
            fill="url(#labelPaperGrad)"
            stroke="#1b1c20"
            strokeWidth="2"
          />

          {/* Label Border Inset Shadow */}
          <rect
            x="64"
            y="56"
            width="672"
            height="308"
            rx="11"
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="2"
          />

          {/* Top Retro Stripes Accent (80s Maxell/TDK Heritage Style) */}
          <rect x="68" y="60" width="664" height="6" fill="#b91c1c" />
          <rect x="68" y="66" width="664" height="4" fill="#d97706" />
          <rect x="68" y="70" width="664" height="3" fill="#f59e0b" />

          {/* Top Left SIDE A badge */}
          <g transform="translate(85, 96)">
            <rect
              x="-6"
              y="-16"
              width="50"
              height="38"
              rx="4"
              fill="#18181b"
            />
            <text
              x="19"
              y="11"
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              fontSize="24"
              fill="#ffffff"
              textAnchor="middle"
            >
              {side}
            </text>
            <text
              x="19"
              y="-4"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              fontSize="8"
              fill="#f59e0b"
              textAnchor="middle"
              letterSpacing="1"
            >
              SIDE
            </text>
          </g>

          {/* Left Metadata */}
          <g transform="translate(145, 92)">
            <text
              x="0"
              y="0"
              fontFamily="'Space Mono', monospace, sans-serif"
              fontSize="9"
              fontWeight="700"
              fill="#27272a"
              letterSpacing="1.5"
            >
              STEREO • DOLBY B-NR
            </text>
            <text
              x="0"
              y="14"
              fontFamily="'Space Mono', monospace, sans-serif"
              fontSize="8"
              fontWeight="600"
              fill="#52525b"
            >
              {tapeFormat}
            </text>
          </g>

          {/* Top Right Tape Length Badge */}
          <g transform="translate(670, 96)">
            <rect
              x="-36"
              y="-16"
              width="46"
              height="38"
              rx="4"
              fill="#18181b"
            />
            <text
              x="-13"
              y="8"
              fontFamily="system-ui, sans-serif"
              fontWeight="900"
              fontSize="18"
              fill="#ffffff"
              textAnchor="middle"
            >
              C-90
            </text>
            <text
              x="-13"
              y="-4"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              fontSize="8"
              fill="#ef4444"
              textAnchor="middle"
            >
              TYPE I
            </text>
          </g>

          {/* ================= HANDWRITING INDEX STRIP AREA ================= */}
          {/* Main White Handwritten Label Strip */}
          <g transform="translate(140, 114)">
            <rect
              x="0"
              y="0"
              width="485"
              height="48"
              rx="6"
              fill="#ffffff"
              stroke="#d4cfc5"
              strokeWidth="1.5"
            />
            {/* Index Guide Lines */}
            <line
              x1="12"
              y1="34"
              x2="473"
              y2="34"
              stroke="#e4dfd5"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="8"
              y="12"
              fontFamily="'Space Mono', monospace, sans-serif"
              fontSize="7"
              fontWeight="700"
              fill="#a1a1aa"
              letterSpacing="1"
            >
              INDEX / TITLE:
            </text>
          </g>

          {/* Bottom Label Brand Signature */}
          <text
            x="400"
            y="354"
            fontFamily="'Space Mono', monospace, sans-serif"
            fontSize="8"
            fontWeight="700"
            fill="#71717a"
            textAnchor="middle"
            letterSpacing="3"
          >
            PRECISION AUDIO MECHANISM • HIGH OUTPUT / WIDE DYNAMIC RANGE
          </text>
        </g>

        {/* ================= 3. CASSETTE WINDOW (TRANSPARENT SMOKED ACRYLIC) ================= */}
        <g>
          {/* Cutout Frame in Label */}
          <rect
            x="175"
            y="172"
            width="450"
            height="164"
            rx="12"
            fill="#090a0d"
            stroke="#1b1c22"
            strokeWidth="3.5"
          />

          {/* Inner Recessed Depth Bevel */}
          <rect
            x="180"
            y="177"
            width="440"
            height="154"
            rx="9"
            fill="#121318"
          />

          {/* Tape Running across bottom inside window */}
          <line
            x1="220"
            y1="316"
            x2="580"
            y2="316"
            stroke="#2c1a11"
            strokeWidth="12"
          />
          <line
            x1="220"
            y1="316"
            x2="580"
            y2="316"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* Left Magnetic Tape Reel (Roll of dark brown tape) */}
          <circle
            cx="285"
            cy="248"
            r={leftTapeRadius}
            fill="url(#tapeRollGrad)"
            stroke="#160c07"
            strokeWidth="2"
          />

          {/* Right Magnetic Tape Reel (Roll of dark brown tape) */}
          <circle
            cx="515"
            cy="248"
            r={rightTapeRadius}
            fill="url(#tapeRollGrad)"
            stroke="#160c07"
            strokeWidth="2"
          />

          {/* ================= 4. ROTATING SPOOLS (ZĘBATKI) ================= */}
          {/* LEFT SPOOL (Animated counter-clockwise) */}
          <g transform={`translate(285, 248) rotate(${-spoolRotation})`}>
            {/* White/Off-white Plastic Hub Outer Rim */}
            <circle cx="0" cy="0" r="44" fill="#ede8df" stroke="#cbc4b5" strokeWidth="2" />
            <circle cx="0" cy="0" r="38" fill="none" stroke="#d5cebf" strokeWidth="1" />
            
            {/* 3 Technological Holes in Hub */}
            <circle cx="0" cy="-26" r="4.5" fill="#14151a" />
            <circle cx="22.5" cy="13" r="4.5" fill="#14151a" />
            <circle cx="-22.5" cy="13" r="4.5" fill="#14151a" />

            {/* Central Spindle Hole */}
            <circle cx="0" cy="0" r="18" fill="#0c0d11" stroke="#2a2c35" strokeWidth="1.5" />

            {/* 6 Teeth / Cogs (Ząbki napędowe) */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={`l-tooth-${deg}`} transform={`rotate(${deg})`}>
                <path
                  d="M -3.5 -17.5 L -2 -9 L 2 -9 L 3.5 -17.5 Z"
                  fill="#ffffff"
                  stroke="#cbc4b5"
                  strokeWidth="0.8"
                />
              </g>
            ))}
          </g>

          {/* RIGHT SPOOL (Animated counter-clockwise) */}
          <g transform={`translate(515, 248) rotate(${-spoolRotation})`}>
            {/* White Plastic Hub Outer Rim */}
            <circle cx="0" cy="0" r="44" fill="#ede8df" stroke="#cbc4b5" strokeWidth="2" />
            <circle cx="0" cy="0" r="38" fill="none" stroke="#d5cebf" strokeWidth="1" />

            {/* 3 Holes */}
            <circle cx="0" cy="-26" r="4.5" fill="#14151a" />
            <circle cx="22.5" cy="13" r="4.5" fill="#14151a" />
            <circle cx="-22.5" cy="13" r="4.5" fill="#14151a" />

            {/* Central Spindle Hole */}
            <circle cx="0" cy="0" r="18" fill="#0c0d11" stroke="#2a2c35" strokeWidth="1.5" />

            {/* 6 Teeth / Cogs */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={`r-tooth-${deg}`} transform={`rotate(${deg})`}>
                <path
                  d="M -3.5 -17.5 L -2 -9 L 2 -9 L 3.5 -17.5 Z"
                  fill="#ffffff"
                  stroke="#cbc4b5"
                  strokeWidth="0.8"
                />
              </g>
            ))}
          </g>

          {/* Acrylic Window Glass Overlay with Gloss Reflection */}
          <rect
            x="180"
            y="177"
            width="440"
            height="154"
            rx="9"
            fill="url(#windowGlass)"
            pointerEvents="none"
          />

          {/* Window Center Tape Scale Ruler (100 - 50 - 0) */}
          <g transform="translate(365, 252)" opacity="0.85">
            <line x1="0" y1="-30" x2="70" y2="-30" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="0" y1="30" x2="70" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            
            {/* Scale Ticks */}
            {[0, 17.5, 35, 52.5, 70].map((x, i) => (
              <line
                key={`tick-${i}`}
                x1={x}
                y1="-30"
                x2={x}
                y2="-22"
                stroke="#ffffff"
                strokeWidth={i % 2 === 0 ? "1.5" : "1"}
              />
            ))}
            <text
              x="0"
              y="-12"
              fontFamily="'Space Mono', monospace, sans-serif"
              fontSize="8"
              fontWeight="700"
              fill="#ffffff"
            >
              100
            </text>
            <text
              x="35"
              y="-12"
              fontFamily="'Space Mono', monospace, sans-serif"
              fontSize="8"
              fontWeight="700"
              fill="#ffffff"
              textAnchor="middle"
            >
              50
            </text>
            <text
              x="70"
              y="-12"
              fontFamily="'Space Mono', monospace, sans-serif"
              fontSize="8"
              fontWeight="700"
              fill="#ffffff"
              textAnchor="end"
            >
              0
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};
