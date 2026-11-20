"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Clock,
  Move,
} from "lucide-react";
import { LydiaProps } from "../../remotion/templates/Lydia/schema";

interface LydiaControlsProps {
  props: LydiaProps;
  updateProp: <K extends keyof LydiaProps>(
    key: K,
    val: LydiaProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const LydiaControls: React.FC<LydiaControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "character" | "timing" | "layout"
  >("character");

  const currentDuration = props.durationInFrames ?? durationFrames ?? 180;

  const [durationSecInput, setDurationSecInput] = useState<string>(
    (currentDuration / fps).toFixed(1)
  );
  const [durationFramesInput, setDurationFramesInput] = useState<string>(
    currentDuration.toString()
  );

  useEffect(() => {
    setDurationSecInput((currentDuration / fps).toFixed(1));
    setDurationFramesInput(currentDuration.toString());
  }, [currentDuration, fps]);

  const handleSetDuration = (frames: number) => {
    const validFrames = Math.max(60, Math.min(3600, frames));
    setDurationFrames(validFrames);
    updateProp("durationInFrames", validFrames);
    setDurationSecInput((validFrames / fps).toFixed(1));
    setDurationFramesInput(validFrames.toString());
  };

  const scalePresets = [
    { label: "100%", val: 1.0 },
    { label: "125%", val: 1.25 },
    { label: "135% (Domyślna)", val: 1.35 },
    { label: "150%", val: 1.5 },
    { label: "175%", val: 1.75 },
  ];

  const characterColors = [
    { id: "#38bdf8", name: "Błękit Lydii", color: "#38bdf8" },
    { id: "#0284c7", name: "Ciemny Błękit", color: "#0284c7" },
    { id: "#facc15", name: "Żółty Dariusa", color: "#facc15" },
    { id: "#a78bfa", name: "Lawenda", color: "#a78bfa" },
    { id: "#ffffff", name: "Biel", color: "#ffffff" },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* ================= GŁÓWNY PRZEŁĄCZNIK ZAKŁADEK ================= */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#12121a] rounded-lg border border-white/5">
        <button
          type="button"
          onClick={() => setActiveTab("character")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "character"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="text-[10px]">Postać</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("timing")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "timing"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Czas / Klatki</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("layout")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "layout"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span className="text-[10px]">Pozycja</span>
        </button>
      </div>

      {/* ================= ZAKŁADKA 1: POSTAĆ & SKALA ================= */}
      {activeTab === "character" && (
        <div className="space-y-4">
          {/* Nazwa postaci */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2.5">
            <div>
              <label className="text-zinc-300 block mb-1 font-semibold">
                Podpis Główny Postaci:
              </label>
              <input
                type="text"
                value={props.characterName ?? "LYDIA"}
                onChange={(e) => updateProp("characterName", e.target.value)}
                className="w-full bg-[#181824] border border-white/10 rounded px-2.5 py-1.5 text-white font-mono uppercase text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Szybkie presety skali postaci */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 font-semibold text-[11px]">
                Skala Postaci:
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {Math.round((props.characterScale ?? 1.35) * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {scalePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => updateProp("characterScale", preset.val)}
                  className={`py-1.5 px-0.5 rounded text-[10px] font-mono transition-all ${
                    Math.abs((props.characterScale ?? 1.35) - preset.val) < 0.03
                      ? "bg-amber-500 text-black font-bold shadow"
                      : "bg-[#181824] hover:bg-[#222234] text-zinc-300"
                  }`}
                >
                  {preset.label.split(" ")[0]}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="0.6"
              max="2.5"
              step="0.05"
              value={props.characterScale ?? 1.35}
              onChange={(e) =>
                updateProp("characterScale", parseFloat(e.target.value))
              }
              className="w-full accent-amber-500 mt-1"
            />
          </div>

          {/* Kolorystyka postaci */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Kolor Postaci (Sylwetka):
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {characterColors.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateProp("characterColor", col.color)}
                  className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${
                    props.characterColor === col.color
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                      : "bg-[#181824] border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/30"
                    style={{ backgroundColor: col.color }}
                  />
                  <span className="text-[9px] leading-tight text-center">
                    {col.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Geometria kółek avatara */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2.5">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Geometria Awatara (Kółka):
            </span>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Rozmiar kółka zewnętrznego</span>
                <span className="font-mono text-zinc-200">
                  {props.circleSize ?? 230}px
                </span>
              </div>
              <input
                type="range"
                min="140"
                max="320"
                step="5"
                value={props.circleSize ?? 230}
                onChange={(e) =>
                  updateProp("circleSize", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <div className="flex justify-between text-zinc-400 mb-1 text-[10px]">
                  <span>Promień Głowy</span>
                  <span className="font-mono text-zinc-200">
                    {props.headSize ?? 42}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  step="1"
                  value={props.headSize ?? 42}
                  onChange={(e) =>
                    updateProp("headSize", parseInt(e.target.value))
                  }
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 mb-1 text-[10px]">
                  <span>Pozycja Y Głowy</span>
                  <span className="font-mono text-zinc-200">
                    {props.headY ?? 55}
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="85"
                  step="1"
                  value={props.headY ?? 55}
                  onChange={(e) =>
                    updateProp("headY", parseInt(e.target.value))
                  }
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ZAKŁADKA 2: CZAS & KLATKI ================= */}
      {activeTab === "timing" && (
        <div className="space-y-4">
          {/* Czas trwania animacji */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-3">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Całkowity Czas Trwania Sceny:
            </span>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#181824] p-2 rounded border border-white/5">
                <span className="text-[10px] text-zinc-400 block mb-1">
                  Czas w sekundach:
                </span>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="120"
                  value={durationSecInput}
                  onChange={(e) => {
                    setDurationSecInput(e.target.value);
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      handleSetDuration(Math.round(val * fps));
                    }
                  }}
                  className="w-full bg-[#0d0d14] border border-white/10 rounded px-2 py-1 text-white font-mono text-xs"
                />
              </div>

              <div className="bg-[#181824] p-2 rounded border border-white/5">
                <span className="text-[10px] text-zinc-400 block mb-1">
                  Klatki (@{fps}fps):
                </span>
                <input
                  type="number"
                  step="10"
                  min="60"
                  max="3600"
                  value={durationFramesInput}
                  onChange={(e) => {
                    setDurationFramesInput(e.target.value);
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      handleSetDuration(val);
                    }
                  }}
                  className="w-full bg-[#0d0d14] border border-white/10 rounded px-2 py-1 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Szybkie presety czasu */}
            <div className="grid grid-cols-4 gap-1 pt-1">
              {[
                { label: "4s", frames: 120 },
                { label: "6s", frames: 180 },
                { label: "8s", frames: 240 },
                { label: "12s", frames: 360 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleSetDuration(p.frames)}
                  className={`py-1 rounded text-[10px] font-mono transition ${
                    currentDuration === p.frames
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-[#181824] hover:bg-[#222234] text-zinc-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Punkty kluczowe osi czasu */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-3">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Harmonogram Zdarzeń na Osi Czasu:
            </span>

            {/* Wejście postaci */}
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Wejście postaci (pop-in)</span>
                <span className="font-mono text-amber-400">
                  {props.characterEnterFrame ?? 5} klatka (
                  {((props.characterEnterFrame ?? 5) / fps).toFixed(2)}s)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.min(currentDuration, 60)}
                value={props.characterEnterFrame ?? 5}
                onChange={(e) =>
                  updateProp("characterEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= ZAKŁADKA 3: POZYCJA & UKŁAD ================= */}
      {activeTab === "layout" && (
        <div className="space-y-4">
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-3">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Umiejscowienie na Ekranie:
            </span>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Pozycja Pozioma (X)</span>
                <span className="font-mono text-zinc-200">
                  {props.positionX ?? 50}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={props.positionX ?? 50}
                onChange={(e) =>
                  updateProp("positionX", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />

              <div className="grid grid-cols-3 gap-1 mt-1.5">
                {[
                  { label: "Lewo (25%)", x: 25 },
                  { label: "Środek (50%)", x: 50 },
                  { label: "Prawo (75%)", x: 75 },
                ].map((pos) => (
                  <button
                    key={pos.label}
                    type="button"
                    onClick={() => updateProp("positionX", pos.x)}
                    className={`py-1 rounded text-[9px] font-mono transition ${
                      props.positionX === pos.x
                        ? "bg-amber-500 text-black font-bold"
                        : "bg-[#181824] hover:bg-[#222234] text-zinc-400"
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Pozycja Pionowa (Y)</span>
                <span className="font-mono text-zinc-200">
                  {props.positionY ?? 50}%
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="75"
                value={props.positionY ?? 50}
                onChange={(e) =>
                  updateProp("positionY", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Opcje Rysowania & Tła:
            </span>

            <label className="flex items-center gap-2 p-2 rounded bg-[#181824] cursor-pointer hover:bg-[#202030] transition">
              <input
                type="checkbox"
                checked={props.idleBobbing ?? true}
                onChange={(e) => updateProp("idleBobbing", e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span className="text-zinc-200">
                Naturalny oddech (delikatne unoszenie góra/dół)
              </span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded bg-[#181824] cursor-pointer hover:bg-[#202030] transition">
              <input
                type="checkbox"
                checked={props.transparentBackground ?? true}
                onChange={(e) =>
                  updateProp("transparentBackground", e.target.checked)
                }
                className="rounded text-amber-500 focus:ring-0"
              />
              <span className="text-zinc-200">
                Przezroczyste tło (Alpha Channel do montażu ProRes 4444)
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
