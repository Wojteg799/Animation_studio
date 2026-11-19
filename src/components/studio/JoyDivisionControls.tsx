"use client";

import React, { useState, useEffect } from "react";
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
  Zap,
  ArrowDown,
  TrendingUp,
  Maximize2,
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

  const handleAutoScaleMilestones = () => {
    const scale = currentDuration / 240;
    const newDealStart = Math.round(4 * scale);
    const newDealStagger = Math.max(2, Math.round(6 * scale));
    const newDealDuration = Math.max(6, Math.round(14 * scale));
    const newDealFinish = (props.enableDealIntro ?? true)
      ? newDealStart + 4 * newDealStagger + newDealDuration
      : 0;

    const newAlignStart = Math.max(newDealFinish + 4, Math.round(50 * scale));
    const newAlignDuration = Math.max(15, Math.round(38 * scale));
    const newFlattenStart = newAlignStart + newAlignDuration;
    const newFlattenDuration = Math.max(15, Math.round(45 * scale));
    const newMountainStart = newFlattenStart + newFlattenDuration;
    const newMountainDuration = Math.max(20, Math.round(52 * scale));

    updateProp("dealStartFrame", newDealStart);
    updateProp("dealRowStagger", newDealStagger);
    updateProp("dealRowDuration", newDealDuration);
    updateProp("alignStartFrame", newAlignStart);
    updateProp("morphStartFrame", newAlignStart);
    updateProp("alignDuration", newAlignDuration);
    updateProp("flattenStartFrame", newFlattenStart);
    updateProp("flattenDuration", newFlattenDuration);
    updateProp("mountainStartFrame", newMountainStart);
    updateProp("mountainDuration", newMountainDuration);
  };

  const currentAlignStart = props.alignStartFrame ?? props.morphStartFrame ?? 50;
  const currentAlignDuration = props.alignDuration ?? 38;
  const currentFlattenStart = props.flattenStartFrame ?? (currentAlignStart + currentAlignDuration);
  const currentFlattenDuration = props.flattenDuration ?? 45;
  const currentMountainStart = props.mountainStartFrame ?? (currentFlattenStart + currentFlattenDuration);
  const currentMountainDuration = props.mountainDuration ?? 52;
  const currentDealStart = props.dealStartFrame ?? 4;
  const currentDealStagger = props.dealRowStagger ?? 6;
  const currentDealDuration = props.dealRowDuration ?? 14;

  const dealTotalLandedFrame = (props.enableDealIntro ?? true)
    ? currentDealStart + 4 * currentDealStagger + currentDealDuration
    : 0;
  const fullMountainsReadyFrame = currentMountainStart + currentMountainDuration + Math.round(24 * 0.7);

  const timingMilestones = [
    {
      key: "dealStartFrame" as const,
      title: "1. Start Rozdawania Kaset",
      desc: "Klatka wlotu pierwszego rządka kaset na blat stołu",
      icon: <Layers className="w-3.5 h-3.5 text-amber-400" />,
      val: currentDealStart,
      min: 0,
      max: currentDuration,
      isDuration: false,
    },
    {
      key: "dealRowDuration" as const,
      title: "2. Czas Lotu Pojedynczego Rządka",
      desc: "Długość lotu i sprężystego zatrzaśnięcia każdego rzędu",
      icon: <ArrowDown className="w-3.5 h-3.5 text-amber-400" />,
      val: currentDealDuration,
      min: 4,
      max: 120,
      isDuration: true,
    },
    {
      key: "dealRowStagger" as const,
      title: "3. Odstęp Między Rządkami (Stagger)",
      desc: "Opóźnienie między wlotem kolejnych 5 rzędów kaset",
      icon: <Sliders className="w-3.5 h-3.5 text-amber-400" />,
      val: currentDealStagger,
      min: 1,
      max: 60,
      isDuration: true,
    },
    {
      key: "alignStartFrame" as const,
      title: "4. Początek Zjazdu do 25 Rzędów",
      desc: "Klatka, w której kasety zaczynają zjeżdżać w pionowy stos",
      icon: <Grid className="w-3.5 h-3.5 text-amber-400" />,
      val: currentAlignStart,
      min: 0,
      max: currentDuration,
      isDuration: false,
    },
    {
      key: "alignDuration" as const,
      title: "5. Czas Trwania Zjazdu (Duration)",
      desc: "Ile klatek trwa wyrównanie i ułożenie kaset w 25 rzędach",
      icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
      val: currentAlignDuration,
      min: 5,
      max: 300,
      isDuration: true,
    },
    {
      key: "flattenStartFrame" as const,
      title: "6. Początek Spłaszczania w Linie",
      desc: "Klatka rozpoczęcia rozciągania wszerz i spłaszczania w linie",
      icon: <Maximize2 className="w-3.5 h-3.5 text-amber-400" />,
      val: currentFlattenStart,
      min: 0,
      max: currentDuration,
      isDuration: false,
    },
    {
      key: "flattenDuration" as const,
      title: "7. Czas Trwania Spłaszczania (Duration)",
      desc: "Czas spłaszczania kaset do 100% płaskiej, cienkiej linii",
      icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
      val: currentFlattenDuration,
      min: 5,
      max: 300,
      isDuration: true,
    },
    {
      key: "mountainStartFrame" as const,
      title: "8. Początek Wyrastania Gór Joy Division",
      desc: "Klatka, w której z płaskich linii zaczynają wznosić się szczyty",
      icon: <TrendingUp className="w-3.5 h-3.5 text-amber-400" />,
      val: currentMountainStart,
      min: 0,
      max: currentDuration,
      isDuration: false,
    },
    {
      key: "mountainDuration" as const,
      title: "9. Czas Wznoszenia Szczytów (Duration)",
      desc: "Czas erupcji pełnej wysokości szczytów Unknown Pleasures",
      icon: <Activity className="w-3.5 h-3.5 text-amber-400" />,
      val: currentMountainDuration,
      min: 5,
      max: 300,
      isDuration: true,
    },
  ];

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
      {/* Transparency & Alpha Channel Switcher */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">
              Przezroczyste Tło (Alpha Channel)
            </span>
            <span className="text-[10px] text-zinc-400">
              {props.transparentBackground
                ? "Brak czarnego tła – 100% przezroczyste linie na wideo (ProRes 4444)"
                : "Głęboka czerń (oryginalna okładka Unknown Pleasures)"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("transparentBackground", !(props.transparentBackground ?? true))}
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              (props.transparentBackground ?? true)
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {(props.transparentBackground ?? true) ? "ALPHA (ON)" : "CZARNE TŁO"}
          </button>
        </div>
        {(props.transparentBackground ?? true) && (
          <p className="text-[10px] text-emerald-400/90 font-mono bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
            ✓ Gotowe do nałożenia na film w DaVinci Resolve / Premiere Pro (eksport ProRes 4444).
          </p>
        )}
      </div>

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
                klatka {currentAlignStart} ({(currentAlignStart / fps).toFixed(2)}s)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                <span className="text-[9px] text-zinc-400 uppercase">Klatka:</span>
                <input
                  type="number"
                  min="0"
                  max={currentDuration}
                  step="1"
                  value={currentAlignStart}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      updateProp("alignStartFrame", Math.max(0, val));
                      updateProp("morphStartFrame", Math.max(0, val));
                    }
                  }}
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                <span className="text-[9px] text-zinc-400 uppercase">Sek:</span>
                <input
                  type="number"
                  min="0"
                  max={parseFloat((currentDuration / fps).toFixed(2))}
                  step="0.1"
                  value={parseFloat((currentAlignStart / fps).toFixed(2))}
                  onChange={(e) => {
                    const sec = parseFloat(e.target.value);
                    if (!isNaN(sec)) {
                      const fr = Math.max(0, Math.round(sec * fps));
                      updateProp("alignStartFrame", fr);
                      updateProp("morphStartFrame", fr);
                    }
                  }}
                  className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                />
                <span className="text-[10px] text-zinc-500 font-mono">s</span>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={currentDuration}
              step={1}
              value={currentAlignStart}
              onChange={(e) => {
                const val = Number(e.target.value);
                updateProp("alignStartFrame", val);
                updateProp("morphStartFrame", val);
              }}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
              <span>Wczesny zjazd (od razu)</span>
              <span>Dłuższy podgląd 25 kaset</span>
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
                  Zasłanianie 3D (Czarna Maska Konturowa)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Czarna maska pod granią – dolne fale zasłaniają górne, tworząc granię 3D
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableOcclusionFill", !(props.enableOcclusionFill ?? true))}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  (props.enableOcclusionFill ?? true)
                    ? "bg-emerald-500 text-black shadow-sm"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {(props.enableOcclusionFill ?? true) ? "CZARNA MASKA (WŁ)" : "WYŁĄCZONA"}
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

                {/* Klatka Rozpoczęcia (Deal Start Frame) */}
                <div className="space-y-1.5">
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

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Klatka:</span>
                      <input
                        type="number"
                        min="0"
                        max={currentDuration}
                        step="1"
                        value={props.dealStartFrame ?? 4}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) updateProp("dealStartFrame", Math.max(0, val));
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Sek:</span>
                      <input
                        type="number"
                        min="0"
                        max={parseFloat((currentDuration / fps).toFixed(2))}
                        step="0.1"
                        value={parseFloat((((props.dealStartFrame ?? 4) / fps)).toFixed(2))}
                        onChange={(e) => {
                          const sec = parseFloat(e.target.value);
                          if (!isNaN(sec)) updateProp("dealStartFrame", Math.max(0, Math.round(sec * fps)));
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">s</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={Math.min(currentDuration, 120)}
                    step={1}
                    value={props.dealStartFrame ?? 4}
                    onChange={(e) => updateProp("dealStartFrame", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-amber-400"
                  />
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

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Klatka:</span>
                      <input
                        type="number"
                        min="4"
                        max="120"
                        step="1"
                        value={props.dealRowDuration ?? 14}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) updateProp("dealRowDuration", Math.max(4, val));
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Sek:</span>
                      <input
                        type="number"
                        min="0.1"
                        max="4.0"
                        step="0.05"
                        value={parseFloat((((props.dealRowDuration ?? 14) / fps)).toFixed(2))}
                        onChange={(e) => {
                          const sec = parseFloat(e.target.value);
                          if (!isNaN(sec)) updateProp("dealRowDuration", Math.max(4, Math.round(sec * fps)));
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">s</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={4}
                    max={60}
                    step={1}
                    value={props.dealRowDuration ?? 14}
                    onChange={(e) => updateProp("dealRowDuration", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Błyskawiczny snap (4 kl.)</span>
                    <span>Miękkie lądowanie (60 kl.)</span>
                  </div>
                </div>

                {/* Odstęp między rządkami (Stagger) */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
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

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Klatka:</span>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        step="1"
                        value={props.dealRowStagger ?? 6}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) updateProp("dealRowStagger", Math.max(1, val));
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Sek:</span>
                      <input
                        type="number"
                        min="0.05"
                        max="1.5"
                        step="0.05"
                        value={parseFloat((((props.dealRowStagger ?? 6) / fps)).toFixed(2))}
                        onChange={(e) => {
                          const sec = parseFloat(e.target.value);
                          if (!isNaN(sec)) updateProp("dealRowStagger", Math.max(1, Math.round(sec * fps)));
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">s</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={props.dealRowStagger ?? 6}
                    onChange={(e) => updateProp("dealRowStagger", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Ekspresowe (1 kl.)</span>
                    <span>Standard (6 kl.)</span>
                    <span>Powolne (30 kl.)</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ================= TAB 4: CZAS TRWANIA & HARMONOGRAM TIMINGU ================= */}
      {activeTab === "duration" && (
        <div className="space-y-4 animate-in fade-in">
          {/* A. CAŁKOWITY CZAS TRWANIA WIDEO */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Całkowity Czas Trwania Wideo:
              </span>
              <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {(currentDuration / fps).toFixed(1)}s ({currentDuration} kl.)
              </span>
            </div>

            {/* Bezpośrednie wpisywanie: Sekundy oraz Klatki */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-zinc-400 block mb-1">Sekundy (np. 14 lub 14.5):</span>
                <div className="flex items-center gap-1 bg-[#181822] px-2.5 py-1.5 rounded-lg border border-white/10">
                  <input
                    type="text"
                    value={durationSecInput}
                    onChange={(e) => {
                      const str = e.target.value;
                      setDurationSecInput(str);
                      const cleaned = str.replace(",", ".");
                      const sec = parseFloat(cleaned);
                      if (!isNaN(sec) && sec >= 2) {
                        const frames = Math.round(sec * fps);
                        setDurationFrames(frames);
                        updateProp("durationInFrames", frames);
                        setDurationFramesInput(frames.toString());
                      }
                    }}
                    onBlur={() => {
                      const sec = parseFloat(durationSecInput.replace(",", "."));
                      const validSec = isNaN(sec) || sec < 2 ? 2 : Math.min(120, sec);
                      const frames = Math.round(validSec * fps);
                      setDurationFrames(frames);
                      updateProp("durationInFrames", frames);
                      setDurationSecInput(validSec.toFixed(1));
                      setDurationFramesInput(frames.toString());
                    }}
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                    placeholder="np. 14"
                  />
                  <span className="text-zinc-500 text-[11px] font-mono">s</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 block mb-1">Klatki (frames @ 30fps):</span>
                <div className="flex items-center gap-1 bg-[#181822] px-2.5 py-1.5 rounded-lg border border-white/10">
                  <input
                    type="text"
                    value={durationFramesInput}
                    onChange={(e) => {
                      const str = e.target.value;
                      setDurationFramesInput(str);
                      const fr = parseInt(str, 10);
                      if (!isNaN(fr) && fr >= 60) {
                        setDurationFrames(fr);
                        updateProp("durationInFrames", fr);
                        setDurationSecInput((fr / fps).toFixed(1));
                      }
                    }}
                    onBlur={() => {
                      const fr = parseInt(durationFramesInput, 10);
                      const validFrames = isNaN(fr) || fr < 60 ? 60 : Math.min(3600, fr);
                      setDurationFrames(validFrames);
                      updateProp("durationInFrames", validFrames);
                      setDurationFramesInput(validFrames.toString());
                      setDurationSecInput((validFrames / fps).toFixed(1));
                    }}
                    className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                    placeholder="np. 420"
                  />
                  <span className="text-zinc-500 text-[11px] font-mono">kl.</span>
                </div>
              </div>
            </div>

            {/* Suwak czasu trwania do 60 sekund (1800 klatek) */}
            <div className="pt-1">
              <input
                type="range"
                min="60"
                max="1800"
                step="15"
                value={currentDuration}
                onChange={(e) => handleSetDuration(parseInt(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            {/* Szybkie presety czasu trwania */}
            <div className="grid grid-cols-4 gap-1 pt-1">
              {[
                { label: "6s", frames: 180 },
                { label: "8s", frames: 240 },
                { label: "10s", frames: 300 },
                { label: "12s", frames: 360 },
                { label: "14s (Twój wybór)", frames: 420 },
                { label: "16s", frames: 480 },
                { label: "20s", frames: 600 },
                { label: "30s", frames: 900 },
              ].map((d) => (
                <button
                  key={d.frames}
                  type="button"
                  onClick={() => handleSetDuration(d.frames)}
                  className={`py-1 rounded text-center text-[10px] font-mono transition-all ${
                    currentDuration === d.frames
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-[#181822] text-zinc-400 hover:text-white"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Przycisk automatycznego rozłożenia etapów proporcjonalnie do czasu filmu */}
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={handleAutoScaleMilestones}
                className="w-full py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                ⚡ Automatycznie rozłóż etapy proporcjonalnie do {currentDuration} kl. ({(currentDuration / fps).toFixed(1)}s)
              </button>
              <p className="text-[9px] text-zinc-500 mt-1 text-center">
                Dopasowuje tempo rozdania, zjazdu do rzędów, spłaszczania i wyrastania gór tak, aby film wyglądał idealnie w zadanym czasie.
              </p>
            </div>
          </div>

          {/* B. PRECYZYJNY TIMING KLATEK KLUCZOWYCH (KIEDY CO WCHODZI I ILE TRWA) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Precyzyjny Harmonogram Metamorfozy (Klatki & Sekundy):
            </span>
            <p className="text-[10px] text-zinc-400 leading-snug">
              Wpisz dokładną klatkę lub sekundę, w której ma się zacząć lub ile ma trwać dany etap. Wszystkie zmiany natychmiast odświeżają podgląd.
            </p>

            <div className="space-y-3 pt-1">
              {timingMilestones.map((ev) => {
                const currentVal = ev.val;
                const currentSec = parseFloat((currentVal / fps).toFixed(2));

                return (
                  <div
                    key={ev.key}
                    className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                        {ev.icon}
                        {ev.title}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {currentSec}s ({currentVal} kl.)
                      </span>
                    </div>

                    {/* Pola do wpisywania */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                        <span className="text-[9px] text-zinc-400 uppercase">Klatka:</span>
                        <input
                          type="number"
                          min={ev.min}
                          max={ev.max}
                          step="1"
                          value={currentVal}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              const safeVal = Math.max(ev.min, val);
                              updateProp(ev.key, safeVal);
                              if (ev.key === "alignStartFrame") {
                                updateProp("morphStartFrame", safeVal);
                              }
                            }
                          }}
                          className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                        <span className="text-[9px] text-zinc-400 uppercase">Sek:</span>
                        <input
                          type="number"
                          min={parseFloat((ev.min / fps).toFixed(2))}
                          max={parseFloat((ev.max / fps).toFixed(2))}
                          step="0.1"
                          value={currentSec}
                          onChange={(e) => {
                            const sec = parseFloat(e.target.value);
                            if (!isNaN(sec)) {
                              const fr = Math.max(ev.min, Math.round(sec * fps));
                              updateProp(ev.key, fr);
                              if (ev.key === "alignStartFrame") {
                                updateProp("morphStartFrame", fr);
                              }
                            }
                          }}
                          className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                        />
                        <span className="text-[10px] text-zinc-500 font-mono">s</span>
                      </div>
                    </div>

                    {/* Płynny suwak dostosowany do pełnego zakresu */}
                    <input
                      type="range"
                      min={ev.min}
                      max={ev.max}
                      step="1"
                      value={currentVal}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        updateProp(ev.key, val);
                        if (ev.key === "alignStartFrame") {
                          updateProp("morphStartFrame", val);
                        }
                      }}
                      className="w-full accent-amber-400"
                    />
                    <p className="text-[9px] text-zinc-500">{ev.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* C. KARTA PODSUMOWANIA CAŁEGO PRZEBIEGU (TIMELINE SUMMARY) */}
          <div className="bg-gradient-to-br from-[#13131c] to-[#0c0c14] p-3.5 rounded-xl border border-amber-500/20 space-y-2">
            <span className="text-xs font-semibold text-amber-300 block flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Podsumowanie Osi Czasu Metamorfozy:
            </span>

            <div className="space-y-1.5 text-[10px] font-mono text-zinc-300">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">1. Lądowanie wszystkich 25 kaset:</span>
                <span className="text-white font-bold">
                  klatka {dealTotalLandedFrame} ({(dealTotalLandedFrame / fps).toFixed(2)}s)
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">2. Zjazd do 25 rzędów ukończony:</span>
                <span className="text-white font-bold">
                  klatka {currentAlignStart + currentAlignDuration} ({((currentAlignStart + currentAlignDuration) / fps).toFixed(2)}s)
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">3. Spłaszczenie do cienkich linii:</span>
                <span className="text-white font-bold">
                  klatka {currentFlattenStart + currentFlattenDuration} ({((currentFlattenStart + currentFlattenDuration) / fps).toFixed(2)}s)
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-zinc-400">4. Szczyty Joy Division w 100% gotowe:</span>
                <span className="text-amber-400 font-bold">
                  klatka {fullMountainsReadyFrame} ({(fullMountainsReadyFrame / fps).toFixed(2)}s)
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400">5. Czas trwania widoczności gór:</span>
                <span className="text-emerald-400 font-bold">
                  {Math.max(0, currentDuration - fullMountainsReadyFrame)} kl. ({Math.max(0, (currentDuration - fullMountainsReadyFrame) / fps).toFixed(1)}s)
                </span>
              </div>
            </div>

            {fullMountainsReadyFrame <= currentDuration ? (
              <p className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                ✓ Wszystkie fazy metamorfozy mieszczą się w wybranym czasie ({currentDuration} kl. / {(currentDuration / fps).toFixed(1)}s).
              </p>
            ) : (
              <p className="text-[10px] text-rose-400 font-mono bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                ⚠ Uwaga: Ostatnia faza (wyrastanie szczytów) przekracza czas wideo o {fullMountainsReadyFrame - currentDuration} kl. Kliknij "Automatycznie rozłóż etapy" lub wydłuż czas wideo.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
