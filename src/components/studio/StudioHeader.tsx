"use client";

import React from "react";
import { Film, Sparkles, Download, Layers, Monitor, ChevronDown, Check, FileVideo } from "lucide-react";
import { AspectRatioType, RenderFormat, RESOLUTIONS } from "../../lib/types";

interface StudioHeaderProps {
  resolution: AspectRatioType;
  setResolution: (res: AspectRatioType) => void;
  fps: number;
  setFps: (fps: number) => void;
  onRender: (format: RenderFormat) => void;
  isRendering: boolean;
  onOpenPresets: () => void;
  isBackground?: boolean;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  resolution,
  setResolution,
  fps,
  setFps,
  onRender,
  isRendering,
  onOpenPresets,
  isBackground = false,
}) => {
  const [formatMenuOpen, setFormatMenuOpen] = React.useState(false);
  const [selectedFormat, setSelectedFormat] = React.useState<RenderFormat>(
    isBackground ? "mp4" : "prores4444"
  );

  // Automatically update suggested format when template changes between background and overlay
  React.useEffect(() => {
    setSelectedFormat(isBackground ? "mp4" : "prores4444");
  }, [isBackground]);

  return (
    <header className="h-16 border-b border-white/10 bg-[#0e0e13]/90 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Studio Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/30">
          <Film className="w-5 h-5 text-black stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-wide">
              DocuMotion <span className="text-amber-400 font-extrabold">Studio</span>
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 tracking-wider">
              {isBackground ? "MP4 H.264 / PRORES" : "PRORES 4444 ALPHA"}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            {isBackground
              ? "Generator teł wideo w jakości studyjnej (MP4 H.264 / ProRes)"
              : "Generator nakładek wideo z przezroczystym tłem do DaVinci / Premiere Pro"}
          </p>
        </div>
      </div>

      {/* Center Controls: Resolution & FPS */}
      <div className="flex items-center gap-3">
        {/* Resolution selector */}
        <div className="flex items-center bg-[#15151c] border border-white/10 rounded-lg p-1 text-xs">
          {(["16:9", "4K", "9:16"] as AspectRatioType[]).map((res) => {
            const isSelected = resolution === res;
            return (
              <button
                key={res}
                type="button"
                onClick={() => setResolution(res)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  isSelected
                    ? "bg-amber-500 text-black font-semibold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {RESOLUTIONS[res].badge}
              </button>
            );
          })}
        </div>

        {/* Framerate selector */}
        <div className="flex items-center bg-[#15151c] border border-white/10 rounded-lg p-1 text-xs">
          {[30, 60].map((f) => {
            const isSelected = fps === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFps(f)}
                className={`px-2.5 py-1.5 rounded-md font-mono transition-all ${
                  isSelected
                    ? "bg-zinc-700 text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {f} FPS
              </button>
            );
          })}
        </div>

        {/* Presets button */}
        <button
          type="button"
          onClick={onOpenPresets}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15151c] hover:bg-[#1f1f2a] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Presety</span>
        </button>
      </div>

      {/* Render Action CTA */}
      <div className="relative flex items-center gap-2">
        <button
          type="button"
          disabled={isRendering}
          onClick={() => onRender(selectedFormat)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
            selectedFormat === "mp4"
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black shadow-emerald-500/20 border border-emerald-300/40"
              : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-amber-500/20 border border-amber-300/40"
          }`}
        >
          <Sparkles className="w-4 h-4 fill-black" />
          <span>
            {isRendering
              ? "Renderowanie..."
              : selectedFormat === "mp4"
              ? "Renderuj MP4 H.264 (.mp4)"
              : selectedFormat === "prores4444"
              ? "Renderuj ProRes 4444 (.mov)"
              : "Renderuj WebM VP9 (.webm)"}
          </span>
        </button>

        {/* Format Dropdown toggle */}
        <button
          type="button"
          disabled={isRendering}
          onClick={() => setFormatMenuOpen(!formatMenuOpen)}
          className="p-2 rounded-lg bg-[#181822] hover:bg-[#222230] border border-white/10 text-zinc-300 hover:text-white transition-colors"
          title="Zmień format eksportu"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Format dropdown popover */}
        {formatMenuOpen && (
          <div className="absolute right-0 top-12 w-72 bg-[#14141b] border border-white/15 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 space-y-1">
            <div className="px-2 py-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider border-b border-white/10 mb-1 flex items-center justify-between">
              <span>Wybierz format eksportu</span>
              <span className="text-zinc-500">CRF / Alpha</span>
            </div>

            {/* Option 1: MP4 H.264 */}
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("mp4");
                setFormatMenuOpen(false);
                onRender("mp4");
              }}
              className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start gap-2.5 ${
                selectedFormat === "mp4"
                  ? "bg-emerald-500/15 border border-emerald-500/40 text-white"
                  : "hover:bg-white/5 text-zinc-300 border border-transparent"
              }`}
            >
              <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mt-0.5">
                <FileVideo className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white flex items-center justify-between gap-1 mb-0.5">
                  <span className="flex items-center gap-1.5">
                    MP4 H.264 (.mp4)
                    {isBackground && (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1 rounded font-mono">
                        Polecane
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold font-mono">
                    ~25 MB
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 leading-snug">
                  Krystaliczna jakość (CRF 17, bez bandingu). Idealny do teł i pełnych wideo.
                </div>
              </div>
              {selectedFormat === "mp4" && (
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              )}
            </button>

            {/* Option 2: ProRes 4444 */}
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("prores4444");
                setFormatMenuOpen(false);
                onRender("prores4444");
              }}
              className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start gap-2.5 ${
                selectedFormat === "prores4444"
                  ? "bg-amber-500/15 border border-amber-500/40 text-white"
                  : "hover:bg-white/5 text-zinc-300 border border-transparent"
              }`}
            >
              <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 mt-0.5">
                <Film className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white flex items-center justify-between gap-1 mb-0.5">
                  <span className="flex items-center gap-1.5">
                    Apple ProRes 4444 (.mov)
                    {!isBackground && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 rounded font-mono">
                        Polecane
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold font-mono">
                    10-bit Alpha
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 leading-snug">
                  Bezstratny mastering z przezroczystością. Do nakładek w DaVinci / Premiere.
                </div>
              </div>
              {selectedFormat === "prores4444" && (
                <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
            </button>

            {/* Option 3: WebM VP9 */}
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("webm");
                setFormatMenuOpen(false);
                onRender("webm");
              }}
              className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start gap-2.5 ${
                selectedFormat === "webm"
                  ? "bg-blue-500/15 border border-blue-500/40 text-white"
                  : "hover:bg-white/5 text-zinc-300 border border-transparent"
              }`}
            >
              <div className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 mt-0.5">
                <Download className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white flex items-center justify-between gap-1 mb-0.5">
                  <span>WebM VP9 (.webm)</span>
                  <span className="text-[10px] text-blue-400 font-bold font-mono">
                    Alpha Web
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 leading-snug">
                  Lżejszy plik z przezroczystością. Do OBS Studio, DaVinci i stron WWW.
                </div>
              </div>
              {selectedFormat === "webm" && (
                <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
