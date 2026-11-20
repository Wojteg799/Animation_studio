"use client";

import React, { useState, useEffect } from "react";
import {
  Disc,
  Clock,
  Sliders,
  Palette,
  Maximize2,
  RotateCw,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";
import { SingleCassetteProps } from "../../remotion/templates/SingleCassette/schema";

interface SingleCassetteControlsProps {
  props: SingleCassetteProps;
  updateProp: <K extends keyof SingleCassetteProps>(
    key: K,
    val: SingleCassetteProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const SingleCassetteControls: React.FC<SingleCassetteControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "skin" | "dimensions" | "spools" | "timing"
  >("skin");

  const currentDuration = props.durationInFrames ?? durationFrames ?? 240;

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

  // 4 Gotowe Skórki / Presety Kasety
  const applySkin = (skin: "mystery-gold" | "classic-wireframe" | "full-gold" | "cyan-cyber") => {
    updateProp("skinPreset", skin);
    if (skin === "mystery-gold") {
      updateProp("showLabel", true);
      updateProp("labelText", "????");
      updateProp("labelColor", "#ffffff");
      updateProp("spoolColor", "#facc15"); // Złote kółka
      updateProp("lineColor", "#ffffff");
      updateProp("chassisFill", "#000000");
    } else if (skin === "classic-wireframe") {
      updateProp("showLabel", false);
      updateProp("labelText", "");
      updateProp("spoolColor", "#ffffff"); // Białe kółka
      updateProp("lineColor", "#ffffff");
      updateProp("chassisFill", "#000000");
    } else if (skin === "full-gold") {
      updateProp("showLabel", true);
      updateProp("labelText", "????");
      updateProp("labelColor", "#facc15");
      updateProp("spoolColor", "#facc15");
      updateProp("lineColor", "#facc15");
      updateProp("chassisFill", "#000000");
    } else if (skin === "cyan-cyber") {
      updateProp("showLabel", true);
      updateProp("labelText", "????");
      updateProp("labelColor", "#38bdf8");
      updateProp("spoolColor", "#38bdf8");
      updateProp("lineColor", "#38bdf8");
      updateProp("chassisFill", "#000000");
    }
  };

  const scalePresets = [
    { label: "80%", val: 0.8 },
    { label: "100%", val: 1.0 },
    { label: "115% (Domyślna)", val: 1.15 },
    { label: "135%", val: 1.35 },
    { label: "150%", val: 1.5 },
  ];

  const sizePresets = [
    { label: "Kompaktowa", w: 480, h: 304 },
    { label: "Standard (640p)", w: 640, h: 405 },
    { label: "Kinowa Duża", w: 800, h: 506 },
  ];

  const spoolColors = [
    { id: "#facc15", name: "Złoty (Gold)", color: "#facc15" },
    { id: "#fbbf24", name: "Bursztyn", color: "#fbbf24" },
    { id: "#ffffff", name: "Czysta Biel", color: "#ffffff" },
    { id: "#38bdf8", name: "Błękit Lydii", color: "#38bdf8" },
    { id: "#4ade80", name: "Zieleń", color: "#4ade80" },
  ];

  const lineColors = [
    { id: "#ffffff", name: "Biel (Joy Division)", color: "#ffffff" },
    { id: "#facc15", name: "Złoto / Żółty", color: "#facc15" },
    { id: "#38bdf8", name: "Błękit Lydii", color: "#38bdf8" },
    { id: "#4ade80", name: "Zieleń", color: "#4ade80" },
    { id: "#f97316", name: "Pomarańcz", color: "#f97316" },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* ================= GŁÓWNY PRZEŁĄCZNIK ZAKŁADEK ================= */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-[#12121a] rounded-lg border border-white/5">
        <button
          type="button"
          onClick={() => setActiveTab("skin")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "skin"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10px]">Skórka & Etykieta</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("spools")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "spools"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="text-[10px]">Złote Kółka / Ruch</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("dimensions")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "dimensions"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="text-[10px]">Wymiary & Skala</span>
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
      </div>

      {/* ================= ZAKŁADKA 1: SKÓRKA & ETYKIETA (???? & ZŁOTO) ================= */}
      {activeTab === "skin" && (
        <div className="space-y-4">
          {/* Wybór Gotowej Skórki Kasety */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2.5">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Wybierz Wariant / Skórkę Kasety:
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* Skórka 1: Tajemnicza Kaseta (???? + Złote Kółka) */}
              <button
                type="button"
                onClick={() => applySkin("mystery-gold")}
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  props.skinPreset === "mystery-gold"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow"
                    : "bg-[#181824] border-white/5 text-zinc-300 hover:bg-[#202030]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="text-[11px] font-bold">Tajemnicza Kaseta</span>
                </div>
                <span className="text-[9px] text-zinc-400 block font-normal leading-tight">
                  Etykieta <strong className="text-white font-mono">????</strong> + Złote obracające się kółka
                </span>
              </button>

              {/* Skórka 2: Klasyczny Joy Division Wireframe */}
              <button
                type="button"
                onClick={() => applySkin("classic-wireframe")}
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  props.skinPreset === "classic-wireframe"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow"
                    : "bg-[#181824] border-white/5 text-zinc-300 hover:bg-[#202030]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  <span className="text-[11px] font-bold">Klasyk Joy Division</span>
                </div>
                <span className="text-[9px] text-zinc-400 block font-normal leading-tight">
                  Czysta biel, bez napisów, białe kółka wireframe
                </span>
              </button>

              {/* Skórka 3: Pełne Złoto (Full Gold) */}
              <button
                type="button"
                onClick={() => applySkin("full-gold")}
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  props.skinPreset === "full-gold"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow"
                    : "bg-[#181824] border-white/5 text-zinc-300 hover:bg-[#202030]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="text-[11px] font-bold">Złota Edycja</span>
                </div>
                <span className="text-[9px] text-zinc-400 block font-normal leading-tight">
                  Złote linie konturu, złota etykieta, złote kółka
                </span>
              </button>

              {/* Skórka 4: Cyber Błękit (Lydia Blue) */}
              <button
                type="button"
                onClick={() => applySkin("cyan-cyber")}
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  props.skinPreset === "cyan-cyber"
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow"
                    : "bg-[#181824] border-white/5 text-zinc-300 hover:bg-[#202030]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-[11px] font-bold">Błękit Lydii</span>
                </div>
                <span className="text-[9px] text-zinc-400 block font-normal leading-tight">
                  Klimatyczny błękit cybernetyczny
                </span>
              </button>
            </div>
          </div>

          {/* Etykieta kasety (gdzie jest nazwa) */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-300 font-semibold text-[11px] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                Etykieta Kasety (Miejsce na Nazwę):
              </span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.showLabel ?? true}
                  onChange={(e) => updateProp("showLabel", e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-[10px] text-zinc-400">Pokaż etykietę</span>
              </label>
            </div>

            {props.showLabel && (
              <div className="space-y-2">
                <div>
                  <label className="text-zinc-400 block mb-1 text-[10px]">
                    Napis na kasecie:
                  </label>
                  <input
                    type="text"
                    value={props.labelText ?? "????"}
                    onChange={(e) => updateProp("labelText", e.target.value)}
                    className="w-full bg-[#181824] border border-white/10 rounded px-2.5 py-1.5 text-white font-mono tracking-widest text-xs focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>

                {/* Szybkie presety tekstu */}
                <div className="flex gap-1.5">
                  {["????", "SIDE A", "TMMS 1984", "MIXTAPE #4"].map((txt) => (
                    <button
                      key={txt}
                      type="button"
                      onClick={() => updateProp("labelText", txt)}
                      className={`px-2 py-1 rounded text-[9px] font-mono transition ${
                        props.labelText === txt
                          ? "bg-amber-500 text-black font-bold"
                          : "bg-[#181824] text-zinc-300 hover:text-white"
                      }`}
                    >
                      {txt}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] text-zinc-400 block mb-1.5">
                    Kolor tekstu i ramki etykiety:
                  </span>
                  <div className="flex gap-1.5">
                    {[
                      { col: "#ffffff", label: "Biel" },
                      { col: "#facc15", label: "Złoty" },
                      { col: "#38bdf8", label: "Błękit" },
                    ].map((c) => (
                      <button
                        key={c.col}
                        type="button"
                        onClick={() => updateProp("labelColor", c.col)}
                        className={`px-2 py-1 rounded border text-[9px] flex items-center gap-1.5 transition ${
                          props.labelColor === c.col
                            ? "border-amber-500 bg-amber-500/20 text-white font-bold"
                            : "border-white/5 bg-[#181824] text-zinc-400"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: c.col }}
                        />
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= ZAKŁADKA 2: ZŁOTE KÓŁKA / SZPULE & RUCH ================= */}
      {activeTab === "spools" && (
        <div className="space-y-4">
          {/* Kolor szpulek (kółek) */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Kolor Szpulek (Obracających się Kółek):
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {spoolColors.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateProp("spoolColor", col.color)}
                  className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${
                    props.spoolColor === col.color
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

          {/* Prędkość kręcenia się taśmy */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 font-semibold text-[11px]">
                Prędkość Obrotu Szpulek:
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {props.spoolSpeed ?? 3.8}x
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              step="0.2"
              value={props.spoolSpeed ?? 3.8}
              onChange={(e) =>
                updateProp("spoolSpeed", parseFloat(e.target.value))
              }
              className="w-full accent-amber-500"
            />

            <label className="flex items-center gap-2 p-2 rounded bg-[#181824] cursor-pointer hover:bg-[#202030] transition">
              <input
                type="checkbox"
                checked={props.reverseSpools ?? false}
                onChange={(e) => updateProp("reverseSpools", e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span className="text-zinc-200 text-[11px]">
                Odwrotny kierunek obrotu (Rewind)
              </span>
            </label>
          </div>

          {/* Unoszenie i kołysanie (Idle Floating) */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2.5">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Kinowe Pływanie / Unoszenie w Przestrzeni:
            </span>

            <label className="flex items-center gap-2 p-2 rounded bg-[#181824] cursor-pointer hover:bg-[#202030] transition">
              <input
                type="checkbox"
                checked={props.idleBobbing ?? true}
                onChange={(e) => updateProp("idleBobbing", e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span className="text-zinc-200">
                Płynne unoszenie i mikro-kołysanie
              </span>
            </label>

            {props.idleBobbing && (
              <div>
                <div className="flex justify-between text-zinc-400 mb-1">
                  <span>Amplituda unoszenia</span>
                  <span className="font-mono text-zinc-200">
                    {props.bobbingAmount ?? 4.0}px
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={props.bobbingAmount ?? 4.0}
                  onChange={(e) =>
                    updateProp("bobbingAmount", parseFloat(e.target.value))
                  }
                  className="w-full accent-amber-500"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= ZAKŁADKA 3: WYMIARY & LINIE ================= */}
      {activeTab === "dimensions" && (
        <div className="space-y-4">
          {/* Szybkie presety skali */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 font-semibold text-[11px]">
                Skala Kasety na Ekranie:
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {Math.round((props.cassetteScale ?? 1.15) * 100)}%
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {scalePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => updateProp("cassetteScale", preset.val)}
                  className={`py-1.5 px-0.5 rounded text-[10px] font-mono transition-all ${
                    Math.abs((props.cassetteScale ?? 1.15) - preset.val) < 0.03
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
              min="0.5"
              max="2.0"
              step="0.05"
              value={props.cassetteScale ?? 1.15}
              onChange={(e) =>
                updateProp("cassetteScale", parseFloat(e.target.value))
              }
              className="w-full accent-amber-500 mt-1"
            />
          </div>

          {/* Kolorystyka linii konturu kasety */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <span className="text-zinc-300 font-semibold block text-[11px]">
              Kolor Linii Konturu Kasety:
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {lineColors.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateProp("lineColor", col.color)}
                  className={`p-2 rounded border flex flex-col items-center gap-1 transition-all ${
                    props.lineColor === col.color
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

          {/* Grubość linii */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Grubość Linii Wektorowych:</span>
              <span className="font-mono text-amber-400">
                {props.lineWidth ?? 2.2}px
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.2"
              value={props.lineWidth ?? 2.2}
              onChange={(e) =>
                updateProp("lineWidth", parseFloat(e.target.value))
              }
              className="w-full accent-amber-500"
            />
          </div>

          {/* Wnętrze i przezroczystość */}
          <div className="p-3 bg-[#12121a] rounded-lg border border-white/5 space-y-2">
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

      {/* ================= ZAKŁADKA 4: CZAS / KLATKI ================= */}
      {activeTab === "timing" && (
        <div className="space-y-4">
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
        </div>
      )}
    </div>
  );
};
