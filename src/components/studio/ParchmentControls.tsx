"use client";

import React, { useState } from "react";
import {
  FileText,
  Sliders,
  Lamp,
  Sparkles,
  Clock,
  RefreshCw,
  Sun,
  Flame,
} from "lucide-react";
import { DarkParchmentBackgroundProps } from "../../remotion/templates/DarkParchmentBackground/schema";

interface ParchmentControlsProps {
  props: DarkParchmentBackgroundProps;
  updateProp: <K extends keyof DarkParchmentBackgroundProps>(
    key: K,
    val: DarkParchmentBackgroundProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const ParchmentControls: React.FC<ParchmentControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"texture" | "lighting" | "dust">("texture");

  const paperStyles = [
    {
      id: "charcoal-dossier",
      name: "Charcoal Dossier",
      desc: "Głęboki grafitowy brystol teczki akt śledczych",
      preview: "linear-gradient(135deg, #171920 0%, #030305 100%)",
    },
    {
      id: "aged-sepia",
      name: "Aged Sepia Document",
      desc: "Postarzany pergamin z ciepłym odcieniem historycznym",
      preview: "linear-gradient(135deg, #1e1913 0%, #040302 100%)",
    },
    {
      id: "black-vellum",
      name: "Black Archival Vellum",
      desc: "Matowy czarny welin o gęstym splocie celulozy",
      preview: "linear-gradient(135deg, #141418 0%, #010102 100%)",
    },
    {
      id: "midnight-ink",
      name: "Midnight Ink Wash",
      desc: "Papier barwiony ciemnym niebiesko-czarnym atramentem",
      preview: "linear-gradient(135deg, #131a29 0%, #020306 100%)",
    },
  ];

  const loopDurations = [
    { seconds: 120, frames: 3600, label: "2 minuty (Do montażu)", badge: "120s" },
    { seconds: 60, frames: 1800, label: "1 minuta", badge: "60s" },
    { seconds: 30, frames: 900, label: "30 sekund", badge: "30s" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs for Parchment */}
      <div className="flex items-center bg-[#15151f] p-1 rounded-lg border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveSubTab("texture")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "texture"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Faktura Papieru</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("lighting")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "lighting"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Lamp className="w-3.5 h-3.5" />
          <span>Światło</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("dust")}
          className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === "dust"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kurz & Pętla</span>
        </button>
      </div>

      {/* TAB 1: PAPER TEXTURE & STYLES */}
      {activeSubTab === "texture" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Paper Style Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Styl Ciemnego Papieru Archiwalnego:
            </label>
            <div className="space-y-1.5">
              {paperStyles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => updateProp("paperStyle", style.id as any)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    props.paperStyle === style.id
                      ? "bg-amber-500/10 border-amber-500/60 shadow"
                      : "bg-[#13131c] hover:bg-[#181824] border-white/5"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg border border-white/20 flex-shrink-0 shadow-inner"
                    style={{ background: style.preview }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{style.name}</div>
                    <div className="text-[10px] text-zinc-400 leading-tight">{style.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Texture Intensity */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Wyrazistość Faktury Papieru</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.textureIntensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.05}
              value={props.textureIntensity}
              onChange={(e) => updateProp("textureIntensity", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Fiber Detail */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Gęstość Włókien Celulozy</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.fiberDetail * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.2}
              max={1.0}
              step={0.05}
              value={props.fiberDetail}
              onChange={(e) => updateProp("fiberDetail", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Aged Edges */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Zestarzenie / Wypalenie Krawędzi</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.agedEdgesStrength * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.3}
              max={1.0}
              step={0.05}
              value={props.agedEdgesStrength}
              onChange={(e) => updateProp("agedEdgesStrength", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* TAB 2: LIGHTING & ATMOSPHERE */}
      {activeSubTab === "lighting" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Lighting Mode */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Kierunek Oświetlenia Dokumentu:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "desk-lamp", label: "Lampa Biurkowa" },
                { id: "top-left-beam", label: "Smuga z Góry" },
                { id: "ambient-haze", label: "Rozproszone" },
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => updateProp("lightingMode", mode.id as any)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                    props.lightingMode === mode.id
                      ? "bg-amber-500 text-black font-bold shadow"
                      : "bg-[#181822] text-zinc-400 hover:text-white"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting Warmth */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Ciepło Światła (Żarówka Lampy)</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.lightingWarmth * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1.0}
              step={0.05}
              value={props.lightingWarmth}
              onChange={(e) => updateProp("lightingWarmth", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
              <span>Chłodne / Neutralne</span>
              <span>Ciepły żar lampki archiwisty</span>
            </div>
          </div>

          {/* Light Breathing */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Subtelne Oddychanie Światła</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {Math.round(props.lightBreathing * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1.0}
              step={0.05}
              value={props.lightBreathing}
              onChange={(e) => updateProp("lightBreathing", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* TAB 3: DUST PARTICLES & LOOP */}
      {activeSubTab === "dust" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Dust Count */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300 font-medium">Drobiny Kurzu Archiwalnego</span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.dustCount} szt.
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={160}
              step={5}
              value={props.dustCount}
              onChange={(e) => updateProp("dustCount", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Dust Speed & Glow */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-300">Prędkość</span>
                <span className="font-mono text-amber-400 text-xs font-bold">
                  {props.dustSpeed.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={props.dustSpeed}
                onChange={(e) => updateProp("dustSpeed", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-300">Poświata</span>
                <span className="font-mono text-amber-400 text-xs font-bold">
                  {props.dustGlow.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={0.2}
                max={2.2}
                step={0.1}
                value={props.dustGlow}
                onChange={(e) => updateProp("dustGlow", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Random Seed */}
          <button
            type="button"
            onClick={() => updateProp("seed", Math.floor(Math.random() * 99999))}
            className="w-full py-2.5 rounded-xl bg-[#181824] hover:bg-[#202030] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Wylosuj nowy układ kurzu</span>
          </button>

          {/* Loop Duration Selector */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Długość Pętli Tła:
            </div>
            <div className="space-y-1.5">
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
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/70 shadow"
                        : "bg-[#13131c] hover:bg-[#181824] border-white/5"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{ld.label}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        {ld.frames} klatek @ {fps} fps
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#1c1c28] text-xs font-mono font-bold text-amber-400 border border-white/10">
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
