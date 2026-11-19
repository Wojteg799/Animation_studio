"use client";

import React, { useRef } from "react";
import {
  User,
  Radio,
  Clock,
  Sparkles,
  HelpCircle,
  Upload,
  Heart,
  Palette,
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
    { id: "#facc15", name: "Klasyczny Żółty (80s)", color: "#facc15" },
    { id: "#fbbf24", name: "Ciepły Bursztyn", color: "#fbbf24" },
    { id: "#f97316", name: "Vintage Pomarańcz", color: "#f97316" },
    { id: "#38bdf8", name: "Cyjan / Błękit", color: "#38bdf8" },
    { id: "#ffffff", name: "Czysta Biel (Monochrom)", color: "#ffffff" },
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
                : "Głęboka czerń #000000 (styl Joy Division)"}
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
            {props.transparentBackground ? "ALPHA (ON)" : "CZARNE TŁO"}
          </button>
        </div>
      </div>

      {/* 1. SEKCJA DARIUS (JEDYNY PODPIS NA EKRANIE) */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
        <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-amber-400" />
          Postać i Podpis:
        </span>

        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full border-2 border-yellow-400 overflow-hidden bg-black flex-shrink-0 shadow-lg"
            style={{ borderColor: props.accentColor }}
          >
            <img
              src={props.avatarUrl}
              alt={props.characterName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-[11px] flex items-center gap-1 transition-colors"
              >
                <Upload className="w-3 h-3" />
                <span>Wgraj Zdjęcie</span>
              </button>
              <button
                type="button"
                onClick={() => updateProp("avatarUrl", DARIUS_AVATAR_SVG)}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] transition-colors"
                title="Przywróć domyślną prostą ilustrację line-art"
              >
                Domyślny
              </button>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <p className="text-[10px] text-zinc-500">
              Czarno-biały wektorowy profil ze słuchawkami.
            </p>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
            Jedyny Podpis na Ekranie:
          </label>
          <input
            type="text"
            value={props.characterName}
            onChange={(e) => updateProp("characterName", e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono font-bold tracking-wider focus:border-yellow-400 focus:outline-none"
            placeholder="DARIUS"
          />
        </div>
      </div>

      {/* 2. KOLORYSTYKA CZARNO-BIAŁA Z ŻÓŁTYM AKCENTEM */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
        <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-yellow-400" />
          Kolor Akcentu (Słuchawki, Serce, Pytajnik):
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {accentColors.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => updateProp("accentColor", col.id)}
              className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                props.accentColor === col.id
                  ? "bg-white/10 border-yellow-400 text-white font-bold"
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

      {/* 3. ELEMENTY SCENY (PROSTE PRZEŁĄCZNIKI) */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2.5">
        <span className="text-xs font-semibold text-white block">
          Elementy Sceny:
        </span>

        {/* Serce & Nuty */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-zinc-200 block">1. Serduszko & Nuty</span>
            <span className="text-[10px] text-zinc-500">Darius jako wielki fan muzyki</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showHeartAndNotes", !props.showHeartAndNotes)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showHeartAndNotes ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showHeartAndNotes ? "WŁ" : "WYŁ"}
          </button>
        </div>

        {/* Radio & Kaseta */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-200 block">2. Proste Radio & Kaseta</span>
            <span className="text-[10px] text-zinc-500">Nagrywanie piosenek z radia</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showRadioAndCassette", !props.showRadioAndCassette)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showRadioAndCassette ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showRadioAndCassette ? "WŁ" : "WYŁ"}
          </button>
        </div>

        {/* Ołówek & Notowanie */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-200 block">3. Ołówek & Linie Notatek</span>
            <span className="text-[10px] text-zinc-500">Zapisywanie utworów 1, 2, 3</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showWritingPencil", !props.showWritingPencil)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showWritingPencil ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showWritingPencil ? "WŁ" : "WYŁ"}
          </button>
        </div>

        {/* Znak Zapytania */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-200 block">4. Żółty Pytajnik przy Dariusie</span>
            <span className="text-[10px] text-zinc-500">Tej konkretnej nie znał i nie zapisał</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showQuestionMark", !props.showQuestionMark)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showQuestionMark ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showQuestionMark ? "WŁ" : "WYŁ"}
          </button>
        </div>
      </div>

      {/* 4. CZASY I OŚ CZASU */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
        <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-yellow-400" />
          Synchronizacja z Lektorem:
        </span>

        {/* Całkowity czas */}
        <div>
          <label className="text-[11px] text-zinc-400 block mb-1">
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
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  props.durationInFrames === d.frames
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-300 font-bold"
                    : "bg-[#181822] border-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                <span className="text-xs font-mono">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Suwak: Kiedy wchodzi Radio */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-zinc-300">Start Radia i Kasety:</span>
            <span className="font-mono text-yellow-400">
              klatka {props.radioStartFrame} ({(props.radioStartFrame / fps).toFixed(1)}s)
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            value={props.radioStartFrame}
            onChange={(e) => updateProp("radioStartFrame", parseInt(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Suwak: Kiedy ołówek notuje */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-zinc-300">Zapisywanie Lini Utworów:</span>
            <span className="font-mono text-yellow-400">
              klatka {props.writingStartFrame} ({(props.writingStartFrame / fps).toFixed(1)}s)
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="180"
            value={props.writingStartFrame}
            onChange={(e) => updateProp("writingStartFrame", parseInt(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Suwak: Kiedy pojawia się Znak Zapytania */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-zinc-300">Pojawienie się Pytajnika:</span>
            <span className="font-mono text-yellow-400">
              klatka {props.questionMarkStartFrame} ({(props.questionMarkStartFrame / fps).toFixed(1)}s)
            </span>
          </div>
          <input
            type="range"
            min="170"
            max="260"
            value={props.questionMarkStartFrame}
            onChange={(e) => updateProp("questionMarkStartFrame", parseInt(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>
      </div>
    </div>
  );
};
