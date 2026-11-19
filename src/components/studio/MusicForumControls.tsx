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
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  Code,
  EyeOff,
  Smile,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Terminal,
  MapPin,
  Calendar,
  Award,
  AlertTriangle,
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
  const [showAuthorMeta, setShowAuthorMeta] = useState<boolean>(false);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const insertBBCode = (openTag: string, closeTag: string = "", defaultText: string = "") => {
    const key = `post${selectedPostTab}_content` as keyof MusicForumScrollProps;
    const currentText = ((props as any)[key] as string) || "";
    const textarea = contentTextareaRef.current;

    if (!textarea) {
      updateProp(key, `${currentText}${currentText ? " " : ""}${openTag}${defaultText}${closeTag}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = currentText.substring(start, end) || defaultText;
    const newText =
      currentText.substring(0, start) +
      openTag +
      selected +
      closeTag +
      currentText.substring(end);

    updateProp(key, newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + openTag.length + selected.length + closeTag.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const insertEasterEggPreset = (preset: "spoiler" | "hex" | "strike" | "badge" | "quote") => {
    switch (preset) {
      case "spoiler":
        insertBBCode(
          "[spoiler]",
          "[/spoiler]",
          "POSZLAKA: W 0:38 słychać niemieckiego prezentera mówiącego o zespole z Hamburga"
        );
        break;
      case "hex":
        insertBBCode(
          "\n[code]",
          "[/code]\n",
          "INDEX: TAPE_04 // FREQ: 10.45 kHz // BIAS: HIGH // STATUS: UNVERIFIED"
        );
        break;
      case "strike":
        insertBBCode("[s]", "[/s]", "To nagranie nigdy nie zostało wyemitowane");
        break;
      case "badge":
        insertBBCode("[badge=ADMIN]", "[/badge]", "MODERACJA: WĄTEK POD OBSERWACJĄ");
        break;
      case "quote":
        insertBBCode(
          "[quote=analog_master84]",
          "[/quote]\n",
          "Czy ktoś ma jeszcze zgrane audycje z radia NDR?"
        );
        break;
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
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
              props.forumThemeVariant === "retro-xp-2007"
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
            className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 ${
              props.forumThemeVariant !== "retro-xp-2007"
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
            className={`p-2.5 rounded-lg border text-left transition-all flex flex-col gap-1 ${
              props.forumThemeVariant === "retro-xp-2007"
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
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "posts"
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
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "scroll"
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
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "lowpoly"
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
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "duration"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Oś Czasu & Blur</span>
        </button>
      </div>

      {/* ================= TAB 1: FORUM & TREŚĆ POSTÓW ================= */}
      {activeTab === "posts" && (
        <div className="space-y-4 animate-in fade-in">
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
                    Sygnatura / Podpis Użytkownika:
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
              Edycja Treści Postów:
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#12121a] rounded-xl border border-white/5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedPostTab(num as any)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    selectedPostTab === num
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
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white">
                Parametry Postu #{selectedPostTab}
              </span>
              <span className="text-[10px] font-mono text-amber-400">
                {selectedPostTab === 1 ? "Oryginalny wpis (OP)" : "Odpowiedź na forum"}
              </span>
            </div>

            {/* Author & Role in 2 columns */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Autor (Nick):
                </label>
                <input
                  type="text"
                  value={
                    selectedPostTab === 1
                      ? props.post1_author
                      : selectedPostTab === 2
                      ? props.post2_author
                      : selectedPostTab === 3
                      ? props.post3_author
                      : props.post4_author
                  }
                  onChange={(e) =>
                    updateProp(
                      `post${selectedPostTab}_author` as any,
                      e.target.value
                    )
                  }
                  className="w-full studio-input text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                  Ranga / Tytuł:
                </label>
                <input
                  type="text"
                  value={
                    selectedPostTab === 1
                      ? props.post1_role
                      : selectedPostTab === 2
                      ? props.post2_role
                      : selectedPostTab === 3
                      ? props.post3_role
                      : props.post4_role
                  }
                  onChange={(e) =>
                    updateProp(`post${selectedPostTab}_role` as any, e.target.value)
                  }
                  className="w-full studio-input text-xs"
                />
              </div>
            </div>

            {/* Subject (Temat postu) */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Temat wiadomości (Nagłówek wpisu):
              </label>
              <input
                type="text"
                value={
                  selectedPostTab === 1
                    ? props.post1_subject
                    : selectedPostTab === 2
                    ? props.post2_subject
                    : selectedPostTab === 3
                    ? props.post3_subject
                    : props.post4_subject
                }
                onChange={(e) =>
                  updateProp(`post${selectedPostTab}_subject` as any, e.target.value)
                }
                className="w-full studio-input text-xs font-semibold"
                placeholder="np. Re: Tajemnicza piosenka z radia NDR (1984)"
              />
            </div>

            {/* Content & BBCode Editor Toolbar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono text-zinc-400 uppercase block">
                  Treść Wiadomości (BBCode & Easter Eggi):
                </label>
                <span className="text-[9px] font-mono text-zinc-500">
                  Tagi BBCode & emotki
                </span>
              </div>

              {/* BBCode Toolbar */}
              <div className="bg-[#181824] p-1.5 rounded-lg border border-white/10 space-y-1.5">
                {/* Formatting Row */}
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    title="Pogrubienie [b]...[/b]"
                    onClick={() => insertBBCode("[b]", "[/b]", "tekst pogrubiony")}
                    className="p-1 rounded bg-[#202030] hover:bg-amber-500 hover:text-black text-zinc-300 text-[10px] font-bold transition-colors flex items-center gap-0.5 px-1.5 border border-white/5"
                  >
                    <Bold className="w-3 h-3" />
                    <span>B</span>
                  </button>

                  <button
                    type="button"
                    title="Kursywa [i]...[/i]"
                    onClick={() => insertBBCode("[i]", "[/i]", "tekst pochylony")}
                    className="p-1 rounded bg-[#202030] hover:bg-amber-500 hover:text-black text-zinc-300 text-[10px] italic transition-colors flex items-center gap-0.5 px-1.5 border border-white/5"
                  >
                    <Italic className="w-3 h-3" />
                    <span>I</span>
                  </button>

                  <button
                    type="button"
                    title="Podkreślenie [u]...[/u]"
                    onClick={() => insertBBCode("[u]", "[/u]", "podkreślenie")}
                    className="p-1 rounded bg-[#202030] hover:bg-amber-500 hover:text-black text-zinc-300 text-[10px] underline transition-colors flex items-center gap-0.5 px-1.5 border border-white/5"
                  >
                    <Underline className="w-3 h-3" />
                    <span>U</span>
                  </button>

                  <button
                    type="button"
                    title="Przekreślenie / Poszlaka [s]...[/s]"
                    onClick={() => insertBBCode("[s]", "[/s]", "skreślona poszlaka")}
                    className="p-1 rounded bg-red-950/40 hover:bg-red-500 hover:text-white text-red-300 text-[10px] line-through transition-colors flex items-center gap-0.5 px-1.5 border border-red-500/30"
                  >
                    <Strikethrough className="w-3 h-3 text-red-400" />
                    <span>S</span>
                  </button>

                  <div className="h-3.5 w-px bg-white/10 mx-0.5" />

                  <button
                    type="button"
                    title="Cytat forumowy [quote=Autor]...[/quote]"
                    onClick={() => insertBBCode("[quote=analog_master84]", "[/quote]\n", "cytowany fragment wpisu")}
                    className="p-1 rounded bg-[#202030] hover:bg-amber-500 hover:text-black text-zinc-300 text-[10px] transition-colors flex items-center gap-1 px-1.5 border border-white/5"
                  >
                    <Quote className="w-3 h-3 text-amber-400" />
                    <span>CYTAT</span>
                  </button>

                  <button
                    type="button"
                    title="Blok Kodu / Terminala [code]...[/code]"
                    onClick={() => insertBBCode("\n[code]", "[/code]\n", "DANE HEX / KOD / PARAMETRY")}
                    className="p-1 rounded bg-[#202030] hover:bg-emerald-500 hover:text-black text-zinc-300 text-[10px] font-mono transition-colors flex items-center gap-1 px-1.5 border border-white/5"
                  >
                    <Code className="w-3 h-3 text-emerald-400" />
                    <span>KOD</span>
                  </button>

                  <button
                    type="button"
                    title="Spoiler / Cenzura dossier [spoiler]...[/spoiler]"
                    onClick={() => insertBBCode("[spoiler]", "[/spoiler]", "TAJNA INFORMACJA // ŚCIŚLE TAJNE")}
                    className="p-1 rounded bg-[#202030] hover:bg-purple-500 hover:text-white text-zinc-300 text-[10px] font-mono transition-colors flex items-center gap-1 px-1.5 border border-purple-500/30"
                  >
                    <EyeOff className="w-3 h-3 text-purple-400" />
                    <span>SPOILER</span>
                  </button>

                  <button
                    type="button"
                    title="Kolor tekstu [color=#38bdf8]...[/color]"
                    onClick={() => insertBBCode("[color=#38bdf8]", "[/color]", "kolorowy tekst")}
                    className="p-1 rounded bg-[#202030] hover:bg-cyan-500 hover:text-black text-zinc-300 text-[10px] transition-colors flex items-center gap-1 px-1.5 border border-cyan-500/30"
                  >
                    <Palette className="w-3 h-3 text-cyan-400" />
                    <span>KOLOR</span>
                  </button>

                  <button
                    type="button"
                    title="Odznaka / Ranga [badge=ADMIN]...[/badge]"
                    onClick={() => insertBBCode("[badge=ADMIN]", "[/badge]", "MODERACJA")}
                    className="p-1 rounded bg-[#202030] hover:bg-red-500 hover:text-white text-zinc-300 text-[10px] font-bold transition-colors flex items-center gap-1 px-1.5 border border-red-500/30"
                  >
                    <ShieldAlert className="w-3 h-3 text-red-400" />
                    <span>ODZNAKA</span>
                  </button>
                </div>

                {/* Emoticons & Easter Egg Presets Row */}
                <div className="flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-white/5 text-[10px]">
                  {/* Classic 2007 Smileys */}
                  <div className="flex items-center gap-1">
                    <span className="text-zinc-500 text-[9px] font-mono flex items-center gap-0.5">
                      <Smile className="w-2.5 h-2.5" />
                      Emotki:
                    </span>
                    {[":D", ":O", ":P", ";)", ":roll:", ":shock:", ":evil:", "8-)"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => insertBBCode(s, "", "")}
                        className="px-1.5 py-0.5 rounded bg-[#12121a] hover:bg-amber-500/20 hover:text-amber-300 text-zinc-400 font-mono text-[9px] border border-white/5 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Easter Egg quick snippets */}
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400/80 text-[9px] font-mono font-bold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      Easter Eggi:
                    </span>
                    <button
                      type="button"
                      onClick={() => insertEasterEggPreset("spoiler")}
                      className="px-1.5 py-0.5 rounded bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 text-[9px] border border-purple-500/30"
                      title="Wstaw ukryty spoiler ze śladem"
                    >
                      🕵️ Spoiler
                    </button>
                    <button
                      type="button"
                      onClick={() => insertEasterEggPreset("hex")}
                      className="px-1.5 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-mono text-[9px] border border-emerald-500/30"
                      title="Wstaw blok kodu taśmy / parametrów"
                    >
                      📟 Hex/Log
                    </button>
                    <button
                      type="button"
                      onClick={() => insertEasterEggPreset("strike")}
                      className="px-1.5 py-0.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 text-[9px] border border-red-500/30"
                      title="Wstaw skreśloną cenzurę"
                    >
                      🚫 Skreślenie
                    </button>
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <textarea
                ref={contentTextareaRef}
                rows={5}
                value={
                  selectedPostTab === 1
                    ? props.post1_content
                    : selectedPostTab === 2
                    ? props.post2_content
                    : selectedPostTab === 3
                    ? props.post3_content
                    : props.post4_content
                }
                onChange={(e) =>
                  updateProp(
                    `post${selectedPostTab}_content` as any,
                    e.target.value
                  )
                }
                className="w-full studio-input text-xs font-mono resize-y leading-relaxed"
                placeholder="Wpisz treść postu... Używaj BBCode do tworzenia ukrytych poszlak!"
              />
            </div>

            {/* Footnote Edit Note */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Notatka o edycji postu (Ostatnio zmieniony...):
              </label>
              <input
                type="text"
                value={
                  selectedPostTab === 1
                    ? props.post1_editNote
                    : selectedPostTab === 2
                    ? props.post2_editNote
                    : selectedPostTab === 3
                    ? props.post3_editNote
                    : props.post4_editNote
                }
                onChange={(e) =>
                  updateProp(`post${selectedPostTab}_editNote` as any, e.target.value)
                }
                className="w-full studio-input text-xs font-mono text-zinc-400"
                placeholder="np. Ostatnio zmieniony przez bl4nk_tape dnia 14 paź 2007, 22:04, łącznie zmieniany 2 razy."
              />
              <span className="text-[9px] text-zinc-500 block mt-0.5">
                Wyświetla się na dole postu kursywą (jak na forach phpBB / vBulletin). Znakomite na easter eggi o usuwaniu poszlak!
              </span>
            </div>

            {/* Individual Signature */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Sygnatura / Podpis Użytkownika:
              </label>
              <input
                type="text"
                value={
                  selectedPostTab === 1
                    ? props.post1_signature
                    : selectedPostTab === 2
                    ? props.post2_signature
                    : selectedPostTab === 3
                    ? props.post3_signature
                    : props.post4_signature
                }
                onChange={(e) =>
                  updateProp(`post${selectedPostTab}_signature` as any, e.target.value)
                }
                className="w-full studio-input text-xs font-mono text-zinc-300"
                placeholder='np. nick | "Ulubiony cytat" | [s]zaszyfrowany kod[/s]'
              />
              <span className="text-[9px] text-zinc-500 block mt-0.5">
                Obsługuje tagi BBCode ([b], [i], [s], [color]).
              </span>
            </div>

            {/* User Profile Stats & Easter Eggs (Collapsible Accordion) */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <button
                type="button"
                onClick={() => setShowAuthorMeta(!showAuthorMeta)}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-[#181824] hover:bg-[#202030] text-zinc-300 text-xs font-semibold border border-white/5 transition-colors"
              >
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  Profil & Statystyki Autora (Easter Eggi lewej kolumny)
                </span>
                {showAuthorMeta ? (
                  <ChevronUp className="w-4 h-4 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                )}
              </button>

              {showAuthorMeta && (
                <div className="p-3 bg-[#161622] rounded-lg border border-white/5 space-y-2.5 animate-in fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        Skąd (Lokalizacja):
                      </label>
                      <input
                        type="text"
                        value={
                          selectedPostTab === 1
                            ? props.post1_location
                            : selectedPostTab === 2
                            ? props.post2_location
                            : selectedPostTab === 3
                            ? props.post3_location
                            : props.post4_location
                        }
                        onChange={(e) =>
                          updateProp(`post${selectedPostTab}_location` as any, e.target.value)
                        }
                        className="w-full studio-input text-xs font-mono"
                        placeholder="np. Hamburg, Niemcy"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        Dołączył (Data rejestracji):
                      </label>
                      <input
                        type="text"
                        value={
                          selectedPostTab === 1
                            ? props.post1_joined
                            : selectedPostTab === 2
                            ? props.post2_joined
                            : selectedPostTab === 3
                            ? props.post3_joined
                            : props.post4_joined
                        }
                        onChange={(e) =>
                          updateProp(`post${selectedPostTab}_joined` as any, e.target.value)
                        }
                        className="w-full studio-input text-xs font-mono"
                        placeholder="np. Sie 2004"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        Liczba postów:
                      </label>
                      <input
                        type="text"
                        value={
                          selectedPostTab === 1
                            ? props.post1_postsCount
                            : selectedPostTab === 2
                            ? props.post2_postsCount
                            : selectedPostTab === 3
                            ? props.post3_postsCount
                            : props.post4_postsCount
                        }
                        onChange={(e) =>
                          updateProp(`post${selectedPostTab}_postsCount` as any, e.target.value)
                        }
                        className="w-full studio-input text-xs font-mono"
                        placeholder="np. 1,420"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                        Pochwały / Reputacja:
                      </label>
                      <input
                        type="text"
                        value={
                          selectedPostTab === 1
                            ? props.post1_reputation
                            : selectedPostTab === 2
                            ? props.post2_reputation
                            : selectedPostTab === 3
                            ? props.post3_reputation
                            : props.post4_reputation
                        }
                        onChange={(e) =>
                          updateProp(`post${selectedPostTab}_reputation` as any, e.target.value)
                        }
                        className="w-full studio-input text-xs font-mono"
                        placeholder="np. Pomógł: 42 razy"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        Ostrzeżenia:
                      </label>
                      <input
                        type="text"
                        value={
                          selectedPostTab === 1
                            ? props.post1_warnings
                            : selectedPostTab === 2
                            ? props.post2_warnings
                            : selectedPostTab === 3
                            ? props.post3_warnings
                            : props.post4_warnings
                        }
                        onChange={(e) =>
                          updateProp(`post${selectedPostTab}_warnings` as any, e.target.value)
                        }
                        className="w-full studio-input text-xs font-mono"
                        placeholder="np. Ostrzeżenia: [ 0 / 3 ]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Surowy załącznik pliku (Dla aktualnie wybranego postu) */}
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
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    Boolean((props as any)[`post${selectedPostTab}_hasAudio`])
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
      )}

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
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableScroll ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
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
                        className={`p-2 rounded-lg border text-center transition-all ${
                          props.postsToSkip === s.skip
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
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enablePostFocus
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
                        className={`p-2 rounded-lg border text-center transition-all ${
                          props.focusPostIndex === p.idx
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
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        props.enableTextMarker ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-400"
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
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        props.dimOtherPosts ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
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
                          className={`w-7 h-7 rounded-full border-2 transition-all ${
                            props.focusGlowColor === c.color
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
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          props.autoSyncFocusWithScroll
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
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.transparentBackground
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
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enable3DTilt ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
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
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  props.showFloatingPolygons ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
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
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  props.showScanlines ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
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
                  className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2 ${
                    props.colorTheme === th.id
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
                  className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                    props.durationInFrames === d.frames
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
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  props.enableInitialBlur ? "bg-cyan-500 text-black" : "bg-zinc-800 text-zinc-400"
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

