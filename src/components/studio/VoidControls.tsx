"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Sliders,
  Wind,
  Moon,
  Clock,
  RefreshCw,
  Sun,
  Shield,
  Star,
  Check,
} from "lucide-react";
import {
  MinimalVoidParticlesProps,
  presetPitchBlack,
  presetMinimalGlow,
  presetStarDust,
} from "../../remotion/templates/MinimalVoidParticles/schema";

interface VoidControlsProps {
  props: MinimalVoidParticlesProps;
  updateProp: <K extends keyof MinimalVoidParticlesProps>(
    key: K,
    val: MinimalVoidParticlesProps[K]
  ) => void;
  applyFullProps?: (newProps: MinimalVoidParticlesProps) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const VoidControls: React.FC<VoidControlsProps> = ({
  props,
  updateProp,
  applyFullProps,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    "presets" | "particles" | "blackness" | "loop"
  >("presets");

  const versions = [
    {
      id: "pitch-black",
      name: "Wersja 1: Czysta Czerń #000000",
      badge: "Zero Banding",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      desc: "100% płaska, smolista czerń bez żadnego gradientu i winiety. Brak pierścieni na YouTube.",
      icon: Moon,
      presetData: presetPitchBlack,
    },
    {
      id: "minimal-glow",
      name: "Wersja 2: Subtelny Antracyt",
      badge: "Minimal Glow",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      desc: "Głęboka czerń z ultra-szeroką, mikroskopijną mgiełką światła (~3.5% poświaty).",
      icon: Sun,
      presetData: presetMinimalGlow,
    },
    {
      id: "stardust-depth",
      name: "Wersja 3: Gwiezdny Pył 3D",
      badge: "Dual-Layer 3D",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      desc: "Płaska czerń + 200 mikro-drobin w tle. Niesamowita głębia kosmosu bez użycia gradientu!",
      icon: Star,
      presetData: presetStarDust,
    },
  ];

  const handleApplyVersion = (ver: (typeof versions)[0]) => {
    if (applyFullProps) {
      applyFullProps({ ...ver.presetData, loopDurationFrames: durationFrames });
    } else {
      Object.entries(ver.presetData).forEach(([k, v]) => {
        if (k !== "loopDurationFrames") {
          updateProp(k as any, v as any);
        }
      });
    }
  };

  const colorTones = [
    {
      id: "pure-black",
      name: "Czysta Czerń (Pitch Black)",
      desc: "100% próżnia #000000 (rekomendowane do usunięcia pierścieni)",
      color: "#000000",
    },
    {
      id: "cold-obsidian",
      name: "Zimny Obsydian",
      desc: "Aksamitna czerń z mikroskopijnym chłodem",
      color: "#030406",
    },
    {
      id: "warm-carbon",
      name: "Ciepły Węgiel",
      desc: "Bardzo ciemny węgiel z delikatnym ciepłym tonem",
      color: "#050403",
    },
    {
      id: "deep-navy",
      name: "Głęboki Morski Granat",
      desc: "Nocny granatowy mrok",
      color: "#020408",
    },
  ];

  const loopDurations = [
    { seconds: 120, frames: 3600, label: "2 minuty (Rekomendowane)", badge: "120s" },
    { seconds: 60, frames: 1800, label: "1 minuta", badge: "60s" },
    { seconds: 30, frames: 900, label: "30 sekund", badge: "30s" },
  ];

  return (
    <div className="space-y-4">
      {/* 3 WERSJE - SZYBKI WYBÓR NA SAMEJ GÓRZE */}
      <div className="space-y-2 bg-[#0e0e16] p-3 rounded-2xl border border-white/10 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Wybierz 1 z 3 Wersji Tła:
          </span>
          <span className="text-[10px] font-mono text-zinc-500">1-Click</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {versions.map((ver) => {
            const isSelected = props.preset === ver.id;
            const Icon = ver.icon;
            return (
              <button
                key={ver.id}
                type="button"
                onClick={() => handleApplyVersion(ver)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-3 relative ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500/80 shadow-md ring-1 ring-amber-500/30"
                    : "bg-[#14141e] hover:bg-[#1a1a28] border-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-amber-500 text-black font-bold shadow"
                      : "bg-white/5 text-zinc-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isSelected ? "text-amber-300" : "text-white"
                      }`}
                    >
                      {ver.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${ver.badgeColor}`}
                    >
                      {ver.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
                    {ver.desc}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute right-2.5 top-3 w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tabs dla zaawansowanej edycji */}
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
          onClick={() => setActiveSubTab("blackness")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "blackness"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Czerń & Głębia</span>
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

      {/* TAB 1: PARTICLES TWEAKING */}
      {activeSubTab === "particles" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Speed */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-amber-400" />
                Prędkość Ruchu
              </span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.speed.toFixed(2)}x
              </span>
            </div>

            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.05}
              value={props.speed}
              onChange={(e) => updateProp("speed", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { val: 0.4, label: "Wolny (0.4x)" },
                { val: 0.7, label: "Kinowy (0.7x)" },
                { val: 1.3, label: "Żywy (1.3x)" },
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
              <span className="text-xs text-zinc-300 font-medium">Liczba Cząsteczek</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.particleCount} szt.
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={200}
              step={5}
              value={props.particleCount}
              onChange={(e) => updateProp("particleCount", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
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
                min={0.0}
                max={2.4}
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
              <span className="text-xs text-zinc-300 font-medium">Rozmycie Bokeh (Głębia)</span>
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
                Kierunek unoszenia się:
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

          {/* Random Seed */}
          <button
            type="button"
            onClick={() => updateProp("seed", Math.floor(Math.random() * 99999))}
            className="w-full py-2.5 rounded-xl bg-[#181824] hover:bg-[#202030] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Wylosuj inny układ cząsteczek</span>
          </button>
        </div>
      )}

      {/* TAB 2: DEEP BLACKNESS & GLOW */}
      {activeSubTab === "blackness" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Zero Banding Status Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              props.centerGlowIntensity === 0
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                : "bg-blue-500/10 border-blue-500/40 text-blue-200"
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">
                {props.centerGlowIntensity === 0
                  ? "✓ 100% Gwarancja braku pierścieni (Zero Banding)"
                  : "Subtelny mikro-blask (Ultra-szeroki kąt)"}
              </span>
              {props.centerGlowIntensity === 0
                ? "Tło to jednolita czerń #000000. Każdy piksel ma tę samą barwę, więc banding w DaVinci i na YouTube jest fizycznie niemożliwy."
                : "Gradient jest bardzo płaski (zaledwie kilka procent), dzięki czemu nie tworzy ostrych schodków kwantyzacji."}
            </div>
          </div>

          {/* Wersja 3: Gwiezdny Pył Toggle & Sliders */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                Gwiezdny Pył w tle (Głębia bez gradientu)
              </span>
              <button
                type="button"
                onClick={() => updateProp("showStarDust", !props.showStarDust)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  props.showStarDust || props.preset === "stardust-depth"
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showStarDust || props.preset === "stardust-depth" ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            {(props.showStarDust || props.preset === "stardust-depth") && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Gęstość mikro-drobin:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.starDustCount} szt.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={400}
                    step={10}
                    value={props.starDustCount}
                    onChange={(e) => updateProp("starDustCount", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Jasność pyłku:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {Math.round(props.starDustOpacity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={0.8}
                    step={0.05}
                    value={props.starDustOpacity}
                    onChange={(e) => updateProp("starDustOpacity", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Odcień czerni */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Podstawowy Odcień Czerni:
            </label>
            <div className="space-y-1.5">
              {colorTones.map((tone) => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => updateProp("colorTone", tone.id as any)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    props.colorTone === tone.id
                      ? "bg-amber-500/10 border-amber-500/60 shadow"
                      : "bg-[#13131c] hover:bg-[#181824] border-white/5"
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-lg border border-white/20 flex-shrink-0 shadow-inner"
                    style={{ backgroundColor: tone.color }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{tone.name}</div>
                    <div className="text-[10px] text-zinc-400">{tone.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center Glow Intensity Slider */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Poświata Środka (Glow)</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.centerGlowIntensity <= 0.005
                  ? "0% (Całkowity brak gradientu)"
                  : `${(props.centerGlowIntensity * 100).toFixed(1)}%`}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={0.15}
              step={0.005}
              value={props.centerGlowIntensity}
              onChange={(e) => updateProp("centerGlowIntensity", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
              <span className="text-emerald-400">0% = Czysta płaska czerń (Brak pierścieni)</span>
              <span>15% = Subtelna mgiełka</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOOP */}
      {activeSubTab === "loop" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Długość Pętli Tła:
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
        </div>
      )}
    </div>
  );
};
