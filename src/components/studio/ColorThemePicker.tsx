"use client";

import React, { useState } from "react";
import { Palette, Check, SlidersHorizontal, Sparkles } from "lucide-react";
import { THEMES } from "../../lib/themes";

interface ColorThemePickerProps {
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  customPrimary?: string;
  setCustomPrimary: (color: string) => void;
  customSecondary?: string;
  setCustomSecondary: (color: string) => void;
  customCardBg?: string;
  setCustomCardBg: (color: string) => void;
  showScanline: boolean;
  setShowScanline: (show: boolean) => void;
  showCrosshair: boolean;
  setShowCrosshair: (show: boolean) => void;
}

export const ColorThemePicker: React.FC<ColorThemePickerProps> = ({
  currentThemeId,
  onSelectTheme,
  customPrimary,
  setCustomPrimary,
  customSecondary,
  setCustomSecondary,
  customCardBg,
  setCustomCardBg,
  showScanline,
  setShowScanline,
  showCrosshair,
  setShowCrosshair,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const activeTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  return (
    <div className="space-y-4">
      {/* Theme Cards Grid */}
      <div className="grid grid-cols-1 gap-2">
        {THEMES.map((theme) => {
          const isSelected = currentThemeId === theme.id && !customPrimary;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                onSelectTheme(theme.id);
                setCustomPrimary("");
                setCustomSecondary("");
                setCustomCardBg("");
              }}
              className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                isSelected
                  ? "bg-amber-500/10 border-amber-500/60 shadow-sm shadow-amber-500/10"
                  : "bg-[#15151c] hover:bg-[#1a1a24] border-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Color swatches */}
                <div className="flex items-center -space-x-1.5">
                  <div
                    className="w-5 h-5 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-black/40 shadow-sm"
                    style={{ backgroundColor: theme.cardBg }}
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {theme.name}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    {theme.description}
                  </div>
                </div>
              </div>
              {isSelected && <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Advanced Custom Color Toggle */}
      <div className="pt-2 border-t border-white/10">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full text-xs text-zinc-400 hover:text-white py-1 transition-colors"
        >
          <div className="flex items-center gap-1.5 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Własna paleta & detale graficzne</span>
          </div>
          <span className="text-[11px] text-amber-400 font-mono">
            {showAdvanced ? "Zwiń" : "Dostosuj"}
          </span>
        </button>

        {showAdvanced && (
          <div className="mt-3 p-3 rounded-lg bg-[#101017] border border-white/10 space-y-3 animate-in fade-in">
            {/* Color pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Kolor Główny (Akcent)
                </label>
                <div className="flex items-center gap-2 bg-[#181822] p-1.5 rounded border border-white/10">
                  <input
                    type="color"
                    value={customPrimary || activeTheme.primary}
                    onChange={(e) => setCustomPrimary(e.target.value)}
                    className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-zinc-300">
                    {customPrimary || activeTheme.primary}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Kolor Wtórny
                </label>
                <div className="flex items-center gap-2 bg-[#181822] p-1.5 rounded border border-white/10">
                  <input
                    type="color"
                    value={customSecondary || activeTheme.secondary}
                    onChange={(e) => setCustomSecondary(e.target.value)}
                    className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-zinc-300">
                    {customSecondary || activeTheme.secondary}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Toggles */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <label className="flex items-center justify-between cursor-pointer text-xs text-zinc-300">
                <span>Efekt linii skanującej (Scanline)</span>
                <input
                  type="checkbox"
                  checked={showScanline}
                  onChange={(e) => setShowScanline(e.target.checked)}
                  className="rounded bg-[#1a1a24] border-white/20 text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer text-xs text-zinc-300">
                <span>Celowniki archiwalne (+) i znaczniki</span>
                <input
                  type="checkbox"
                  checked={showCrosshair}
                  onChange={(e) => setShowCrosshair(e.target.checked)}
                  className="rounded bg-[#1a1a24] border-white/20 text-amber-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
