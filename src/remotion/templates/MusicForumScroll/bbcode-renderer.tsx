import React from "react";

interface RenderBBCodeProps {
  text: string;
  isXP?: boolean;
}

const EMOTICONS: Record<string, string> = {
  ":D": "😀",
  ":-D": "😀",
  ":)": "🙂",
  ":-)": "🙂",
  ";)": "😉",
  ";-)": "😉",
  ":P": "😛",
  ":-P": "😛",
  ":p": "😛",
  ":O": "😮",
  ":-O": "😮",
  ":o": "😮",
  ":(": "🙁",
  ":-(": "🙁",
  ":roll:": "🙄",
  ":shock:": "😲",
  ":evil:": "😈",
  "8-)": "😎",
  "B-)": "😎",
};

/**
 * Parses inline BBCode tags:
 * [b], [i], [u], [s], [color], [url], emoticons
 */
function parseInline(text: string, isXP: boolean, depth = 0): React.ReactNode[] {
  if (!text || depth > 4) return [text];

  const inlineRegex =
    /(\[b\][\s\S]*?\[\/b\]|\[i\][\s\S]*?\[\/i\]|\[u\][\s\S]*?\[\/u\]|\[s\][\s\S]*?\[\/s\]|\[color=[^\]]+\][\s\S]*?\[\/color\]|\[url(?:=[^\]]+)?\][\s\S]*?\[\/url\]|:roll:|:shock:|:evil:|:-?[DPOp()o]|;-[)]|8-\)|B-\))/;

  const parts = text.split(inlineRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Bold
    if (part.startsWith("[b]") && part.endsWith("[/b]")) {
      const inner = part.slice(3, -4);
      return (
        <strong key={`b-${idx}`} style={{ fontWeight: 800 }}>
          {parseInline(inner, isXP, depth + 1)}
        </strong>
      );
    }

    // Italic
    if (part.startsWith("[i]") && part.endsWith("[/i]")) {
      const inner = part.slice(3, -4);
      return (
        <em key={`i-${idx}`} style={{ fontStyle: "italic" }}>
          {parseInline(inner, isXP, depth + 1)}
        </em>
      );
    }

    // Underline
    if (part.startsWith("[u]") && part.endsWith("[/u]")) {
      const inner = part.slice(3, -4);
      return (
        <span key={`u-${idx}`} style={{ textDecoration: "underline" }}>
          {parseInline(inner, isXP, depth + 1)}
        </span>
      );
    }

    // Strikethrough (Easter Egg device!)
    if (part.startsWith("[s]") && part.endsWith("[/s]")) {
      const inner = part.slice(3, -4);
      return (
        <span
          key={`s-${idx}`}
          style={{
            textDecoration: "line-through",
            opacity: 0.72,
            color: isXP ? "#b91c1c" : "#f87171",
            backgroundColor: isXP ? "rgba(254, 226, 226, 0.6)" : "rgba(239, 68, 68, 0.15)",
            padding: "0 2px",
            borderRadius: "2px",
          }}
          title="Przekreślona poszlaka / Easter Egg"
        >
          {parseInline(inner, isXP, depth + 1)}
        </span>
      );
    }

    // Color
    if (part.startsWith("[color=") && part.endsWith("[/color]")) {
      const closeBracket = part.indexOf("]");
      const colorVal = part.slice(7, closeBracket);
      const inner = part.slice(closeBracket + 1, -8);
      return (
        <span key={`color-${idx}`} style={{ color: colorVal, fontWeight: 600 }}>
          {parseInline(inner, isXP, depth + 1)}
        </span>
      );
    }

    // URL
    if (part.startsWith("[url") && part.endsWith("[/url]")) {
      let url = "";
      let inner = "";
      if (part.startsWith("[url=")) {
        const closeBracket = part.indexOf("]");
        url = part.slice(5, closeBracket);
        inner = part.slice(closeBracket + 1, -6);
      } else {
        inner = part.slice(5, -6);
        url = inner;
      }
      return (
        <span
          key={`url-${idx}`}
          style={{
            color: isXP ? "#0055aa" : "#38bdf8",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: 600,
          }}
          title={url}
        >
          {parseInline(inner, isXP, depth + 1)}
        </span>
      );
    }

    // Emoticons
    if (EMOTICONS[part]) {
      return (
        <span
          key={`emo-${idx}`}
          style={{
            display: "inline-block",
            fontSize: "13px",
            lineHeight: 1,
            margin: "0 2px",
            verticalAlign: "middle",
          }}
          title={part}
        >
          {EMOTICONS[part]}
        </span>
      );
    }

    return part;
  });
}

/**
 * Main BBCode renderer for forum posts:
 * Supports block tokens: [quote], [code], [spoiler], [badge]
 * and nested inline formatting with line breaks.
 */
