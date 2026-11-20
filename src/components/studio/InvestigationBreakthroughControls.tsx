"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  Radio,
  FileSearch,
  MessageCircle,
  Disc,
  Sliders,
  Palette,
  Check,
} from "lucide-react";
import { InvestigationBreakthroughProps } from "../../remotion/templates/InvestigationBreakthrough/schema";

interface InvestigationBreakthroughControlsProps {
  props: InvestigationBreakthroughProps;
  updateProp: <K extends keyof InvestigationBreakthroughProps>(
    key: K,
    val: InvestigationBreakthroughProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const InvestigationBreakthroughControls: React.FC<
  InvestigationBreakthroughControlsProps
> = ({ props, updateProp, durationFrames, setDurationFrames, fps }) => {
  const [activeTab, setActiveTab] = useState<
    "characters" | "story" | "timing"
  >("story");

  const currentDuration = props.durationInFrames ?? durationFrames ?? 300;

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

  return (
    <div className="space-y-4 text-xs">
      {/* ================= GŁÓWNY PRZEŁĄCZNIK ZAKŁADEK ================= */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-[#12121a] rounded-lg border border-white/5">
        <button
          type="button"
          onClick={() => setActiveTab("story")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "story"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <FileSearch className="w-3.5 h-3.5" />
          <span className="text-[10px]">Fabuła & 2007</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("characters")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "characters"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span className="text-[10px]">3 Postacie</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("timing")}
          className={`py-2 px-1 rounded flex flex-col items-center gap-1 font-semibold transition-all ${
            activeTab === "timing"
              ? "bg-amber-500 text-black shadow font-bold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Timing</span>
        </button>
      </div>

      {/* =========================================================================
          ZAKŁADKA 1: FABUŁA (RADIO, KASETA, ŚLEDZTWO 2007, MESSENGER)
          ========================================================================= */}
      {activeTab === "story" && (
        <div className="space-y-4">
          {/* 1. Audycja radiowa & Kaseta Dariusa */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-amber-500/20 space-y-2.5">
            <label className="text-amber-400 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              1. Audycja radiowa & Kaseta Dariusa
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-300">Audycja w radiu (fale dźwiękowe)</span>
              <input
                type="checkbox"
                checked={props.showRadio}
                onChange={(e) => updateProp("showRadio", e.target.checked)}
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-300">Kaseta i wykrzyknik rozpoznania (!)</span>
              <input
                type="checkbox"
                checked={props.showCassetteRecognition}
                onChange={(e) =>
                  updateProp("showCassetteRecognition", e.target.checked)
                }
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>
          </div>

          {/* 2. Śledztwo: Wpisy z 2007 roku */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-sky-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-sky-400 font-bold flex items-center gap-1.5">
                <FileSearch className="w-3.5 h-3.5" />
                2. Śledztwo: Wpisy z 2007 roku
              </label>
              <input
                type="checkbox"
                checked={props.showForum2007Badge}
                onChange={(e) =>
                  updateProp("showForum2007Badge", e.target.checked)
                }
                className="rounded border-zinc-700 text-sky-500 focus:ring-0"
              />
            </div>

            {props.showForum2007Badge && (
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">
                  Napis na karcie archiwum
                </label>
                <input
                  type="text"
                  value={props.forum2007Text}
                  onChange={(e) => updateProp("forum2007Text", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-sky-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* 3. Wiadomość Messenger (Lydia pisze do Gabriela) */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-emerald-400 font-bold flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                3. Wiadomość na Messengerze (Lydia → Gabriel)
              </label>
              <input
                type="checkbox"
                checked={props.showMessengerMessage}
                onChange={(e) =>
                  updateProp("showMessengerMessage", e.target.checked)
                }
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </div>

            {props.showMessengerMessage && (
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">
                  Treść wiadomości Messengera
                </label>
                <input
                  type="text"
                  value={props.messengerText}
                  onChange={(e) => updateProp("messengerText", e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
                />
              </div>
            )}

            <label className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-white/5 cursor-pointer">
              <span className="text-zinc-300">Linie połączenia między postaciami</span>
              <input
                type="checkbox"
                checked={props.showConnectionLines}
                onChange={(e) =>
                  updateProp("showConnectionLines", e.target.checked)
                }
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
            </label>
          </div>
        </div>
      )}

      {/* =========================================================================
          ZAKŁADKA 2: POSTACIE (DARIUS, LYDIA, GABRIEL)
          ========================================================================= */}
      {activeTab === "characters" && (
        <div className="space-y-4">
          {/* Darius */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-amber-500/20 space-y-2">
            <label className="text-amber-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Darius (po lewej)
            </label>
            <input
              type="text"
              value={props.dariusName}
              onChange={(e) => updateProp("dariusName", e.target.value)}
              className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
            />
          </div>

          {/* Lydia */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-sky-500/20 space-y-2">
            <label className="text-sky-400 font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              Lydia (w środku)
            </label>
            <input
              type="text"
              value={props.lydiaName}
              onChange={(e) => updateProp("lydiaName", e.target.value)}
              className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-sky-500 outline-none"
            />
          </div>

          {/* Gabriel */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                Gabriel (po prawej)
              </label>
              <label className="flex items-center gap-1 text-[11px] text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props.gabrielShowAntenna}
                  onChange={(e) => updateProp("gabrielShowAntenna", e.target.checked)}
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
                />
                Antenka Snoo
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={props.gabrielName}
                onChange={(e) => updateProp("gabrielName", e.target.value)}
                placeholder="Imię"
                className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
              />
              <input
                type="text"
                value={props.gabrielSubtitle}
                onChange={(e) => updateProp("gabrielSubtitle", e.target.value)}
                placeholder="Podtytuł"
                className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Skala postaci */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Wielkość postaci</span>
              <span className="text-amber-400 font-mono">
                {Math.round(props.charactersScale * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.35"
              step="0.05"
              value={props.charactersScale}
              onChange={(e) =>
                updateProp("charactersScale", parseFloat(e.target.value))
              }
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          ZAKŁADKA 3: TIMING & USTAWIENIA
          ========================================================================= */}
      {activeTab === "timing" && (
        <div className="space-y-4">
          {/* Czas trwania animacji */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-zinc-300 font-medium">Czas trwania</label>
              <span className="text-[10px] text-zinc-500">{fps} FPS</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Sekundy</label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="120"
                  value={durationSecInput}
                  onChange={(e) => {
                    setDurationSecInput(e.target.value);
                    const sec = parseFloat(e.target.value);
                    if (!isNaN(sec) && sec > 0) {
                      handleSetDuration(Math.round(sec * fps));
                    }
                  }}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Klatki</label>
                <input
                  type="number"
                  step="1"
                  min="60"
                  max="3600"
                  value={durationFramesInput}
                  onChange={(e) => {
                    setDurationFramesInput(e.target.value);
                    const fr = parseInt(e.target.value, 10);
                    if (!isNaN(fr) && fr > 0) {
                      handleSetDuration(fr);
                    }
                  }}
                  className="w-full px-2.5 py-1.5 bg-black border border-white/10 rounded text-white font-mono text-xs focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Szybkie presety */}
            <div className="flex gap-1.5 pt-1">
              {[
                { label: "8s", f: 240 },
                { label: "10s (Domyślne)", f: 300 },
                { label: "12s", f: 360 },
                { label: "15s", f: 450 },
              ].map((p) => (
                <button
                  key={p.f}
                  type="button"
                  onClick={() => handleSetDuration(p.f)}
                  className={`flex-1 py-1 rounded text-[10px] font-mono border transition-all ${
                    currentDuration === p.f
                      ? "border-amber-500 bg-amber-500/20 text-amber-400 font-bold"
                      : "border-white/5 bg-zinc-950 text-zinc-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sekwencja zdarzeń (Klatki) */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-3">
            <label className="text-zinc-300 font-medium">Sekwencja wydarzeń (Klatki)</label>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>1. Audycja w radiu</span>
                <span className="text-amber-400 font-mono">Klatka {props.radioStartFrame}</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={props.radioStartFrame}
                onChange={(e) =>
                  updateProp("radioStartFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>2. Darius rozpoznaje kasetę (!)</span>
                <span className="text-amber-400 font-mono">Klatka {props.dariusRecognizeFrame}</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="1"
                value={props.dariusRecognizeFrame}
                onChange={(e) =>
                  updateProp("dariusRecognizeFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>3. Połączenie z Lydią</span>
                <span className="text-amber-400 font-mono">Klatka {props.lydiaEnterFrame}</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="1"
                value={props.lydiaEnterFrame}
                onChange={(e) =>
                  updateProp("lydiaEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>4. Śledztwo: Wpisy z 2007 r.</span>
                <span className="text-amber-400 font-mono">Klatka {props.investigation2007Frame}</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                step="1"
                value={props.investigation2007Frame}
                onChange={(e) =>
                  updateProp("investigation2007Frame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>5. Wejście Gabriela</span>
                <span className="text-amber-400 font-mono">Klatka {props.gabrielEnterFrame}</span>
              </div>
              <input
                type="range"
                min="100"
                max="180"
                step="1"
                value={props.gabrielEnterFrame}
                onChange={(e) =>
                  updateProp("gabrielEnterFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>6. Wiadomość na Messengerze</span>
                <span className="text-amber-400 font-mono">Klatka {props.messengerSendFrame}</span>
              </div>
              <input
                type="range"
                min="140"
                max="240"
                step="1"
                value={props.messengerSendFrame}
                onChange={(e) =>
                  updateProp("messengerSendFrame", parseInt(e.target.value))
                }
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Opcje tła i oddechu */}
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5 space-y-2.5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-300">Przezroczyste tło (Alpha ProRes 4444)</span>
              <input
                type="checkbox"
                checked={props.transparentBackground}
                onChange={(e) =>
                  updateProp("transparentBackground", e.target.checked)
                }
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-zinc-300">Organiczny oddech postaci (Idle Bobbing)</span>
              <input
                type="checkbox"
                checked={props.idleBobbing}
                onChange={(e) => updateProp("idleBobbing", e.target.checked)}
                className="rounded border-zinc-700 text-amber-500 focus:ring-0"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
