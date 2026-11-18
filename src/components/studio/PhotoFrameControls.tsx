"use client";

import React, { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Move,
  Upload,
  Palette,
  Clock,
  Sparkles,
  Layers,
  Crop,
  Check,
  Zap,
  Eye,
  Sliders,
  Type,
  Maximize2,
} from "lucide-react";
import { AnimatedPhotoFrameProps } from "../../remotion/templates/AnimatedPhotoFrame/schema";
import { SAMPLE_PRESETS } from "../../remotion/templates/AnimatedPhotoFrame/default-images";

interface PhotoFrameControlsProps {
  props: AnimatedPhotoFrameProps;
  updateProp: <K extends keyof AnimatedPhotoFrameProps>(
    key: K,
    val: AnimatedPhotoFrameProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const PhotoFrameControls: React.FC<PhotoFrameControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<"image" | "motion" | "styling" | "duration">("image");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Fast local preview
    const localUrl = URL.createObjectURL(file);
    updateProp("imageUrl", localUrl);

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
          updateProp("imageUrl", data.url);
        }
      }
    } catch (err) {
      console.warn("Upload fallback to local URL", err);
    }
  };

  const aspectRatios = [
    { id: "16:9", label: "16:9 (Szeroki)", desc: "Standardowe wideo / panorama" },
    { id: "4:3", label: "4:3 (Archiwalny)", desc: "Klasyczna fotografia / retro CRT" },
    { id: "1:1", label: "1:1 (Kwadrat)", desc: "Okładka albumu / polaroid" },
    { id: "9:16", label: "9:16 (Pion)", desc: "Format mobilny / shorts" },
  ];

  const entranceTypes = [
    { id: "draw-in", label: "Rysowanie Ramki (Draw-In)", desc: "Laserowe obrysowanie krawędzi dookoła zdjęcia" },
    { id: "expand-center", label: "Rozsunięcie ze Środka", desc: "Płynne powiększenie z centrum kadru" },
    { id: "slide-up", label: "Wjazd od Dołu", desc: "Sprężysty wjazd z dolnej krawędzi ekranu" },
    { id: "pop-scale", label: "Sprężysty Pop-In", desc: "Szybki kinowy wyskok ze skalowaniem" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("image")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "image"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="text-[10px]">Zdjęcie</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("motion")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "motion"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="text-[10px]">Ruch / Błysk</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("styling")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "styling"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Crop className="w-3.5 h-3.5" />
          <span className="text-[10px]">Styl & Tekst</span>
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
          <span className="text-[10px]">Tło & Czas</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {/* ================= TAB 1: ZDJĘCIE & KADR ================= */}
      {activeTab === "image" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Upload Button Banner */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Własny Obraz / Fotografia
                </span>
                <span className="text-[10px] text-zinc-400">
                  Wgraj plik PNG, JPG lub WebP ze swojego dysku
                </span>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Wgraj Zdjęcie</span>
              </button>
            </div>
          </div>

          {/* Preset Sample Photos */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <span className="text-xs font-semibold text-white block">
              Lub Wybierz Gotowe Zdjęcie Archiwalne:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_PRESETS.map((p) => {
                const isSelected = props.imageUrl === p.url;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => updateProp("imageUrl", p.url)}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/80 shadow"
                        : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div className="w-full h-12 rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] font-semibold truncate w-full text-zinc-300">
                      {p.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <span className="text-xs font-semibold text-white block">
              Proporcje Kadru Ramki:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {aspectRatios.map((ar) => {
                const isSelected = props.aspectRatio === ar.id;
                return (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => updateProp("aspectRatio", ar.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/80 text-white font-bold"
                        : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div className="text-xs">{ar.label}</div>
                    <div className="text-[10px] text-zinc-500">{ar.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Frame Width Slider */}
            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Szerokość Ramki</span>
                <span className="font-mono text-amber-400 font-bold">
                  {props.frameWidth} px
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={1400}
                step={20}
                value={props.frameWidth}
                onChange={(e) => updateProp("frameWidth", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ANIMACJA & RUCH ("RUSZAJĄCA SIĘ") ================= */}
      {activeTab === "motion" && (
        <div className="space-y-4 animate-in fade-in">
          {/* 1. Biegające Światło po Obwodzie (Traveling Beam) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Biegające Światło po Obwodzie
                </span>
                <span className="text-[10px] text-zinc-400">
                  Jasny laserowy impuls krążący nieustannie dookoła ramki
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableTravelingBeam", !props.enableTravelingBeam)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableTravelingBeam ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableTravelingBeam ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            {props.enableTravelingBeam && (
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="flex justify-between items-center text-[11px] text-zinc-300">
                  <span>Prędkość Biegu Światła</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {props.beamSpeed.toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min={0.4}
                  max={2.5}
                  step={0.1}
                  value={props.beamSpeed}
                  onChange={(e) => updateProp("beamSpeed", Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* 2. Błysk Światła po Szkle (Glass Sheen Glint) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Błysk Refleksu po Szkle (Sheen)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Ukośna smuga światła przesuwająca się po tafli zdjęcia
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableGlassSheen", !props.enableGlassSheen)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableGlassSheen ? "bg-cyan-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableGlassSheen ? "WŁĄCZONY" : "WYŁĄCZONY"}
              </button>
            </div>
          </div>

          {/* 3. Pływanie 3D (Subtle 3D Float) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-amber-400" />
                  Pływanie 3D w Przestrzeni (Float)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Subtelny, organiczny przechył perspektywy z miękkim cieniem
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enable3DFloat", !props.enable3DFloat)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enable3DFloat ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enable3DFloat ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>
          </div>

          {/* 4. Ken Burns Image Zoom */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  Kinowy Mikro-Zoom (Ken Burns)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Powolny najazd kamery ożywiający statyczną fotografię
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableKenBurns", !props.enableKenBurns)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableKenBurns ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableKenBurns ? "WŁĄCZONY" : "WYŁĄCZONY"}
              </button>
            </div>
          </div>

          {/* 5. Animacja Wejścia */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <span className="text-xs font-semibold text-white block">
              Animacja Pojawienia się Ramki:
            </span>
            <div className="space-y-1.5">
              {entranceTypes.map((et) => {
                const isSelected = props.entranceType === et.id;
                return (
                  <button
                    key={et.id}
                    type="button"
                    onClick={() => updateProp("entranceType", et.id as any)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/80 text-white font-bold"
                        : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div>
                      <div className="text-xs">{et.label}</div>
                      <div className="text-[10px] text-zinc-500">{et.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: STYL & TEKST ================= */}
      {activeTab === "styling" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Frame Style (Thickness, Radius, Glow) */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Parametry Białej Ramki:
            </span>

            {/* Stroke Width */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Grubość Linii</span>
                <span className="font-mono text-amber-400 font-bold">
                  {props.strokeWidth} px
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                step={1}
                value={props.strokeWidth}
                onChange={(e) => updateProp("strokeWidth", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Zaokrąglenie Rogów</span>
                <span className="font-mono text-amber-400 font-bold">
                  {props.borderRadius} px
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={2}
                value={props.borderRadius}
                onChange={(e) => updateProp("borderRadius", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Glow Intensity */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Poświata Wokół Ramki (Glow)</span>
                <span className="font-mono text-amber-400 font-bold">
                  {(props.glowIntensity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={props.glowIntensity}
                onChange={(e) => updateProp("glowIntensity", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Corner Brackets */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-medium block">
                  Narożniki Celownika HUD `[ ]`
                </span>
                <span className="text-[10px] text-zinc-500">
                  Dokumentalne znaczniki kadru pulsujące na rogach
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableCornerBrackets", !props.enableCornerBrackets)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  props.enableCornerBrackets ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableCornerBrackets ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Labels & Metadata */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white block">
                Podpis Fotografii / Sygnatura
              </span>
              <button
                type="button"
                onClick={() => updateProp("showLabel", !props.showLabel)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  props.showLabel ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showLabel ? "WIDOCZNY" : "UKRYTY"}
              </button>
            </div>

            {props.showLabel && (
              <div className="space-y-2.5 pt-2 border-t border-white/5 animate-in fade-in">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Tytuł Główny:
                  </label>
                  <input
                    type="text"
                    value={props.labelText}
                    onChange={(e) => updateProp("labelText", e.target.value)}
                    className="w-full studio-input text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Sygnatura / Szczegóły:
                  </label>
                  <input
                    type="text"
                    value={props.labelSubtext}
                    onChange={(e) => updateProp("labelSubtext", e.target.value)}
                    className="w-full studio-input text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                    Pozycja Podpisu:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: "bottom", label: "Na Dole" },
                      { id: "top", label: "Na Górze" },
                      { id: "badge-corner", label: "W Narożniku" },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => updateProp("labelPosition", pos.id as any)}
                        className={`p-1.5 rounded-lg border text-center text-[10px] transition-all ${
                          props.labelPosition === pos.id
                            ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-[#181822] border-white/5 text-zinc-400"
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 4: TŁO & CZAS ================= */}
      {activeTab === "duration" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Background Type */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2.5">
            <span className="text-xs font-semibold text-white block">
              Styl Tła Sceny:
            </span>
            <div className="space-y-1.5">
              {[
                {
                  id: "transparent",
                  label: "Przezroczyste (Alpha ProRes 4444)",
                  desc: "Bezpośredni eksport jako nakładka ponad materiał wideo w montażu",
                },
                {
                  id: "blurred-image",
                  label: "Rozmyte Tło Zdjęcia (Kinowy Blur)",
                  desc: "Głębokie rozmycie i przyciemnienie zdjęcia za ramką",
                },
                {
                  id: "pitch-black",
                  label: "Płaska Czerń #000000",
                  desc: "Czysta czerń pod montaż wideo bez przezroczystości",
                },
                {
                  id: "noir-vignette",
                  label: "Subtelna Winieta Noir",
                  desc: "Ciemne tło studyjne z delikatną winietą",
                },
              ].map((bg) => (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => updateProp("backgroundType", bg.id as any)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                    props.backgroundType === bg.id
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

          {/* Długość Trwania */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <label className="text-xs font-semibold text-white block">
              Długość Animacji:
            </label>
            <div className="space-y-2">
              {[
                { sec: 8, frames: 240, label: "8 sekund (Rekomendowane)", badge: "240 klatek" },
                { sec: 10, frames: 300, label: "10 sekund (Dłuższa ekspozycja)", badge: "300 klatek" },
                { sec: 6, frames: 180, label: "6 sekund (Krótka przebitka)", badge: "180 klatek" },
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