export const RenderBBCode: React.FC<RenderBBCodeProps> = ({ text, isXP = false }) => {
  if (!text) return null;

  // Split by block tokens
  const blockRegex =
    /(\[quote(?:=[^\]]+)?\][\s\S]*?\[\/quote\]|\[code\][\s\S]*?\[\/code\]|\[spoiler\][\s\S]*?\[\/spoiler\]|\[badge(?:=[^\]]+)?\][\s\S]*?\[\/badge\])/g;

  const blocks = text.split(blockRegex);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {blocks.map((block, bIdx) => {
        if (!block) return null;

        // 1. QUOTE BLOCK
        if (block.startsWith("[quote") && block.endsWith("[/quote]")) {
          let author = "";
          let quoteBody = "";
          if (block.startsWith("[quote=")) {
            const closeBracket = block.indexOf("]");
            author = block.slice(7, closeBracket);
            quoteBody = block.slice(closeBracket + 1, -8);
          } else {
            quoteBody = block.slice(7, -8);
          }

          return (
            <div
              key={`block-quote-${bIdx}`}
              style={{
                backgroundColor: isXP ? "#f1f6fc" : "rgba(30, 41, 59, 0.55)",
                border: isXP ? "1px solid #b0c4de" : "1px solid rgba(56, 189, 248, 0.25)",
                borderLeft: isXP ? "3px solid #0055aa" : "3px solid #38bdf8",
                borderRadius: isXP ? "2px" : "6px",
                padding: isXP ? "6px 10px" : "8px 12px",
                margin: "4px 0",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: isXP ? "Verdana, Tahoma, sans-serif" : "monospace",
                  color: isXP ? "#0055aa" : "#38bdf8",
                  marginBottom: "4px",
                }}
              >
                {author ? `${author} napisał(a):` : "Cytat:"}
              </div>
              <div
                style={{
                  fontSize: isXP ? "11px" : "12px",
                  fontStyle: "italic",
                  color: isXP ? "#334155" : "#cbd5e1",
                  lineHeight: 1.5,
                }}
              >
                {parseInline(quoteBody.trim(), isXP)}
              </div>
            </div>
          );
        }

        // 2. CODE BLOCK (Hex / Terminal / Clues)
        if (block.startsWith("[code]") && block.endsWith("[/code]")) {
          const codeBody = block.slice(6, -7);
          return (
            <div
              key={`block-code-${bIdx}`}
              style={{
                backgroundColor: isXP ? "#f8fafc" : "rgba(2, 6, 23, 0.92)",
                border: isXP ? "1px solid #94a3b8" : "1px solid rgba(56, 189, 248, 0.35)",
                borderLeft: isXP ? "3px solid #64748b" : "3px solid #4ade80",
                borderRadius: isXP ? "2px" : "6px",
                padding: "6px 10px",
                margin: "4px 0",
                fontFamily: "Courier New, monospace",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: isXP ? "#475569" : "#4ade80",
                  marginBottom: "3px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {isXP ? "Kod / Zrzut Pamięci:" : "> TERMINAL // DUMP DATA:"}
              </div>
              <pre
                style={{
                  margin: 0,
                  fontSize: isXP ? "11px" : "11px",
                  color: isXP ? "#0f172a" : "#38bdf8",
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  lineHeight: 1.4,
                }}
              >
                {codeBody.trim()}
              </pre>
            </div>
          );
        }

        // 3. SPOILER / REDACTED BLOCK
        if (block.startsWith("[spoiler]") && block.endsWith("[/spoiler]")) {
          const spoilerBody = block.slice(9, -10);
          return (
            <div
              key={`block-spoiler-${bIdx}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: isXP ? "#1e293b" : "rgba(239, 68, 68, 0.12)",
                border: isXP ? "1px solid #0f172a" : "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: isXP ? "2px" : "4px",
                padding: "3px 8px",
                margin: "4px 0",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: isXP ? "#fbbf24" : "#ef4444",
                  letterSpacing: "0.5px",
                }}
              >
                {isXP ? "[SPOILER]:" : "[REDACTED]:"}
              </span>
              <span
                style={{
                  backgroundColor: isXP ? "#000000" : "rgba(0, 0, 0, 0.85)",
                  color: isXP ? "#fbbf24" : "#fca5a5",
                  padding: "1px 6px",
                  borderRadius: "2px",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  letterSpacing: "0.5px",
                }}
              >
                {parseInline(spoilerBody.trim(), isXP)}
              </span>
            </div>
          );
        }

        // 4. BADGE / PILL TAG
        if (block.startsWith("[badge") && block.endsWith("[/badge]")) {
          let label = "INFO";
          let badgeBody = "";
          if (block.startsWith("[badge=")) {
            const closeBracket = block.indexOf("]");
            label = block.slice(7, closeBracket);
            badgeBody = block.slice(closeBracket + 1, -8);
          } else {
            badgeBody = block.slice(7, -8);
          }

          return (
            <span
              key={`block-badge-${bIdx}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: isXP ? "#fef3c7" : "rgba(56, 189, 248, 0.15)",
                border: isXP ? "1px solid #d97706" : "1px solid rgba(56, 189, 248, 0.35)",
                borderRadius: isXP ? "2px" : "4px",
                padding: "2px 6px",
                margin: "2px 4px 2px 0",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: isXP ? "#92400e" : "#38bdf8",
              }}
            >
              <span style={{ opacity: 0.75 }}>[{label}]</span>
              <span>{parseInline(badgeBody.trim(), isXP)}</span>
            </span>
          );
        }

        // 5. REGULAR TEXT PARAGRAPHS WITH NEWLINES
        const lines = block.split("\n");
        return (
          <div key={`block-text-${bIdx}`} style={{ lineHeight: 1.6 }}>
            {lines.map((line, lIdx) => (
              <React.Fragment key={`line-${lIdx}`}>
                {parseInline(line, isXP)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
};
