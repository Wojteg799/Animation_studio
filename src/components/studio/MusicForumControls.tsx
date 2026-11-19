"use client";

import React, { useState, useRef } from "react";
import {
  MessageSquare,
  Move,
  Box,
  Clock,
  Check,
  Disc,
  FileAudio,
  Sparkles,
  Layers,
  Sliders,
  Palette,
  Tv,
  Target,
  Highlighter,
  Paperclip,
  Eye,
  SlidersHorizontal,
  Upload,
  Trash2,
  Image as ImageIcon,
  Quote,
} from "lucide-react";
import { MusicForumScrollProps } from "../../remotion/templates/MusicForumScroll/schema";

interface MusicForumControlsProps {
  props: MusicForumScrollProps;
  updateProp: <K extends keyof MusicForumScrollProps>(
    key: K,
    val: MusicForumScrollProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const MusicForumControls: React.FC<MusicForumControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<"posts" | "scroll" | "lowpoly" | "duration">("posts");
  const [selectedPostTab, setSelectedPostTab] = useState<1 | 2 | 3 | 4>(1);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarUpload = async (postNum: 1 | 2 | 3 | 4, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant base64 Data URL (guarantees immediate preview in player AND instant render availability)
    const reader = new FileReader();
    reader.onload = (uploadEv) => {
      const dataUrl = uploadEv.target?.result as string;
      if (dataUrl) {
        updateProp(`post${postNum}_avatarUrl` as any, dataUrl);
      }
    };
    reader.readAsDataURL(file);

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          updateProp(`post${postNum}_avatarUrl` as any, data.url);
        }
      }
    } catch (err) {
      console.warn("Avatar upload fallback to local preview", err);
    } finally {
      setUploadingAvatar(false);
      if (e.target) e.target.value = "";
    }
  };

  const themes = [
    { id: "dark-graphite", name: "Ciemny Grafit (Dossier)", color: "#38bdf8" },
    { id: "cyber-amber", name: "Cyber Bursztyn (NDR Tape)", color: "#f59e0b" },
    { id: "classic-blue", name: "Retro phpBB Błękit", color: "#60a5fa" },
    { id: "vaporwave", name: "Vaporwave / Synth", color: "#d946ef" },
  ];

  return (
    <div className="space-y-4">
      {/* Forum Style Switcher: Modern Dark vs 2007 Windows XP */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
            Wersja Stylistyczna Forum:
          </label>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${props.forumThemeVariant === "retro-xp-2007"
              ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
              : "bg-amber-500/20 text-amber-300 border-amber-500/40"
              }`}
          >
            {props.forumThemeVariant === "retro-xp-2007" ? "2007 ROK CORE" : "NOIR DARK"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Option 1: Modern Dark */}
          <button
            type="button"
            onClick={() => updateProp("forumThemeVariant", "modern-dark")}
            className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 ${props.forumThemeVariant !== "retro-xp-2007"
              ? "bg-amber-500/20 border-amber-500/80 text-amber-300 font-bold shadow"
              : "bg-[#181824] border-white/5 text-zinc-400 hover:text-white"
              }`}
          >
            <span className="text-[11px] font-bold leading-tight">1. Nowoczesny Noir</span>
            <span className="text-[9px] text-zinc-400 font-normal">
              Ciemny motyw dossier, minimalizm, akcenty neonowe
            </span>
          </button>

          {/* Option 2: Retro 2007 XP */}
          <button
            type="button"
            onClick={() => updateProp("forumThemeVariant", "retro-xp-2007")}
            className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 ${props.forumThemeVariant === "retro-xp-2007"
              ? "bg-blue-600/25 border-blue-500 text-blue-300 font-bold shadow"
              : "bg-[#181824] border-white/5 text-zinc-400 hover:text-white"
              }`}
          >
            <span className="text-[11px] font-bold text-blue-300 leading-tight">
              2. Retro 2007 (XP)
            </span>
            <span className="text-[9px] text-zinc-400 font-normal">
              Windows XP Luna Blue, IE, phpBB by Przemo
            </span>
          </button>
        </div>
      </div>

      {/* Sub-tabs switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "posts"
            ? "bg-amber-500 text-black font-bold shadow"
            : "text-zinc-400 hover:text-white"
            }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="text-[10px]">Forum & Posty</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scroll")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "scroll"
            ? "bg-amber-500 text-black font-bold shadow"
            : "text-zinc-400 hover:text-white"
            }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span className="text-[10px]">Scroll & Focus</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lowpoly")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "lowpoly"
            ? "bg-amber-500 text-black font-bold shadow"
            : "text-zinc-400 hover:text-white"
            }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span className="text-[10px]">3D & Tło</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("duration")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "duration"
            ? "bg-amber-500 text-black font-bold shadow"
            : "text-zinc-400 hover:text-white"
            }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Oś Czasu & Blur</span>
        </button>
      </div>

      {/* ================= TAB 1: FORUM & TREŚĆ POSTÓW ================= */}
      {activeTab === "posts" && (() => {
        const curAvatarUrl = (props as any)[`post${selectedPostTab}_avatarUrl`] as string | undefined;
        const curAuthor = ((props as any)[`post${selectedPostTab}_author`] as string) || "";
        const curRole = ((props as any)[`post${selectedPostTab}_role`] as string) || "";
        const curDate = ((props as any)[`post${selectedPostTab}_date`] as string) || "";
        const curContent = ((props as any)[`post${selectedPostTab}_content`] as string) || "";
        const curJoined = ((props as any)[`post${selectedPostTab}_joined`] as string) || "";
        const curPostsCount = ((props as any)[`post${selectedPostTab}_postsCount`] as string) || "";
        const curLocation = ((props as any)[`post${selectedPostTab}_location`] as string) || "";
        const curSignature = ((props as any)[`post${selectedPostTab}_signature`] as string) || "";
        const curHasQuote = Boolean((props as any)[`post${selectedPostTab}_hasQuote`]);
        const curQuoteAuthor = ((props as any)[`post${selectedPostTab}_quoteAuthor`] as string) || "";
        const curQuoteContent = ((props as any)[`post${selectedPostTab}_quoteContent`] as string) || "";
        const curAvatarColor = ((props as any)[`post${selectedPostTab}_avatarColor`] as string) || "#38bdf8";

        return (
          <div className="space-y-4 animate-in fade-in">
            {/* Hidden Avatar File Input */}
            <input
              type="file"
              ref={avatarInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleAvatarUpload(selectedPostTab, e)}
            />

            {/* Forum Header Data */}
            <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
              <span className="text-xs font-bold text-white block border-b border-white/5 pb-1.5">
                Nagłówek Forum & Wątku:
              </span>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Tytuł Forum:
                </label>
                <input
                  type="text"
                  value={props.forumTitle}
                  onChange={(e) => updateProp("forumTitle", e.target.value)}
                  className="w-full studio-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Podtytuł / Hasło Forum (np. phpBB):
                </label>
                <input
                  type="text"
                  value={props.forumSubtitle || ""}
                  onChange={(e) => updateProp("forumSubtitle", e.target.value)}
                  className="w-full studio-input text-xs font-mono"
                  placeholder="np. Największe polskie archiwum zagadek radiowych..."
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Temat Wątku:
                </label>
                <input
                  type="text"
                  value={props.threadTitle}
                  onChange={(e) => updateProp("threadTitle", e.target.value)}
                  className="w-full studio-input text-xs font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Dział / Kategoria:
                </label>
                <input
                  type="text"
                  value={props.threadCategory}
                  onChange={(e) => updateProp("threadCategory", e.target.value)}
                  className="w-full studio-input text-xs font-mono uppercase"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Data Wątku & Liczba Odpowiedzi:
                </label>
                <input
                  type="text"
                  value={props.threadDate || ""}
                  onChange={(e) => updateProp("threadDate", e.target.value)}
                  className="w-full studio-input text-xs font-mono"
                  placeholder="np. Wątek założony: 14.10.2007 • 142 odpowiedzi"
                />
              </div>

              {props.forumThemeVariant === "retro-xp-2007" && (
                <div className="pt-2 border-t border-white/5 space-y-3">
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block">
                    Ustawienia Windows XP & 2007 Core:
                  </span>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Tytuł Paska Windows XP:
                    </label>
                    <input
                      type="text"
                      value={props.xpWindowTitle}
                      onChange={(e) => updateProp("xpWindowTitle", e.target.value)}
                      className="w-full studio-input text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Adres Strony (Pasek URL):
                    </label>
                    <input
                      type="text"
                      value={props.xpUrl}
                      onChange={(e) => updateProp("xpUrl", e.target.value)}
                      className="w-full studio-input text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Domyślna Sygnatura Użytkownika:
                    </label>
                    <input
                      type="text"
                      value={props.signatureText}
                      onChange={(e) => updateProp("signatureText", e.target.value)}
                      className="w-full studio-input text-xs italic"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Posts Switcher (Post 1, Post 2, Post 3, Post 4) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white block">
                Wybór Postu do Edycji:
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-[#12121a] rounded-xl border border-white/5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedPostTab(num as any)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${selectedPostTab === num
                      ? "bg-amber-500 text-black font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    <span>Post #{num}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Post Form */}
            <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3.5">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-white">
                  Edycja Postu #{selectedPostTab}
                </span>
                <span className="text-[10px] font-mono text-amber-400">
                  {selectedPostTab === 1 ? "Oryginalny wpis (OP)" : `Odpowiedź #${selectedPostTab}`}
                </span>
              </div>

              {/* 1. ZDJĘCIE PROFILOWE (AVATAR) */}
              <div className="p-3 bg-[#0b0c12] rounded-lg border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    Zdjęcie Profilowe Postu #{selectedPostTab}
                  </span>
                  {curAvatarUrl ? (
                    <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      WŁASNE ZDJĘCIE
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded">
                      DOMYŚLNY WEKTOR
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-lg overflow-hidden border-2 flex items-center justify-center flex-shrink-0 bg-black/50 shadow-inner"
                    style={{ borderColor: curAvatarColor }}
                  >
                    {curAvatarUrl ? (
                      <img
                        src={curAvatarUrl}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Disc className="w-7 h-7" style={{ color: curAvatarColor }} />
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={uploadingAvatar}
                        onClick={() => avatarInputRef.current?.click()}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{curAvatarUrl ? "Zmień Zdjęcie" : "Wgraj Zdjęcie"}</span>
                      </button>

                      {curAvatarUrl && (
                        <button
                          type="button"
                          onClick={() => updateProp(`post${selectedPostTab}_avatarUrl` as any, "")}
                          className="px-2.5 py-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Usuń</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[9px] text-zinc-400">
                      Widoczne w ramce Windows XP (80x80) oraz Noir (z neonową ramką).
                    </p>
                  </div>
                </div>

                {/* Kolor akcentu / obwódki avatara */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">Kolor akcentu avatara:</span>
                  <div className="flex items-center gap-1.5">
                    {["#38bdf8", "#ef4444", "#eab308", "#10b981", "#a855f7", "#64748b"].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => updateProp(`post${selectedPostTab}_avatarColor` as any, c)}
                        className={`w-5 h-5 rounded-full transition-all border ${curAvatarColor === c ? "border-white scale-110 shadow" : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. AUTOR & RANGA & DATA */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Autor (Nick):
                  </label>
                  <input
                    type="text"
                    value={curAuthor}
                    onChange={(e) => updateProp(`post${selectedPostTab}_author` as any, e.target.value)}
                    className="w-full studio-input text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Ranga / Tytuł:
                  </label>
                  <input
                    type="text"
                    value={curRole}
                    onChange={(e) => updateProp(`post${selectedPostTab}_role` as any, e.target.value)}
                    className="w-full studio-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Data Wpisu:
                </label>
                <input
                  type="text"
                  value={curDate}
                  onChange={(e) => updateProp(`post${selectedPostTab}_date` as any, e.target.value)}
                  className="w-full studio-input text-xs font-mono"
                  placeholder="np. 14 paź 2007, 21:40"
                />
              </div>

              {/* 3. METADANE PROFILU (KOLUMNA LEWA) */}
              <div className="p-3 bg-[#0b0c12] rounded-lg border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">
                  Metadane Profilu (Kolumna Użytkownika):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">
                      Dołączył:
                    </label>
                    <input
                      type="text"
                      value={curJoined}
                      onChange={(e) => updateProp(`post${selectedPostTab}_joined` as any, e.target.value)}
                      className="w-full studio-input text-[11px] font-mono"
                      placeholder="np. Paź 2007"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">
                      Postów:
                    </label>
                    <input
                      type="text"
                      value={curPostsCount}
                      onChange={(e) => updateProp(`post${selectedPostTab}_postsCount` as any, e.target.value)}
                      className="w-full studio-input text-[11px] font-mono"
                      placeholder="np. 42"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">
                      Skąd / Miasto:
                    </label>
                    <input
                      type="text"
                      value={curLocation}
                      onChange={(e) => updateProp(`post${selectedPostTab}_location` as any, e.target.value)}
                      className="w-full studio-input text-[11px] font-mono"
                      placeholder="np. Hamburg"
                    />
                  </div>
                </div>
              </div>

              {/* 4. CYTAT Z INNEGO UŻYTKOWNIKA */}
              <div className="p-3 bg-[#0b0c12] rounded-lg border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-amber-400" />
                    Cytat w Poście #{selectedPostTab}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateProp(`post${selectedPostTab}_hasQuote` as any, !curHasQuote)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${curHasQuote
                      ? "bg-amber-500 text-black shadow-sm"
                      : "bg-zinc-800 text-zinc-400"
                      }`}
                  >
                    {curHasQuote ? "WŁĄCZONY" : "WYŁĄCZONY"}
                  </button>
                </div>

                {curHasQuote && (
                  <div className="space-y-2 pt-1 animate-in fade-in">
                    <div>
                      <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">
                        Autor Cytowanego Postu:
                      </label>
                      <input
                        type="text"
                        value={curQuoteAuthor}
                        onChange={(e) => updateProp(`post${selectedPostTab}_quoteAuthor` as any, e.target.value)}
                        className="w-full studio-input text-xs font-mono"
                        placeholder="np. bl4nk_tape"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">
                        Treść Cytatu:
                      </label>
                      <textarea
                        rows={2}
                        value={curQuoteContent}
                        onChange={(e) => updateProp(`post${selectedPostTab}_quoteContent` as any, e.target.value)}
                        className="w-full studio-input text-xs resize-none"
                        placeholder="np. Przeglądam stare nagrania radiowe z lat 80..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 5. TREŚĆ WIADOMOŚCI */}
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Treść Wiadomości:
                </label>
                <textarea
                  rows={3}
                  value={curContent}
                  onChange={(e) => updateProp(`post${selectedPostTab}_content` as any, e.target.value)}
                  className="w-full studio-input text-xs resize-none"
                />
              </div>

              {/* 6. SYGNATURA / PODPIS POSTU */}
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Sygnatura / Podpis Użytkownika (Stopka Postu #{selectedPostTab}):
                </label>
                <input
                  type="text"
                  value={curSignature}
                  onChange={(e) => updateProp(`post${selectedPostTab}_signature` as any, e.target.value)}
                  className="w-full studio-input text-xs italic font-mono"
                  placeholder='np. bl4nk_tape | "Taśmy z radia nigdy nie kłamią."'
                />
              </div>

              {/* 7. SUROWY ZAŁĄCZNIK PLIKU */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                    Załącznik Pliku dla Postu #{selectedPostTab} (Surowy plik)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const propKey = `post${selectedPostTab}_hasAudio` as keyof MusicForumScrollProps;
                      updateProp(propKey, !(props as any)[propKey]);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${Boolean((props as any)[`post${selectedPostTab}_hasAudio`])
                      ? "bg-cyan-500 text-black shadow-sm shadow-cyan-500/20"
                      : "bg-zinc-800 text-zinc-400"
                      }`}
                  >
                    {Boolean((props as any)[`post${selectedPostTab}_hasAudio`]) ? "WŁĄCZONY" : "WYŁĄCZONY"}
                  </button>
                </div>

                {Boolean((props as any)[`post${selectedPostTab}_hasAudio`]) && (
                  <div className="animate-in fade-in space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Nazwa Pliku Audio:
                    </label>
                    <input
                      type="text"
                      value={((props as any)[`post${selectedPostTab}_audioFile`] as string) || ""}
                      onChange={(e) =>
                        updateProp(`post${selectedPostTab}_audioFile` as any, e.target.value)
                      }
                      className="w-full studio-input text-xs font-mono"
                      placeholder="np. radio_rip_ndr_1984.mp3 [1.4 MB]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ================= TAB 2: PRZEWIJANIE (SCROLL) ================= */}
      {activeTab === "scroll" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Automatyczne Przewijanie Forum
                </span>
                <span className="text-[10px] text-zinc-400">
                  Płynny ruch w dół symulujący czytanie wątku
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableScroll", !props.enableScroll)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${props.enableScroll ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.enableScroll ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            {props.enableScroll && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                {/* Posts to Skip selector */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-300">
                    <span>Ile postów ma być pominiętych (scroll):</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.postsToSkip} {props.postsToSkip === 1 ? "post" : "posty"}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { skip: 0, px: 0, label: "0 postów (OP)" },
                      { skip: 1, px: 190, label: "1 post" },
                      { skip: 2, px: 380, label: "2 posty (Zalecane)" },
                      { skip: 3, px: 570, label: "3 posty" },
                    ].map((s) => (
                      <button
                        key={s.skip}
                        type="button"
                        onClick={() => {
                          updateProp("postsToSkip", s.skip);
                          updateProp("scrollDistance", s.px);
                        }}
                        className={`p-2 rounded-lg border text-center transition-all ${props.postsToSkip === s.skip
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-[#181822] border-white/5 text-zinc-400 hover:text-white"
                          }`}
                      >
                        <span className="text-[10px] block">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scroll Distance Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-300">
                    <span>Dystans Przewinięcia (Piksele)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.scrollDistance} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={800}
                    step={10}
                    value={props.scrollDistance}
                    onChange={(e) => updateProp("scrollDistance", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Scroll Timing */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Klatka Startu Przewijania:
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={props.scrollStartFrame}
                      onChange={(e) => updateProp("scrollStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                      {(props.scrollStartFrame / fps).toFixed(2)}s
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Czas Przewijania (klatki):
                    </label>
                    <input
                      type="number"
                      min={20}
                      max={300}
                      value={props.scrollDuration}
                      onChange={(e) => updateProp("scrollDuration", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                      {(props.scrollDuration / fps).toFixed(2)}s
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Focus, Spotlight & Animated Marker Feature */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  Focus & Zatrzymanie na Kluczowym Pytaniu
                </span>
                <span className="text-[10px] text-zinc-400">
                  Przewija wątek, zatrzymuje się na poście, powiększa go i nakłada zakreślacz
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enablePostFocus", !props.enablePostFocus)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${props.enablePostFocus
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                  : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.enablePostFocus ? "WŁĄCZONY" : "WYŁĄCZONY"}
              </button>
            </div>

            {props.enablePostFocus && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                {/* Target Post Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block">
                    Post Docelowy (Zatrzymanie Scrolla & Focus):
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { idx: 1, label: "Post #1" },
                      { idx: 2, label: "Post #2" },
                      { idx: 3, label: "Post #3 (Kluczowy)" },
                      { idx: 4, label: "Post #4" },
                    ].map((p) => (
                      <button
                        key={p.idx}
                        type="button"
                        onClick={() => updateProp("focusPostIndex", p.idx)}
                        className={`p-2 rounded-lg border text-center transition-all ${props.focusPostIndex === p.idx
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                          : "bg-[#181822] border-white/5 text-zinc-400 hover:text-white"
                          }`}
                      >
                        <span className="text-[10px] block">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Text Highlighter & Headline */}
                <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Highlighter className="w-3.5 h-3.5 text-yellow-400" />
                      Animowany Żółty Zakreślacz Tekstu
                    </span>
                    <button
                      type="button"
                      onClick={() => updateProp("enableTextMarker", !props.enableTextMarker)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.enableTextMarker ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-400"
                        }`}
                    >
                      {props.enableTextMarker ? "WŁĄCZONY" : "WYŁĄCZONY"}
                    </button>
                  </div>

                  {props.enableTextMarker && (
                    <div className="space-y-2 pt-1">
                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                          Treść Pytania do Zakreślenia:
                        </label>
                        <input
                          type="text"
                          value={props.targetQuestionText}
                          onChange={(e) => updateProp("targetQuestionText", e.target.value)}
                          className="w-full studio-input text-xs font-bold text-yellow-300"
                          placeholder="np. CZY KTOŚ WIE KTO TO ŚPIEWA?"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">
                            W której klatce ma się podkreślić:
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={500}
                            value={props.markerStartFrame}
                            onChange={(e) => updateProp("markerStartFrame", Number(e.target.value))}
                            className="studio-input text-xs font-mono text-center text-yellow-300 font-bold"
                          />
                          <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                            {(props.markerStartFrame / fps).toFixed(2)}s
                          </span>
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">
                            Czas trwania podkreślenia (klatki):
                          </label>
                          <input
                            type="number"
                            min={5}
                            max={120}
                            value={props.markerDuration}
                            onChange={(e) => updateProp("markerDuration", Number(e.target.value))}
                            className="studio-input text-xs font-mono text-center"
                          />
                          <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                            {(props.markerDuration / fps).toFixed(2)}s
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scaling & Dimming Sliders */}
                <div className="space-y-2.5 pt-1">
                  {/* Focus Scale */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] text-zinc-300">
                      <span>Powiększenie Postu w Focusie (Zoom)</span>
                      <span className="font-mono text-amber-400 font-bold">
                        {props.focusScale}x
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1.0}
                      max={1.12}
                      step={0.01}
                      value={props.focusScale}
                      onChange={(e) => updateProp("focusScale", Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Spotlight Dimming */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-zinc-300">
                      Wyciemnij Pozostałe Posty (Spotlight)
                    </span>
                    <button
                      type="button"
                      onClick={() => updateProp("dimOtherPosts", !props.dimOtherPosts)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.dimOtherPosts ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                        }`}
                    >
                      {props.dimOtherPosts ? "WŁ" : "WYŁ"}
                    </button>
                  </div>

                  {props.dimOtherPosts && (
                    <div className="space-y-2 pl-2 border-l border-white/10">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-zinc-400">
                          <span>Jasność Tła Pozostałych Postów</span>
                          <span className="font-mono text-zinc-200">
                            {Math.round(props.dimOpacity * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0.05}
                          max={0.7}
                          step={0.05}
                          value={props.dimOpacity}
                          onChange={(e) => updateProp("dimOpacity", Number(e.target.value))}
                          className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] text-zinc-400">
                          <span>Rozmycie Tła Pozostałych Postów (Depth Blur)</span>
                          <span className="font-mono text-amber-400 font-bold">
                            {props.dimBlurAmount} px
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={6}
                          step={0.5}
                          value={props.dimBlurAmount}
                          onChange={(e) => updateProp("dimBlurAmount", Number(e.target.value))}
                          className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Glow Color Presets */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block">
                      Kolor Poświaty Ramki (Glow):
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { color: "#f59e0b", label: "Bursztyn" },
                        { color: "#38bdf8", label: "Błękit" },
                        { color: "#ef4444", label: "Czerwień" },
                        { color: "#10b981", label: "Zieleń" },
                        { color: "#a855f7", label: "Fiolet" },
                      ].map((c) => (
                        <button
                          key={c.color}
                          type="button"
                          onClick={() => updateProp("focusGlowColor", c.color)}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${props.focusGlowColor === c.color
                            ? "scale-110 border-white shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          style={{ backgroundColor: c.color }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Timing & Synchronization */}
                  <div className="p-2.5 rounded-lg bg-[#181822] border border-white/5 space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-zinc-300">
                        Auto-synchronizacja z Zatrzymaniem Scrolla
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateProp(
                            "autoSyncFocusWithScroll",
                            !props.autoSyncFocusWithScroll
                          )
                        }
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.autoSyncFocusWithScroll
                          ? "bg-emerald-500 text-black"
                          : "bg-zinc-800 text-zinc-400"
                          }`}
                      >
                        {props.autoSyncFocusWithScroll ? "AUTO (ZALECANE)" : "RĘCZNA KLATKA"}
                      </button>
                    </div>

                    {!props.autoSyncFocusWithScroll && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">
                            Klatka Startu Focusu:
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={500}
                            value={props.focusStartFrame}
                            onChange={(e) => updateProp("focusStartFrame", Number(e.target.value))}
                            className="studio-input text-xs font-mono text-center font-bold text-amber-300"
                          />
                          <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                            {(props.focusStartFrame / fps).toFixed(2)}s
                          </span>
                        </div>

                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">
                            Czas Powiększania (klatki):
                          </label>
                          <input
                            type="number"
                            min={5}
                            max={120}
                            value={props.focusDuration}
                            onChange={(e) => updateProp("focusDuration", Number(e.target.value))}
                            className="studio-input text-xs font-mono text-center"
                          />
                          <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                            {(props.focusDuration / fps).toFixed(2)}s
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: 3D LOW-POLY & STYL ================= */}
      {activeTab === "lowpoly" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Transparency & Background Mode */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Przezroczyste Tło (Alpha Channel)
                </span>
                <span className="text-[10px] text-zinc-400">
                  {props.transparentBackground
                    ? "Tylko okno forum (kwadrat), 100% przezroczyste tło na wideo"
                    : "Ciemne, pełnoekranowe tło dossier"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("transparentBackground", !props.transparentBackground)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${props.transparentBackground
                  ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                  : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.transparentBackground ? "ALPHA (ON)" : "CIEMNE TŁO"}
              </button>
            </div>
            {props.transparentBackground && (
              <p className="text-[10px] text-emerald-400/90 font-mono bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                ✓ Wyeksportuj w formacie ProRes 4444, aby nałożyć samo okno forum na film w montażu.
              </p>
            )}
          </div>

          {/* 3D Tilt toggle */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Kąt 3D (Nachylenie Okna Forum)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Perspektywa 3D w stylu ujęć dokumentalnych
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enable3DTilt", !props.enable3DTilt)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${props.enable3DTilt ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.enable3DTilt ? "3D KĄT" : "PŁASKIE 2D"}
              </button>
            </div>

            {props.enable3DTilt && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                {/* Tilt X */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-zinc-300">
                    <span>Nachylenie w pionie (Kąt X)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.tiltAngleX}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={25}
                    value={props.tiltAngleX}
                    onChange={(e) => updateProp("tiltAngleX", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Tilt Y */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-zinc-300">
                    <span>Obrót w poziomie (Kąt Y)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.tiltAngleY}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={20}
                    value={props.tiltAngleY}
                    onChange={(e) => updateProp("tiltAngleY", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Optional Background Effects & Figures */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Dodatkowe Elementy & Figury:
            </span>

            {/* Floating figures toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-medium block">
                  Pływające Figury (Wielokąty / Kryształy)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Geometryczne drobiny za oknem (domyślnie wyłączone)
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("showFloatingPolygons", !props.showFloatingPolygons)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.showFloatingPolygons ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.showFloatingPolygons ? "ON" : "OFF"}
              </button>
            </div>

            {/* Mesh intensity */}
            {!props.transparentBackground && (
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[11px] text-zinc-300">
                  <span>Intensywność Siatki Wektorowej</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {(props.lowPolyMeshIntensity * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={props.lowPolyMeshIntensity}
                  onChange={(e) => updateProp("lowPolyMeshIntensity", Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Scanlines CRT (Inside window) */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-medium block">
                  Linie Skanowania CRT (Wewnątrz Okna)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Analogowa tekstura monitora na postach
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("showScanlines", !props.showScanlines)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.showScanlines ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.showScanlines ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Color Themes */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Motyw Kolorystyczny:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {themes.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => updateProp("colorTheme", th.id as any)}
                  className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2 ${props.colorTheme === th.id
                    ? "bg-amber-500/15 border-amber-500 text-white font-bold"
                    : "bg-[#181822] border-white/5 text-zinc-400"
                    }`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: th.color }}
                  />
                  <span className="text-[10px]">{th.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: PRECYZYJNA OŚ CZASU & ROZMYCIE ================= */}
      {activeTab === "duration" && (
        <div className="space-y-4 animate-in fade-in">
          {/* 1. Całkowity Czas Trwania Animacji */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Całkowita Długość Animacji
                </span>
                <span className="text-[10px] text-zinc-400">
                  Czas trwania całej sceny w klatkach i sekundach
                </span>
              </div>
              <span className="font-mono text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {(props.durationInFrames / fps).toFixed(2)} sek. ({props.durationInFrames} kl.)
              </span>
            </div>

            {/* Manual Frame & Seconds Input */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Dokładna Liczba Klatek:
                </label>
                <input
                  type="number"
                  min={60}
                  max={900}
                  step={10}
                  value={props.durationInFrames}
                  onChange={(e) => {
                    const frames = Number(e.target.value);
                    setDurationFrames(frames);
                    updateProp("durationInFrames", frames);
                  }}
                  className="studio-input text-xs font-mono text-center font-bold text-amber-300"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Czas w Sekundach (@{fps} fps):
                </label>
                <input
                  type="number"
                  min={2}
                  max={30}
                  step={0.5}
                  value={Number((props.durationInFrames / fps).toFixed(1))}
                  onChange={(e) => {
                    const sec = Number(e.target.value);
                    const frames = Math.round(sec * fps);
                    setDurationFrames(frames);
                    updateProp("durationInFrames", frames);
                  }}
                  className="studio-input text-xs font-mono text-center"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { sec: 5, frames: 150, label: "5s (Krótka)" },
                { sec: 8, frames: 240, label: "8s (Zalecana)" },
                { sec: 10, frames: 300, label: "10s (Długa)" },
                { sec: 12, frames: 360, label: "12s" },
                { sec: 15, frames: 450, label: "15s" },
                { sec: 20, frames: 600, label: "20s" },
              ].map((d) => (
                <button
                  key={d.frames}
                  type="button"
                  onClick={() => {
                    setDurationFrames(d.frames);
                    updateProp("durationInFrames", d.frames);
                  }}
                  className={`py-1.5 px-2 rounded-lg border text-center transition-all ${props.durationInFrames === d.frames
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                    : "bg-[#181822] border-white/5 text-zinc-400 hover:text-white"
                    }`}
                >
                  <span className="text-[10px] block font-mono">{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Wizualna Oś Czasu (Timeline Breakdown) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <span className="text-xs font-semibold text-white block">
              Podgląd Kolejności Zdarzeń na Osi Czasu:
            </span>

            {/* Visual multi-segment bar */}
            <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden flex border border-white/10">
              {/* Blur phase */}
              <div
                style={{
                  width: `${Math.min(100, ((props.initialBlurDuration) / props.durationInFrames) * 100)}%`,
                  backgroundColor: "#38bdf8",
                }}
                title={`Rozmycie początkowe: 0-${props.initialBlurDuration} kl.`}
              />
              {/* Scroll phase */}
              <div
                style={{
                  width: `${Math.min(100, (props.scrollDuration / props.durationInFrames) * 100)}%`,
                  backgroundColor: "#f59e0b",
                }}
                title={`Przewijanie: ${props.scrollStartFrame}-${props.scrollStartFrame + props.scrollDuration} kl.`}
              />
              {/* Marker Sweep */}
              <div
                style={{
                  width: `${Math.min(100, (props.markerDuration / props.durationInFrames) * 100)}%`,
                  backgroundColor: "#eab308",
                }}
                title={`Podkreślenie tekstu: ${props.markerStartFrame}-${props.markerStartFrame + props.markerDuration} kl.`}
              />
              {/* Rest: Read / Inspect */}
              <div
                style={{ flex: 1, backgroundColor: "#10b981" }}
                title="Spokojny podgląd / czytanie posta do końca"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                <span>0s - {(props.initialBlurDuration / fps).toFixed(1)}s: Wyostrzenie blur</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span>{(props.scrollStartFrame / fps).toFixed(1)}s - {((props.scrollStartFrame + props.scrollDuration) / fps).toFixed(1)}s: Scroll</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#eab308]" />
                <span>{(props.markerStartFrame / fps).toFixed(1)}s: Żółty zakreślacz</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>Do końca: Focus & Pytanie</span>
              </div>
            </div>
          </div>

          {/* 3. Rozmycie na Starcie (Initial Blur) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Rozmycie na Początku (Initial Blur)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Animacja startuje rozmyta i płynnie się wyostrza
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableInitialBlur", !props.enableInitialBlur)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${props.enableInitialBlur ? "bg-cyan-500 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.enableInitialBlur ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            {props.enableInitialBlur && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Klatka Startu Wyostrzania:
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={props.initialBlurStartFrame}
                      onChange={(e) => updateProp("initialBlurStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                      {(props.initialBlurStartFrame / fps).toFixed(2)}s
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Czas Trwania Rozmycia (klatki):
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={props.initialBlurDuration}
                      onChange={(e) => updateProp("initialBlurDuration", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5 text-center">
                      {(props.initialBlurDuration / fps).toFixed(2)}s
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400">
                    <span>Maksymalna Siła Rozmycia (Początek)</span>
                    <span className="font-mono text-cyan-400 font-bold">{props.initialBlurAmount} px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    step={1}
                    value={props.initialBlurAmount}
                    onChange={(e) => updateProp("initialBlurAmount", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Precyzyjne Klatki: Omijanie Postów & Podkreślenie */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Precyzyjne Punkty Czasowe (Klatka po Klatce):
            </span>

            <div className="space-y-2.5">
              {/* Scroll Timing row */}
              <div className="p-2.5 rounded-lg bg-[#181822] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-zinc-300">
                    1. Przewijanie & Omijanie Postów ({props.postsToSkip} {props.postsToSkip === 1 ? "post" : "posty"})
                  </span>
                  <span className="text-[10px] font-mono text-amber-400">
                    klatka {props.scrollStartFrame} → {props.scrollStartFrame + props.scrollDuration}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-zinc-400 block mb-0.5">Start Scrolla (klatka):</label>
                    <input
                      type="number"
                      min={0}
                      max={200}
                      value={props.scrollStartFrame}
                      onChange={(e) => updateProp("scrollStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-zinc-400 block mb-0.5">Czas Scrolla (klatki):</label>
                    <input
                      type="number"
                      min={20}
                      max={300}
                      value={props.scrollDuration}
                      onChange={(e) => updateProp("scrollDuration", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Focus Timing row */}
              <div className="p-2.5 rounded-lg bg-[#181822] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-zinc-300">
                    2. Start Focusu & Powiększenie Postu #{props.focusPostIndex}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400">
                    klatka {props.focusStartFrame} ({(props.focusStartFrame / fps).toFixed(2)}s)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-zinc-400 block mb-0.5">Start Focusu (klatka):</label>
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={props.focusStartFrame}
                      onChange={(e) => updateProp("focusStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center font-bold text-amber-300"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-zinc-400 block mb-0.5">Czas Wchodzenia w Focus:</label>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={props.focusDuration}
                      onChange={(e) => updateProp("focusDuration", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Marker Timing row */}
              <div className="p-2.5 rounded-lg bg-[#181822] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-yellow-300 flex items-center gap-1.5">
                    <Highlighter className="w-3 h-3 text-yellow-400" />
                    3. W Której Klatce Ma Się Podkreślić:
                  </span>
                  <span className="text-[10px] font-mono text-yellow-400 font-bold">
                    klatka {props.markerStartFrame} ({(props.markerStartFrame / fps).toFixed(2)}s)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-zinc-400 block mb-0.5">Klatka Podkreślenia:</label>
                    <input
                      type="number"
                      min={0}
                      max={500}
                      value={props.markerStartFrame}
                      onChange={(e) => updateProp("markerStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center font-bold text-yellow-300"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-zinc-400 block mb-0.5">Czas Podkreślania (klatki):</label>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={props.markerDuration}
                      onChange={(e) => updateProp("markerDuration", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

