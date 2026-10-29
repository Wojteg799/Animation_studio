"use client";

import React, { useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import {
  Grid,
  Moon,
  Sun,
  Image as ImageIcon,
  UploadCloud,
  Film,
  Sparkles,
} from "lucide-react";
import { getTemplateById } from "../../remotion/templates/registry";
import { AspectRatioType, RESOLUTIONS } from "../../lib/types";

type BackgroundType = "checkerboard" | "dark" | "light" | "documentary" | "custom";

interface PreviewPlayerProps {
  templateId: string;
  props: any;
  resolution: AspectRatioType;
  fps: number;
  durationFrames: number;
}

export const PreviewPlayer: React.FC<PreviewPlayerProps> = ({
  templateId,
  props,
  resolution,
  fps,
  durationFrames,
}) => {
  const playerRef = useRef<PlayerRef>(null);
  const [bgType, setBgType] = useState<BackgroundType>("checkerboard");
  const [customBgUrl, setCustomBgUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resConfig = RESOLUTIONS[resolution] || RESOLUTIONS["16:9"];
  const currentTemplate = getTemplateById(templateId);
  const ActiveComponent = currentTemplate.component;

  // Custom footage/photo upload handler for background test
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomBgUrl(url);
      setBgType("custom");
    }
  };

  const durationSeconds = (durationFrames / fps).toFixed(1);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0e] relative overflow-hidden">
      {/* Top Preview Toolbar */}
      <div className="h-12 border-b border-white/10 bg-[#0e0e14]/80 backdrop-blur-md px-4 flex items-center justify-between z-10">
        {/* Aspect ratio & resolution badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161622] border border-white/10 text-xs text-zinc-300 font-mono">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {resConfig.width} × {resConfig.height}
            </span>
            <span className="text-[10px] text-amber-400">({resConfig.label})</span>
          </div>

          <span className="text-zinc-600">|</span>

          <span className="text-[11px] font-mono text-zinc-400">
            {durationFrames} klatek @ {fps} fps ({durationSeconds}s)
          </span>

          {currentTemplate.isBackground && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              PEŁNOEKRANOWE TŁO
            </span>
          )}
        </div>

        {/* Background Switcher for Preview Testing */}
        <div className="flex items-center gap-1 bg-[#14141d] p-1 rounded-lg border border-white/10">
          <span className="text-[10px] font-mono text-zinc-500 uppercase px-1.5">
            Tło podglądu:
          </span>

          <button
            type="button"
            onClick={() => setBgType("checkerboard")}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${
              bgType === "checkerboard"
                ? "bg-amber-500 text-black font-bold shadow"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Siatka przezroczystości (Alpha Grid)"
          >
            <Grid className="w-3 h-3" />
            <span className="hidden sm:inline">Szachownica</span>
          </button>

          <button
            type="button"
            onClick={() => setBgType("dark")}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${
              bgType === "dark"
                ? "bg-zinc-700 text-white font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Ciemne tło kinowe"
          >
            <Moon className="w-3 h-3" />
            <span className="hidden sm:inline">Ciemne</span>
          </button>

          <button
            type="button"
            onClick={() => setBgType("light")}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${
              bgType === "light"
                ? "bg-zinc-200 text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Jasne tło"
          >
            <Sun className="w-3 h-3" />
            <span className="hidden sm:inline">Jasne</span>
          </button>

          <button
            type="button"
            onClick={() => setBgType("documentary")}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${
              bgType === "documentary"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Próbny kadr dokumentalny"
          >
            <ImageIcon className="w-3 h-3" />
            <span className="hidden sm:inline">Kadr Wideo</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${
              bgType === "custom"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Wgraj własne zdjęcie lub kadr z filmu"
          >
            <UploadCloud className="w-3 h-3" />
            <span className="hidden sm:inline">Własne tło</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBackgroundUpload}
          />
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Dynamic canvas wrapper */}
        <div
          className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/10 ${
            bgType === "checkerboard" ? "alpha-checkerboard" : ""
          }`}
          style={{
            width: resolution === "9:16" ? "380px" : "100%",
            maxWidth: resolution === "9:16" ? "420px" : "960px",
            aspectRatio: `${resConfig.width} / ${resConfig.height}`,
            backgroundColor:
              bgType === "dark"
                ? "#08080a"
                : bgType === "light"
                ? "#f4f4f5"
                : undefined,
          }}
        >
          {/* Sample Documentary Backdrop (for overlay mode) */}
          {bgType === "documentary" && (
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none filter brightness-75 contrast-125"
              style={{
                backgroundImage: `radial-gradient(circle at 60% 40%, rgba(20, 24, 33, 0.4) 0%, rgba(5, 7, 10, 0.95) 100%), linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                [TEST FOOTAGE BACKDROP: 35MM ARCHIVE]
              </div>
            </div>
          )}

          {/* User Custom Background Upload */}
          {bgType === "custom" && customBgUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${customBgUrl})` }}
            />
          )}

          {/* Active Remotion Composition Player */}
          <Player
            ref={playerRef}
            component={ActiveComponent}
            inputProps={props}
            durationInFrames={durationFrames}
            fps={fps}
            compositionWidth={resConfig.width}
            compositionHeight={resConfig.height}
            style={{
              width: "100%",
              height: "100%",
            }}
            controls
            autoPlay
            loop
            initiallyMuted
            showVolumeControls={false}
          />
        </div>
      </div>
    </div>
  );
};
