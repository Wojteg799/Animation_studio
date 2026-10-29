"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, Save, Trash2, Download, Upload, X, Check } from "lucide-react";
import { DocumentaryLowerThirdProps } from "../../remotion/templates/DocumentaryLowerThird/schema";

export interface PresetItem {
  id: string;
  name: string;
  description: string;
  category: string;
  props: Partial<DocumentaryLowerThirdProps>;
}

export const BUILT_IN_PRESETS: PresetItem[] = [
  {
    id: "oppenheimer-manhattan",
    name: "Dr. Robert Oppenheimer",
    description: "Klasyczny dokument historyczny w stylu Christophera Nolana / BBC",
    category: "Historia & Wojna",
    props: {
      title: "DR. J. ROBERT OPPENHEIMER",
      subtitle: "Director of Los Alamos Laboratory • Manhattan Project",
      badgeText: "RECORD #0492 // DEPT. OF WAR",
      dateLocation: "JULY 16, 1945 • WHITE SANDS, NEW MEXICO",
      themeId: "cinematic-gold",
      styleVariant: "dossier",
      springDamping: 14,
      springStiffness: 120,
      scale: 1.0,
      offsetX: 90,
      offsetY: 780,
    },
  },
  {
    id: "nsa-classified-leak",
    name: "Śledztwo / Wyciek Tajnych Akt",
    description: "Mroczny thriller śledczy, wycieki wywiadowcze, styl Citizenfour",
    category: "Śledztwo & Geopolityka",
    props: {
      title: "OPERACJA: PRISM ARCHIVE",
      subtitle: "Niejawny raport wywiadu elektronicznego NSA",
      badgeText: "TOP SECRET // CLASSIFIED EYES ONLY",
      dateLocation: "JUNE 06, 2013 • FORT MEADE, MARYLAND",
      themeId: "investigative-noir",
      styleVariant: "modern-minimal",
      springDamping: 10,
      springStiffness: 160,
      scale: 1.05,
      offsetX: 80,
      offsetY: 780,
    },
  },
  {
    id: "vintage-enigma-archive",
    name: "Archiwum Sepia (II Wojna Światowa)",
    description: "Ciepła sepia, styl dawnych fotografii i taśm filmowych z archiwum",
    category: "Historia & Wojna",
    props: {
      title: "ALAN TURING & ENIGMA",
      subtitle: "Matematyk • Szef Hut 8, Bletchley Park",
      badgeText: "GOVERNMENT CODE & CYPHER SCHOOL",
      dateLocation: "SEPTEMBER 04, 1939 • MILTON KEYNES, UK",
      themeId: "vintage-sepia",
      styleVariant: "dossier",
      springDamping: 18,
      springStiffness: 100,
      scale: 1.0,
      offsetX: 90,
      offsetY: 770,
    },
  },
  {
    id: "vox-geopolitics",
    name: "Vox / Johnny Harris Essay",
    description: "Nowoczesny, minimalistyczny styl esejów wideo o gospodarce i polityce",
    category: "Eseje Wideo",
    props: {
      title: "SZLAK NAFTOWY W CIEŚNINIE ORMUZ",
      subtitle: "Analiza geopolityczna: 21% światowych dostaw ropy",
      badgeText: "GEOPOLITYKA // RAPORT SPECJALNY",
      dateLocation: "GLOBAL ENERGY MONITOR • WYDANIE 2026",
      themeId: "modern-blue",
      styleVariant: "modern-minimal",
      springDamping: 12,
      springStiffness: 140,
      scale: 1.0,
      offsetX: 90,
      offsetY: 800,
    },
  },
  {
    id: "cyber-radar-intel",
    name: "Cyberbezpieczeństwo / Radar",
    description: "Zielona estetyka terminala wojskowego, radaru i analizy danych",
    category: "Technologia & Nauka",
    props: {
      title: "SYSTEM WCZESNEGO OSTRZEGANIA",
      subtitle: "Analiza telemetrii satelitarnej i wykrywanie anomalii",
      badgeText: "DEFCON-2 TELEMETRY // REAL-TIME FEED",
      dateLocation: "NORAD CHEYENNE MOUNTAIN COMPLEX",
      themeId: "emerald-intel",
      styleVariant: "technical-hud",
      springDamping: 11,
      springStiffness: 180,
      scale: 1.0,
      offsetX: 90,
      offsetY: 780,
    },
  },
];

