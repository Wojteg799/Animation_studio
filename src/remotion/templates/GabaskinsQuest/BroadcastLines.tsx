import React from "react";
import { GabaskinsQuestProps } from "./schema";

interface BroadcastLinesProps {
  props: GabaskinsQuestProps;
  frame: number;
}

export const BroadcastLines: React.FC<BroadcastLinesProps> = ({
  props,
  frame,
}) => {
  const {
    showBroadcastSignals = true,
    showYouTube = true,
    showReddit = true,
    stylePreset = "vibrant",
    youtubeColor = "#ef4444",
    redditColor = "#ff4500",
    characterColor = "#22c55e",
    lineColor = "#ffffff",
    youtubeEnterFrame = 48,
    redditEnterFrame = 72,
    positionX = 50,
    positionY = 50,
    youtubePosX = 24,
    youtubePosY = 50,
    redditPosX = 76,
    redditPosY = 50,
  } = props;

  if (!showBroadcastSignals) {
    return null;
  }

  const isMonochrome = stylePreset === "monochrome";
  const effectiveYtColor = isMonochrome ? "#ffffff" : youtubeColor;
  const effectiveRedditColor = isMonochrome ? "#ffffff" : redditColor;

  // Obliczenia postępu wędrujących pakietów danych (impulsu publikacji)
  const pulseSpeed = 0.04;
  const ytPulseOffset = ((frame * pulseSpeed) % 1);
  const redditPulseOffset = (((frame + 12) * pulseSpeed) % 1);

  // Stopień odsłonięcia linii (płynne pojawianie się po wejściu platformy)
  const ytLineOpacity = Math.max(
    0,
    Math.min(1, (frame - (youtubeEnterFrame + 6)) / 16)
  );
  const redditLineOpacity = Math.max(
    0,
    Math.min(1, (frame - (redditEnterFrame + 6)) / 16)
  );

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 15,
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Gradient dla linii sygnału do YouTube */}
        <linearGradient id="yt-signal-grad" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={characterColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={effectiveYtColor} stopOpacity="0.8" />
        </linearGradient>

        {/* Gradient dla linii sygnału do Reddit */}
        <linearGradient id="reddit-signal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={characterColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={effectiveRedditColor} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* ================= LINIA DO YOUTUBE ================= */}
      {showYouTube && ytLineOpacity > 0.01 && (
        <g opacity={ytLineOpacity}>
          {/* Przerywana minimalistyczna linia transmisyjna */}
          <line
            x1={positionX - 8}
            y1={positionY}
            x2={youtubePosX + 6}
            y2={youtubePosY}
            stroke="url(#yt-signal-grad)"
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
          />

          {/* Animowany punkt danych wędrujący z centrum do YouTube */}
          {(() => {
            const startX = positionX - 8;
            const endX = youtubePosX + 6;
            const curX = startX + (endX - startX) * ytPulseOffset;
            const curY = positionY + (youtubePosY - positionY) * ytPulseOffset;
            return (
              <circle
                cx={curX}
                cy={curY}
                r="0.55"
                fill={effectiveYtColor}
              />
            );
          })()}
        </g>
      )}

      {/* ================= LINIA DO REDDIT ================= */}
      {showReddit && redditLineOpacity > 0.01 && (
        <g opacity={redditLineOpacity}>
          {/* Przerywana linia transmisyjna */}
          <line
            x1={positionX + 8}
            y1={positionY}
            x2={redditPosX - 5}
            y2={redditPosY}
            stroke="url(#reddit-signal-grad)"
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
          />

          {/* Animowany punkt danych wędrujący z centrum do Reddit */}
          {(() => {
            const startX = positionX + 8;
            const endX = redditPosX - 5;
            const curX = startX + (endX - startX) * redditPulseOffset;
            const curY = positionY + (redditPosY - positionY) * redditPulseOffset;
            return (
              <circle
                cx={curX}
                cy={curY}
                r="0.55"
                fill={effectiveRedditColor}
              />
            );
          })()}
        </g>
      )}
    </svg>
  );
};
