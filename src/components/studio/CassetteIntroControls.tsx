"use client";

import React, { useState } from "react";
import {
  Disc,
  PenTool,
  Type,
  Palette,
  Clock,
  Sparkles,
  Sliders,
  Check,
  RotateCw,
} from "lucide-react";
import { RetroCassetteIntroProps } from "../../remotion/templates/RetroCassetteIntro/schema";

interface CassetteIntroControlsProps {
  props: RetroCassetteIntroProps;
  updateProp: <K extends keyof RetroCassetteIntroProps>(
    key: K,
    val: RetroCassetteIntroProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const CassetteIntroControls: React.FC<CassetteIntroControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "texts" | "cassette" | "style" | "duration"
  >("texts");

  const inkColors = [
    { id: "blue", name: "Niebieski Długopis", color: "#1d4ed8", desc: "Klasyczny szkolny wkład" },
    { id: "black", name: "Czarny Marker", color: "#18181b", desc: "Permanentny ciemny tusz" },
    { id: "red", name: "Czerwony Długopis", color: "#dc2626", desc: "Wyróżniający akcent" },
  ];

  const cassetteColors = [
    { id: "vintage-black", name: "Vintage Black", desc: "Klasyczny czarny plastik z lat 80.", color: "#1a1b20" },
    { id: "retro-cream", name: "Retro Cream", desc: "Kremowy beż / kość słoniowa", color: "#ded6c5" },
    { id: "dark-charcoal", name: "Grafitowy Charcoal", desc: "Nowoczesny przydymiony grafit", color: "#2d2f36" },
  ];

  const backgroundModes = [
    {
      id: "cinematic-black",
      name: "Czysta Czerń Kinowa",
      desc: "Głębokie ciemne tło pod intro YouTube",
      badge: "YouTube",
    },
    {
      id: "transparent-alpha",
      name: "Przezroczyste (Alpha Channel)",
      desc: "Natywne przezroczyste tło do ProRes 4444 i nakładania na wideo",
      badge: "Alpha",
    },
    {
      id: "subtle-glow",
      name: "Subtelne Światło Studyjne",
      desc: "Głęboki granat z lekkim reflektorem w tle",
      badge: "Spotlight",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs Navigation */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("texts")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "texts"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span className="text-[10px]">Teksty</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cassette")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "cassette"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Disc className="w-3.5 h-3.5" />
          <span className="text-[10px]">Kaseta</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("style")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "style"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="text-[10px]">Tło & Styl</span>
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
          <span className="text-[10px]">Czas</span>
        </button>
      </div>

      {/* ================= TAB 1: TEKSTY I PISMO ODRECZNE ================= */}
      {activeTab === "texts" && (
        <div className="space-y-4 animate-in fade-in">
          {/* 1. Górny napis wstępu */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                Górny Napis Intro
              </label>
              <button
                type="button"
                onClick={() => updateProp("showHeader", !props.showHeader)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                  props.showHeader
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {props.showHeader ? "WIDOCZNY" : "UKRYTY"}
              </button>
            </div>

            <input
              type="text"
              value={props.headerText}
              onChange={(e) => updateProp("headerText", e.target.value)}
              className="w-full studio-input text-xs font-medium"
              placeholder="np. HORYZONT ZDARZEŃ PREZENTUJE"
            />

            {/* Font header switcher */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              {[
                { id: "cinzel", label: "Cinzel (Kinowy)" },
                { id: "space-mono", label: "Space Mono" },
                { id: "inter", label: "Inter (Czysty)" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => updateProp("headerFont", f.id as any)}
                  className={`py-1 rounded text-[10px] transition-all ${
                    props.headerFont === f.id
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-[#181822] text-zinc-400 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Podpis odręczny na kasecie */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-amber-400" />
                Podpis na Kasecie (Odręczny)
              </label>
              <span className="text-[10px] font-mono text-amber-400">Efekt Pisania</span>
            </div>

            <textarea
              rows={2}
              value={props.cassetteTitle}
              onChange={(e) => updateProp("cassetteTitle", e.target.value)}
              className="w-full studio-input text-xs resize-none"
              placeholder="np. Najbardziej tajemnicza piosenka w historii internetu"
            />

            {/* Krój pisma odręcznego */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-400 block">Krój pisma:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => updateProp("handwritingFont", "caveat")}
                  className={`py-2 px-2.5 rounded-lg border text-left transition-all ${
                    props.handwritingFont === "caveat"
                      ? "bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold"
                      : "bg-[#181822] border-white/5 text-zinc-400"
                  }`}
                >
                  <div className="text-sm font-bold" style={{ fontFamily: "'Caveat', cursive" }}>
                    Caveat (Długopis)
                  </div>
                  <div className="text-[9px] text-zinc-500">Naturalne pismo odręczne</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateProp("handwritingFont", "permanent-marker")}
                  className={`py-2 px-2.5 rounded-lg border text-left transition-all ${
                    props.handwritingFont === "permanent-marker"
                      ? "bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold"
                      : "bg-[#181822] border-white/5 text-zinc-400"
                  }`}
                >
                  <div className="text-xs font-bold" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                    Marker
                  </div>
                  <div className="text-[9px] text-zinc-500">Grubszy marker permanentny</div>
                </button>
              </div>
            </div>

            {/* Kolor tuszu / atramentu */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-zinc-400 block">Kolor atramentu:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {inkColors.map((ink) => (
                  <button
                    key={ink.id}
                    type="button"
                    onClick={() => updateProp("inkColor", ink.id as any)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                      props.inkColor === ink.id
                        ? "bg-white/10 border-amber-500/80 text-white font-bold"
                        : "bg-[#181822] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: ink.color }}
                    />
                    <span className="text-[10px]">{ink.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Włącz/wyłącz animację widocznego długopisu */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-zinc-300">
                Pokaż fizyczny długopis piszący:
              </span>
              <button
                type="button"
                onClick={() => updateProp("showPen", !props.showPen)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.showPen
                    ? "bg-emerald-500 text-black shadow"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showPen ? "WŁĄCZONY" : "UKRYTY"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: MECHANIKA I STYL KASETY ================= */}
      {activeTab === "cassette" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Kolor obudowy kasety */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <label className="text-xs font-semibold text-white block">
              Kolor Obudowy Kasety:
            </label>
            <div className="space-y-1.5">
              {cassetteColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => updateProp("cassetteColor", c.id as any)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    props.cassetteColor === c.id
                      ? "bg-amber-500/15 border-amber-500/70 text-white"
                      : "bg-[#161622] hover:bg-[#1c1c2a] border-white/5 text-zinc-400"
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-inner flex-shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{c.name}</div>
                    <div className="text-[10px] text-zinc-400">{c.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prędkość kręcenia się szpulek */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                Prędkość Obrotu Kółek (Szpulek)
              </span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.spoolSpeed.toFixed(1)}x
              </span>
            </div>

            <input
              type="range"
              min={0.3}
              max={2.5}
              step={0.1}
              value={props.spoolSpeed}
              onChange={(e) => updateProp("spoolSpeed", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-1">
              {[
                { val: 0.6, label: "Spokojna (0.6x)" },
                { val: 1.0, label: "Realna (1.0x)" },
                { val: 1.8, label: "Szybka (1.8x)" },
              ].map((sp) => (
                <button
                  key={sp.val}
                  type="button"
                  onClick={() => updateProp("spoolSpeed", sp.val)}
                  className={`py-1 rounded text-[10px] transition-all ${
                    Math.abs(props.spoolSpeed - sp.val) < 0.1
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-[#181822] text-zinc-400"
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skala kasety & Format */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Skala Kasety</span>
                <span className="font-mono text-amber-400 font-bold">{props.scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={0.7}
                max={1.3}
                step={0.05}
                value={props.scale}
                onChange={(e) => updateProp("scale", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <span className="text-[11px] text-zinc-300 block">Strona Kasety</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(["A", "B"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateProp("side", s)}
                    className={`py-1 rounded text-xs font-bold transition-all ${
                      props.side === s
                        ? "bg-amber-500 text-black"
                        : "bg-[#181822] text-zinc-400"
                    }`}
                  >
                    Strona {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: TŁO I EKSPORT ================= */}
      {activeTab === "style" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">
              Tryb Tła Wideo:
            </label>
            <div className="space-y-2">
              {backgroundModes.map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => updateProp("backgroundMode", bg.id as any)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                    props.backgroundMode === bg.id
                      ? "bg-amber-500/15 border-amber-500/80 text-white shadow-md"
                      : "bg-[#14141e] hover:bg-[#1a1a28] border-white/5 text-zinc-400"
                  }`}
                >
                  <div className="pr-2">
                    <div className="text-xs font-bold text-white mb-0.5">{bg.name}</div>
                    <div className="text-[10px] text-zinc-400 leading-snug">{bg.desc}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/10 text-amber-300 flex-shrink-0">
                    {bg.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: CZAS TRWANIA ================= */}
      {activeTab === "duration" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <label className="text-xs font-semibold text-white block">
              Długość Animacji Intro:
            </label>
            <div className="space-y-2">
              {[
                { sec: 7, frames: 210, label: "7 sekund (Rekomendowane)", badge: "210 klatek" },
                { sec: 8, frames: 240, label: "8 sekund (Spokojne tempo)", badge: "240 klatek" },
                { sec: 6, frames: 180, label: "6 sekund (Krótkie intro)", badge: "180 klatek" },
              ].map((d) => (
                <button
                  key={d.frames}
                  type="button"
                  onClick={() => {
                    setDurationFrames(d.frames);
                    updateProp("durationInFrames", d.frames);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    durationFrames === d.frames
                      ? "bg-amber-500/20 border-amber-500/80 text-white font-bold"
                      : "bg-[#161622] border-white/5 text-zinc-400"
                  }`}
                >
                  <div>
                    <div className="text-xs text-white">{d.label}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      @{fps} fps ({d.sec} sek.)
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">{d.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
