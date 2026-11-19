"use client";

import React, { useRef, useState } from "react";
import {
  User,
  Radio,
  Disc,
  FileText,
  Clock,
  Sparkles,
  HelpCircle,
  Upload,
  Check,
  Heart,
  Music,
} from "lucide-react";
import { DariusRadioStoryProps } from "../../remotion/templates/DariusRadioStory/schema";
import { DARIUS_AVATAR_SVG } from "../../remotion/templates/DariusRadioStory/darius-avatar";

interface DariusStoryControlsProps {
  props: DariusRadioStoryProps;
  updateProp: <K extends keyof DariusRadioStoryProps>(
    key: K,
    val: DariusRadioStoryProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const DariusStoryControls: React.FC<DariusStoryControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "character" | "radio" | "tracklist" | "timing"
  >("character");

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        updateProp("avatarUrl", dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const accentColors = [
    { id: "#f59e0b", name: "Złoty / Bursztyn 80s", color: "#f59e0b" },
    { id: "#38bdf8", name: "Cyjan / Neon Blue", color: "#38bdf8" },
    { id: "#ef4444", name: "Karminowa Czerwień", color: "#ef4444" },
    { id: "#10b981", name: "Szmaragdowy", color: "#10b981" },
    { id: "#ffffff", name: "Czysta Biel", color: "#ffffff" },
  ];

  return (
    <div className="space-y-4">
      {/* Alpha Transparency Switcher */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">
              Przezroczyste Tło (Alpha Channel)
            </span>
            <span className="text-[10px] text-zinc-400">
              {props.transparentBackground
                ? "100% przezroczyste tło do nałożenia na wideo (ProRes 4444)"
                : "Kinowa czerń z siatką archiwalną"}
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              updateProp("transparentBackground", !props.transparentBackground)
            }
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              props.transparentBackground
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.transparentBackground ? "ALPHA (ON)" : "CIEMNE TŁO"}
          </button>
        </div>
      </div>

      {/* Sub-tabs switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("character")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "character"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="text-[10px]">Darius</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("radio")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "radio"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span className="text-[10px]">Radio & Kaseta</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tracklist")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "tracklist"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="text-[10px]">Wkładka & Pytajnik</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("timing")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "timing"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Oś Czasu</span>
        </button>
      </div>

      {/* ================= TAB 1: POSTAĆ DARIUSA ================= */}
      {activeTab === "character" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Avatar Preview & Upload */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Awatar / Zdjęcie Dariusa:
            </span>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full border-2 border-amber-500 overflow-hidden bg-black flex-shrink-0 shadow-lg"
                style={{ borderColor: props.accentColor }}
              >
                <img
                  src={props.avatarUrl}
                  alt={props.characterName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Wgraj Własne Zdjęcie</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateProp("avatarUrl", DARIUS_AVATAR_SVG)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs transition-colors"
                    title="Przywróć domyślną retro ilustrację Dariusa"
                  >
                    Domyślny Awatar
                  </button>
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <p className="text-[10px] text-zinc-400">
                  Stylowy profil młodego pasjonata muzyki w słuchawkach lub Twoje własne zdjęcie.
                </p>
              </div>
            </div>
          </div>

          {/* Character Name & Role Texts */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Imię / Podpis Postaci:
              </label>
              <input
                type="text"
                value={props.characterName}
                onChange={(e) => updateProp("characterName", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Podtytuł / Rola Postaci:
              </label>
              <input
                type="text"
                value={props.characterRole}
                onChange={(e) => updateProp("characterRole", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Tag Śledczy:
              </label>
              <input
                type="text"
                value={props.characterTag}
                onChange={(e) => updateProp("characterTag", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Color Accent Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">
              Kolor Akcentu Stylistycznego:
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {accentColors.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateProp("accentColor", col.id)}
                  className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                    props.accentColor === col.id
                      ? "bg-white/10 border-amber-500 text-white font-bold"
                      : "bg-[#14141e] border-white/5 text-zinc-400"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: col.color }}
                  />
                  <span className="text-[9px] truncate max-w-full">{col.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Heart & Floating Notes Switcher */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-white font-semibold block flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                Serduszko & Pływające Nuty
              </span>
              <span className="text-[10px] text-zinc-500">
                Wizualizacja "darius jest wielkim fanem muzyki"
              </span>
            </div>
            <button
              type="button"
              onClick={() => updateProp("showHeartAndNotes", !props.showHeartAndNotes)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                props.showHeartAndNotes
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {props.showHeartAndNotes ? "WŁĄCZONE" : "WYŁĄCZONE"}
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 2: RADIO & NAGRYWANIE NA KASETĘ ================= */}
      {activeTab === "radio" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Stacja Radiowa & Częstotliwość:
              </label>
              <input
                type="text"
                value={props.radioStationName}
                onChange={(e) => updateProp("radioStationName", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Nazwa Audycji Radiowej:
              </label>
              <input
                type="text"
                value={props.radioShowName}
                onChange={(e) => updateProp("radioShowName", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Prowadzący Audycję (DJ):
              </label>
              <input
                type="text"
                value={props.radioHostName}
                onChange={(e) => updateProp("radioHostName", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Model / Format Kasety:
              </label>
              <input
                type="text"
                value={props.tapeLabel}
                onChange={(e) => updateProp("tapeLabel", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Tytuł Składanki (Mixtape):
              </label>
              <input
                type="text"
                value={props.mixtapeTitle}
                onChange={(e) => updateProp("mixtapeTitle", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-semibold block">
                  Fale Radiowe (Transmisja FM)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Animowane wiązki sygnału z radia na kasetę
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateProp("showRadioSignalWaves", !props.showRadioSignalWaves)
                }
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.showRadioSignalWaves
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showRadioSignalWaves ? "WŁ" : "WYŁ"}
              </button>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-semibold block">
                  Pulsująca Dioda ● REC
                </span>
                <span className="text-[10px] text-zinc-500">
                  Czerwona kontrolka nagrywania na magnetofonie
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateProp("showRecBlinker", !props.showRecBlinker)
                }
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.showRecBlinker
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showRecBlinker ? "WŁ" : "WYŁ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SPIS UTWORÓW & ZNAK ZAPYTANIA ================= */}
      {activeTab === "tracklist" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-white block">
              Zapisane Piosenki (Tytuły i Wykonawcy):
            </span>

            <div>
              <label className="text-[11px] text-emerald-400 block mb-0.5 font-mono">
                ✓ Piosenka 1:
              </label>
              <input
                type="text"
                value={props.track1}
                onChange={(e) => updateProp("track1", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-emerald-400 block mb-0.5 font-mono">
                ✓ Piosenka 2:
              </label>
              <input
                type="text"
                value={props.track2}
                onChange={(e) => updateProp("track2", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-emerald-400 block mb-0.5 font-mono">
                ✓ Piosenka 3:
              </label>
              <input
                type="text"
                value={props.track3}
                onChange={(e) => updateProp("track3", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-white/10">
              <label className="text-[11px] text-red-400 font-bold block mb-0.5 font-mono flex items-center gap-1">
                <span>⚠️ Piosenka 4 (Tajemnicza / Brak zapisu):</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={props.mysteryTrackPlaceholder}
                  onChange={(e) =>
                    updateProp("mysteryTrackPlaceholder", e.target.value)
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1e1414] border border-red-500/40 text-red-200 text-xs font-mono focus:border-red-400 focus:outline-none"
                  placeholder="??? — ???"
                />
                <input
                  type="text"
                  value={props.mysteryTrackNote}
                  onChange={(e) => updateProp("mysteryTrackNote", e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1e1414] border border-red-500/40 text-red-300 text-xs font-mono focus:border-red-400 focus:outline-none"
                  placeholder="[Brak zapowiedzi DJ-a!]"
                />
              </div>
            </div>
          </div>

          {/* Question Mark Toggle */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div>
              <span className="text-xs text-white font-semibold block flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                Duży Znak Zapytania przy Dariusie
              </span>
              <span className="text-[10px] text-zinc-500">
                Wyskakuje w punkcie kulminacyjnym tajemnicy
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                updateProp("showQuestionMark", !props.showQuestionMark)
              }
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                props.showQuestionMark
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {props.showQuestionMark ? "WŁ" : "WYŁ"}
            </button>
          </div>
        </div>
      )}

      {/* ================= TAB 4: OŚ CZASU & SYNCHRONIZACJA Z LEKTOREM ================= */}
      {activeTab === "timing" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">
              Całkowity Czas Trwania Sceny:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "8s (240 kl.)", frames: 240 },
                { label: "10s (300 kl.)", frames: 300 },
                { label: "12s (360 kl.)", frames: 360 },
              ].map((d) => (
                <button
                  key={d.frames}
                  type="button"
                  onClick={() => {
                    setDurationFrames(d.frames);
                    updateProp("durationInFrames", d.frames);
                  }}
                  className={`py-2 px-2 rounded-lg border text-center transition-all ${
                    props.durationInFrames === d.frames
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                      : "bg-[#181822] border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs block font-mono">{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keyframe timing sliders */}
          <div className="space-y-3 bg-[#12121a] p-3 rounded-xl border border-white/5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300">1. Wejście Serca i Nut:</span>
                <span className="font-mono text-amber-400">
                  klatka {props.heartNotesStartFrame} ({(props.heartNotesStartFrame / fps).toFixed(1)}s)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={props.heartNotesStartFrame}
                onChange={(e) =>
                  updateProp("heartNotesStartFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300">2. Rozpoczęcie Nagrywania z Radia:</span>
                <span className="font-mono text-amber-400">
                  klatka {props.radioStartFrame} ({(props.radioStartFrame / fps).toFixed(1)}s)
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                value={props.radioStartFrame}
                onChange={(e) =>
                  updateProp("radioStartFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300">3. Wysunięcie Wkładki z Tytułami:</span>
                <span className="font-mono text-amber-400">
                  klatka {props.jcardStartFrame} ({(props.jcardStartFrame / fps).toFixed(1)}s)
                </span>
              </div>
              <input
                type="range"
                min="110"
                max="190"
                value={props.jcardStartFrame}
                onChange={(e) =>
                  updateProp("jcardStartFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-300">4. Znak Zapytania & Pusty Utwór:</span>
                <span className="font-mono text-amber-400">
                  klatka {props.mysteryQuestionStartFrame} ({(props.mysteryQuestionStartFrame / fps).toFixed(1)}s)
                </span>
              </div>
              <input
                type="range"
                min="170"
                max="260"
                value={props.mysteryQuestionStartFrame}
                onChange={(e) =>
                  updateProp("mysteryQuestionStartFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
