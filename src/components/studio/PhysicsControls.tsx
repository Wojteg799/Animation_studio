"use client";

import React from "react";
import { Activity, Move, Maximize2, Clock, Zap } from "lucide-react";

interface PhysicsControlsProps {
  damping: number;
  setDamping: (v: number) => void;
  stiffness: number;
  setStiffness: (v: number) => void;
  mass: number;
  setMass: (v: number) => void;
  scale: number;
  setScale: (v: number) => void;
  offsetX: number;
  setOffsetX: (v: number) => void;
  offsetY: number;
  setOffsetY: (v: number) => void;
  durationFrames: number;
  setDurationFrames: (v: number) => void;
  fps: number;
}

export const PhysicsControls: React.FC<PhysicsControlsProps> = ({
  damping,
  setDamping,
  stiffness,
  setStiffness,
  mass,
  setMass,
  scale,
  setScale,
  offsetX,
  setOffsetX,
  offsetY,
  setOffsetY,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const durationSeconds = (durationFrames / fps).toFixed(1);

  // Quick physics presets
  const applyPreset = (d: number, s: number, m: number) => {
    setDamping(d);
    setStiffness(s);
    setMass(m);
  };

  return (
    <div className="space-y-5">
      {/* Spring Physics Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Fizyka Sprężyny (Remotion Spring)</span>
          </div>
          {/* Quick presets */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => applyPreset(14, 120, 0.8)}
              className="px-2 py-0.5 rounded text-[10px] bg-[#1a1a24] hover:bg-[#252533] text-zinc-300 border border-white/10"
              title="Standardowy kinowy wjazd z lekkim wygaszeniem"
            >
              Kinowy
            </button>
            <button
              type="button"
              onClick={() => applyPreset(10, 180, 0.6)}
              className="px-2 py-0.5 rounded text-[10px] bg-[#1a1a24] hover:bg-[#252533] text-zinc-300 border border-white/10"
              title="Szybki, sprężysty wjazd z odczuwalnym odbiciem"
            >
              Sprężysty
            </button>
            <button
              type="button"
              onClick={() => applyPreset(25, 90, 1.2)}
              className="px-2 py-0.5 rounded text-[10px] bg-[#1a1a24] hover:bg-[#252533] text-zinc-300 border border-white/10"
              title="Ciężki, powolny i dostojny wjazd bez odbić"
            >
              Dostojny
            </button>
          </div>
        </div>

        <div className="space-y-3 bg-[#101017] p-3 rounded-lg border border-white/10">
          {/* Damping */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-zinc-400">Tłumienie (Damping)</span>
              <span className="font-mono text-amber-400 font-semibold">{damping}</span>
            </div>
            <input
              type="range"
              min={6}
              max={35}
              step={1}
              value={damping}
              onChange={(e) => setDamping(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-0.5">
              <span>Więcej odbić (6)</span>
              <span>Brak odbić (35)</span>
            </div>
          </div>

          {/* Stiffness */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-zinc-400">Sztywność (Stiffness)</span>
              <span className="font-mono text-amber-400 font-semibold">{stiffness}</span>
            </div>
            <input
              type="range"
              min={40}
              max={260}
              step={5}
              value={stiffness}
              onChange={(e) => setStiffness(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-0.5">
              <span>Płynny start (40)</span>
              <span>Błyskawiczny snap (260)</span>
            </div>
          </div>

          {/* Mass */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-zinc-400">Masa elementu (Mass)</span>
              <span className="font-mono text-amber-400 font-semibold">{mass.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={0.3}
              max={2.5}
              step={0.1}
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-0.5">
              <span>Lekki (0.3)</span>
              <span>Ciężki pancerz (2.5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Geometry & Timing Section */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2">
          <Move className="w-3.5 h-3.5 text-amber-400" />
          <span>Pozycja, Skala i Czas Trwania</span>
        </div>

        <div className="space-y-3 bg-[#101017] p-3 rounded-lg border border-white/10">
          {/* Duration */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" /> Czas trwania
              </span>
              <span className="font-mono text-amber-400 font-semibold">
                {durationSeconds}s ({durationFrames} klatek)
              </span>
            </div>
            <input
              type="range"
              min={90}
              max={360}
              step={15}
              value={durationFrames}
              onChange={(e) => setDurationFrames(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-0.5">
              <span>3.0 sek</span>
              <span>12.0 sek</span>
            </div>
          </div>

          {/* Scale */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <Maximize2 className="w-3 h-3 text-zinc-400" /> Skala elementu
              </span>
              <span className="font-mono text-amber-400 font-semibold">{scale.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.6}
              max={1.6}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Offset X and Y */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-zinc-400">Przesunięcie X</span>
                <span className="font-mono text-zinc-300">{offsetX}px</span>
              </div>
              <input
                type="range"
                min={20}
                max={400}
                step={5}
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-zinc-400">Przesunięcie Y</span>
                <span className="font-mono text-zinc-300">{offsetY}px</span>
              </div>
              <input
                type="range"
                min={400}
                max={950}
                step={5}
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
