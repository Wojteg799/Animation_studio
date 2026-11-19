"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  User,
  Radio,
  Clock,
  Sparkles,
  HelpCircle,
  Upload,
  Heart,
  Palette,
  Maximize2,
  Sliders,
  Timer,
  Play,
  FileQuestion,
  Pencil,
} from "lucide-react";
import { DariusRadioStoryProps } from "../../remotion/templates/DariusRadioStory/schema";
import { DARIUS_AVATAR_SVG } from "../../remotion/templates/DariusRadioStory/darius-avatar";

interface DariusStoryControlsProps {
  props: DariusRadioStoryProps;
  updateProp: <K extends keyof DariusRadioStoryProps>(
    key: K,
    val: DariusRadioStoryProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const DariusStoryControls: React.FC<DariusStoryControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        updateProp("avatarUrl", dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const accentColors = [
    { id: "#facc15", name: "Klasyczny Żółty (80s)", color: "#facc15" },
    { id: "#fbbf24", name: "Ciepły Bursztyn", color: "#fbbf24" },
    { id: "#f97316", name: "Vintage Pomarańcz", color: "#f97316" },
    { id: "#38bdf8", name: "Cyjan / Błękit", color: "#38bdf8" },
    { id: "#ffffff", name: "Czysta Biel (Monochrom)", color: "#ffffff" },
  ];

  const currentAvatarScale = props.avatarScale ?? 1.35;
  const currentRadioScale = props.radioScale ?? 1.2;
  const currentTracklistScale = props.tracklistScale ?? 1.15;
  const currentHeartScale = props.heartScale ?? 1.25;
  const currentQuestionMarkScale = props.questionMarkScale ?? 1.35;

  const currentHeadSize = props.avatarHeadSize ?? 42;
  const currentBodySize = props.avatarBodySize ?? 75;
  const currentHeadY = props.avatarHeadY ?? 55;
  const currentBodyY = props.avatarBodyY ?? 168;

  const currentDuration = props.durationInFrames ?? durationFrames ?? 360;

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

  const timingEvents: Array<{
    key: keyof DariusRadioStoryProps;
    title: string;
    desc: string;
    icon: React.ReactNode;
    val: number;
  }> = [
    {
      key: "dariusEnterFrame",
      title: "1. Wejście Dariusa",
      desc: "Klatka wejścia postaci na ekran",
      icon: <User className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.dariusEnterFrame ?? 5,
    },
    {
      key: "heartNotesStartFrame",
      title: "2. Serce & Nuty (Początek)",
      desc: "Pojawienie się serca i nutek (status fana)",
      icon: <Heart className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.heartNotesStartFrame ?? 22,
    },
    {
      key: "heartNotesEndFrame",
      title: "3. Serce & Nuty (Zniknięcie)",
      desc: "Wygaszenie nutek przed przejściem do radia",
      icon: <Sparkles className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.heartNotesEndFrame ?? 80,
    },
    {
      key: "radioStartFrame",
      title: "4. Wejście Radia & Kasety",
      desc: "Pojawienie się radia i kasety, przesunięcie Dariusa",
      icon: <Radio className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.radioStartFrame ?? 80,
    },
    {
      key: "writingStartFrame",
      title: "5. Spisywanie Utworów (Ołówek)",
      desc: "Wjazd karty notatek i rysowanie linii utworów",
      icon: <Pencil className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.writingStartFrame ?? 150,
    },
    {
      key: "questionMarkStartFrame",
      title: "6. Tajemnicza Piosenka (Pytajnik)",
      desc: "Wstrzymanie ołówka i wyskok pytajnika (?)",
      icon: <FileQuestion className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.questionMarkStartFrame ?? 235,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Alpha Transparency Switcher */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">
              Przezroczyste Tło (Alpha Channel)
            </span>
            <span className="text-[10px] text-zinc-400">
              {props.transparentBackground
                ? "100% przezroczyste tło do nałożenia na wideo (ProRes 4444)"
                : "Głęboka czerń #000000 (styl Joy Division)"}
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              updateProp("transparentBackground", !props.transparentBackground)
            }
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              props.transparentBackground
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.transparentBackground ? "ALPHA (ON)" : "CZARNE TŁO"}
          </button>
        </div>
      </div>

      {/* 1. SEKCJA DARIUS (JEDYNY PODPIS NA EKRANIE) */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3">
        <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-amber-400" />
          Postać i Podpis:
        </span>

        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-full border-2 border-yellow-400 overflow-hidden bg-black flex-shrink-0 shadow-lg"
            style={{ borderColor: props.accentColor }}
          >
            {props.avatarUrl &&
            props.avatarUrl !== DARIUS_AVATAR_SVG &&
            !props.avatarUrl.startsWith("data:image/svg+xml") ? (
              <img
                src={props.avatarUrl}
                alt={props.characterName}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <circle cx="100" cy="100" r="100" fill="#000000" />
                <circle cx="100" cy={currentBodyY} r={currentBodySize} fill={props.accentColor || "#facc15"} />
                <circle cx="100" cy={currentHeadY} r={currentHeadSize} fill={props.accentColor || "#facc15"} />
              </svg>
            )}
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="px-2.5 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-[11px] flex items-center gap-1 transition-colors"
              >
                <Upload className="w-3 h-3" />
                <span>Wgraj Zdjęcie</span>
              </button>
              <button
                type="button"
                onClick={() => updateProp("avatarUrl", DARIUS_AVATAR_SVG)}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-[11px] transition-colors"
                title="Przywróć domyślną prostą ilustrację: żółte koło i półkole"
              >
                Domyślny
              </button>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <p className="text-[10px] text-zinc-500">
              Powiększone kółka: żółta głowa i tułów dotykające się bez odcięć.
            </p>
          </div>
        </div>

        {/* Rozmiary Kółek Avatara (Głowa & Tułów) */}
        <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-white">
              Rozmiary i Pozycja Kółek (Głowa & Tułów):
            </span>
            <button
              type="button"
              onClick={() => {
                updateProp("avatarHeadSize", 42);
                updateProp("avatarBodySize", 75);
                updateProp("avatarHeadY", 55);
                updateProp("avatarBodyY", 168);
              }}
              className="text-[9px] text-yellow-400 hover:underline font-mono"
            >
              Resetuj Kółka
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {/* Głowa: Rozmiar */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Głowa (promień):</span>
                <span className="font-mono text-yellow-400">{currentHeadSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="65"
                step="1"
                value={currentHeadSize}
                onChange={(e) => updateProp("avatarHeadSize", parseInt(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            {/* Tułów: Rozmiar */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Tułów (promień):</span>
                <span className="font-mono text-yellow-400">{currentBodySize}px</span>
              </div>
              <input
                type="range"
                min="40"
                max="110"
                step="1"
                value={currentBodySize}
                onChange={(e) => updateProp("avatarBodySize", parseInt(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            {/* Głowa: Pozycja Y */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Głowa (pozycja Y):</span>
                <span className="font-mono text-yellow-400">{currentHeadY}px</span>
              </div>
              <input
                type="range"
                min="30"
                max="85"
                step="1"
                value={currentHeadY}
                onChange={(e) => updateProp("avatarHeadY", parseInt(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            {/* Tułów: Pozycja Y */}
            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300">
                <span>Tułów (pozycja Y):</span>
                <span className="font-mono text-yellow-400">{currentBodyY}px</span>
              </div>
              <input
                type="range"
                min="120"
                max="210"
                step="1"
                value={currentBodyY}
                onChange={(e) => updateProp("avatarBodyY", parseInt(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>
          </div>
          <p className="text-[9px] text-zinc-500">
            Kółka stykają się ze sobą, a tułów płynnie wypełnia dolny łuk bez poziomego odcięcia.
          </p>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
            Jedyny Podpis na Ekranie:
          </label>
          <input
            type="text"
            value={props.characterName}
            onChange={(e) => updateProp("characterName", e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-[#14141e] border border-white/10 text-white text-xs font-mono font-bold tracking-wider focus:border-yellow-400 focus:outline-none"
            placeholder="DARIUS"
          />
        </div>
      </div>

      {/* 2. ROZMIARY I SKALOWANIE POSZCZEGÓLNYCH ELEMENTÓW */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-3.5">
        <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-yellow-400" />
          Rozmiary i Skalowanie Elementów:
        </span>

        {/* Avatar Dariusa Scale */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-200 font-medium">Wielkość Avatara Dariusa:</span>
            <span className="font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded">
              {Math.round(currentAvatarScale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.5"
            step="0.05"
            value={currentAvatarScale}
            onChange={(e) => updateProp("avatarScale", parseFloat(e.target.value))}
            className="w-full accent-yellow-400"
          />
          <div className="flex gap-1.5 pt-1">
            {[
              { label: "100%", val: 1.0 },
              { label: "135% (Domyślny)", val: 1.35 },
              { label: "170% (Duży)", val: 1.7 },
              { label: "210% (B. Duży)", val: 2.1 },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => updateProp("avatarScale", p.val)}
                className={`flex-1 py-1 rounded text-[10px] font-mono transition-all ${
                  Math.abs(currentAvatarScale - p.val) < 0.04
                    ? "bg-yellow-500 text-black font-bold"
                    : "bg-[#181822] text-zinc-400 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Radio & Kaseta Scale */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-200">Wielkość Radia i Kasety:</span>
            <span className="font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded">
              {Math.round(currentRadioScale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.2"
            step="0.05"
            value={currentRadioScale}
            onChange={(e) => updateProp("radioScale", parseFloat(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Karta Notatek & Ołówek Scale */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-200">Wielkość Karty Notatek i Ołówka:</span>
            <span className="font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded">
              {Math.round(currentTracklistScale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.0"
            step="0.05"
            value={currentTracklistScale}
            onChange={(e) => updateProp("tracklistScale", parseFloat(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Serce & Nutki Scale */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-200">Wielkość Serca i Nutek:</span>
            <span className="font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded">
              {Math.round(currentHeartScale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.2"
            step="0.05"
            value={currentHeartScale}
            onChange={(e) => updateProp("heartScale", parseFloat(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>

        {/* Pytajnik Scale */}
        <div className="space-y-1 pt-2 border-t border-white/5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-200">Wielkość Znaku Zapytania (?):</span>
            <span className="font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded">
              {Math.round(currentQuestionMarkScale * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="2.5"
            step="0.05"
            value={currentQuestionMarkScale}
            onChange={(e) => updateProp("questionMarkScale", parseFloat(e.target.value))}
            className="w-full accent-yellow-400"
          />
        </div>
      </div>

      {/* 3. PEŁNA KONTROLA NAD CZASEM TRWANIA I TIMINGIEM (ROZSZERZONE!) */}
      <div className="bg-[#12121a] p-3.5 rounded-xl border border-yellow-400/20 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-yellow-400" />
            Czas Trwania i Timing Animacji:
          </span>
          <span className="text-[10px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
            {(currentDuration / fps).toFixed(1)}s ({currentDuration} kl.)
          </span>
        </div>

        {/* A. CAŁKOWITY CZAS TRWANIA — DOWOLNA DŁUGOŚĆ */}
        <div className="space-y-2.5 p-2.5 rounded-lg bg-black/40 border border-white/5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-zinc-200">
              Całkowity Czas Trwania Sceny:
            </label>
          </div>

          {/* Bezpośrednie wpisywanie sekund i klatek */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-zinc-400 block mb-1">Sekundy (s):</span>
              <div className="flex items-center gap-1 bg-[#181822] px-2.5 py-1.5 rounded-lg border border-white/10">
                <input
                  type="text"
                  value={durationSecInput}
                  onChange={(e) => {
                    const str = e.target.value;
                    setDurationSecInput(str);
                    const sec = parseFloat(str.replace(",", "."));
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
              min="90"
              max="1800"
              step="15"
              value={currentDuration}
              onChange={(e) => handleSetDuration(parseInt(e.target.value))}
              className="w-full accent-yellow-400"
            />
          </div>

          {/* Szybkie presety czasu trwania z dedykowanym 14s */}
          <div className="grid grid-cols-4 gap-1 pt-1">
            {[
              { label: "8s", frames: 240 },
              { label: "10s", frames: 300 },
              { label: "12s", frames: 360 },
              { label: "14s (Twój wybór)", frames: 420 },
              { label: "16s", frames: 480 },
              { label: "18s", frames: 540 },
              { label: "20s", frames: 600 },
              { label: "30s", frames: 900 },
            ].map((d) => (
              <button
                key={d.frames}
                type="button"
                onClick={() => handleSetDuration(d.frames)}
                className={`py-1 rounded text-center text-[10px] font-mono transition-all ${
                  currentDuration === d.frames
                    ? "bg-yellow-500 text-black font-bold"
                    : "bg-[#181822] text-zinc-400 hover:text-white"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* B. DOKŁADNE WPISYWANIE TIMINGU KLATEK KLUCZOWYCH */}
        <div className="space-y-3 pt-1">
          <span className="text-[11px] font-semibold text-zinc-300 block">
            Kiedy co ma się pojawić (wpisz klatkę lub sekundę):
          </span>

          <div className="space-y-2.5">
            {timingEvents.map((ev) => {
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
                    <span className="text-[10px] font-mono text-zinc-400">
                      {currentSec}s ({currentVal} kl.)
                    </span>
                  </div>

                  {/* Pola do wpisywania */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                      <span className="text-[9px] text-zinc-400 uppercase">Klatka:</span>
                      <input
                        type="number"
                        min="0"
                        max={currentDuration}
                        step="1"
                        value={currentVal}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            updateProp(ev.key, Math.max(0, val));
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
                        value={currentSec}
                        onChange={(e) => {
                          const sec = parseFloat(e.target.value);
                          if (!isNaN(sec)) {
                            updateProp(ev.key, Math.max(0, Math.round(sec * fps)));
                          }
                        }}
                        className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                      />
                      <span className="text-[10px] text-zinc-500 font-mono">s</span>
                    </div>
                  </div>

                  {/* Płynny suwak dostosowany do pełnego czasu trwania */}
                  <input
                    type="range"
                    min="0"
                    max={currentDuration}
                    step="1"
                    value={currentVal}
                    onChange={(e) => updateProp(ev.key, parseInt(e.target.value))}
                    className="w-full accent-yellow-400"
                  />
                  <p className="text-[9px] text-zinc-500">{ev.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. KOLORYSTYKA CZARNO-BIAŁA Z ŻÓŁTYM AKCENTEM */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2">
        <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-yellow-400" />
          Kolor Akcentu (Głowa, Tułów, Pytajnik):
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {accentColors.map((col) => (
            <button
              key={col.id}
              type="button"
              onClick={() => updateProp("accentColor", col.id)}
              className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                props.accentColor === col.id
                  ? "bg-white/10 border-yellow-400 text-white font-bold"
                  : "bg-[#14141e] border-white/5 text-zinc-400"
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: col.color }}
              />
              <span className="text-[9px] truncate max-w-full">{col.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. PRZEŁĄCZNIKI ELEMENTÓW */}
      <div className="bg-[#12121a] p-3 rounded-xl border border-white/5 space-y-2.5">
        <span className="text-xs font-semibold text-white block">
          Włączanie / Wyłączanie Elementów:
        </span>

        {/* Serce & Nuty */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-zinc-200 block">1. Serduszko & Nuty</span>
            <span className="text-[10px] text-zinc-500">Darius jako wielki fan muzyki</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showHeartAndNotes", !props.showHeartAndNotes)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showHeartAndNotes ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showHeartAndNotes ? "WŁ" : "WYŁ"}
          </button>
        </div>

        {/* Radio & Kaseta */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-200 block">2. Proste Radio & Kaseta</span>
            <span className="text-[10px] text-zinc-500">Nagrywanie piosenek z radia</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showRadioAndCassette", !props.showRadioAndCassette)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showRadioAndCassette ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showRadioAndCassette ? "WŁ" : "WYŁ"}
          </button>
        </div>

        {/* Ołówek & Notowanie */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-200 block">3. Ołówek & Linie Notatek</span>
            <span className="text-[10px] text-zinc-500">Zapisywanie utworów 1, 2, 3</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showWritingPencil", !props.showWritingPencil)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showWritingPencil ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showWritingPencil ? "WŁ" : "WYŁ"}
          </button>
        </div>

        {/* Znak Zapytania */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-200 block">4. Żółty Pytajnik przy Dariusie</span>
            <span className="text-[10px] text-zinc-500">Tej konkretnej nie znał i nie zapisał</span>
          </div>
          <button
            type="button"
            onClick={() => updateProp("showQuestionMark", !props.showQuestionMark)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
              props.showQuestionMark ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {props.showQuestionMark ? "WŁ" : "WYŁ"}
          </button>
        </div>
      </div>
    </div>
  );
};
