import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { MusicForumScrollProps } from "./schema";
import { ForumPostCard } from "./ForumPostCard";
import { ForumPostCard2007 } from "./ForumPostCard2007";
import { WindowsXPChrome } from "./WindowsXPChrome";
import { generateLowPolyMesh, generateFloatingPolygons } from "./lowpoly-mesh";
import { MessageSquare, Disc, Radio, Search, ChevronRight, Hash } from "lucide-react";

function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export const MusicForumScroll: React.FC<MusicForumScrollProps> = ({
  forumTitle = "LOSTWAVE.ARCHIVE // MUZYCZNE FORUM DYSKUSYJNE",
  threadTitle = "Tajemnicza piosenka z radia NDR (1984) - poszukiwanie wykonawcy",
  threadCategory = "GŁÓWNA DYSKUSJA / IDENTYFIKACJA UTWORÓW",
  threadDate = "Wątek założony: 14.10.2007 • 142 odpowiedzi",

  post1_author = "bl4nk_tape",
  post1_role = "Archiwista Kaset",
  post1_date = "14 paź 2007, 21:40",
  post1_content = "Znalazłem starą kasetę z nagraniem z niemieckiego radia NDR (ok. 1984). Ktoś rozpoznaje ten wokal i syntezator? Załączam zgrany fragment.",
  post1_hasAudio = true,
  post1_audioFile = "radio_rip_ndr_1984.mp3 [1.4 MB]",
  post1_avatarColor = "#38bdf8",

  post2_author = "synth_seeker",
  post2_role = "Ekspert Sprzętu 80s",
  post2_date = "15 paź 2007, 00:15",
  post2_content = "Syntezator w tle to klasyczny Yamaha DX7. Brzmienie perkusji wskazuje na LinnDrum. Styl post-punk / new wave z Europy Środkowej.",
  post2_hasAudio = false,
  post2_audioFile = "sample_snippet.mp3 [0.6 MB]",
  post2_avatarColor = "#eab308",

  post3_author = "vinyl_hunter_99",
  post3_role = "Poszukiwacz Winyli",
  post3_date = "15 paź 2007, 10:22",
  post3_content = "Sprawdziłem niemieckie archiwa GEMA i katalogi wytwórni ZYX. Żadnych oficjalnych wydań. To musiało być nagranie demo nadesłane bezpośrednio do stacji.",
  post3_hasAudio = false,
  post3_audioFile = "radio_rip_ndr_1984.mp3 [1.4 MB]",
  post3_avatarColor = "#ef4444",

  post4_author = "lostwave_mod",
  post4_role = "Moderator Forum",
  post4_date = "16 paź 2007, 18:05",
  post4_content = "Podbijam temat. Przesłuchujemy audycje 'Musik für junge Leute'. Otwieramy oficjalny arkusz z poszlakami i wykluczonymi zespołami.",
  post4_hasAudio = false,
  post4_audioFile = "voice_note.mp3 [0.4 MB]",
  post4_avatarColor = "#10b981",

  enableScroll = true,
  postsToSkip = 2,
  scrollStartFrame = 15,
  scrollDuration = 90,
  scrollDistance = 380,
  highlightPostIndex = 3,

  // Initial Entrance Blur & Focus
  enableInitialBlur = true,
  initialBlurStartFrame = 0,
  initialBlurDuration = 25,
  initialBlurAmount = 10,

  // Focus & Target Post Effect
  enablePostFocus = true,
  focusPostIndex = 3,
  focusStartFrame = 105,
  focusDuration = 22,
  autoSyncFocusWithScroll = false,
  focusScale = 1.04,
  focusGlowColor = "#f59e0b",
  dimOtherPosts = true,
  dimOpacity = 0.35,
  dimBlurAmount = 1.5,

  // Question Marker Sweep
  enableTextMarker = true,
  markerStartFrame = 118,
  markerDuration = 26,
  targetQuestionText = "CZY KTOŚ WIE KTO TO ŚPIEWA?",

  // Raw Static Attachment
  rawFileAttachment = true,

  transparentBackground = true,
  enable3DTilt = true,
  tiltAngleX = 11,
  tiltAngleY = -7,
  tiltAngleZ = 1,
  depthPerspective = 1300,
  lowPolyMeshIntensity = 0,
  showFloatingPolygons = false,
  colorTheme = "dark-graphite",
  showScanlines = false,

  forumThemeVariant = "modern-dark",
  xpWindowTitle = "LOSTWAVE.ARCHIVE - Forum Muzyczne 1984 - Microsoft Internet Explorer",
  xpUrl = "http://forum.lostwave-archive.pl/viewtopic.php?t=1984",
  signatureText = 'Lostwave Archivist 2007 | "Taśmy z radia nigdy nie kłamią" // Yamaha DX7',
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isXP = forumThemeVariant === "retro-xp-2007";

  // Initial entrance blur calculation
  const currentInitialBlur = useMemo(() => {
    if (!enableInitialBlur) return 0;
    if (frame <= initialBlurStartFrame) return initialBlurAmount;
    const progress = (frame - initialBlurStartFrame) / Math.max(1, initialBlurDuration);
    if (progress >= 1) return 0;
    const eased = 1 - smootherStep(progress);
    return eased * initialBlurAmount;
  }, [enableInitialBlur, frame, initialBlurStartFrame, initialBlurDuration, initialBlurAmount]);

  // Scroll offset calculation
  const scrollOffset = useMemo(() => {
    if (!enableScroll || frame < scrollStartFrame) {
      return 0;
    }
    const rawProgress = (frame - scrollStartFrame) / Math.max(1, scrollDuration);
    const t = smootherStep(rawProgress);
    return t * scrollDistance;
  }, [enableScroll, frame, scrollStartFrame, scrollDuration, scrollDistance]);

  // Focus & Spotlight calculations
  const actualFocusStart = autoSyncFocusWithScroll
    ? scrollStartFrame + scrollDuration
    : focusStartFrame;

  const focusProgress =
    enablePostFocus && frame >= actualFocusStart
      ? smootherStep((frame - actualFocusStart) / Math.max(1, focusDuration))
      : 0;

  const actualMarkerStart = autoSyncFocusWithScroll
    ? actualFocusStart + 10
    : markerStartFrame;

  const markerProgress =
    enablePostFocus && enableTextMarker && frame >= actualMarkerStart
      ? smootherStep((frame - actualMarkerStart) / Math.max(1, markerDuration))
      : 0;

  const isTargetPost = (idx: number) => enablePostFocus && focusPostIndex === idx;
  const isDimmed = (idx: number) => enablePostFocus && dimOtherPosts && focusPostIndex !== idx;

  // Low-poly background mesh (computed only if opaque and enabled)
  const meshTriangles = useMemo(() => {
    if (transparentBackground || lowPolyMeshIntensity <= 0) return [];
    return generateLowPolyMesh(width, height, 7, 9, "#38bdf8");
  }, [transparentBackground, lowPolyMeshIntensity, width, height]);

  // Floating polygon facets (computed only if enabled)
  const floatingPolys = useMemo(() => {
    if (!showFloatingPolygons) return [];
    return generateFloatingPolygons(16);
  }, [showFloatingPolygons]);

  // Theme colors
  const themeColors = useMemo(() => {
    if (colorTheme === "cyber-amber") {
      return {
        bg: "#0c0a06",
        accent: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.25)",
        headerBg: "rgba(24, 20, 14, 0.95)",
      };
    } else if (colorTheme === "classic-blue") {
      return {
        bg: "#060a14",
        accent: "#38bdf8",
        glow: "rgba(56, 189, 248, 0.25)",
        headerBg: "rgba(10, 18, 32, 0.95)",
      };
    } else if (colorTheme === "vaporwave") {
      return {
        bg: "#0f0717",
        accent: "#d946ef",
        glow: "rgba(217, 70, 239, 0.25)",
        headerBg: "rgba(25, 12, 38, 0.95)",
      };
    }
    // "dark-graphite" default
    return {
      bg: "#08090d",
      accent: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.18)",
      headerBg: "rgba(13, 15, 24, 0.95)",
    };
  }, [colorTheme]);

  // Subtle natural camera sway in 3D
  const cameraSwayX = enable3DTilt ? Math.sin(frame * 0.03) * 1.5 : 0;
  const cameraSwayY = enable3DTilt ? Math.cos(frame * 0.025) * 1.2 : 0;

  // Window transform
  const windowTransform = enable3DTilt
    ? `perspective(${depthPerspective}px) rotateX(${tiltAngleX + cameraSwayX}deg) rotateY(${tiltAngleY + cameraSwayY}deg) rotateZ(${tiltAngleZ}deg)`
    : "none";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: transparentBackground ? "transparent" : themeColors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. LOW-POLY BACKGROUND MESH (Only when opaque background and mesh intensity > 0) */}
      {!transparentBackground && lowPolyMeshIntensity > 0 && meshTriangles.length > 0 && (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: "absolute",
            inset: 0,
            opacity: lowPolyMeshIntensity * 0.75,
            pointerEvents: "none",
          }}
        >
          {meshTriangles.map((tri, i) => (
            <polygon
              key={`mesh-tri-${i}`}
              points={`${tri.p1.x},${tri.p1.y} ${tri.p2.x},${tri.p2.y} ${tri.p3.x},${tri.p3.y}`}
              fill={tri.color}
              stroke={tri.stroke}
              strokeWidth="0.8"
            />
          ))}
        </svg>
      )}

      {/* 2. FLOATING LOW-POLY GEOMETRIC POLYGONS */}
      {showFloatingPolygons && floatingPolys.length > 0 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {floatingPolys.map((poly) => {
            const curY = (poly.y - (frame * poly.driftSpeedY * 0.4) + 120) % 120 - 10;
            const rot = frame * poly.rotSpeed * 2;
            return (
              <div
                key={`poly-${poly.id}`}
                style={{
                  position: "absolute",
                  left: `${poly.x}%`,
                  top: `${curY}%`,
                  width: `${poly.size}px`,
                  height: `${poly.size}px`,
                  transform: `rotate(${rot}deg)`,
                  opacity: poly.opacity,
                  filter: `drop-shadow(0 0 8px ${poly.color}66)`,
                }}
              >
                <svg viewBox="0 0 40 40" width="100%" height="100%">
                  {poly.sides === 3 ? (
                    <polygon points="20,2 38,36 2,36" fill="none" stroke={poly.color} strokeWidth="1.5" />
                  ) : poly.sides === 4 ? (
                    <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke={poly.color} strokeWidth="1.5" />
                  ) : (
                    <polygon points="20,2 37,14 30,36 10,36 3,14" fill="none" stroke={poly.color} strokeWidth="1.5" />
                  )}
                </svg>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. MAIN FORUM WINDOW (3D LOW-POLY TILTED PLANE / KWADRAT FORUM) */}
      <div
        style={{
          width: "1160px",
          height: "760px",
          transform: windowTransform,
          transformStyle: "preserve-3d",
          borderRadius: isXP ? "8px" : "14px",
          border: isXP ? "3px solid #0055ea" : "1.5px solid rgba(255, 255, 255, 0.15)",
          boxShadow: isXP
            ? "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 85, 234, 0.25)"
            : `0 25px 65px rgba(0, 0, 0, 0.92), 0 0 35px ${themeColors.glow}`,
          backgroundColor: isXP ? "#ffffff" : "rgba(10, 12, 18, 0.96)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
          filter: currentInitialBlur > 0.1 ? `blur(${currentInitialBlur.toFixed(1)}px)` : undefined,
        }}
      >
        {/* CRT Scanlines Overlay (Inside window only, does not affect alpha outside!) */}
        {showScanlines && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
              opacity: 0.35,
              zIndex: 30,
            }}
          />
        )}

        {isXP ? (
          /* ================= WINDOWS XP CHROME & 2007 phpBB HEADER ================= */
          <>
            <WindowsXPChrome title={xpWindowTitle} url={xpUrl} />

            {/* phpBB 2007 Top Header Banner */}
            <div
              style={{
                background: "linear-gradient(180deg, #0284c7 0%, #0369a1 100%)",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #075985",
                flexShrink: 0,
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Verdana, Tahoma, sans-serif",
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "0.5px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                  }}
                >
                  {forumTitle}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "Tahoma, sans-serif",
                    fontSize: "9px",
                    color: "#e0f2fe",
                    marginTop: "1px",
                  }}
                >
                  Największe polskie archiwum zagadek radiowych i kasetowych z lat 80.
                </span>
              </div>

              {/* phpBB Nav Links */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Tahoma, sans-serif",
                  fontSize: "10px",
                  color: "#ffffff",
                }}
              >
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>[FAQ]</span>
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>[Szukaj]</span>
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>[Użytkownicy]</span>
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>[Grupy]</span>
                <span style={{ textDecoration: "underline", cursor: "pointer" }}>[Zaloguj]</span>
              </div>
            </div>

            {/* Thread Navigation & Action Bar */}
            <div
              style={{
                backgroundColor: "#eef2f8",
                borderBottom: "1px solid #b0c4de",
                padding: "6px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "Tahoma, sans-serif",
                  fontSize: "10px",
                  color: "#475569",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#0055aa", fontWeight: 600 }}>Strona Główna</span>
                <span>»</span>
                <span>{threadCategory}</span>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "6px" }}>
                <div
                  style={{
                    background: "linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)",
                    border: "1px solid #0369a1",
                    borderRadius: "3px",
                    padding: "2px 8px",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#ffffff",
                    textShadow: "0 1px 1px rgba(0,0,0,0.4)",
                  }}
                >
                  + NOWY TEMAT
                </div>
                <div
                  style={{
                    background: "linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)",
                    border: "1px solid #0369a1",
                    borderRadius: "3px",
                    padding: "2px 8px",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#ffffff",
                    textShadow: "0 1px 1px rgba(0,0,0,0.4)",
                  }}
                >
                  ODPOWIEDZ
                </div>
              </div>
            </div>

            {/* Table Header: Autor | Wiadomość */}
            <div
              style={{
                backgroundColor: "#006699",
                color: "#ffffff",
                padding: "5px 16px",
                display: "flex",
                fontFamily: "Tahoma, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                borderBottom: "1px solid #004d73",
                flexShrink: 0,
              }}
            >
              <span style={{ width: "200px" }}>Autor</span>
              <span>Wiadomość</span>
            </div>
          </>
        ) : (
          /* ================= MODERN DARK NOIR FORUM HEADER ================= */
          <>
            {/* Forum Window Top Navigation Bar */}
            <div
              style={{
                height: "44px",
                backgroundColor: themeColors.headerBg,
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "0 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                zIndex: 20,
              }}
            >
              {/* Low-poly Window Controls (dots) */}
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#ef4444" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#eab308" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: "#10b981" }} />
                <span
                  style={{
                    marginLeft: "12px",
                    fontSize: "11px",
                    fontFamily: "monospace",
                    fontWeight: "700",
                    color: "#e2e8f0",
                    letterSpacing: "0.5px",
                  }}
                >
                  {forumTitle}
                </span>
              </div>

              {/* Breadcrumb path */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "#64748b",
                }}
              >
                <span>FORA</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: themeColors.accent }}>LOSTWAVE</span>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: "#94a3b8" }}>ID: #8492</span>
              </div>
            </div>

            {/* Thread Header Banner */}
            <div
              style={{
                padding: "16px 24px",
                backgroundColor: "rgba(15, 18, 28, 0.8)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                flexShrink: 0,
                zIndex: 15,
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  fontWeight: "700",
                  color: themeColors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Hash className="w-3 h-3" />
                <span>{threadCategory}</span>
              </div>

              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {threadTitle}
              </h1>

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "11px",
                  color: "#64748b",
                  fontFamily: "monospace",
                }}
              >
                {threadDate}
              </div>
            </div>
          </>
        )}

        {/* SCROLLING POSTS CONTAINER */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            padding: isXP ? "12px 16px 80px" : "20px 24px 80px",
            backgroundColor: isXP ? "#f4f6fa" : "transparent",
          }}
        >
          {/* Inner animated scroll plane */}
          <div
            style={{
              transform: `translateY(-${scrollOffset}px)`,
              display: "flex",
              flexDirection: "column",
              gap: isXP ? "8px" : "16px",
              willChange: "transform",
            }}
          >
            {isXP ? (
              <>
                {/* 2007 phpBB POST 1 (OP) */}
                <ForumPostCard2007
                  postNumber={1}
                  author={post1_author}
                  role={post1_role}
                  date={post1_date}
                  content={post1_content}
                  hasAudio={post1_hasAudio}
                  audioFile={post1_audioFile}
                  avatarColor={post1_avatarColor}
                  signature={signatureText}
                  isHighlighted={highlightPostIndex === 1}
                  frame={frame}
                  isFocused={isTargetPost(1)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(1)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(1) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />

                {/* 2007 phpBB POST 2 */}
                <ForumPostCard2007
                  postNumber={2}
                  author={post2_author}
                  role={post2_role}
                  date={post2_date}
                  content={post2_content}
                  hasAudio={post2_hasAudio}
                  audioFile={post2_audioFile}
                  avatarColor={post2_avatarColor}
                  quoteAuthor={post1_author}
                  quoteContent="Przeglądam stare nagrania radiowe z lat 80..."
                  signature='tape_collector | "Stilon Gorzów to klasyka."'
                  isHighlighted={highlightPostIndex === 2}
                  frame={frame}
                  isFocused={isTargetPost(2)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(2)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(2) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />

                {/* 2007 phpBB POST 3 (KLUCZOWY WPIS Z PYTANIEM) */}
                <ForumPostCard2007
                  postNumber={3}
                  author={post3_author}
                  role={post3_role}
                  date={post3_date}
                  content={post3_content}
                  hasAudio={post3_hasAudio}
                  audioFile={post3_audioFile}
                  avatarColor={post3_avatarColor}
                  signature='bl4nk_tape | "Taśmy z radia nigdy nie kłamią."'
                  isHighlighted={highlightPostIndex === 3}
                  frame={frame}
                  isFocused={isTargetPost(3)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(3)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(3) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />

                {/* 2007 phpBB POST 4 */}
                <ForumPostCard2007
                  postNumber={4}
                  author={post4_author}
                  role={post4_role}
                  date={post4_date}
                  content={post4_content}
                  hasAudio={post4_hasAudio}
                  audioFile={post4_audioFile}
                  avatarColor={post4_avatarColor}
                  signature='synth_seeker | "Yamaha DX7 to król lat 80."'
                  isHighlighted={highlightPostIndex === 4}
                  frame={frame}
                  isFocused={isTargetPost(4)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(4)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(4) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />
              </>
            ) : (
              <>
                {/* MODERN NOIR POST 1 (OP) */}
                <ForumPostCard
                  postNumber={1}
                  author={post1_author}
                  role={post1_role}
                  date={post1_date}
                  content={post1_content}
                  hasAudio={post1_hasAudio}
                  audioFile={post1_audioFile}
                  avatarColor={post1_avatarColor}
                  isHighlighted={highlightPostIndex === 1}
                  frame={frame}
                  isFocused={isTargetPost(1)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(1)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(1) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />

                {/* MODERN NOIR POST 2 */}
                <ForumPostCard
                  postNumber={2}
                  author={post2_author}
                  role={post2_role}
                  date={post2_date}
                  content={post2_content}
                  hasAudio={post2_hasAudio}
                  audioFile={post2_audioFile}
                  avatarColor={post2_avatarColor}
                  isHighlighted={highlightPostIndex === 2}
                  frame={frame}
                  isFocused={isTargetPost(2)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(2)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(2) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />

                {/* MODERN NOIR POST 3 (KLUCZOWY WPIS Z PYTANIEM) */}
                <ForumPostCard
                  postNumber={3}
                  author={post3_author}
                  role={post3_role}
                  date={post3_date}
                  content={post3_content}
                  hasAudio={post3_hasAudio}
                  audioFile={post3_audioFile}
                  avatarColor={post3_avatarColor}
                  isHighlighted={highlightPostIndex === 3}
                  frame={frame}
                  isFocused={isTargetPost(3)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(3)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(3) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />

                {/* MODERN NOIR POST 4 */}
                <ForumPostCard
                  postNumber={4}
                  author={post4_author}
                  role={post4_role}
                  date={post4_date}
                  content={post4_content}
                  hasAudio={post4_hasAudio}
                  audioFile={post4_audioFile}
                  avatarColor={post4_avatarColor}
                  isHighlighted={highlightPostIndex === 4}
                  frame={frame}
                  isFocused={isTargetPost(4)}
                  focusProgress={focusProgress}
                  dimmed={isDimmed(4)}
                  dimOpacity={dimOpacity}
                  dimBlurAmount={dimBlurAmount}
                  targetHeadline={isTargetPost(4) ? targetQuestionText : undefined}
                  markerProgress={markerProgress}
                  glowColor={focusGlowColor}
                  focusScale={focusScale}
                  rawFileAttachment={rawFileAttachment}
                />
              </>
            )}
          </div>

          {/* Bottom fade shadow for smooth edge scrolling */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "70px",
              background: isXP
                ? "linear-gradient(to top, rgba(244, 246, 250, 0.95), transparent)"
                : "linear-gradient(to top, rgba(10, 12, 18, 0.95), transparent)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* 4. VIGNETTE (Only when opaque background is enabled) */}
      {!transparentBackground && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.8)",
            pointerEvents: "none",
            zIndex: 31,
          }}
        />
      )}
    </div>
  );
};

