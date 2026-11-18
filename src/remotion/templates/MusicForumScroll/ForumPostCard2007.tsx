import React from "react";
import { Disc, FileAudio, Play, MessageSquare, Quote, Edit3, Volume2, Paperclip, Download } from "lucide-react";

interface ForumPostCard2007Props {
  postNumber: number;
  author: string;
  role: string;
  date: string;
  content: string;
  hasAudio?: boolean;
  audioFile?: string;
  avatarColor?: string;
  quoteAuthor?: string;
  quoteContent?: string;
  signature?: string;
  frame: number;
  isHighlighted?: boolean;
  // Focus & Spotlight Effect
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

export const ForumPostCard2007: React.FC<ForumPostCard2007Props> = ({
  postNumber,
  author,
  role,
  date,
  content,
  hasAudio = false,
  audioFile = "radio_rip_ndr_1984.mp3 [1.4 MB]",
  avatarColor = "#0284c7",
  quoteAuthor,
  quoteContent,
  signature = 'Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7',
  frame,
  isHighlighted = false,
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
  const isOdd = postNumber % 2 !== 0;
  const authorColBg = isOdd ? "#eef2f8" : "#e5ecf5";
  const bodyColBg = isOdd ? "#ffffff" : "#f8fafd";

  // Focus & Spotlight calculations
  const currentOpacity = dimmed ? 1 - (1 - dimOpacity) * focusProgress : 1;
  const currentScale = isFocused ? 1 + (focusScale - 1) * focusProgress : 1;
  const currentBlur = dimmed && dimBlurAmount ? dimBlurAmount * focusProgress : 0;
  const currentZIndex = isFocused ? 40 : 1;
  const activeBorder = isFocused
    ? `2px solid ${glowColor}`
    : isHighlighted
    ? "2px solid #0284c7"
    : "1px solid #b0c4de";
  const activeShadow = isFocused
    ? `0 0 ${25 * focusProgress}px rgba(245, 158, 11, 0.45), 0 12px 30px rgba(0, 0, 0, 0.35)`
    : isHighlighted
    ? "0 0 12px rgba(2, 132, 199, 0.25)"
    : "none";

  return (
    <div
      style={{
        display: "flex",
        border: activeBorder,
        borderRadius: "2px",
        overflow: "hidden",
        backgroundColor: bodyColBg,
        boxShadow: activeShadow,
        opacity: currentOpacity,
        filter: currentBlur > 0 ? `blur(${currentBlur.toFixed(1)}px)` : undefined,
        transform: `scale(${currentScale})`,
        zIndex: currentZIndex,
        fontFamily: "Verdana, Tahoma, Arial, sans-serif",
        transformOrigin: "center center",
      }}
    >
      {/* ================= LEFT AUTHOR COLUMN ================= */}
      <div
        style={{
          width: "200px",
          backgroundColor: authorColBg,
          borderRight: "1px solid #b0c4de",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        {/* Username */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#0055aa",
              textDecoration: "underline",
              cursor: "pointer",
              letterSpacing: "0.2px",
            }}
          >
            {author}
          </span>
          <span style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>
            #{postNumber}
          </span>
        </div>

        {/* User Rank Title */}
        <span style={{ fontSize: "10px", color: "#475569", fontWeight: 600 }}>
          {role}
        </span>

        {/* Rank Stars (2007 phpBB pips) */}
        <div style={{ display: "flex", gap: "2px", color: "#eab308", fontSize: "11px", lineHeight: 1 }}>
          {"★★★★★".slice(0, Math.min(5, 3 + (postNumber % 3)))}
        </div>

        {/* Retro Avatar Box */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ffffff",
            border: "1px solid #94a3b8",
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.1), 1px 1px 2px rgba(0,0,0,0.08)",
            padding: "3px",
            margin: "4px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Cassette / Avatar silhouette */}
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: avatarColor,
              borderRadius: "2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Disc className="w-8 h-8 text-white stroke-[2]" />
            <span
              style={{
                fontSize: "8px",
                fontFamily: "monospace",
                color: "#ffffff",
                fontWeight: 700,
                marginTop: "2px",
              }}
            >
              80s TAPE
            </span>
          </div>

          {/* Retro scanline overlay on avatar */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.15) 50%)",
              backgroundSize: "100% 2px",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* User Metadata List */}
        <div
          style={{
            fontSize: "10px",
            color: "#475569",
            lineHeight: "1.45",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            borderTop: "1px solid #cbd5e1",
            paddingTop: "6px",
          }}
        >
          <div>
            <span style={{ color: "#64748b" }}>Dołączył: </span>
            <span style={{ fontWeight: 600 }}>Paź 2005</span>
          </div>
          <div>
            <span style={{ color: "#64748b" }}>Posty: </span>
            <span style={{ fontWeight: 600 }}>{1240 + postNumber * 62}</span>
          </div>
          <div>
            <span style={{ color: "#64748b" }}>Skąd: </span>
            <span>Polska</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#16a34a",
              }}
            />
            <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "9px" }}>
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT POST BODY ================= */}
      <div
        style={{
          flex: 1,
          padding: "12px 16px",
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
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "6px",
              marginBottom: "10px",
              fontSize: "10px",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {/* Document icon */}
              <div
                style={{
                  width: "10px",
                  height: "12px",
                  border: "1px solid #64748b",
                  backgroundColor: "#ffffff",
                }}
              />
              <span>Wysłany: <strong style={{ color: "#334155" }}>{date}</strong></span>
              <span>•</span>
              <span>Temat postu: <strong style={{ color: "#0055aa" }}>Re: Lostwave NDR 1984</strong></span>
            </div>

            {/* Authentic 2007 Action Buttons */}
            <div style={{ display: "flex", gap: "4px" }}>
              <div
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%)",
                  border: "1px solid #94a3b8",
                  borderRadius: "2px",
                  padding: "2px 7px",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#0055aa",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  cursor: "pointer",
                }}
              >
                <Quote className="w-2.5 h-2.5" />
                <span>CYTUJ</span>
              </div>

              <div
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%)",
                  border: "1px solid #94a3b8",
                  borderRadius: "2px",
                  padding: "2px 7px",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#334155",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  cursor: "pointer",
                }}
              >
                <MessageSquare className="w-2.5 h-2.5" />
                <span>PW</span>
              </div>
            </div>
          </div>

          {/* 2007 Target Question Headline with Fluorescent Yellow Highlighter */}
          {targetHeadline && isFocused && (
            <div style={{ marginBottom: "12px", position: "relative" }}>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  padding: "4px 8px",
                  borderRadius: "2px",
                }}
              >
                {/* 2007 Fluorescent Yellow Highlighter Sweep */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "10%",
                    bottom: "8%",
                    width: `${Math.min(100, Math.max(0, markerProgress * 100))}%`,
                    backgroundColor: "rgba(254, 240, 138, 0.9)",
                    borderLeft:
                      markerProgress > 0 && markerProgress < 1 ? "3px solid #ca8a04" : "none",
                    borderRadius: "2px",
                    zIndex: 0,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 1,
                    fontFamily: "Verdana, Tahoma, sans-serif",
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#92400e",
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                  }}
                >
                  🔍 {targetHeadline}
                </span>
              </div>
            </div>
          )}

          {/* Quote Box (for replies) */}
          {quoteAuthor && quoteContent && (
            <div
              style={{
                backgroundColor: "#f1f6fc",
                border: "1px solid #b0c4de",
                borderLeft: "3px solid #0055aa",
                borderRadius: "3px",
                padding: "8px 12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#0055aa",
                  marginBottom: "4px",
                }}
              >
                {quoteAuthor} napisał(a):
              </div>
              <p
                style={{
                  fontSize: "11px",
                  fontStyle: "italic",
                  color: "#334155",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                „{quoteContent}”
              </p>
            </div>
          )}

          {/* Main Post Text */}
          <p
            style={{
              fontSize: "12px",
              color: "#1e293b",
              lineHeight: "1.65",
              margin: "0 0 12px 0",
            }}
          >
            {content}
          </p>

          {/* phpBB 2007 Raw Static File Attachment Box (Statyczny załącznik, bez ruchów i play) */}
          {hasAudio && (
            <div
              style={{
                backgroundColor: "#f4f8fc",
                border: "1px dashed #7ea8cf",
                borderRadius: "3px",
                padding: "8px 12px",
                marginTop: "12px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                display: "inline-block",
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#004488",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "4px",
                  fontFamily: "Verdana, Tahoma, sans-serif",
                }}
              >
                <Paperclip className="w-3.5 h-3.5 text-[#0055aa]" />
                <span>Załącznik:</span>
                <span
                  style={{
                    color: "#0055aa",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontFamily: "Tahoma, Verdana, sans-serif",
                  }}
                >
                  {audioFile}
                </span>
              </div>

              <div
                style={{
                  fontSize: "10px",
                  color: "#475569",
                  fontFamily: "Tahoma, Verdana, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingLeft: "20px",
                }}
              >
                <span>Rozmiar: 1.42 MB</span>
                <span>•</span>
                <span>Pobrano: 842 razy</span>
                <span>•</span>
                <span
                  style={{
                    color: "#0055aa",
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  [ Pobierz załącznik ]
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Vintage Signature Separator & Text */}
        <div
          style={{
            borderTop: "1px dashed #cbd5e1",
            marginTop: "16px",
            paddingTop: "6px",
            fontSize: "10px",
            color: "#64748b",
            fontStyle: "italic",
          }}
        >
          <span style={{ display: "block", color: "#94a3b8", marginBottom: "2px" }}>
            _________________
          </span>
          <span>{signature}</span>
        </div>
      </div>
    </div>
  );
};

