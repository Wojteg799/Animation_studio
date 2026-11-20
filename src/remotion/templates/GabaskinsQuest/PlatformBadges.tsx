import React from "react";
import { spring, useVideoConfig } from "remotion";
import { GabaskinsQuestProps } from "./schema";

interface PlatformBadgesProps {
  props: GabaskinsQuestProps;
  frame: number;
}

export const PlatformBadges: React.FC<PlatformBadgesProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    showYouTube = true,
    showReddit = true,
    stylePreset = "vibrant",
    youtubeColor = "#ef4444",
    redditColor = "#ff4500",
    platformsScale = 1.1,
    youtubePosX = 24,
    youtubePosY = 50,
    redditPosX = 76,
    redditPosY = 50,
    showSubredditBubbles = true,
    showBroadcastPings = true,
    lineColor = "#ffffff",
    lineWidth = 2.5,
    idleBobbing = true,
    youtubeEnterFrame = 48,
    redditEnterFrame = 72,
  } = props;

  const isMonochrome = stylePreset === "monochrome";
  const effectiveYoutubeColor = isMonochrome ? "#ffffff" : youtubeColor;
  const effectiveRedditColor = isMonochrome ? "#ffffff" : redditColor;

  // ================= 1. ANIMACJA YOUTUBE =================
  const ytEnterSpring = spring({
    frame: frame - youtubeEnterFrame,
    fps,
    config: { damping: 13, stiffness: 100, mass: 0.75 },
  });
  const clampedYtEnter = Math.max(0, Math.min(1.15, ytEnterSpring));
  const ytBob = idleBobbing ? Math.sin((frame + 10) * 0.08) * 3 : 0;

  // Pętle rozszerzającego się impulsu nadawczego (ping wave) dla YouTube
  const ytPingProgress =
    frame >= youtubeEnterFrame
      ? ((frame - youtubeEnterFrame) % 45) / 45
      : 0;
  const ytPingScale = 1 + ytPingProgress * 0.45;
  const ytPingOpacity = Math.max(0, (1 - ytPingProgress) * 0.6);

  // ================= 2. ANIMACJA REDDIT =================
  const redditEnterSpring = spring({
    frame: frame - redditEnterFrame,
    fps,
    config: { damping: 13, stiffness: 100, mass: 0.75 },
  });
  const clampedRedditEnter = Math.max(0, Math.min(1.15, redditEnterSpring));
  const redditBob = idleBobbing ? Math.sin((frame + 25) * 0.08) * 3 : 0;

  // Impuls nadawczy dla Reddit
  const redditPingProgress =
    frame >= redditEnterFrame
      ? ((frame - redditEnterFrame) % 45) / 45
      : 0;
  const redditPingScale = 1 + redditPingProgress * 0.45;
  const redditPingOpacity = Math.max(0, (1 - redditPingProgress) * 0.6);

  // ================= 3. BAŃKI SUBREDDITÓW ("NA RÓŻNYCH SUBREDDITACH") =================
  // Satelickie małe dymki postów pojawiające się sekwencyjnie
  const bubble1Spring = spring({
    frame: frame - (redditEnterFrame + 12),
    fps,
    config: { damping: 11, stiffness: 120 },
  });
  const bubble2Spring = spring({
    frame: frame - (redditEnterFrame + 22),
    fps,
    config: { damping: 11, stiffness: 120 },
  });
  const bubble3Spring = spring({
    frame: frame - (redditEnterFrame + 32),
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  return (
    <>
      {/* =========================================================
          LEWA STRONA: LOGO YOUTUBE ("zamieszcza nagranie na YouTubie")
          ========================================================= */}
      {showYouTube && frame >= youtubeEnterFrame && (
        <div
          style={{
            position: "absolute",
            left: `${youtubePosX}%`,
            top: `${youtubePosY}%`,
            transform: `translate(-50%, -50%) translateY(${ytBob}px) scale(${
              clampedYtEnter * platformsScale
            })`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          {/* Pierścień fali nadawczej wokół YouTube */}
          {showBroadcastPings && ytPingOpacity > 0.01 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 116,
                height: 80,
                transform: `translateX(-50%) scale(${ytPingScale})`,
                opacity: ytPingOpacity,
                border: `2px solid ${effectiveYoutubeColor}`,
                borderRadius: 22,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Korpus Logo YouTube */}
          <div
            style={{
              position: "relative",
              width: 116,
              height: 80,
              backgroundColor: isMonochrome ? "#000000" : effectiveYoutubeColor,
              border: `2.5px solid ${isMonochrome ? "#ffffff" : "#ffffff"}`,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isMonochrome
                ? "none"
                : `0 0 24px ${effectiveYoutubeColor}33`,
            }}
          >
            {/* Ikona trójkąta odtwarzacza (Play) */}
            <svg viewBox="0 0 40 40" width="36" height="36">
              <path
                d="M 14,10 L 30,20 L 14,30 Z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Podpis platformy */}
          <div
            style={{
              marginTop: 12,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 6,
              padding: "4px 16px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: lineColor,
                letterSpacing: 2,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              YOUTUBE
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          PRAWA STRONA: LOGO REDDIT ("publikuje je na różnych subredditach")
          ========================================================= */}
      {showReddit && frame >= redditEnterFrame && (
        <div
          style={{
            position: "absolute",
            left: `${redditPosX}%`,
            top: `${redditPosY}%`,
            transform: `translate(-50%, -50%) translateY(${redditBob}px) scale(${
              clampedRedditEnter * platformsScale
            })`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 22,
            pointerEvents: "none",
          }}
        >
          {/* Pierścień fali nadawczej wokół Reddit */}
          {showBroadcastPings && redditPingOpacity > 0.01 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 90,
                height: 90,
                transform: `translateX(-50%) scale(${redditPingScale})`,
                opacity: redditPingOpacity,
                border: `2px solid ${effectiveRedditColor}`,
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Okrągły awatar Reddit Snoo */}
          <div
            style={{
              position: "relative",
              width: 90,
              height: 90,
              backgroundColor: isMonochrome ? "#000000" : effectiveRedditColor,
              border: `2.5px solid #ffffff`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isMonochrome
                ? "none"
                : `0 0 24px ${effectiveRedditColor}33`,
            }}
          >
            <svg viewBox="0 0 100 100" width="80" height="80">
              {/* Uszy Snoo */}
              <circle cx="20" cy="52" r="7" fill="#ffffff" />
              <circle cx="80" cy="52" r="7" fill="#ffffff" />

              {/* Głowa Snoo */}
              <ellipse cx="50" cy="52" rx="27" ry="19" fill="#ffffff" />

              {/* Oczy (pomarańczowe w trybie vibrant, czarne w monochrome) */}
              <circle
                cx="39"
                cy="51"
                r="4.2"
                fill={isMonochrome ? "#000000" : effectiveRedditColor}
              />
              <circle
                cx="61"
                cy="51"
                r="4.2"
                fill={isMonochrome ? "#000000" : effectiveRedditColor}
              />

              {/* Uśmiech Snoo */}
              <path
                d="M 40,59 Q 50,66 60,59"
                fill="none"
                stroke={isMonochrome ? "#000000" : effectiveRedditColor}
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Antenka Snoo */}
              <path
                d="M 50,34 L 54,18 L 68,22"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="71" cy="23" r="5" fill="#ffffff" />
            </svg>
          </div>

          {/* Podpis platformy */}
          <div
            style={{
              marginTop: 12,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 6,
              padding: "4px 16px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: lineColor,
                letterSpacing: 2,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              REDDIT
            </span>
          </div>

          {/* =========================================================
              3 BAŃKI SUBREDDITÓW WYSKAKUJĄCE WOKÓŁ LOGO REDDIT
              ("publikuje je na różnych subredditach")
              ========================================================= */}
          {showSubredditBubbles && (
            <>
              {/* Bańka 1: r/lostwave (u góry z prawej) */}
              {bubble1Spring > 0.05 && (
                <div
                  style={{
                    position: "absolute",
                    top: -24,
                    right: -78,
                    transform: `scale(${Math.min(1, bubble1Spring)}) translateY(${
                      Math.sin((frame + 30) * 0.1) * 3
                    }px)`,
                    backgroundColor: "#000000",
                    border: `1.8px solid ${effectiveRedditColor}`,
                    borderRadius: 14,
                    padding: "3px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: effectiveRedditColor,
                      fontFamily: "monospace",
                      letterSpacing: 1,
                    }}
                  >
                    r/lostwave
                  </span>
                </div>
              )}

              {/* Bańka 2: r/germany (po prawej stronie) */}
              {bubble2Spring > 0.05 && (
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    right: -90,
                    transform: `scale(${Math.min(1, bubble2Spring)}) translateY(${
                      Math.sin((frame + 60) * 0.1) * 3
                    }px)`,
                    backgroundColor: "#000000",
                    border: `1.8px solid ${lineColor}`,
                    borderRadius: 14,
                    padding: "3px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: lineColor,
                      fontFamily: "monospace",
                      letterSpacing: 1,
                    }}
                  >
                    r/germany
                  </span>
                </div>
              )}

              {/* Bańka 3: r/tipofmytongue (na dole z prawej) */}
              {bubble3Spring > 0.05 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: -98,
                    transform: `scale(${Math.min(1, bubble3Spring)}) translateY(${
                      Math.sin((frame + 90) * 0.1) * 3
                    }px)`,
                    backgroundColor: "#000000",
                    border: `1.8px solid ${effectiveRedditColor}`,
                    borderRadius: 14,
                    padding: "3px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.8)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: effectiveRedditColor,
                      fontFamily: "monospace",
                      letterSpacing: 1,
                    }}
                  >
                    r/tipofmytongue
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
