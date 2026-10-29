"use client";

import React, { useState } from "react";
import {
  Grid,
  Activity,
  Sliders,
  Type,
  Eye,
  RotateCw,
  Sparkles,
  Layers,
  Clock,
  Check,
} from "lucide-react";
import { JoyDivisionCassetteMorphProps } from "../../remotion/templates/JoyDivisionCassetteMorph/schema";

interface JoyDivisionControlsProps {
  props: JoyDivisionCassetteMorphProps;
  updateProp: <K extends keyof JoyDivisionCassetteMorphProps>(
    key: K,
    val: JoyDivisionCassetteMorphProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const JoyDivisionControls: React.FC<JoyDivisionControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<
    "layout" | "deal" | "waves" | "duration"
  >("layout");

  const dealDirections = [
    {
      id: "from-top",
      name: "Z Góry (Klasyczne Rozdanie)",
      desc: "Rządki wlatują z góry ekranu i lądują na blacie z delikatnym wachlarzem i sprężystym zatrzaskiem.",
      badge: "Karty",
    },
    {
      id: "from-bottom",
      name: "Z Dołu Ekranu",
      desc: "Rządki dynamicznie wysuwają się od dolnej krawędzi prosto na swoje pozycje.",
      badge: "Od Dołu",
    },
    {
      id: "scale-snap",
      name: "Z Talii na Środku (Snap)",
      desc: "Szybki wystrzał z talii ze sprężystym powiększeniem i natychmiastowym rozłożeniem rzędu.",
      badge: "Snap",
    },
    {
      id: "diagonal-deck",
      name: "Z Rogu Stołu (Dealer)",
      desc: "Karty rozdawane z lewego górnego rogu jak z dłoni krupiera z lekkim kątem obrotu.",
      badge: "Kasyno",
    },
  ];

  const layouts = [
    {
      id: "grid-5x5",
      name: "Siatka 5 × 5 (Rekomendowane)",
      desc: "25 małych kaset na ekranie, które płynnie układają się w 25 rzędów, rozciągają i spłaszczają w linie, po czym wyrastają z nich góry.",
      badge: "5 × 5",
      icon: Grid,
    },
    {
      id: "vertical-stack",
      name: "Pionowa Wieża (25 Linii)",
      desc: "25 kaset ułożonych od początku w 25 rzędach, natychmiast rozciągających się i spłaszczających w linie.",
      badge: "Wieża",
      icon: Layers,
    },
    {
      id: "staggered-cluster",
      name: "Swobodny Klaster",
      desc: "Kinowo rozproszone małe kasety z delikatnym dryfem, zjeżdżające się do rzędów.",
      badge: "Chaos",
      icon: Activity,
    },
  ];

  const alignStyles = [
    {
      id: "natural-stack",
      name: "Naturalny Stos (Czyste Kasety)",
      desc: "Kasety układają się jedna na drugiej w swoich 100% naturalnych proporcjach (bez deformacji). Dopiero po ułożeniu następuje ich rozciągnięcie i spłaszczenie.",
      badge: "Rekomendowane",
      icon: Layers,
    },
    {
      id: "adaptive-rows",
      name: "Wstępna Adaptacja Wysokości",
      desc: "Kasety zwężają się w pionie już podczas zjeżdżania do pozycji rzędów, dopasowując się wcześniej do wysokości linii.",
      badge: "Alternatywa",
      icon: Activity,
    },
  ];

  const colorThemes = [
    { id: "#ffffff", name: "Czysta Biel (Oryginał)", color: "#ffffff" },
    { id: "#e2e8f0", name: "Chłodny Cynk (Vintage)", color: "#cbd5e1" },
    { id: "#fef3c7", name: "Ciepły Papier / Kość", color: "#fef3c7" },
    { id: "#38bdf8", name: "Cyfrowy Błękit (Synth)", color: "#38bdf8" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("layout")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "layout"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span className="text-[10px]">Układ 25</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("deal")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "deal"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="text-[10px]">Karty (Intro)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("waves")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "waves"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span className="text-[10px]">Góry / Fale</span>
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

      {/* ================= TAB 1: UKŁAD 25 KASET & CZAS METAMORFOZY ================= */}
      {activeTab === "layout" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">
              Układ Początkowy 25 Kaset:
            </label>
            <div className="space-y-2">
              {layouts.map((l) => {
                const isSelected = props.initialLayout === l.id;
                const Icon = l.icon;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => updateProp("initialLayout", l.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/80 text-white shadow-md"
                        : "bg-[#14141e] hover:bg-[#1a1a28] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-amber-500 text-black font-bold"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-amber-300" : "text-white"
                          }`}
                        >
                          {l.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border bg-white/5 border-white/10 text-zinc-300">
                          {l.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">{l.desc}</p>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sposób ułożenia w rzędzie (stos bez deformacji vs adaptacja) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">
              Sposób Ułożenia w Rzędzie:
            </label>
            <div className="space-y-2">
              {alignStyles.map((s) => {
                const isSelected = (props.alignStyle || "natural-stack") === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => updateProp("alignStyle", s.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/80 text-white shadow-md"
                        : "bg-[#14141e] hover:bg-[#1a1a28] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-amber-500 text-black font-bold"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-amber-300" : "text-white"
                          }`}
                        >
                          {s.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border bg-white/5 border-white/10 text-zinc-300">
                          {s.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">{s.desc}</p>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center flex-shrink-0 mt-1">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rozmiar Kaset (Skala) */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Rozmiar Kaset (Skala)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Wymiary: {Math.round(98 * (props.cassetteScale || 1.15))} × {Math.round(62 * (props.cassetteScale || 1.15))} px
                </span>
              </div>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {((props.cassetteScale || 1.15) * 100).toFixed(0)}% ({(props.cassetteScale || 1.15).toFixed(2)}x)
              </span>
            </div>

            <input
              type="range"
              min={0.8}
              max={1.5}
              step={0.05}
              value={props.cassetteScale || 1.15}
              onChange={(e) => updateProp("cassetteScale", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-1 pt-0.5">
              {[
                { val: 1.0, label: "1.00x (Oryginał)" },
                { val: 1.15, label: "1.15x (Optymalne)" },
                { val: 1.3, label: "1.30x (Wyraziste)" },
              ].map((s) => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => updateProp("cassetteScale", s.val)}
                  className={`py-1 rounded text-[10px] transition-all ${
                    Math.abs((props.cassetteScale || 1.15) - s.val) < 0.03
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-[#181822] text-zinc-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Odstępy w Siatce 5×5 (Spacing X / Y - aby nie wychodziły poza ekran) */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Odstępy w Siatce (Spacing)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Mniejszy spacing mieści powiększone kasety w bezpiecznych marginesach ekranu
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateProp("gridSpacingX", 180);
                  updateProp("gridSpacingY", 115);
                }}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
              >
                Resetuj (180×115)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-1.5 bg-[#161622] p-2 rounded-lg border border-white/5">
                <div className="flex justify-between items-center text-[10px] text-zinc-300">
                  <span>Poziomo (X)</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {props.gridSpacingX || 180} px
                  </span>
                </div>
                <input
                  type="range"
                  min={130}
                  max={240}
                  step={5}
                  value={props.gridSpacingX || 180}
                  onChange={(e) => updateProp("gridSpacingX", Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 bg-[#161622] p-2 rounded-lg border border-white/5">
                <div className="flex justify-between items-center text-[10px] text-zinc-300">
                  <span>Pionowo (Y)</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {props.gridSpacingY || 115} px
                  </span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={160}
                  step={5}
                  value={props.gridSpacingY || 115}
                  onChange={(e) => updateProp("gridSpacingY", Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Moment rozpoczęcia układania w rzędy */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Moment Układania w Rzędy
              </span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                klatka {props.morphStartFrame} ({(props.morphStartFrame / fps).toFixed(1)}s)
              </span>
            </div>

            <input
              type="range"
              min={15}
              max={90}
              step={5}
              value={props.morphStartFrame}
              onChange={(e) => updateProp("morphStartFrame", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
              <span>Szybkie ułożenie (0.5s)</span>
              <span>Dłuższy podgląd 25 kaset (3s)</span>
            </div>
          </div>

          {/* Prędkość obrotu kółek kaset */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                Prędkość Obrotu Kółek Kaset
              </span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.spoolSpinSpeed.toFixed(1)}x
              </span>
            </div>

            <input
              type="range"
              min={0.4}
              max={2.5}
              step={0.1}
              value={props.spoolSpinSpeed}
              onChange={(e) => updateProp("spoolSpinSpeed", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* ================= TAB 2: FALE JOY DIVISION ================= */}
      {activeTab === "waves" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Wysokość gór */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                Wysokość Szczytów Gór (Peaks)
              </span>
              <span className="font-mono text-amber-400 text-xs font-bold">
                {props.peakHeightMultiplier.toFixed(2)}x
              </span>
            </div>

            <input
              type="range"
              min={0.6}
              max={1.8}
              step={0.05}
              value={props.peakHeightMultiplier}
              onChange={(e) => updateProp("peakHeightMultiplier", Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-3 gap-1 pt-1">
              {[
                { val: 0.8, label: "Łagodne (0.8x)" },
                { val: 1.15, label: "Klasyczne (1.15x)" },
                { val: 1.5, label: "Wysokie (1.5x)" },
              ].map((h) => (
                <button
                  key={h.val}
                  type="button"
                  onClick={() => updateProp("peakHeightMultiplier", h.val)}
                  className={`py-1 rounded text-[10px] transition-all ${
                    Math.abs(props.peakHeightMultiplier - h.val) < 0.05
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                      : "bg-[#181822] text-zinc-400"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grubość linii & Szum radiowy */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Grubość Linii</span>
                <span className="font-mono text-amber-400 font-bold">
                  {props.lineWidth.toFixed(1)} px
                </span>
              </div>
              <input
                type="range"
                min={1.0}
                max={3.0}
                step={0.2}
                value={props.lineWidth}
                onChange={(e) => updateProp("lineWidth", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Szum Radiowy</span>
                <span className="font-mono text-amber-400 font-bold">
                  {props.noiseIntensity.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={0.3}
                max={1.8}
                step={0.1}
                value={props.noiseIntensity}
                onChange={(e) => updateProp("noiseIntensity", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Kolor linii */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 block font-mono uppercase">
              Kolor Linii:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {colorThemes.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => updateProp("lineColor", col.id)}
                  className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2 ${
                    props.lineColor === col.id
                      ? "bg-amber-500/15 border-amber-500/70 text-white font-bold"
                      : "bg-[#14141e] border-white/5 text-zinc-400"
                  }`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: col.color }}
                  />
                  <span className="text-[10px]">{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Efekt 3D zasłaniania (Occlusion) & Glow */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-semibold block">
                  Zasłanianie 3D (Czarna Maska)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Dolne fale zasłaniają górne, tworząc granię
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableOcclusionFill", !props.enableOcclusionFill)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableOcclusionFill
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableOcclusionFill ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-semibold block">
                  Poświata Neonowa (Glow)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Subtelny analogowy blask wokół linii
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableGlow", !props.enableGlow)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableGlow
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableGlow ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ROZDAWANIE KASET JAK KART (INTRO) ================= */}
      {activeTab === "deal" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Główny przełącznik wejścia kart */}
          <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Animacja Wejścia (Rozdawanie Kart)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Cały rządek (5 kaset naraz) wlatuje po kolei z fizyką uderzenia w blat
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableDealIntro", !(props.enableDealIntro ?? true))}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  (props.enableDealIntro ?? true)
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {(props.enableDealIntro ?? true) ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>
          </div>

          {(props.enableDealIntro ?? true) && (
            <>
              {/* Wybór trajektorii / stylu rozdawania */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white block">
                  Kierunek & Styl Rozdawania:
                </label>
                <div className="space-y-2">
                  {dealDirections.map((dir) => {
                    const isSelected = (props.dealDirection || "from-top") === dir.id;
                    return (
                      <button
                        key={dir.id}
                        type="button"
                        onClick={() => updateProp("dealDirection", dir.id as any)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-500/80 text-white shadow-md"
                            : "bg-[#14141e] hover:bg-[#1a1a28] border-white/5 text-zinc-400"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected
                              ? "bg-amber-500 text-black font-bold"
                              : "bg-white/5 text-zinc-400"
                          }`}
                        >
                          <Layers className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={`text-xs font-bold ${
                                isSelected ? "text-amber-300" : "text-white"
                              }`}
                            >
                              {dir.name}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border bg-white/5 border-white/10 text-zinc-300">
                              {dir.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 leading-snug">{dir.desc}</p>
                        </div>

                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center flex-shrink-0 mt-1">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kontrola Timingu Rozdawania */}
              <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3.5">
                <span className="text-xs font-semibold text-white block border-b border-white/5 pb-2">
                  Timing & Prędkość Rozdawania:
                </span>

                {/* Odstęp między rządkami (Stagger) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-300">
                    <div>
                      <span className="font-semibold block">Odstęp Między Rządkami (Stagger)</span>
                      <span className="text-[9px] text-zinc-500">
                        Czas między wyrzutem kolejnych 5 rzędów kaset
                      </span>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.dealRowStagger ?? 6} kl. ({(((props.dealRowStagger ?? 6) / fps)).toFixed(2)}s)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={14}
                    step={1}
                    value={props.dealRowStagger ?? 6}
                    onChange={(e) => updateProp("dealRowStagger", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Ekspresowe (2 kl.)</span>
                    <span>Standard (6 kl.)</span>
                    <span>Powolne (14 kl.)</span>
                  </div>
                </div>

                {/* Czas lotu pojedynczego rządka (Duration) */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-300">
                    <div>
                      <span className="font-semibold block">Czas Lotu Rządka (Duration)</span>
                      <span className="text-[9px] text-zinc-500">
                        Długość lotu i sprężystego zatrzymania na stole
                      </span>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.dealRowDuration ?? 14} kl. ({(((props.dealRowDuration ?? 14) / fps)).toFixed(2)}s)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={26}
                    step={1}
                    value={props.dealRowDuration ?? 14}
                    onChange={(e) => updateProp("dealRowDuration", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Błyskawiczny snap (8 kl.)</span>
                    <span>Miękkie lądowanie (26 kl.)</span>
                  </div>
                </div>

                {/* Opóźnienie startu (Deal Start Frame) */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-300">
                    <div>
                      <span className="font-semibold block">Klatka Rozpoczęcia (Start)</span>
                      <span className="text-[9px] text-zinc-500">
                        Chwila ciszy przed pierwszym rozdaniem
                      </span>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">
                      klatka {props.dealStartFrame ?? 4} ({(((props.dealStartFrame ?? 4) / fps)).toFixed(2)}s)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={24}
                    step={2}
                    value={props.dealStartFrame ?? 4}
                    onChange={(e) => updateProp("dealStartFrame", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ================= TAB 4: CZAS TRWANIA ================= */}
      {activeTab === "duration" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <label className="text-xs font-semibold text-white block">
              Długość Animacji:
            </label>
            <div className="space-y-2">
              {[
                { sec: 8, frames: 240, label: "8 sekund (Rekomendowane)", badge: "240 klatek" },
                { sec: 10, frames: 300, label: "10 sekund (Spokojne tempo)", badge: "300 klatek" },
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
