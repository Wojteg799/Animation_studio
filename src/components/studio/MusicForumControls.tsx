"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Move,
  Box,
  Clock,
  Check,
  Disc,
  FileAudio,
  Sparkles,
  Layers,
  Sliders,
  Palette,
  Tv,
} from "lucide-react";
import { MusicForumScrollProps } from "../../remotion/templates/MusicForumScroll/schema";

interface MusicForumControlsProps {
  props: MusicForumScrollProps;
  updateProp: <K extends keyof MusicForumScrollProps>(
    key: K,
    val: MusicForumScrollProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const MusicForumControls: React.FC<MusicForumControlsProps> = ({
  props,
  updateProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeTab, setActiveTab] = useState<"posts" | "scroll" | "lowpoly" | "duration">("posts");
  const [selectedPostTab, setSelectedPostTab] = useState<1 | 2 | 3 | 4>(1);

  const themes = [
    { id: "dark-graphite", name: "Ciemny Grafit (Dossier)", color: "#38bdf8" },
    { id: "cyber-amber", name: "Cyber Bursztyn (NDR Tape)", color: "#f59e0b" },
    { id: "classic-blue", name: "Retro phpBB Błękit", color: "#60a5fa" },
    { id: "vaporwave", name: "Vaporwave / Synth", color: "#d946ef" },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-tabs switcher */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "posts"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="text-[10px]">Forum & Posty</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("scroll")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "scroll"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Move className="w-3.5 h-3.5" />
          <span className="text-[10px]">Przewijanie</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lowpoly")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "lowpoly"
              ? "bg-amber-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span className="text-[10px]">3D Low-Poly</span>
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

      {/* ================= TAB 1: FORUM & TREŚĆ POSTÓW ================= */}
      {activeTab === "posts" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Forum Header Data */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-bold text-white block border-b border-white/5 pb-1.5">
              Nagłówek Forum & Wątku:
            </span>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Tytuł Forum:
              </label>
              <input
                type="text"
                value={props.forumTitle}
                onChange={(e) => updateProp("forumTitle", e.target.value)}
                className="w-full studio-input text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Temat Wątku:
              </label>
              <input
                type="text"
                value={props.threadTitle}
                onChange={(e) => updateProp("threadTitle", e.target.value)}
                className="w-full studio-input text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Dział / Kategoria:
              </label>
              <input
                type="text"
                value={props.threadCategory}
                onChange={(e) => updateProp("threadCategory", e.target.value)}
                className="w-full studio-input text-xs font-mono uppercase"
              />
            </div>
          </div>

          {/* Posts Switcher (Post 1, Post 2, Post 3, Post 4) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white block">
              Edycja Treści Postów:
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#12121a] rounded-xl border border-white/5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedPostTab(num as any)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    selectedPostTab === num
                      ? "bg-amber-500 text-black font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>Post #{num}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Post Form */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white">
                Parametry Postu #{selectedPostTab}
              </span>
              <span className="text-[10px] font-mono text-amber-400">
                {selectedPostTab === 1 ? "Oryginalny wpis (OP)" : "Odpowiedź na forum"}
              </span>
            </div>

            {/* Author */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Autor (Nick):
              </label>
              <input
                type="text"
                value={
                  selectedPostTab === 1
                    ? props.post1_author
                    : selectedPostTab === 2
                    ? props.post2_author
                    : selectedPostTab === 3
                    ? props.post3_author
                    : props.post4_author
                }
                onChange={(e) =>
                  updateProp(
                    `post${selectedPostTab}_author` as any,
                    e.target.value
                  )
                }
                className="w-full studio-input text-xs font-mono font-bold"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Ranga / Tytuł Użytkownika:
              </label>
              <input
                type="text"
                value={
                  selectedPostTab === 1
                    ? props.post1_role
                    : selectedPostTab === 2
                    ? props.post2_role
                    : selectedPostTab === 3
                    ? props.post3_role
                    : props.post4_role
                }
                onChange={(e) =>
                  updateProp(`post${selectedPostTab}_role` as any, e.target.value)
                }
                className="w-full studio-input text-xs"
              />
            </div>

            {/* Content */}
            <div>
              <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                Treść Wiadomości:
              </label>
              <textarea
                rows={3}
                value={
                  selectedPostTab === 1
                    ? props.post1_content
                    : selectedPostTab === 2
                    ? props.post2_content
                    : selectedPostTab === 3
                    ? props.post3_content
                    : props.post4_content
                }
                onChange={(e) =>
                  updateProp(
                    `post${selectedPostTab}_content` as any,
                    e.target.value
                  )
                }
                className="w-full studio-input text-xs resize-none"
              />
            </div>

            {/* Audio Attachment (For Post 1) */}
            {selectedPostTab === 1 && (
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-300 font-semibold flex items-center gap-1.5">
                    <FileAudio className="w-3.5 h-3.5 text-cyan-400" />
                    Załącznik Audio (Odtwarzacz z falą)
                  </span>
                  <button
                    type="button"
                    onClick={() => updateProp("post1_hasAudio", !props.post1_hasAudio)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      props.post1_hasAudio ? "bg-cyan-500 text-black" : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {props.post1_hasAudio ? "WŁĄCZONY" : "WYŁĄCZONY"}
                  </button>
                </div>

                {props.post1_hasAudio && (
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">
                      Nazwa Pliku Audio:
                    </label>
                    <input
                      type="text"
                      value={props.post1_audioFile}
                      onChange={(e) => updateProp("post1_audioFile", e.target.value)}
                      className="w-full studio-input text-xs font-mono"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 2: PRZEWIJANIE (SCROLL) ================= */}
      {activeTab === "scroll" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Automatyczne Przewijanie Forum
                </span>
                <span className="text-[10px] text-zinc-400">
                  Płynny ruch w dół symulujący czytanie wątku
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enableScroll", !props.enableScroll)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enableScroll ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enableScroll ? "WŁĄCZONE" : "WYŁĄCZONE"}
              </button>
            </div>

            {props.enableScroll && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                {/* Scroll Distance */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-zinc-300">
                    <span>Dystans Przewinięcia (Piksele)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.scrollDistance} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={750}
                    step={10}
                    value={props.scrollDistance}
                    onChange={(e) => updateProp("scrollDistance", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                    <span>Krótkie (100px)</span>
                    <span>Standard (420px)</span>
                    <span>Głębokie (750px)</span>
                  </div>
                </div>

                {/* Timing */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Klatka Startu Przewijania:
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={90}
                      value={props.scrollStartFrame}
                      onChange={(e) => updateProp("scrollStartFrame", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">
                      Czas Przewijania (klatki):
                    </label>
                    <input
                      type="number"
                      min={40}
                      max={220}
                      value={props.scrollDuration}
                      onChange={(e) => updateProp("scrollDuration", Number(e.target.value))}
                      className="studio-input text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Highlight Spotlight Post */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Podświetlenie Kluczowego Postu:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 0, label: "Brak podświetlenia" },
                { id: 1, label: "Post #1 (OP / Zagadka)" },
                { id: 2, label: "Post #2 (Odpowiedź)" },
                { id: 3, label: "Post #3" },
                { id: 4, label: "Post #4" },
              ].map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => updateProp("highlightPostIndex", h.id)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    props.highlightPostIndex === h.id
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                      : "bg-[#181822] border-white/5 text-zinc-400"
                  }`}
                >
                  <span className="text-[10px]">{h.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: 3D LOW-POLY & STYL ================= */}
      {activeTab === "lowpoly" && (
        <div className="space-y-4 animate-in fade-in">
          {/* 3D Tilt toggle */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Kąt 3D Low-Poly (Nachylenie Okna)
                </span>
                <span className="text-[10px] text-zinc-400">
                  Perspektywa 3D w stylu ujęć dokumentalnych
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("enable3DTilt", !props.enable3DTilt)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.enable3DTilt ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.enable3DTilt ? "3D KĄT" : "PŁASKIE 2D"}
              </button>
            </div>

            {props.enable3DTilt && (
              <div className="space-y-3 pt-2 border-t border-white/5 animate-in fade-in">
                {/* Tilt X */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-zinc-300">
                    <span>Nachylenie w pionie (Kąt X)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.tiltAngleX}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={25}
                    value={props.tiltAngleX}
                    onChange={(e) => updateProp("tiltAngleX", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Tilt Y */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-zinc-300">
                    <span>Obrót w poziomie (Kąt Y)</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {props.tiltAngleY}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={20}
                    value={props.tiltAngleY}
                    onChange={(e) => updateProp("tiltAngleY", Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Low-Poly Mesh Background */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Efekty Tła Low-Poly:
            </span>

            {/* Mesh intensity */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-zinc-300">
                <span>Intensywność Siatki Wektorowej</span>
                <span className="font-mono text-amber-400 font-bold">
                  {(props.lowPolyMeshIntensity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={props.lowPolyMeshIntensity}
                onChange={(e) => updateProp("lowPolyMeshIntensity", Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Floating polygons toggle */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-medium block">
                  Pływające Wielokąty (Low-Poly Dust)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Geometryczne drobiny unoszące się w tle
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("showFloatingPolygons", !props.showFloatingPolygons)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  props.showFloatingPolygons ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showFloatingPolygons ? "ON" : "OFF"}
              </button>
            </div>

            {/* Scanlines CRT */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-medium block">
                  Linie Skanowania CRT (Scanlines)
                </span>
                <span className="text-[10px] text-zinc-500">
                  Analogowa tekstura monitora retro
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateProp("showScanlines", !props.showScanlines)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  props.showScanlines ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showScanlines ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Color Themes */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Motyw Kolorystyczny:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {themes.map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => updateProp("colorTheme", th.id as any)}
                  className={`p-2 rounded-lg border text-left transition-all flex items-center gap-2 ${
                    props.colorTheme === th.id
                      ? "bg-amber-500/15 border-amber-500 text-white font-bold"
                      : "bg-[#181822] border-white/5 text-zinc-400"
                  }`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: th.color }}
                  />
                  <span className="text-[10px]">{th.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: CZAS ================= */}
      {activeTab === "duration" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <label className="text-xs font-semibold text-white block">
              Długość Animacji:
            </label>
            <div className="space-y-2">
              {[
                { sec: 8, frames: 240, label: "8 sekund (Rekomendowane)", badge: "240 klatek" },
                { sec: 10, frames: 300, label: "10 sekund (Dłuższe czytanie)", badge: "300 klatek" },
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

