"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Clock,
  Share2,
  Sliders,
  Palette,
  Maximize2,
  Tv,
  MessageSquare,
  Disc,
  Radio,
  Eye,
  Check,
} from "lucide-react";
import { GabaskinsQuestProps } from "../../remotion/templates/GabaskinsQuest/schema";

interface GabaskinsControlsProps {
  props: GabaskinsQuestProps;
  updateProp: <K extends keyof GabaskinsQuestProps>(
    key: K,
    val: GabaskinsQuestProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const GabaskinsControls: React.FC<GabaskinsControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "character" | "platforms" | "timing"
  >("character");

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

  const characterColors = [
    { id: "#22c55e", name: "Zieleń (Gabaskins)", color: "#22c55e" },
    { id: "#10b981", name: "Szmaragd", color: "#10b981" },
    { id: "#38bdf8", name: "Błękit Lydii", color: "#38bdf8" },
    { id: "#facc15", name: "Żółty Dariusa", color: "#facc15" },
    { id: "#ffffff", name: "Biel Wireframe", color: "#ffffff" },
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
              ? "bg-emerald-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="text-[10px]">Gabaskins</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("platforms")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "platforms"
              ? "bg-emerald-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="text-[10px]">Publikacja</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("timing")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "timing"
              ? "bg-emerald-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Timing</span>
        </button>
      </div>

      {/* =========================================================================
          ZAKŁADKA 1: POSTAĆ (GABASKINS)
          ========================================================================= */}
      {activeTab === "character" && (
        <div className="space-y-4">
          {/* Imię postaci */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-zinc-300 font-medium">Podpis postaci</label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => updateProp("characterName", "GABASKINS")}
                  className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:text-white"
                >
                  GABASKINS
                </button>
                <button
                  type="button"
                  onClick={() => updateProp("characterName", "GABRIEL VIEIRA")}
                  className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:text-white"
                >
                  GABRIEL
                </button>
              </div>
            </div>
            <input
              type="text"
              value={props.characterName}
              onChange={(e) => updateProp("characterName", e.target.value)}
              className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Podtytuł */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-zinc-300 font-medium">Podtytuł (Drugi wiersz)</label>
              <label className="flex items-center gap-1 text-[11px] text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.showSubtitle}
                  onChange={(e) => updateProp("showSubtitle", e.target.checked)}
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
                />
                Pokaż
              </label>
            </div>
            {props.showSubtitle && (
              <input
                type="text"
                value={props.characterSubtitle}
                onChange={(e) => updateProp("characterSubtitle", e.target.value)}
                placeholder="np. REDDIT, BRAZYLIA"
                className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
              />
            )}
          </div>

          {/* Kolor postaci */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <label className="text-zinc-300 font-medium">Kolor postaci</label>
            <div className="grid grid-cols-2 gap-1.5">
              {characterColors.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateProp("characterColor", item.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded border text-left transition-all ${
                    props.characterColor === item.id
                      ? "border-emerald-500 bg-emerald-500/10 text-white font-semibold"
                      : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/40 shadow-sm flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-[11px]">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Antenka Reddit Snoo */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-zinc-300 font-medium flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Antenka Reddit (Snoo)
              </label>
              <input
                type="checkbox"
                checked={props.showAntenna}
                onChange={(e) => updateProp("showAntenna", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Ikoniczna zagięta łodyga z kuleczką na głowie, z subtelnym sprężystym bujaniem.
            </p>
          </div>

          {/* Rozmiar i Skala */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Skala postaci</span>
                <span className="text-emerald-400 font-mono">
                  {Math.round(props.characterScale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.6"
                step="0.05"
                value={props.characterScale}
                onChange={(e) =>
                  updateProp("characterScale", parseFloat(e.target.value))
                }
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>Średnica kółka avatara</span>
                <span className="text-emerald-400 font-mono">{props.circleSize}px</span>
              </div>
              <input
                type="range"
                min="160"
                max="260"
                step="5"
                value={props.circleSize}
                onChange={(e) =>
                  updateProp("circleSize", parseInt(e.target.value))
                }
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ZAKŁADKA 2: PUBLIKACJA (YOUTUBE & REDDIT)
          ========================================================================= */}
      {activeTab === "platforms" && (
        <div className="space-y-4">
          {/* Styl: Vibrant vs Monochrome */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <label className="text-zinc-300 font-medium">Styl wizualny</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateProp("stylePreset", "vibrant")}
                className={`p-2 rounded border text-left transition-all flex flex-col gap-0.5 ${
                  props.stylePreset === "vibrant"
                    ? "border-emerald-500 bg-emerald-500/10 text-white font-bold"
                    : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-[11px] font-semibold text-white">Żywe kolory</span>
                </div>
                <span className="text-[10px] text-zinc-500">Czerwony YT & Pomarańczowy Reddit</span>
              </button>

              <button
                type="button"
                onClick={() => updateProp("stylePreset", "monochrome")}
                className={`p-2 rounded border text-left transition-all flex flex-col gap-0.5 ${
                  props.stylePreset === "monochrome"
                    ? "border-emerald-500 bg-emerald-500/10 text-white font-bold"
                    : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-black" />
                  <span className="text-[11px] font-semibold text-white">Monochrome</span>
                </div>
                <span className="text-[10px] text-zinc-500">Biały wireframe Joy Division</span>
              </button>
            </div>
          </div>

          {/* Przełączniki platform */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2.5">
            <label className="text-zinc-300 font-medium">Wyświetlane elementy</label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="flex items-center gap-2 text-zinc-200">
                <Tv className="w-3.5 h-3.5 text-red-500" />
                Logo YouTube (po lewej)
              </span>
              <input
                type="checkbox"
                checked={props.showYouTube}
                onChange={(e) => updateProp("showYouTube", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="flex items-center gap-2 text-zinc-200">
                <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                Logo Reddit (po prawej)
              </span>
              <input
                type="checkbox"
                checked={props.showReddit}
                onChange={(e) => updateProp("showReddit", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="flex items-center gap-2 text-zinc-200">
                <Disc className="w-3.5 h-3.5 text-amber-400" />
                Kaseta audio z ???? (nagranie)
              </span>
              <input
                type="checkbox"
                checked={props.showCassette}
                onChange={(e) => updateProp("showCassette", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="flex items-center gap-2 text-zinc-200">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Linie sygnału & pakiety publikacji
              </span>
              <input
                type="checkbox"
                checked={props.showBroadcastSignals}
                onChange={(e) => updateProp("showBroadcastSignals", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="flex items-center gap-2 text-zinc-200">
                <Share2 className="w-3.5 h-3.5 text-orange-400" />
                Bańki subredditów wokół Reddita
              </span>
              <input
                type="checkbox"
                checked={props.showSubredditBubbles}
                onChange={(e) => updateProp("showSubredditBubbles", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>
          </div>

          {/* Skala platform */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Skala platform (YT & Reddit)</span>
              <span className="text-emerald-400 font-mono">
                {Math.round(props.platformsScale * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.05"
              value={props.platformsScale}
              onChange={(e) =>
                updateProp("platformsScale", parseFloat(e.target.value))
              }
              className="w-full accent-emerald-500"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          ZAKŁADKA 3: TIMING & USTAWIENIA
          ========================================================================= */}
      {activeTab === "timing" && (
        <div className="space-y-4">
          {/* Czas trwania animacji */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-zinc-300 font-medium">Czas trwania</label>
              <span className="text-[10px] text-zinc-500">{fps} FPS</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Sekundy</label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="120"
                  value={durationSecInput}
                  onChange={(e) => {
                    setDurationSecInput(e.target.value);
                    const sec = parseFloat(e.target.value);
                    if (!isNaN(sec) && sec > 0) {
                      handleSetDuration(Math.round(sec * fps));
                    }
                  }}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Klatki</label>
                <input
                  type="number"
                  step="1"
                  min="60"
                  max="3600"
                  value={durationFramesInput}
                  onChange={(e) => {
                    setDurationFramesInput(e.target.value);
                    const fr = parseInt(e.target.value, 10);
                    if (!isNaN(fr) && fr > 0) {
                      handleSetDuration(fr);
                    }
                  }}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Szybkie presety */}
            <div className="flex gap-1.5 pt-1">
              {[
                { label: "6s", f: 180 },
                { label: "8s (Domyślne)", f: 240 },
                { label: "10s", f: 300 },
                { label: "12s", f: 360 },
              ].map((p) => (
                <button
                  key={p.f}
                  type="button"
                  onClick={() => handleSetDuration(p.f)}
                  className={`flex-1 py-1 rounded text-[10px] font-mono border transition-all ${
                    currentDuration === p.f
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-400 font-bold"
                      : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Klatki pojawiania się poszczególnych elementów */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <label className="text-zinc-300 font-medium">Sekwencja wejścia (Klatki)</label>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>1. Wejście Gabaskinsa</span>
                <span className="text-emerald-400 font-mono">Klatka {props.characterEnterFrame}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={props.characterEnterFrame}
                onChange={(e) =>
                  updateProp("characterEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>2. Odkrycie kasety audio</span>
                <span className="text-emerald-400 font-mono">Klatka {props.cassetteEnterFrame}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="1"
                value={props.cassetteEnterFrame}
                onChange={(e) =>
                  updateProp("cassetteEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>3. Publikacja na YouTube</span>
                <span className="text-emerald-400 font-mono">Klatka {props.youtubeEnterFrame}</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="1"
                value={props.youtubeEnterFrame}
                onChange={(e) =>
                  updateProp("youtubeEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>4. Publikacja na Reddit</span>
                <span className="text-emerald-400 font-mono">Klatka {props.redditEnterFrame}</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="1"
                value={props.redditEnterFrame}
                onChange={(e) =>
                  updateProp("redditEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          {/* Opcje tła i oddechu */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2.5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-300">Przezroczyste tło (Alpha ProRes 4444)</span>
              <input
                type="checkbox"
                checked={props.transparentBackground}
                onChange={(e) =>
                  updateProp("transparentBackground", e.target.checked)
                }
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-300">Organiczny oddech postaci (Idle Bobbing)</span>
              <input
                type="checkbox"
                checked={props.idleBobbing}
                onChange={(e) => updateProp("idleBobbing", e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
