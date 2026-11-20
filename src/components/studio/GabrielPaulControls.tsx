"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  MessageCircle,
  HelpCircle,
  Sliders,
  Palette,
  Headphones,
  Radio,
  Check,
} from "lucide-react";
import { GabrielPaulFacebookProps } from "../../remotion/templates/GabrielPaulFacebook/schema";

interface GabrielPaulControlsProps {
  props: GabrielPaulFacebookProps;
  updateProp: <K extends keyof GabrielPaulFacebookProps>(
    key: K,
    val: GabrielPaulFacebookProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const GabrielPaulControls: React.FC<GabrielPaulControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "characters" | "facebook" | "timing"
  >("characters");

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

  const paulColors = [
    { id: "#92400e", name: "Ciepły Brąz (Domyślny)", color: "#92400e" },
    { id: "#a16207", name: "Bursztynowy Brąz", color: "#a16207" },
    { id: "#b45309", name: "Cynamonowy Brąz", color: "#b45309" },
    { id: "#78350f", name: "Głęboki Brąz", color: "#78350f" },
    { id: "#ffffff", name: "Biel Wireframe", color: "#ffffff" },
  ];

  const gabrielColors = [
    { id: "#22c55e", name: "Zieleń Gabaskinsa", color: "#22c55e" },
    { id: "#10b981", name: "Szmaragd", color: "#10b981" },
    { id: "#38bdf8", name: "Błękit Lydii", color: "#38bdf8" },
    { id: "#ffffff", name: "Biel Wireframe", color: "#ffffff" },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* ================= GŁÓWNY PRZEŁĄCZNIK ZAKŁADEK ================= */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#12121a] rounded-lg border border-white/5">
        <button
          type="button"
          onClick={() => setActiveTab("characters")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "characters"
              ? "bg-amber-600 text-white shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span className="text-[10px]">Postacie</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("facebook")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "facebook"
              ? "bg-amber-600 text-white shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="text-[10px]">Facebook & ?</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("timing")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "timing"
              ? "bg-amber-600 text-white shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Timing</span>
        </button>
      </div>

      {/* =========================================================================
          ZAKŁADKA 1: POSTACIE (GABRIEL & PAUL BASKERVILLE)
          ========================================================================= */}
      {activeTab === "characters" && (
        <div className="space-y-4">
          {/* Postać 1: Gabriel (Zielony) */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Gabriel (po lewej)
              </label>
              <label className="flex items-center gap-1 text-[11px] text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.gabrielShowAntenna}
                  onChange={(e) => updateProp("gabrielShowAntenna", e.target.checked)}
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
                />
                Antenka Snoo
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Podpis</label>
                <input
                  type="text"
                  value={props.gabrielName}
                  onChange={(e) => updateProp("gabrielName", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Podtytuł</label>
                <input
                  type="text"
                  value={props.gabrielSubtitle}
                  onChange={(e) => updateProp("gabrielSubtitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">Kolor Gabriela</label>
              <div className="grid grid-cols-2 gap-1">
                {gabrielColors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => updateProp("gabrielColor", c.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded border text-left transition-all ${
                      props.gabrielColor === c.id
                        ? "border-emerald-500 bg-emerald-500/10 text-white font-semibold"
                        : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="truncate text-[10px]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Postać 2: Paul Baskerville (Brązowy) */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-amber-600/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-amber-500 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                Paul Baskerville (po prawej)
              </label>
              <label className="flex items-center gap-1 text-[11px] text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.paulShowHeadphones}
                  onChange={(e) => updateProp("paulShowHeadphones", e.target.checked)}
                  className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                />
                <Headphones className="w-3 h-3 text-amber-400" />
                Słuchawki DJ
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Podpis</label>
                <input
                  type="text"
                  value={props.paulName}
                  onChange={(e) => updateProp("paulName", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Podtytuł</label>
                <input
                  type="text"
                  value={props.paulSubtitle}
                  onChange={(e) => updateProp("paulSubtitle", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Kolor Paula Baskerville'a (Brązy) */}
            <div>
              <label className="text-[10px] text-zinc-400 block mb-1">
                Kolor postaci (Wymóg: Brązowy)
              </label>
              <div className="grid grid-cols-2 gap-1">
                {paulColors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => updateProp("paulColor", c.id)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded border text-left transition-all ${
                      props.paulColor === c.id
                        ? "border-amber-500 bg-amber-500/10 text-white font-semibold"
                        : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="truncate text-[10px]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Potrząśnięcie głową przy braku rozpoznania */}
            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-300 text-[11px]">
                Zakłopotane potrząśnięcie głową (Head Shake)
              </span>
              <input
                type="checkbox"
                checked={props.paulHeadShake}
                onChange={(e) => updateProp("paulHeadShake", e.target.checked)}
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>
          </div>

          {/* Skala postaci */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Wielkość postaci</span>
              <span className="text-amber-400 font-mono">
                {Math.round(props.charactersScale * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.05"
              value={props.charactersScale}
              onChange={(e) =>
                updateProp("charactersScale", parseFloat(e.target.value))
              }
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          ZAKŁADKA 2: FACEBOOK & ZNAK ZAPYTANIA
          ========================================================================= */}
      {activeTab === "facebook" && (
        <div className="space-y-4">
          {/* Styl Facebooka */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <label className="text-zinc-300 font-medium">Styl logo Facebooka</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateProp("facebookStyle", "vibrant")}
                className={`p-2 rounded border text-left transition-all flex flex-col gap-0.5 ${
                  props.facebookStyle === "vibrant"
                    ? "border-blue-500 bg-blue-500/10 text-white font-bold"
                    : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1877f2]" />
                  <span className="text-[11px] font-semibold text-white">Błękit FB</span>
                </div>
                <span className="text-[10px] text-zinc-500">Klasyczny błękit #1877f2</span>
              </button>

              <button
                type="button"
                onClick={() => updateProp("facebookStyle", "monochrome")}
                className={`p-2 rounded border text-left transition-all flex flex-col gap-0.5 ${
                  props.facebookStyle === "monochrome"
                    ? "border-blue-500 bg-blue-500/10 text-white font-bold"
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

          {/* Elementy komunikacji & Skala Facebooka */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <label className="text-zinc-300 font-medium">Logo Facebooka & Czat</label>

            {/* Skala logo Facebooka (Powiększanie / Zmniejszanie bez ograniczeń) */}
            <div className="p-2.5 bg-zinc-950 rounded border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-white font-medium">Wielkość logo Facebooka</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="10"
                    min="10"
                    value={Math.round((props.facebookScale ?? 1.3) * 100)}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        updateProp("facebookScale", val / 100);
                      }
                    }}
                    className="w-16 px-1.5 py-0.5 bg-black border border-white/10 rounded text-right font-mono text-xs text-blue-400 font-bold focus:border-blue-500 outline-none"
                  />
                  <span className="text-xs text-blue-400 font-bold font-mono">%</span>
                </div>
              </div>
              <input
                type="range"
                min="0.2"
                max="8.0"
                step="0.05"
                value={props.facebookScale ?? 1.3}
                onChange={(e) =>
                  updateProp("facebookScale", parseFloat(e.target.value))
                }
                className="w-full accent-blue-500"
              />
              <div className="flex gap-1 pt-0.5">
                {[
                  { label: "100%", val: 1.0 },
                  { label: "150%", val: 1.5 },
                  { label: "200%", val: 2.0 },
                  { label: "300%", val: 3.0 },
                  { label: "400%", val: 4.0 },
                ].map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => updateProp("facebookScale", p.val)}
                    className={`flex-1 py-1 rounded text-[10px] font-mono border transition-all ${
                      Math.abs((props.facebookScale ?? 1.3) - p.val) < 0.05
                        ? "border-blue-500 bg-blue-500/20 text-blue-400 font-bold"
                        : "border-white/5 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-200">Pokaż logo Facebooka</span>
              <input
                type="checkbox"
                checked={props.showFacebook}
                onChange={(e) => updateProp("showFacebook", e.target.checked)}
                className="rounded border-zinc-700 text-blue-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-200">Podpis tekstowy pod logo Facebooka</span>
              <input
                type="checkbox"
                checked={props.showFacebookLabel}
                onChange={(e) => updateProp("showFacebookLabel", e.target.checked)}
                className="rounded border-zinc-700 text-blue-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-200">Latające dymki wiadomości czatu</span>
              <input
                type="checkbox"
                checked={props.showChatBubbles}
                onChange={(e) => updateProp("showChatBubbles", e.target.checked)}
                className="rounded border-zinc-700 text-blue-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-200">Linie połączenia czatu</span>
              <input
                type="checkbox"
                checked={props.showConnectionLines}
                onChange={(e) => updateProp("showConnectionLines", e.target.checked)}
                className="rounded border-zinc-700 text-blue-500 focus:ring-0"
              />
            </label>
          </div>

          {/* Znak zapytania u Paula Baskerville'a */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-amber-400 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Pytajnik przy Paulu (brak rozpoznania)
              </label>
              <input
                type="checkbox"
                checked={props.showQuestionMark}
                onChange={(e) => updateProp("showQuestionMark", e.target.checked)}
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </div>

            {props.showQuestionMark && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-[11px]">Treść znaku</span>
                  <div className="flex gap-1.5">
                    {["?", "???", "✕"].map((sym) => (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => updateProp("questionMarkText", sym)}
                        className={`px-2.5 py-1 rounded font-mono font-bold text-xs border ${
                          props.questionMarkText === sym
                            ? "border-amber-500 bg-amber-500/20 text-amber-400"
                            : "border-white/10 bg-zinc-950 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Skala pytajnika</span>
                    <span className="text-amber-400 font-mono">
                      {Math.round(props.questionMarkScale * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.8"
                    step="0.05"
                    value={props.questionMarkScale}
                    onChange={(e) =>
                      updateProp("questionMarkScale", parseFloat(e.target.value))
                    }
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
                    <span className="text-zinc-300 text-[11px]">Podpis "NIE ROZPOZNAJE" pod pytajnikiem</span>
                    <input
                      type="checkbox"
                      checked={props.showQuestionText}
                      onChange={(e) => updateProp("showQuestionText", e.target.checked)}
                      className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
                    <span className="text-zinc-300 text-[11px]">Pulsujący pierścień z tyłu</span>
                    <input
                      type="checkbox"
                      checked={props.showQuestionPulse}
                      onChange={(e) => updateProp("showQuestionPulse", e.target.checked)}
                      className="rounded border-zinc-700 text-amber-500 focus:ring-0"
                    />
                  </label>
                </div>
              </>
            )}
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
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
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
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
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
                      ? "border-amber-500 bg-amber-500/20 text-amber-400 font-bold"
                      : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Klatki sekwencji zdarzeń */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <label className="text-zinc-300 font-medium">Sekwencja wydarzeń (Klatki)</label>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>1. Wejście postaci</span>
                <span className="text-amber-400 font-mono">Klatka {props.charactersEnterFrame}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={props.charactersEnterFrame}
                onChange={(e) =>
                  updateProp("charactersEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>2. Pojawienie się Facebooka</span>
                <span className="text-amber-400 font-mono">Klatka {props.facebookEnterFrame}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="1"
                value={props.facebookEnterFrame}
                onChange={(e) =>
                  updateProp("facebookEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>3. Wysłanie pytania o utwór</span>
                <span className="text-amber-400 font-mono">Klatka {props.messageSentFrame}</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="1"
                value={props.messageSentFrame}
                onChange={(e) =>
                  updateProp("messageSentFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>4. Odpowiedź Paula ("dziennikarz odpowiada")</span>
                <span className="text-amber-400 font-mono">Klatka {props.messageReplyFrame}</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                step="1"
                value={props.messageReplyFrame}
                onChange={(e) =>
                  updateProp("messageReplyFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>5. Znak zapytania ("nie rozpoznaje utworu")</span>
                <span className="text-amber-400 font-mono">Klatka {props.questionMarkFrame}</span>
              </div>
              <input
                type="range"
                min="80"
                max="180"
                step="1"
                value={props.questionMarkFrame}
                onChange={(e) =>
                  updateProp("questionMarkFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
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
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-300">Organiczny oddech postaci (Idle Bobbing)</span>
              <input
                type="checkbox"
                checked={props.idleBobbing}
                onChange={(e) => updateProp("idleBobbing", e.target.checked)}
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