interface PresetManagerProps {
  isOpen: boolean;
  onClose: () => void;
  currentProps: DocumentaryLowerThirdProps;
  onApplyPreset: (props: Partial<DocumentaryLowerThirdProps>) => void;
}

export const PresetManager: React.FC<PresetManagerProps> = ({
  isOpen,
  onClose,
  currentProps,
  onApplyPreset,
}) => {
  const [customPresets, setCustomPresets] = useState<PresetItem[]>([]);
  const [newPresetName, setNewPresetName] = useState("");
  const [newPresetDesc, setNewPresetDesc] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);

  // Load custom presets from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("documotion_user_presets");
      if (saved) {
        setCustomPresets(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load presets:", e);
    }
  }, []);

  // Save to LocalStorage
  const saveCustomPreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: PresetItem = {
      id: `custom_${Date.now()}`,
      name: newPresetName.trim(),
      description: newPresetDesc.trim() || "Własny preset użytkownika",
      category: "Własne Presety",
      props: { ...currentProps },
    };

    const updated = [newPreset, ...customPresets];
    setCustomPresets(updated);
    localStorage.setItem("documotion_user_presets", JSON.stringify(updated));
    setNewPresetName("");
    setNewPresetDesc("");
    setShowSaveForm(false);
  };

  const deleteCustomPreset = (id: string) => {
    const updated = customPresets.filter((p) => p.id !== id);
    setCustomPresets(updated);
    localStorage.setItem("documotion_user_presets", JSON.stringify(updated));
  };

  // Export JSON
  const exportPresetsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify([...customPresets, ...BUILT_IN_PRESETS], null, 2)
    );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "documotion-presets.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121218] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Menedżer Presetów i Szablonów</h2>
              <p className="text-xs text-zinc-400">
                Wybieraj gotowe style kinowe lub twórz własne szablony do swoich serii filmów
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

        {/* Action bar */}
        <div className="px-6 py-3 bg-[#0d0d12] border-b border-white/5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowSaveForm(!showSaveForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Zapisz bieżący styl jako preset</span>
          </button>

          <button
            type="button"
            onClick={exportPresetsJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181822] hover:bg-[#20202e] border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Eksportuj do JSON</span>
          </button>
        </div>

        {/* Save Form */}
        {showSaveForm && (
          <div className="px-6 py-3 bg-amber-500/5 border-b border-amber-500/20 space-y-2 animate-in fade-in">
            <div className="text-xs font-semibold text-amber-300">Zapisz bieżącą konfigurację:</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Nazwa presetu (np. Mój Dokument Seria #1)"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                className="studio-input text-xs"
              />
              <input
                type="text"
                placeholder="Krótki opis / seria"
                value={newPresetDesc}
                onChange={(e) => setNewPresetDesc(e.target.value)}
                className="studio-input text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowSaveForm(false)}
                className="px-3 py-1 text-xs text-zinc-400 hover:text-white"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={saveCustomPreset}
                disabled={!newPresetName.trim()}
                className="px-4 py-1 rounded bg-amber-500 text-black font-bold text-xs disabled:opacity-50"
              >
                Zapisz
              </button>
            </div>
          </div>
        )}

        {/* Presets List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Custom Presets */}
          {customPresets.length > 0 && (
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2 font-bold">
                Własne Presety ({customPresets.length})
              </div>
              <div className="grid grid-cols-1 gap-2">
                {customPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-3 rounded-xl bg-[#171720] border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{preset.name}</div>
                      <div className="text-[11px] text-zinc-400">{preset.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onApplyPreset(preset.props);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
                      >
                        Zastosuj
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCustomPreset(preset.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Usuń preset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Built-in Presets */}
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-bold">
              Gotowe Szablony Kinowe
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {BUILT_IN_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="p-3.5 rounded-xl bg-[#15151c] border border-white/5 hover:border-white/15 flex items-center justify-between transition-all group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        {preset.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-zinc-400 border border-white/10">
                        {preset.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400">{preset.description}</div>
                    <div className="text-[10px] font-mono text-zinc-500 pt-1">
                      {preset.props.title} • {preset.props.badgeText}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyPreset(preset.props);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-black text-white text-xs font-bold transition-all border border-white/10 hover:border-amber-400"
                  >
                    Wczytaj
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
