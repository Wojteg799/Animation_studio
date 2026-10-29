import React, { useMemo } from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { RetroCassetteIntroProps } from "./schema";

interface HandwritingTextProps {
  props: RetroCassetteIntroProps;
  frame: number;
  startFrame?: number; // frame when handwriting starts (e.g. frame 50)
  durationFrames?: number; // duration of writing (e.g. 105 frames)
}

export const HandwritingText: React.FC<HandwritingTextProps> = ({
  props,
  frame,
  startFrame = 52,
  durationFrames = 105,
}) => {
  const { fps } = useVideoConfig();
  const {
    cassetteTitle = "Najbardziej tajemnicza piosenka w historii internetu",
    handwritingFont = "caveat",
    inkColor = "blue",
    showPen = true,
  } = props;

  // Split title into 2 lines if long for authentic cassette label fit
  const lines = useMemo(() => {
    const trimmed = cassetteTitle.trim();
    if (trimmed.length <= 26) {
      return [trimmed];
    }
    // Find optimal midpoint break at space
    const mid = Math.floor(trimmed.length / 2);
    let breakIdx = trimmed.indexOf(" ", mid - 6);
    if (breakIdx === -1 || breakIdx > mid + 12) {
      breakIdx = trimmed.lastIndexOf(" ", mid);
    }
    if (breakIdx === -1) {
      return [trimmed];
    }
    return [trimmed.slice(0, breakIdx), trimmed.slice(breakIdx + 1)];
  }, [cassetteTitle]);

  const totalChars = useMemo(() => {
    return lines.reduce((acc, l) => acc + l.length, 0);
  }, [lines]);

  // Overall writing progress [0, 1]
  const writingProgress = Math.max(
    0,
    Math.min(1, (frame - startFrame) / durationFrames)
  );

  // Current written character index
  const currentTotalWritten = Math.floor(writingProgress * totalChars);

  // Pen appearance & exit animation
  const penEntrance = spring({
    frame: frame - (startFrame - 15),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const penExit = spring({
    frame: frame - (startFrame + durationFrames + 8),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Calculate coordinates of the active writing pen tip
  const penPos = useMemo(() => {
    if (lines.length === 1) {
      const lineLen = lines[0].length || 1;
      const charProgress = Math.min(1, currentTotalWritten / lineLen);
      const x = 20 + charProgress * 420;
      const y = 26;
      return { x, y, activeLine: 0 };
    } else {
      const line1Len = lines[0].length;
      const line2Len = lines[1].length || 1;
      if (currentTotalWritten <= line1Len) {
        const charProgress = line1Len > 0 ? currentTotalWritten / line1Len : 0;
        const x = 20 + charProgress * 420;
        const y = 16;
        return { x, y, activeLine: 0 };
      } else {
        const charProgress = Math.min(
          1,
          (currentTotalWritten - line1Len) / line2Len
        );
        const x = 20 + charProgress * 420;
        const y = 36;
        return { x, y, activeLine: 1 };
      }
    }
  }, [lines, currentTotalWritten]);

  // Ink color palette
  const inkHex =
    inkColor === "black"
      ? "#151518"
      : inkColor === "red"
      ? "#b91c1c"
      : "#1d4ed8"; // Classic blue ballpoint

  const fontFamily =
    handwritingFont === "permanent-marker"
      ? "'Permanent Marker', cursive"
      : "'Caveat', cursive";

  // Micro-jitter of the pen while writing
  const penJitterX =
    writingProgress > 0 && writingProgress < 1
      ? Math.sin(frame * 1.8) * 1.5
      : 0;
  const penJitterY =
    writingProgress > 0 && writingProgress < 1
      ? Math.cos(frame * 2.2) * 1.8
      : 0;

  // Pen position with entrance/exit transitions
  const penActualX =
    penPos.x + penJitterX + (1 - penEntrance) * 80 + penExit * 120;
  const penActualY =
    penPos.y + penJitterY - (1 - penEntrance) * 80 - penExit * 90;
  const penOpacity =
    writingProgress >= 1
      ? Math.max(0, 1 - (frame - (startFrame + durationFrames + 10)) / 15)
      : penEntrance;

  return (
    <div
      style={{
        position: "absolute",
        left: "148px",
        top: "116px",
        width: "470px",
        height: "44px",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* HANDWRITTEN TEXT LINES */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: lines.length === 1 ? "center" : "space-between",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        {lines.map((lineText, lineIdx) => {
          let lineCharsCompleted: number;
          if (lines.length === 1) {
            lineCharsCompleted = currentTotalWritten;
          } else if (lineIdx === 0) {
            lineCharsCompleted = Math.min(lineText.length, currentTotalWritten);
          } else {
            const line0Len = lines[0].length;
            lineCharsCompleted = Math.max(
              0,
              Math.min(lineText.length, currentTotalWritten - line0Len)
            );
          }

          const visibleText = lineText.slice(0, lineCharsCompleted);
          const activeChar =
            lineCharsCompleted > 0 && lineCharsCompleted <= lineText.length
              ? lineText[lineCharsCompleted - 1]
              : "";
          const remainingText = lineText.slice(lineCharsCompleted);

          return (
            <div
              key={`line-${lineIdx}`}
              style={{
                fontFamily,
                fontSize: lines.length === 1 ? "24px" : "18px",
                fontWeight: 700,
                color: inkHex,
                lineHeight: lines.length === 1 ? "36px" : "20px",
                whiteSpace: "nowrap",
                letterSpacing: handwritingFont === "caveat" ? "0.5px" : "0.2px",
                textShadow: "0.2px 0.2px 0px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>{visibleText}</span>
              {/* Invisible remaining characters to maintain spacing stability */}
              <span style={{ opacity: 0 }}>{remainingText}</span>
            </div>
          );
        })}
      </div>

      {/* ================= AUTHENTIC BALLPOINT PEN / MARKER ================= */}
      {showPen && (
        <div
          style={{
            position: "absolute",
            left: `${penActualX}px`,
            top: `${penActualY}px`,
            opacity: penOpacity,
            transform: "translate(-12px, -78px) rotate(-35deg)",
            transformOrigin: "12px 78px",
            pointerEvents: "none",
            filter: "drop-shadow(4px 12px 8px rgba(0,0,0,0.45))",
            transition: "opacity 0.2s ease-out",
          }}
        >
          {/* Detailed SVG Pen */}
          <svg width="42" height="110" viewBox="0 0 42 110" fill="none">
            {/* Pen Plastic Barrel (Classic BiC Hexagonal / Round Body) */}
            <path
              d="M 16 0 L 26 0 L 26 65 L 21 82 L 16 65 Z"
              fill={inkColor === "blue" ? "#1e40af" : inkColor === "red" ? "#991b1b" : "#18181b"}
              stroke="#0f172a"
              strokeWidth="1.2"
            />
            {/* Gloss Highlight on Pen Barrel */}
            <line
              x1="18.5"
              y1="4"
              x2="18.5"
              y2="62"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.8"
            />

            {/* Silver Metal Tip Cone */}
            <path
              d="M 17 65 L 25 65 L 22.5 82 L 19.5 82 Z"
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="0.8"
            />
            {/* Metal Cone Reflection */}
            <line
              x1="20"
              y1="66"
              x2="20.5"
              y2="81"
              stroke="#ffffff"
              strokeWidth="1"
            />

            {/* Tungsten Carbide Ballpoint Nib */}
            <circle cx="21" cy="84" r="1.8" fill="#475569" />
            {/* Wet Ink on Nib */}
            <circle cx="21" cy="84.5" r="1.0" fill={inkHex} />
          </svg>
        </div>
      )}
    </div>
  );
};
