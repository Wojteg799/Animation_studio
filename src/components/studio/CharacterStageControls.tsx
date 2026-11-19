"use client";

import React, { useRef, useState } from "react";
import {
  User,
  Users,
  Move,
  Link2,
  Sparkles,
  Upload,
  ArrowRight,
  Radio,
  XCircle,
  Stamp,
  Check,
  Palette,
  Eye,
  Sliders,
  Layers,
  Clock,
  Circle,
} from "lucide-react";
import { CharacterStageProps } from "../../remotion/templates/CharacterStage/schema";
import { AVATAR_PRESETS } from "../../remotion/templates/CharacterStage/default-avatars";

interface CharacterStageControlsProps {
  props: CharacterStageProps;
  updateProp: <K extends keyof CharacterStageProps>(
    key: K,
    val: CharacterStageProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const CharacterStageControls: React.FC<CharacterStageControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<"characters" | "motion" | "interactions" | "scene">("characters");
  const [selectedChar, setSelectedChar] = useState<1 | 2>(1);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // File upload handler for Character 1 / 2
  const handleUpload = async (charNum: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant base64 Data URL (guarantees preview in player AND works in server render)
    const reader = new FileReader();
    reader.onload = (uploadEv) => {
      const dataUrl = uploadEv.target?.result as string;
      if (dataUrl) {
        if (charNum === 1) updateProp("c1_photoUrl", dataUrl);
        else updateProp("c2_photoUrl", dataUrl);
      }
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          if (charNum === 1) updateProp("c1_photoUrl", data.url);
          else updateProp("c2_photoUrl", data.url);
        }
      }
    } catch (err) {
      console.warn("Upload fallback to local url", err);
    }
  };

  const borderColors = [
    { color: "#ffffff", label: "Czysta Biel" },
    { color: "#38bdf8", label: "Cyjan / Śledczy" },
    { color: "#ef4444", label: "Czerwień / Alert" },
    { color: "#f59e0b", label: "Bursztyn / Złoto" },
    { color: "#10b981", label: "Szmaragd / Bezpieczny" },
    { color: "#a855f7", label: "Fiolet / Noir" },
  ];

  const entranceTypes = [
    { id: "from-bottom", label: "Wjazd od Dołu (Rekomendowane)", desc: "Płynny wjazd od dolnej krawędzi z fizyką sprężyny" },
    { id: "from-top", label: "Wjazd z Góry", desc: "Zejście z góry ekranu na docelową pozycję" },
    { id: "from-left", label: "Wjazd z Lewej", desc: "Dynamiczne wejście od lewej strony kadru" },
    { id: "from-right", label: "Wjazd z Prawej", desc: "Wjazd od prawej strony kadru" },
    { id: "pop-spring", label: "Sprężysty Pop-In", desc: "Powiększenie ze środka z lekkim odbiciem" },
    { id: "fade-zoom", label: "Kinowe Wyłonienie", desc: "Płynne wyłonienie z rozmycia i głębi" },
  ];

  const isC1 = selectedChar === 1;

  return (
    <div className="space-y-4">
      {/* Sub-tabs switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("characters")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "characters"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
            }`}
        >
          <User className="w-3.5 h-3.5" />
          <span className="text-[10px]">Postacie</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("motion")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "motion"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
            }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span className="text-[10px]">Ruch A→B</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("interactions")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "interactions"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
            }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span className="text-[10px]">Relacje</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scene")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${activeTab === "scene"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
            }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="text-[10px]">Scena / Tło</span>
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef1}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleUpload(1, e)}
      />
      <input
        ref={fileInputRef2}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleUpload(2, e)}
      />

      {/* ================= TAB 1: POSTACIE & WYGLĄD ================= */}
      {activeTab === "characters" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Mode Switcher: 1 Postać vs 2 Postacie */}
          <div className="bg-[#12121a] p-2.5 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-300">
              <span className="font-semibold">Liczba Postaci na Scenie:</span>
              <span className="font-mono text-amber-400 font-bold">
                {props.sceneMode === "single" ? "1 Postać" : "2 Postacie (Duo)"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => updateProp("sceneMode", "single")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${props.sceneMode === "single"
                    ? "bg-amber-500 text-black font-bold shadow"
                    : "bg-[#181824] text-zinc-400 hover:text-white"
                  }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Pojedyncza Postać</span>
              </button>

              <button
                type="button"
                onClick={() => updateProp("sceneMode", "duo")}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${props.sceneMode === "duo"
                    ? "bg-amber-500 text-black font-bold shadow"
                    : "bg-[#181824] text-zinc-400 hover:text-white"
                  }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>2 Postacie (Interakcja)</span>
              </button>
            </div>
          </div>

          {/* Sub-selector: Choose Character 1 or Character 2 to edit */}
          {props.sceneMode === "duo" && (
            <div className="flex gap-1.5 p-1 bg-[#12121a] rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setSelectedChar(1)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedChar === 1
                    ? "bg-white/10 text-white border border-white/20 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: props.c1_borderColor }}
                />
                <span>Postać 1 ({props.c1_name.split(" ")[0]})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedChar(2)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedChar === 2
                    ? "bg-white/10 text-white border border-white/20 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: props.c2_borderColor }}
                />
                <span>Postać 2 ({props.c2_name.split(" ")[0]})</span>
              </button>
            </div>
          )}

          {/* Character Details Form */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                {isC1 ? "Dane Postaci 1" : "Dane Postaci 2"}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Podpis w czarnym prostokącie z białą ramką
              </span>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Biały Podpis Główny (Imię / Nazwisko / Pseudonim):
              </label>
              <input
                type="text"
                value={isC1 ? props.c1_name : props.c2_name}
                onChange={(e) =>
                  updateProp(isC1 ? "c1_name" : "c2_name", e.target.value)
                }
                className="w-full studio-input text-xs font-bold"
                placeholder="np. JAN KOWALSKI"
              />
            </div>

            {/* Role Input */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Podtytuł / Rola / Data:
              </label>
              <input
                type="text"
                value={isC1 ? props.c1_role || "" : props.c2_role || ""}
                onChange={(e) =>
                  updateProp(isC1 ? "c1_role" : "c2_role", e.target.value)
                }
                className="w-full studio-input text-xs font-normal"
                placeholder="np. Główny Świadek • 1984"
              />
            </div>

            {/* Tag / Badge */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Znacznik / Kategoria (Kolorowy badge nad podpisem):
              </label>
              <input
                type="text"
                value={isC1 ? props.c1_tag || "" : props.c2_tag || ""}
                onChange={(e) =>
                  updateProp(isC1 ? "c1_tag" : "c2_tag", e.target.value)
                }
                className="w-full studio-input text-xs font-mono uppercase"
                placeholder="np. ŚWIADEK, PODEJRZANY, OFIARA, DETEKTYW"
              />
            </div>
          </div>

          {/* Border Color & Styling of Circle */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Kolor Obwódki Kółka:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {borderColors.map((b) => {
                const currentBorder = isC1 ? props.c1_borderColor : props.c2_borderColor;
                const isSelected = currentBorder.toLowerCase() === b.color.toLowerCase();
                return (
                  <button
                    key={b.color}
                    type="button"
                    onClick={() =>
                      updateProp(isC1 ? "c1_borderColor" : "c2_borderColor", b.color)
                    }
                    className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2 ${isSelected
                        ? "bg-white/10 border-white text-white font-bold"
                        : "bg-[#181822] border-white/5 text-zinc-400"
                      }`}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="text-[10px] truncate">{b.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom hex color input */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-zinc-400 font-mono">Własny hex:</span>
              <input
                type="color"
                value={isC1 ? props.c1_borderColor : props.c2_borderColor}
                onChange={(e) =>
                  updateProp(isC1 ? "c1_borderColor" : "c2_borderColor", e.target.value)
                }
                className="w-6 h-6 rounded border border-white/10 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={isC1 ? props.c1_borderColor : props.c2_borderColor}
                onChange={(e) =>
                  updateProp(isC1 ? "c1_borderColor" : "c2_borderColor", e.target.value)
                }
                className="studio-input text-xs font-mono w-28 text-center"
              />
            </div>

            {/* Circle Size Slider */}
            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Rozmiar Kółka (Średnica)</span>
                <span className="font-mono text-amber-400 font-bold">
                  {isC1 ? props.c1_circleSize : props.c2_circleSize} px
                </span>
              </div>
              <input
                type="range"
                min={110}
                max={260}
                step={5}
                value={isC1 ? props.c1_circleSize : props.c2_circleSize}
                onChange={(e) =>
                  updateProp(
                    isC1 ? "c1_circleSize" : "c2_circleSize",
                    Number(e.target.value)
                  )
                }
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Photo / Avatar Selection */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Zdjęcie / Sylwetka w Kółku
                </span>
                <span className="text-[10px] text-zinc-400">
                  Domyślne gotowe sylwetki lub własne zdjęcie z dysku
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  isC1
                    ? fileInputRef1.current?.click()
                    : fileInputRef2.current?.click()
                }
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
              >
                <Upload className="w-3 h-3" />
                <span>Wgraj Zdjęcie</span>
              </button>
            </div>

            {/* Preset Avatars Grid */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                Gotowe szablony avatarów:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {AVATAR_PRESETS.map((p) => {
                  const currentPhoto = isC1 ? props.c1_photoUrl : props.c2_photoUrl;
                  const isSelected = currentPhoto === p.svgDataUri;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() =>
                        updateProp(isC1 ? "c1_photoUrl" : "c2_photoUrl", p.svgDataUri)
                      }
                      className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${isSelected
                          ? "bg-amber-500/15 border-amber-500/80 shadow"
                          : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400"
                        }`}
                    >
                      <img
                        src={p.svgDataUri}
                        alt={p.name}
                        className="w-10 h-10 rounded-full border border-white/20 object-cover"
                      />
                      <span className="text-[9px] font-semibold truncate w-full text-zinc-300">
                        {p.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: RUCH & WEJŚCIE A -> B ================= */}
      {activeTab === "motion" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Sub-selector for character */}
          {props.sceneMode === "duo" && (
            <div className="flex gap-1.5 p-1 bg-[#12121a] rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setSelectedChar(1)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedChar === 1
                    ? "bg-white/10 text-white border border-white/20 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <span>Ruch Postaci 1</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedChar(2)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selectedChar === 2
                    ? "bg-white/10 text-white border border-white/20 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                  }`}
              >
                <span>Ruch Postaci 2</span>
              </button>
            </div>
          )}

          {/* 1. Sposób Wejścia na Scenę */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              1. Animacja Wejścia na Scenę:
            </span>
            <div className="space-y-1.5">
              {entranceTypes.map((t) => {
                const currentEnter = isC1 ? props.c1_enterType : props.c2_enterType;
                const isSelected = currentEnter === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() =>
                      updateProp(isC1 ? "c1_enterType" : "c2_enterType", t.id as any)
                    }
                    className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${isSelected
                        ? "bg-amber-500/15 border-amber-500/80 text-white font-bold"
                        : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400"
                      }`}
                  >
                    <div>
                      <div className="text-xs">{t.label}</div>
                      <div className="text-[10px] text-zinc-500">{t.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>

            {/* Timing of Entrance */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">
                  Klatka Startu Wejścia:
                </label>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={isC1 ? props.c1_enterFrame : props.c2_enterFrame}
                  onChange={(e) =>
                    updateProp(
                      isC1 ? "c1_enterFrame" : "c2_enterFrame",
                      Number(e.target.value)
                    )
                  }
                  className="studio-input text-xs font-mono text-center"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">
                  Czas Trwania Wejścia (klatki):
                </label>
                <input
                  type="number"
                  min={8}
                  max={60}
                  value={isC1 ? props.c1_enterDuration : props.c2_enterDuration}
                  onChange={(e) =>
                    updateProp(
                      isC1 ? "c1_enterDuration" : "c2_enterDuration",
                      Number(e.target.value)
                    )
                  }
                  className="studio-input text-xs font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* 2. Przemieszczenie z Punktu A do Punktu B */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  2. Przemieszczenie (Punkt A → Punkt B)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Ruch postaci po wejściu na docelową pozycję kadru
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateProp(
                    isC1 ? "c1_enableMovement" : "c2_enableMovement",
                    !(isC1 ? props.c1_enableMovement : props.c2_enableMovement)
                  )
                }
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${(isC1 ? props.c1_enableMovement : props.c2_enableMovement)
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {(isC1 ? props.c1_enableMovement : props.c2_enableMovement)
                  ? "WŁĄCZONE"
                  : "WYŁĄCZONE"}
              </button>
            </div>

            {(isC1 ? props.c1_enableMovement : props.c2_enableMovement) && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                {/* Position A (Start) */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                    Punkt A (Pozycja Początkowa %):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] text-zinc-400">X (Poziom %):</div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={isC1 ? props.c1_startX : props.c2_startX}
                        onChange={(e) =>
                          updateProp(
                            isC1 ? "c1_startX" : "c2_startX",
                            Number(e.target.value)
                          )
                        }
                        className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-300">
                        {isC1 ? props.c1_startX : props.c2_startX}%
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] text-zinc-400">Y (Pion %):</div>
                      <input
                        type="range"
                        min={15}
                        max={85}
                        value={isC1 ? props.c1_startY : props.c2_startY}
                        onChange={(e) =>
                          updateProp(
                            isC1 ? "c1_startY" : "c2_startY",
                            Number(e.target.value)
                          )
                        }
                        className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-300">
                        {isC1 ? props.c1_startY : props.c2_startY}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Position B (End) */}
                <div className="space-y-1 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                    Punkt B (Pozycja Docelowa %):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[10px] text-zinc-400">X (Poziom %):</div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={isC1 ? props.c1_endX : props.c2_endX}
                        onChange={(e) =>
                          updateProp(
                            isC1 ? "c1_endX" : "c2_endX",
                            Number(e.target.value)
                          )
                        }
                        className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-300">
                        {isC1 ? props.c1_endX : props.c2_endX}%
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] text-zinc-400">Y (Pion %):</div>
                      <input
                        type="range"
                        min={15}
                        max={85}
                        value={isC1 ? props.c1_endY : props.c2_endY}
                        onChange={(e) =>
                          updateProp(
                            isC1 ? "c1_endY" : "c2_endY",
                            Number(e.target.value)
                          )
                        }
                        className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-zinc-300">
                        {isC1 ? props.c1_endY : props.c2_endY}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Movement Timing */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Klatka Startu Ruchu:
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={180}
                      value={isC1 ? props.c1_moveStartFrame : props.c2_moveStartFrame}
                      onChange={(e) =>
                        updateProp(
                          isC1 ? "c1_moveStartFrame" : "c2_moveStartFrame",
                          Number(e.target.value)
                        )
                      }
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Czas Ruchu (klatki):
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={80}
                      value={isC1 ? props.c1_moveDuration : props.c2_moveDuration}
                      onChange={(e) =>
                        updateProp(
                          isC1 ? "c1_moveDuration" : "c2_moveDuration",
                          Number(e.target.value)
                        )
                      }
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: RELACJE & EFEKTY SPECJALNE ================= */}
      {activeTab === "interactions" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Linia Łącząca Między Postaciami */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Linia Relacji Między Postaciami
                </span>
                <span className="text-[10px] text-zinc-400">
                  Czerwona nitka śledcza lub impuls łączący obie osoby
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("showConnectionLine", !props.showConnectionLine)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${props.showConnectionLine
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.showConnectionLine ? "WŁĄCZONA" : "WYŁĄCZONA"}
              </button>
            </div>

            {props.showConnectionLine && (
              <div className="space-y-3 pt-2 border-t border-white/5">
                {/* Line Style Selector */}
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Styl Linii:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: "investigative-string", label: "Czerwona Nitka Śledcza", badge: "Pinezki" },
                      { id: "dashed-pulse", label: "Cyfrowy Impuls", badge: "Kropki" },
                      { id: "arrow-directed", label: "Strzałka Relacji", badge: "Wektor" },
                      { id: "solid-glow", label: "Neonowa Linia Glow", badge: "Światło" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => updateProp("lineStyle", s.id as any)}
                        className={`p-2 rounded-lg border text-left transition-all ${props.lineStyle === s.id
                            ? "bg-amber-500/15 border-amber-500/80 text-white font-bold"
                            : "bg-[#181822] border-white/5 text-zinc-400"
                          }`}
                      >
                        <div className="text-[11px]">{s.label}</div>
                        <span className="text-[9px] font-mono text-zinc-500">{s.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Label */}
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Podpis na Środku Linii:
                  </label>
                  <input
                    type="text"
                    value={props.lineLabel}
                    onChange={(e) => updateProp("lineLabel", e.target.value)}
                    className="w-full studio-input text-xs font-mono"
                    placeholder="np. POŁĄCZENIE TELEFONICZNE • 1984"
                  />
                </div>

                {/* Line Color & Timing */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Klatka Startu Linii:
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={180}
                      value={props.lineStartFrame}
                      onChange={(e) => updateProp("lineStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Kolor Linii:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={props.lineColor}
                        onChange={(e) => updateProp("lineColor", e.target.value)}
                        className="w-8 h-8 rounded border border-white/10 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={props.lineColor}
                        onChange={(e) => updateProp("lineColor", e.target.value)}
                        className="studio-input text-xs font-mono w-24 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Efekty Dodatkowe (Pulsowanie rozmowy / Przekreślenie X / Stempel) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Efekty Akcji na Postaciach:
            </span>

            {/* Talking Pulse */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#181824] border border-white/5">
              <div>
                <span className="text-xs text-white font-medium block">
                  Puls Rozmowy / Aktywności (Talking Pulse)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Fale dźwiękowe rozchodzące się wokół kółka postaci 2
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("c2_talkingPulse", !props.c2_talkingPulse)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.c2_talkingPulse ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.c2_talkingPulse ? "ON" : "OFF"}
              </button>
            </div>

            {/* Red Cross-Out X (Wyeliminowany / Śledztwo) */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#181824] border border-white/5">
              <div>
                <span className="text-xs text-white font-medium block">
                  Czerwone Przekreślenie X (Eliminacja)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Dramatyczne przekreślenie zdjęcia postaci 1
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("c1_isCrossedOut", !props.c1_isCrossedOut)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.c1_isCrossedOut ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.c1_isCrossedOut ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            {/* Classified Stamp */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#181824] border border-white/5">
              <div>
                <span className="text-xs text-white font-medium block">
                  Stempel "ŚCIŚLE TAJNE"
                </span>
                <span className="text-[10px] text-zinc-500">
                  Pieczęć dokumentalna wbijająca się w zdjęcie
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateProp("c1_showClassifiedStamp", !props.c1_showClassifiedStamp)
                }
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${props.c1_showClassifiedStamp
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                  }`}
              >
                {props.c1_showClassifiedStamp ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: SCENA & TŁO ================= */}
      {activeTab === "scene" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Background Style */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Styl Tła Sceny:
            </span>
            <div className="space-y-1.5">
              {[
                {
                  id: "pitch-black",
                  label: "Płaska Czerń #000000",
                  desc: "Idealne pod montaż kinowy z mikrodrobinami kurzu",
                },
                {
                  id: "transparent",
                  label: "Przezroczyste Tło (Alpha)",
                  desc: "Bezpośredni eksport do Apple ProRes 4444 ponad materiał wideo",
                },
                {
                  id: "noir-grid",
                  label: "Siatka Milimetrowa Dossier / Noir",
                  desc: "Klimat archiwalnego dossier śledczego lub laboratorium",
                },
                {
                  id: "investigative-corkboard",
                  label: "Ciemna Tablica Śledcza (Korek Noir)",
                  desc: "Klimat tablicy z dowodami, pinezkami i powiązaniami",
                },
              ].map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => updateProp("backgroundStyle", bg.id as any)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all ${props.backgroundStyle === bg.id
                      ? "bg-amber-500/15 border-amber-500/80 text-white font-bold"
                      : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400"
                    }`}
                >
                  <div className="text-xs">{bg.label}</div>
                  <div className="text-[10px] text-zinc-500">{bg.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Długość trwania */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <label className="text-xs font-semibold text-white block">
              Długość Animacji Sceny:
            </label>
            <div className="space-y-2">
              {[
                { sec: 8, frames: 240, label: "8 sekund (Optymalne)", badge: "240 klatek" },
                { sec: 10, frames: 300, label: "10 sekund (Dłuższy dialog)", badge: "300 klatek" },
                { sec: 6, frames: 180, label: "6 sekund (Szybka wstawka)", badge: "180 klatek" },
              ].map((d) => (
                <button
                  key={d.frames}
                  type="button"
                  onClick={() => {
                    setDurationFrames(d.frames);
                    updateProp("durationInFrames", d.frames);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${durationFrames === d.frames
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
