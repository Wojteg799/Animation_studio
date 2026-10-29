"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Sliders,
  Wind,
  Layers,
  Circle,
  Eye,
  RefreshCw,
  Clock,
  Flame,
} from "lucide-react";
import { CinematicParticlesBackgroundProps } from "../../remotion/templates/CinematicParticlesBackground/schema";

interface ParticlesControlsProps {
  props: CinematicParticlesBackgroundProps;
  updateProp: <K extends keyof CinematicParticlesBackgroundProps>(
    key: K,
    val: CinematicParticlesBackgroundProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const ParticlesControls: React.FC<ParticlesControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"particles" | "atmosphere" | "loop">("particles");

  const tintOptions = [
    {
      id: "deep-obsidian",
      name: "Deep Obsidian Noir",
      desc: "Kinowy głęboki grafit z aksamitną winietą (domyślny)",
      preview: "radial-gradient(circle, #0d1017 0%, #020305 100%)",
    },
    {
      id: "midnight-blue",
      name: "Midnight Cosmic Blue",
      desc: "Zimny nocny granat, styl wywiadowczy i geopolityczny",
      preview: "radial-gradient(circle, #0c1527 0%, #010308 100%)",
    },
    {
      id: "warm-charcoal",
      name: "Archival Warm Charcoal",
      desc: "Ciepły popiół i węgiel, styl archiwalnego dokumentu",
      preview: "radial-gradient(circle, #16120e 0%, #030202 100%)",
    },
    {
      id: "emerald-void",
      name: "Emerald Void",
      desc: "Dyskretny odcień zieleni radarowej i terminala",
      preview: "radial-gradient(circle, #091712 0%, #010302 100%)",
    },
    {
      id: "pure-minimal",
      name: "Pure Minimal Void",
      desc: "Maksymalnie głęboka neutralna czerń z winietą",
      preview: "radial-gradient(circle, #0a0a0c 0%, #000000 100%)",
    },
  ];

  const loopDurations = [
    { seconds: 120, frames: 3600, label: "2 minuty (Zalecane)", badge: "120s" },
    { seconds: 60, frames: 1800, label: "1 minuta", badge: "60s" },
    { seconds: 30, frames: 900, label: "30 sekund", badge: "30s" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs for Particles */}
      <div className="flex items-center bg-[#15151f] p-1 rounded-lg border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("particles")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "particles"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cząsteczki</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("atmosphere")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "atmosphere"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Głębia & Styl</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("loop")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "loop"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pętla</span>
        </button>
      </div>

      {/* TAB 1: PARTICLES MOTION & LOOK */}
      {activeSubTab === "particles" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Quick presets for speed */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-amber-400" />
                Prędkość Ruchu Cząsteczek
              </span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.speed.toFixed(1)}x
              </span>
            </div>

            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.1}
              value={props.speed}
              onChange={(e) => updateProp("speed", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { val: 0.4, label: "Hipotermia (0.4x)" },
                { val: 0.8, label: "Kinowy Dryf (0.8x)" },
                { val: 1.5, label: "Żywy Przepływ (1.5x)" },
              ].map((sp) => (
                <button
                  key={sp.val}
                  type="button"
                  onClick={() => updateProp("speed", sp.val)}
                  className={`py-1 px-1.5 rounded text-[10px] transition-all ${
                    Math.abs(props.speed - sp.val) < 0.05
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-[#181822] text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Particle Count */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Liczba Cząsteczek (Gęstość)</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.particleCount} szt.
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={220}
              step={5}
              value={props.particleCount}
              onChange={(e) => updateProp("particleCount", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
              <span>Minimalistycznie (25)</span>
              <span>Kosmiczny pył (220)</span>
            </div>
          </div>

          {/* Size & Glow */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-300">Rozmiar</span>
                <span className="font-mono text-amber-400 text-xs font-bold">
                  {props.particleSize.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2.5}
                step={0.1}
                value={props.particleSize}
                onChange={(e) => updateProp("particleSize", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-300">Poświata (Glow)</span>
                <span className="font-mono text-amber-400 text-xs font-bold">
                  {props.particleGlow.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={0.2}
                max={2.2}
                step={0.1}
                value={props.particleGlow}
                onChange={(e) => updateProp("particleGlow", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Bokeh Blur & Direction */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Rozmycie Bokeh (Głębia Ostrości)</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.bokehBlur.toFixed(1)} px
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              step={0.5}
              value={props.bokehBlur}
              onChange={(e) => updateProp("bokehBlur", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="pt-2 border-t border-white/5">
              <label className="block text-[11px] text-zinc-400 mb-1.5">
                Kierunek unoszenia się drobin:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "up", label: "W górę ↑" },
                  { id: "down", label: "W dół ↓" },
                  { id: "float-ambient", label: "Dryf ~" },
                ].map((dir) => (
                  <button
                    key={dir.id}
                    type="button"
                    onClick={() => updateProp("direction", dir.id as any)}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                      props.direction === dir.id
                        ? "bg-amber-500 text-black font-bold shadow"
                        : "bg-[#181822] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Randomize Seed button */}
          <button
            type="button"
            onClick={() => updateProp("seed", Math.floor(Math.random() * 99999))}
            className="w-full py-2.5 rounded-xl bg-[#181824] hover:bg-[#202030] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Wylosuj nowy układ cząsteczek (Nowy Seed)</span>
          </button>
        </div>
      )}

      {/* TAB 2: ATMOSPHERE & DEPTH */}
      {activeSubTab === "atmosphere" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Tint Selection */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Odcień Głębi Tła ("Czerń z Duszą")
            </label>
            <div className="space-y-1.5">
              {tintOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updateProp("tintStyle", opt.id as any)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    props.tintStyle === opt.id
                      ? "bg-amber-500/10 border-amber-500/60 shadow"
                      : "bg-[#13131c] hover:bg-[#181824] border-white/5"
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg border border-white/20 flex-shrink-0 shadow-inner"
                    style={{ background: opt.preview }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{opt.name}</div>
                    <div className="text-[10px] text-zinc-400 leading-tight">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vignette Strength */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Kinowa Winieta (Vignette)</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.vignetteStrength * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.3}
              max={1.0}
              step={0.05}
              value={props.vignetteStrength}
              onChange={(e) => updateProp("vignetteStrength", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Film Grain */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Ziarno Filmowe 35mm (Noise)</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.grainIntensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={0.35}
              step={0.02}
              value={props.grainIntensity}
              onChange={(e) => updateProp("grainIntensity", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="text-[10px] text-zinc-500">
              Eliminuje banding i nadaje organiczną fakturę analogowej taśmy
            </div>
          </div>

          {/* Ambient Breathing Light */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Powolne Oddychanie Światła</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.ambientPulseIntensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1.0}
              step={0.1}
              value={props.ambientPulseIntensity}
              onChange={(e) => updateProp("ambientPulseIntensity", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* TAB 3: LOOP DURATION & EXPORT PREPARATION */}
      {activeSubTab === "loop" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
              <Clock className="w-4 h-4" />
              100% Bezszwowa Pętla (Seamless Loop)
            </div>
            Ruch cząsteczek, winieta i poświata są matematycznie zsynchronizowane. Klatka początkowa i końcowa łączą się idealnie bez żadnego przeskoku obrazu.
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Długość Pojedynczej Pętli:
            </label>
            <div className="space-y-2">
              {loopDurations.map((ld) => {
                const isSelected = durationFrames === ld.frames;
                return (
                  <button
                    key={ld.frames}
                    type="button"
                    onClick={() => {
                      setDurationFrames(ld.frames);
                      updateProp("loopDurationFrames", ld.frames);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/70 shadow"
                        : "bg-[#13131c] hover:bg-[#181824] border-white/5"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        {ld.label}
                        {ld.seconds === 120 && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400 text-black font-extrabold">
                            DO MONTAŻU
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {ld.frames} klatek @ {fps} fps ({ld.seconds} sek.)
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-[#1c1c28] text-xs font-mono font-bold text-amber-400 border border-white/10">
                      {ld.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#12121a] border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
            💡 <strong>Jak użyć w DaVinci / Premiere:</strong> Po wyrenderowaniu 2-minutowego pliku (np. ProRes 4444 lub WebM), wrzuć go na ścieżkę <strong>V1</strong> pod swoje napisy lub grafikę i powielaj (<kbd>Ctrl+C</kbd> / <kbd>Ctrl+V</kbd>) tyle razy, ile trwa Twój film.
          </div>
        </div>
      )}
    </div>
  );
};
