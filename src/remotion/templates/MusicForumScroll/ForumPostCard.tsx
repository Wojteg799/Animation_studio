import React from "react";
import { Music, Disc, Volume2, FileAudio, CornerDownRight, Paperclip, Download } from "lucide-react";
import { RenderBBCode } from "./bbcode-renderer";

export interface ForumPostCardProps {
  postNumber: number;
  author: string;
  role: string;
  date: string;
  subject?: string;
  location?: string;
  joined?: string;
  postsCount?: string;
  reputation?: string;
  warnings?: string;
  editNote?: string;
  signature?: string;
  content: string;
  hasAudio?: boolean;
  audioFile?: string;
  avatarColor: string;
  isHighlighted?: boolean;
  frame: number;
  isFocused?: boolean;
  focusProgress?: number;
  dimmed?: boolean;
  dimOpacity?: number;
  dimBlurAmount?: number;
  targetHeadline?: string;
  markerProgress?: number;
  glowColor?: string;
  focusScale?: number;
  rawFileAttachment?: boolean;
}

export const ForumPostCard: React.FC<ForumPostCardProps> = ({
  postNumber,
  author,
  role,
  date,
  subject,
  location,
  joined,
  postsCount,
  reputation,
  warnings,
  editNote,
  signature,
  content,
  hasAudio,
  audioFile,
  avatarColor,
  isHighlighted = false,
  frame,
  isFocused = false,
  focusProgress = 0,
  dimmed = false,
  dimOpacity = 0.35,
  dimBlurAmount = 1.5,
  targetHeadline,
  markerProgress = 0,
  glowColor = "#f59e0b",
  focusScale = 1.04,
  rawFileAttachment = true,
}) => {
  // Low-poly initial / avatar icon generator
  const initials = author.substring(0, 2).toUpperCase();

  // Focus & Spotlight calculations
  const currentOpacity = dimmed ? 1 - (1 - dimOpacity) * focusProgress : 1;
  const currentScale = isFocused ? 1 + (focusScale - 1) * focusProgress : 1;
  const currentBlur = dimmed && dimBlurAmount ? dimBlurAmount * focusProgress : 0;
  const currentZIndex = isFocused ? 40 : 1;
  const activeBorder = isFocused
    ? `2px solid ${glowColor}`
    : isHighlighted
    ? `2px solid ${avatarColor}`
    : "1px solid rgba(255, 255, 255, 0.08)";
  const activeShadow = isFocused
    ? `0 0 ${30 * focusProgress}px ${glowColor}66, 0 15px 40px rgba(0, 0, 0, 0.95)`
    : isHighlighted
    ? `0 0 25px ${avatarColor}33, 0 10px 30px rgba(0, 0, 0, 0.8)`
    : "0 6px 20px rgba(0, 0, 0, 0.5)";

  return (
    <div
      style={{
        backgroundColor: isHighlighted ? "rgba(22, 25, 38, 0.95)" : "rgba(15, 17, 26, 0.92)",
        border: activeBorder,
        borderRadius: "12px",
        boxShadow: activeShadow,
        opacity: currentOpacity,
        filter: currentBlur > 0 ? `blur(${currentBlur.toFixed(1)}px)` : undefined,
        transform: `scale(${currentScale})`,
        zIndex: currentZIndex,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        backdropFilter: "blur(8px)",
        transformOrigin: "center center",
      }}
    >
      {/* Highlight glow ribbon */}
      {(isHighlighted || isFocused) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "4px",
            backgroundColor: isFocused ? glowColor : avatarColor,
            boxShadow: `0 0 10px ${isFocused ? glowColor : avatarColor}`,
          }}
        />
      )}

      {/* LEFT COLUMN: User Profile & Low-Poly Avatar */}
      <div
        style={{
          width: "160px",
          padding: "16px 14px",
          backgroundColor: "rgba(10, 11, 18, 0.7)",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {/* Low-Poly Faceted Avatar SVG */}
        <div
          style={{
            width: "56px",
            height: "56px",
            position: "relative",
            marginBottom: "8px",
          }}
        >
          <svg
            viewBox="0 0 60 60"
            width="56"
            height="56"
            style={{
              filter: `drop-shadow(0 2px 6px ${avatarColor}44)`,
            }}
          >
            {/* Low-poly geometric facets */}
            <polygon points="30,2 58,18 48,52 12,52 2,18" fill="rgba(255,255,255,0.06)" stroke={avatarColor} strokeWidth="1.5" />
            <polygon points="30,2 58,18 30,30" fill={avatarColor} fillOpacity="0.4" />
            <polygon points="58,18 48,52 30,30" fill={avatarColor} fillOpacity="0.25" />
            <polygon points="48,52 12,52 30,30" fill={avatarColor} fillOpacity="0.15" />
            <polygon points="12,52 2,18 30,30" fill={avatarColor} fillOpacity="0.3" />
            <polygon points="2,18 30,2 30,30" fill={avatarColor} fillOpacity="0.5" />
            <text
              x="30"
              y="35"
              fill="#ffffff"
              fontFamily="monospace"
              fontSize="14"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="1"
            >
              {initials}
            </text>
          </svg>
        </div>

        {/* Username */}
        <div
          style={{
            color: avatarColor,
            fontSize: "13px",
            fontWeight: "800",
            fontFamily: "monospace",
            letterSpacing: "0.5px",
            lineHeight: 1.2,
            wordBreak: "break-all",
          }}
        >
          {author}
        </div>

        {/* User Role Badge */}
        <div
          style={{
            marginTop: "4px",
            fontSize: "9px",
            fontFamily: "sans-serif",
            fontWeight: "700",
            color: "#94a3b8",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "2px 6px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {role}
        </div>

        {/* User stats */}
        <div
          style={{
            marginTop: "10px",
            fontSize: "9px",
            color: "#64748b",
            fontFamily: "monospace",
            lineHeight: 1.45,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div>Dołączył: {joined || "2006"}</div>
          <div>Posty: {postsCount || (120 + postNumber * 37)}</div>
          {location && <div>Skąd: {location}</div>}
          {reputation && (
            <div style={{ color: "#38bdf8", fontWeight: "700", marginTop: "2px" }}>
              {reputation}
            </div>
          )}
          {warnings && (
            <div
              style={{
                color: warnings.includes("BAN") ? "#ef4444" : "#f59e0b",
                fontWeight: "700",
                fontSize: "8.5px",
              }}
            >
              {warnings}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Post Body */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Post Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              paddingBottom: "8px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                fontFamily: "monospace",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#e2e8f0" }}>Wysłano: {date}</span>
              {subject && (
                <>
                  <span style={{ opacity: 0.4 }}>•</span>
                  <span style={{ color: "#38bdf8", fontWeight: 700 }}>{subject}</span>
                </>
              )}
            </div>

            <div
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: isFocused ? glowColor : avatarColor,
                fontWeight: "700",
              }}
            >
              #{postNumber}
            </div>
          </div>

          {/* Target Question Headline with Animated Marker */}
          {targetHeadline && isFocused && (
            <div style={{ marginBottom: "12px", position: "relative" }}>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  padding: "4px 10px",
                  borderRadius: "4px",
                }}
              >
                {/* Yellow / Amber Marker Sweep */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "10%",
                    bottom: "10%",
                    width: `${Math.min(100, Math.max(0, markerProgress * 100))}%`,
                    backgroundColor: "rgba(245, 158, 11, 0.45)",
                    borderLeft:
                      markerProgress > 0 && markerProgress < 1 ? "3px solid #f59e0b" : "none",
                    borderRadius: "3px",
                    zIndex: 0,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#fbbf24",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  }}
                >
                  🔍 {targetHeadline}
                </span>
              </div>
            </div>
          )}

          {/* Post Text Content with BBCode & Easter Eggs */}
          <div
            style={{
              fontSize: "13px",
              color: "#f1f5f9",
              lineHeight: 1.6,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.2px",
            }}
          >
            <RenderBBCode text={content} isXP={false} />
          </div>

          {/* Modern Noir Raw Static File Attachment Box (Statyczny załącznik, bez ruchów i fal) */}
          {hasAudio && (
            <div
              style={{
                marginTop: "14px",
                padding: "8px 14px",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                maxWidth: "100%",
                boxShadow: "inset 0 0 12px rgba(56, 189, 248, 0.05)",
              }}
            >
              {/* File Icon */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "5px",
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                  flexShrink: 0,
                }}
              >
                <Paperclip className="w-3.5 h-3.5" />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    fontWeight: "700",
                    color: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>{audioFile || "radio_rip_ndr_1984.mp3"}</span>
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#38bdf8",
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      padding: "1px 5px",
                      borderRadius: "3px",
                    }}
                  >
                    RAW FILE
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#64748b",
                    fontFamily: "monospace",
                    marginTop: "2px",
                  }}
                >
                  Załącznik: 1.42 MB • Pobrano 1,842 razy
                </div>
              </div>

              {/* Static Download Chip */}
              <div
                style={{
                  marginLeft: "12px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "9px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: "#cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span>POBIERZ</span>
              </div>
            </div>
          )}

          {/* Edit Note Footnote */}
          {editNote && (
            <div
              style={{
                fontSize: "10px",
                color: "#64748b",
                fontStyle: "italic",
                fontFamily: "monospace",
                marginTop: "10px",
                paddingTop: "4px",
                borderTop: "1px dashed rgba(255, 255, 255, 0.06)",
              }}
            >
              {editNote}
            </div>
          )}

          {/* User Signature */}
          {signature && (
            <div
              style={{
                marginTop: "14px",
                paddingTop: "6px",
                borderTop: "1px dashed rgba(255, 255, 255, 0.08)",
                fontSize: "10px",
                color: "#64748b",
                fontStyle: "italic",
              }}
            >
              <RenderBBCode text={signature} isXP={false} />
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div
          style={{
            marginTop: "12px",
            paddingTop: "6px",
            borderTop: "1px solid rgba(255, 255, 255, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#475569",
            fontFamily: "monospace",
          }}
        >
          <span>IP: 84.112.**.**</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ color: "#64748b" }}>[Cytuj]</span>
            <span style={{ color: "#64748b" }}>[Zgłoś]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

