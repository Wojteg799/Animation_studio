"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Gift,
  Globe,
  Clock,
  Zap,
  Sliders,
  Palette,
  CheckCircle,
  HelpCircle,
  Layout,
  Music,
} from "lucide-react";
import { DariusInternetQuestProps } from "../../remotion/templates/DariusInternetQuest/schema";

interface DariusInternetQuestControlsProps {
  props: DariusInternetQuestProps;
  updateProp: <K extends keyof DariusInternetQuestProps>(
    key: K,
    val: DariusInternetQuestProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

export const DariusInternetQuestControls: React.FC<
  DariusInternetQuestControlsProps
> = ({ props, updateProp, durationFrames, setDurationFrames, fps }) => {
  const [activeTab, setActiveTab] = useState<
    "characters" | "gift" | "website" | "timing"
  >("timing");

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

  const handleAutoScaleMilestones = () => {
    const scale = currentDuration / 360;
    const newCharactersEnter = Math.round(5 * scale);
    const newGiftOpen = Math.round(28 * scale);
    const newGiftEnd = Math.round(90 * scale);
    const newWebsiteStart = Math.round(95 * scale);
    const newSong1 = Math.round(160 * scale);
    const newSong2 = Math.round(205 * scale);
    const newSong3 = Math.round(245 * scale);
    const newMystery = Math.round(285 * scale);

    updateProp("charactersEnterFrame", newCharactersEnter);
    updateProp("giftOpenFrame", newGiftOpen);
    updateProp("giftEndFrame", newGiftEnd);
    updateProp("websiteStartFrame", newWebsiteStart);
    updateProp("identifySong1Frame", newSong1);
    updateProp("identifySong2Frame", newSong2);
    updateProp("identifySong3Frame", newSong3);
    updateProp("mysteryQuestionFrame", newMystery);
  };

  const dariusColors = [
    { id: "#facc15", name: "Żółty (Darius Klasyk)", color: "#facc15" },
    { id: "#fbbf24", name: "Bursztyn", color: "#fbbf24" },
    { id: "#f97316", name: "Pomarańcz", color: "#f97316" },
    { id: "#ffffff", name: "Biel", color: "#ffffff" },
  ];

  const lydiaColors = [
    { id: "#38bdf8", name: "Błękit (Lydia)", color: "#38bdf8" },
    { id: "#0284c7", name: "Głęboki Błękit", color: "#0284c7" },
    { id: "#818cf8", name: "Indygo / Fiolet", color: "#818cf8" },
    { id: "#a78bfa", name: "Lawenda", color: "#a78bfa" },
  ];

  const timingMilestones = [
    {
      key: "charactersEnterFrame" as const,
      title: "1. Wejście Postaci (Lydia & Darius)",
      desc: "Klatka wejścia obu bohaterów na ekran",
      icon: <Users className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.charactersEnterFrame ?? 5,
    },
    {
      key: "giftOpenFrame" as const,
      title: "2. Otwarcie Prezentu & Wyskok Domeny",
      desc: "Wieczko prezentu unosi się i globus z domeną leci do Dariusa",
      icon: <Gift className="w-3.5 h-3.5 text-sky-400" />,
      val: props.giftOpenFrame ?? 28,
    },
    {
      key: "giftEndFrame" as const,
      title: "3. Przejście (Wyjście Lydii & Ruch Dariusa)",
      desc: "Zakończenie wręczenia prezentu, Darius przesuwa się na lewo",
      icon: <Clock className="w-3.5 h-3.5 text-zinc-400" />,
      val: props.giftEndFrame ?? 90,
    },
    {
      key: "websiteStartFrame" as const,
      title: "4. Wjazd Strony WWW & Odtwarzacza",
      desc: "Pojawienie się okna przeglądarki i granie próbek z falami audio",
      icon: <Globe className="w-3.5 h-3.5 text-sky-400" />,
      val: props.websiteStartFrame ?? 95,
    },
    {
      key: "identifySong1Frame" as const,
      title: "5. Piosenka 1 Rozpoznana (✓)",
      desc: "Wyskakuje pierwsza zielona fajka sukcesu",
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
      val: props.identifySong1Frame ?? 160,
    },
    {
      key: "identifySong2Frame" as const,
      title: "6. Piosenka 2 Rozpoznana (✓)",
      desc: "Druga piosenka zostaje zidentyfikowana przez internautów",
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
      val: props.identifySong2Frame ?? 205,
    },
    {
      key: "identifySong3Frame" as const,
      title: "7. Piosenka 3 Rozpoznana (✓)",
      desc: "Kolejny sukces w sieci — trzecia piosenka odnaleziona",
      icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />,
      val: props.identifySong3Frame ?? 245,
    },
    {
      key: "mysteryQuestionFrame" as const,
      title: "8. Tajemnicza Piosenka (?)",
      desc: "Wyskok wielkiego żółtego pytajnika — ta piosenka nadal pozostaje zagadką!",
      icon: <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />,
      val: props.mysteryQuestionFrame ?? 285,
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
                : "Czysta czerń #000000"}
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

      {/* Tabs navigation */}
      <div className="grid grid-cols-4 gap-1 bg-[#15151f] p-1 rounded-xl border border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("timing")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "timing"
              ? "bg-yellow-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">Czas & Timing</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("characters")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "characters"
              ? "bg-yellow-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span className="text-[10px]">Postacie</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gift")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "gift"
              ? "bg-yellow-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span className="text-[10px]">Prezent</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("website")}
          className={`py-2 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
            activeTab === "website"
              ? "bg-yellow-500 text-black font-bold shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="text-[10px]">Strona & Piosenki</span>
        </button>
      </div>

      {/* ================= TAB 1: CZAS & TIMING ================= */}
      {activeTab === "timing" && (
        <div className="space-y-4 animate-in fade-in">
          {/* A. CAŁKOWITY CZAS TRWANIA */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                Całkowity Czas Trwania Wideo:
              </span>
              <span className="text-[11px] font-mono text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                {(currentDuration / fps).toFixed(1)}s ({currentDuration} kl.)
              </span>
            </div>

            {/* Bezpośrednie wpisywanie: Sekundy oraz Klatki */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-zinc-400 block mb-1">
                  Sekundy (np. 14 lub 14.5):
                </span>
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
                      const validSec =
                        isNaN(sec) || sec < 2 ? 2 : Math.min(120, sec);
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
                <span className="text-[10px] text-zinc-400 block mb-1">
                  Klatki (frames @ 30fps):
                </span>
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
                      const validFrames =
                        isNaN(fr) || fr < 60 ? 60 : Math.min(3600, fr);
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
                className="w-full accent-yellow-400"
              />
            </div>

            {/* Szybkie presety czasu trwania */}
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

            {/* Przycisk automatycznego rozłożenia etapów proporcjonalnie do czasu filmu */}
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={handleAutoScaleMilestones}
                className="w-full py-2 px-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                ⚡ Automatycznie rozłóż etapy proporcjonalnie do {currentDuration}{" "}
                kl. ({(currentDuration / fps).toFixed(1)}s)
              </button>
            </div>
          </div>

          {/* B. PRECYZYJNY TIMING KLATEK KLUCZOWYCH */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block">
              Precyzyjny Harmonogram Historii (Klatki & Sekundy):
            </span>
            <p className="text-[10px] text-zinc-400 leading-snug">
              Wpisz dokładną klatkę lub sekundę, w której ma się pojawić każdy
              element opowieści.
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
                      <span className="text-[10px] font-mono text-yellow-400 font-bold">
                        {currentSec}s ({currentVal} kl.)
                      </span>
                    </div>

                    {/* Pola do wpisywania */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1 bg-[#14141e] px-2 py-1 rounded border border-white/10">
                        <span className="text-[9px] text-zinc-400 uppercase">
                          Klatka:
                        </span>
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
                        <span className="text-[9px] text-zinc-400 uppercase">
                          Sek:
                        </span>
                        <input
                          type="number"
                          min="0"
                          max={parseFloat((currentDuration / fps).toFixed(2))}
                          step="0.1"
                          value={currentSec}
                          onChange={(e) => {
                            const sec = parseFloat(e.target.value);
                            if (!isNaN(sec)) {
                              updateProp(
                                ev.key,
                                Math.max(0, Math.round(sec * fps))
                              );
                            }
                          }}
                          className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                        />
                        <span className="text-[10px] text-zinc-500 font-mono">
                          s
                        </span>
                      </div>
                    </div>

                    {/* Płynny suwak dostosowany do pełnego zakresu */}
                    <input
                      type="range"
                      min="0"
                      max={currentDuration}
                      step="1"
                      value={currentVal}
                      onChange={(e) =>
                        updateProp(ev.key, parseInt(e.target.value))
                      }
                      className="w-full accent-yellow-400"
                    />
                    <p className="text-[9px] text-zinc-500">{ev.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: POSTACIE ================= */}
      {activeTab === "characters" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Postać Dariusa */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-yellow-400" />
              1. Postać Dariusa:
            </span>

            {/* Imię */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 block">Podpis postaci:</span>
              <input
                type="text"
                value={props.dariusName}
                onChange={(e) => updateProp("dariusName", e.target.value)}
                className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-xs focus:outline-none"
              />
            </div>

            {/* Kolor akcentu Dariusa */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 block">Kolor akcentu:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {dariusColors.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => updateProp("dariusColor", col.id)}
                    className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                      props.dariusColor === col.id
                        ? "bg-white/10 border-yellow-400 text-white font-bold"
                        : "bg-[#14141e] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[8px] truncate max-w-full">
                      {col.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suwaki geometrii kółek Dariusa */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Głowa (r)</span>
                  <span className="text-yellow-400 font-mono">
                    {props.dariusHeadSize ?? 42}px
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  value={props.dariusHeadSize ?? 42}
                  onChange={(e) =>
                    updateProp("dariusHeadSize", parseInt(e.target.value))
                  }
                  className="w-full accent-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Tułów (r)</span>
                  <span className="text-yellow-400 font-mono">
                    {props.dariusBodySize ?? 75}px
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="110"
                  value={props.dariusBodySize ?? 75}
                  onChange={(e) =>
                    updateProp("dariusBodySize", parseInt(e.target.value))
                  }
                  className="w-full accent-yellow-400"
                />
              </div>
            </div>
          </div>

          {/* Postać Lydii */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              2. Postać Lydii (Kolor Niebieski):
            </span>

            {/* Imię */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 block">Podpis postaci:</span>
              <input
                type="text"
                value={props.lydiaName}
                onChange={(e) => updateProp("lydiaName", e.target.value)}
                className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-xs focus:outline-none"
              />
            </div>

            {/* Kolor akcentu Lydii */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 block">Kolor akcentu:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {lydiaColors.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => updateProp("lydiaColor", col.id)}
                    className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                      props.lydiaColor === col.id
                        ? "bg-white/10 border-sky-400 text-white font-bold"
                        : "bg-[#14141e] border-white/5 text-zinc-400"
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[8px] truncate max-w-full">
                      {col.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Suwaki geometrii kółek Lydii */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Głowa (r)</span>
                  <span className="text-sky-400 font-mono">
                    {props.lydiaHeadSize ?? 42}px
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="65"
                  value={props.lydiaHeadSize ?? 42}
                  onChange={(e) =>
                    updateProp("lydiaHeadSize", parseInt(e.target.value))
                  }
                  className="w-full accent-sky-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Tułów (r)</span>
                  <span className="text-sky-400 font-mono">
                    {props.lydiaBodySize ?? 75}px
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="110"
                  value={props.lydiaBodySize ?? 75}
                  onChange={(e) =>
                    updateProp("lydiaBodySize", parseInt(e.target.value))
                  }
                  className="w-full accent-sky-400"
                />
              </div>
            </div>
          </div>

          {/* Skala postaci */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-semibold">Skala Postaci:</span>
              <span className="text-yellow-400 font-mono font-bold">
                {((props.charactersScale ?? 1.15) * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="2.0"
              step="0.05"
              value={props.charactersScale ?? 1.15}
              onChange={(e) =>
                updateProp("charactersScale", parseFloat(e.target.value))
              }
              className="w-full accent-yellow-400"
            />
          </div>
        </div>
      )}

      {/* ================= TAB 3: PREZENT & DOMENA ================= */}
      {activeTab === "gift" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-sky-400" />
              Prezent Urodzinowy (Domena Internetowa):
            </span>

            {/* Adres domeny */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 block">
                Adres publikowanej domeny:
              </span>
              <input
                type="text"
                value={props.domainText}
                onChange={(e) => updateProp("domainText", e.target.value)}
                className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-xs focus:outline-none"
                placeholder="np. www.unknown-song.net"
              />
            </div>

            {/* Skala prezentu */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-semibold">Rozmiar Pudełka:</span>
                <span className="text-sky-400 font-mono font-bold">
                  {((props.giftBoxScale ?? 1.2) * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.6"
                max="2.2"
                step="0.05"
                value={props.giftBoxScale ?? 1.2}
                onChange={(e) =>
                  updateProp("giftBoxScale", parseFloat(e.target.value))
                }
                className="w-full accent-sky-400"
              />
            </div>

            {/* Przełącznik prezentu */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs text-zinc-300">Włącz animację prezentu:</span>
              <button
                type="button"
                onClick={() => updateProp("showGift", !props.showGift)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                  props.showGift
                    ? "bg-sky-500 text-black"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {props.showGift ? "WŁ" : "WYŁ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: STRONA & PIOSENKI ================= */}
      {activeTab === "website" && (
        <div className="space-y-4 animate-in fade-in">
          {/* Skala okna */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-semibold">
                Rozmiar Okna Przeglądarki:
              </span>
              <span className="text-yellow-400 font-mono font-bold">
                {((props.websiteScale ?? 1.15) * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.8"
              step="0.05"
              value={props.websiteScale ?? 1.15}
              onChange={(e) =>
                updateProp("websiteScale", parseFloat(e.target.value))
              }
              className="w-full accent-yellow-400"
            />
          </div>

          {/* Lista piosenek */}
          <div className="bg-[#12121a] p-3.5 rounded-xl border border-white/5 space-y-3">
            <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-emerald-400" />
              Tytuły Piosenek na Liście:
            </span>

            <div className="space-y-2">
              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-mono">
                  Piosenka 1 (Rozpoznana ✓):
                </span>
                <input
                  type="text"
                  value={props.song1Title}
                  onChange={(e) => updateProp("song1Title", e.target.value)}
                  className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-mono">
                  Piosenka 2 (Rozpoznana ✓):
                </span>
                <input
                  type="text"
                  value={props.song2Title}
                  onChange={(e) => updateProp("song2Title", e.target.value)}
                  className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-mono">
                  Piosenka 3 (Rozpoznana ✓):
                </span>
                <input
                  type="text"
                  value={props.song3Title}
                  onChange={(e) => updateProp("song3Title", e.target.value)}
                  className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-white/10 text-white font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-yellow-400 font-mono font-bold">
                  Piosenka 4 (Tajemnicza: ????):
                </span>
                <input
                  type="text"
                  value={props.mysterySongTitle || "????"}
                  onChange={(e) => updateProp("mysterySongTitle", e.target.value)}
                  placeholder="????"
                  className="w-full bg-[#161622] px-2.5 py-1.5 rounded-lg border border-yellow-500/30 text-yellow-300 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
