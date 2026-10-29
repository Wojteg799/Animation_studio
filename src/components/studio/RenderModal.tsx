"use client";

import React, { useEffect, useState } from "react";
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Film,
  Sparkles,
  X,
  FileVideo,
  Copy,
  Check,
} from "lucide-react";
import { RenderJobStatus } from "../../lib/types";

interface RenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string | null;
}

export const RenderModal: React.FC<RenderModalProps> = ({
  isOpen,
  onClose,
  jobId,
}) => {
  const [job, setJob] = useState<RenderJobStatus | null>(null);
  const [copied, setCopied] = useState(false);

  // Poll job status every 750ms while active
  useEffect(() => {
    if (!isOpen || !jobId) return;

    let intervalId: NodeJS.Timeout;

    const poll = async () => {
      try {
        const res = await fetch(`/api/render/${jobId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.job) {
            setJob(data.job);
            if (data.job.status === "completed" || data.job.status === "failed") {
              clearInterval(intervalId);
            }
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    poll();
    intervalId = setInterval(poll, 750);

    return () => clearInterval(intervalId);
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  const isCompleted = job?.status === "completed";
  const isFailed = job?.status === "failed";
  const isRunning = !isCompleted && !isFailed;
  const progressPercent = Math.round((job?.progress || 0) * 100);

  const fileSizeMb = job?.fileSizeBytes
    ? (job.fileSizeBytes / (1024 * 1024)).toFixed(2)
    : null;

  const copyTip = () => {
    navigator.clipboard.writeText(
      "Przeciągnij plik .mov bezpośrednio na ścieżkę V2 lub V3 ponad materiałem wideo. Przezroczysty kanał Alpha (ProRes 4444) zadziała natywnie bez żadnego kluczowania!"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121219] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isCompleted
                  ? "Renderowanie Zakończone!"
                  : isFailed
                  ? "Błąd Renderowania"
                  : job?.format === "mp4"
                  ? "Renderowanie Wideo MP4..."
                  : "Renderowanie Nakładki Alpha..."}
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono">
                {job?.format === "prores4444"
                  ? "Apple ProRes 4444 (10-bit RGBA Alpha)"
                  : job?.format === "mp4"
                  ? "MP4 H.264 (Krystaliczna Jakość • CRF 17)"
                  : "WebM VP9 z kanałem Alpha"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Running State */}
          {isRunning && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                  {job?.status === "bundling" && "Pakowanie kodu kompozycji (Webpack/Rspack)..."}
                  {job?.status === "rendering" && "Renderowanie klatek wideo..."}
                  {job?.status === "encoding" &&
                    (job?.format === "mp4"
                      ? "Kompresja wideo H.264 (CRF 17)..."
                      : job?.format === "prores4444"
                      ? "Kompresja wielowątkowa Apple ProRes 4444..."
                      : "Kodowanie WebM VP9...")}
                </span>
                <span className="font-mono text-amber-400 font-bold text-sm">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full bg-[#1c1c28] rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full transition-all duration-300 shadow-md shadow-amber-500/30"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>

              {/* Stats ticker */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2.5 rounded-lg bg-[#161622] border border-white/5">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Wyrenderowano</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">
                    {job?.renderedFrames || 0} / {job?.totalFrames || "..."} klatek
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161622] border border-white/5">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Kanał Przezroczystości</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                    RGBA 10-bit
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161622] border border-white/5">
                  <div className="text-[10px] text-zinc-400 uppercase font-mono">Wielowątkowość</div>
                  <div className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                    Bezpieczna (Node Safe)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completed State */}
          {isCompleted && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-emerald-300">
                    Twój plik z przezroczystym tłem jest gotowy!
                  </h3>
                  <p className="text-[11px] text-zinc-300 mt-1">
                    Wyrenderowano z zachowaniem pełnej przezroczystości RGBA. Możesz bezpośrednio
                    przeciągnąć plik do DaVinci Resolve, Premiere Pro lub Final Cut Pro bez
                    konieczności usuwania tła.
                  </p>
                </div>
              </div>

              {/* File Download Card */}
              <div className="p-4 rounded-xl bg-[#161622] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <FileVideo className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{job.fileName}</div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      Rozmiar: <span className="text-amber-400 font-bold">{fileSizeMb} MB</span> •{" "}
                      {job.format === "prores4444" ? "Apple ProRes 4444 (.mov)" : "WebM VP9 Alpha"}
                    </div>
                  </div>
                </div>

                <a
                  href={job.downloadUrl}
                  download={job.fileName}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Pobierz Plik</span>
                </a>
              </div>

              {/* NLE Quick Instructions */}
              <div className="p-3.5 rounded-xl bg-[#0e0e14] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase">
                  <span>Wskazówka montażowa (DaVinci / Premiere)</span>
                  <button
                    type="button"
                    onClick={copyTip}
                    className="flex items-center gap-1 text-[10px] text-amber-400 hover:underline"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Skopiowano!" : "Kopiuj instrukcję"}</span>
                  </button>
                </div>
                {job?.format === "mp4" ? (
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    Pobrany plik <code className="text-amber-300 font-mono">.mp4</code> został zakodowany kodekiem <strong>H.264 z profilem High i CRF 17</strong> (jakość studyjna, ultra-lekka waga). Jest gotowy do bezpośredniego wrzucenia na ścieżkę tła (np. <strong>V1</strong>) w DaVinci Resolve / Premiere Pro lub natychmiastowej publikacji.
                  </p>
                ) : (
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    Umieść pobrany plik <code className="text-amber-300 font-mono">.{job?.format === "prores4444" ? "mov" : "webm"}</code> na ścieżce wideo powyżej Twojego filmu (np. <strong>V2</strong>).
                    Ponieważ kodek to <strong>{job?.format === "prores4444" ? "Apple ProRes 4444" : "WebM VP9"}</strong> z kanałem <strong>Alpha</strong>, tło jest natywnie przezroczyste – nie wymaga żadnych masek ani efektów kluczowania.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Failed State */}
          {isFailed && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Wystąpił błąd podczas procesu renderowania</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-mono bg-black/40 p-2.5 rounded border border-red-500/20">
                {job?.error || "Nieoczekiwany błąd silnika renderującego"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0d0d12] border-t border-white/5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
          >
            {isCompleted ? "Gotowe" : "Zamknij okno"}
          </button>
        </div>
      </div>
    </div>
  );
};
