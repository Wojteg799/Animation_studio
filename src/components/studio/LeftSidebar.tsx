"use client";

import React, { useRef, useState } from "react";
import {
  FileText,
  Palette,
  Activity,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Layers,
  User,
  Calendar,
  Tag,
  Scroll,
  Moon,
  Sun,
  Shield,
  Disc,
} from "lucide-react";
import { JoyDivisionCassetteMorphProps } from "../../remotion/templates/JoyDivisionCassetteMorph/schema";
import { RetroCassetteIntroProps } from "../../remotion/templates/RetroCassetteIntro/schema";
import { DocumentaryLowerThirdProps } from "../../remotion/templates/DocumentaryLowerThird/schema";
import { MinimalVoidParticlesProps } from "../../remotion/templates/MinimalVoidParticles/schema";
import { CinematicParticlesBackgroundProps } from "../../remotion/templates/CinematicParticlesBackground/schema";
import { DarkParchmentBackgroundProps } from "../../remotion/templates/DarkParchmentBackground/schema";
import { TEMPLATES } from "../../remotion/templates/registry";
import { JoyDivisionControls } from "./JoyDivisionControls";
import { CassetteIntroControls } from "./CassetteIntroControls";
import { ColorThemePicker } from "./ColorThemePicker";
import { PhysicsControls } from "./PhysicsControls";
import { VoidControls } from "./VoidControls";
import { ParticlesControls } from "./ParticlesControls";
import { ParchmentControls } from "./ParchmentControls";

interface LeftSidebarProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  joyDivisionProps: JoyDivisionCassetteMorphProps;
  updateJoyDivisionProp: <K extends keyof JoyDivisionCassetteMorphProps>(
    key: K,
    val: JoyDivisionCassetteMorphProps[K]
  ) => void;
  cassetteProps: RetroCassetteIntroProps;
  updateCassetteProp: <K extends keyof RetroCassetteIntroProps>(
    key: K,
    val: RetroCassetteIntroProps[K]
  ) => void;
  lowerThirdProps: DocumentaryLowerThirdProps;
  updateLowerThirdProp: <K extends keyof DocumentaryLowerThirdProps>(
    key: K,
    val: DocumentaryLowerThirdProps[K]
  ) => void;
  voidProps: MinimalVoidParticlesProps;
  updateVoidProp: <K extends keyof MinimalVoidParticlesProps>(
    key: K,
    val: MinimalVoidParticlesProps[K]
  ) => void;
  setVoidProps?: (props: MinimalVoidParticlesProps) => void;
  particlesProps: CinematicParticlesBackgroundProps;
  updateParticlesProp: <K extends keyof CinematicParticlesBackgroundProps>(
    key: K,
    val: CinematicParticlesBackgroundProps[K]
  ) => void;
  parchmentProps: DarkParchmentBackgroundProps;
  updateParchmentProp: <K extends keyof DarkParchmentBackgroundProps>(
    key: K,
    val: DarkParchmentBackgroundProps[K]
  ) => void;
  durationFrames: number;
  setDurationFrames: (frames: number) => void;
  fps: number;
}

type OverlayTabType = "content" | "themes" | "physics";

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  joyDivisionProps,
  updateJoyDivisionProp,
  cassetteProps,
  updateCassetteProp,
  lowerThirdProps,
  updateLowerThirdProp,
  voidProps,
  updateVoidProp,
  setVoidProps,
  particlesProps,
  updateParticlesProp,
  parchmentProps,
  updateParchmentProp,
  durationFrames,
  setDurationFrames,
  fps,
}) => {
  const [activeOverlayTab, setActiveOverlayTab] = useState<OverlayTabType>("content");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isIntroCategory =
    selectedTemplateId === "joy-division-cassette-morph" ||
    selectedTemplateId === "retro-cassette-intro";

  const isBackgroundCategory =
    selectedTemplateId === "minimal-void-particles" ||
    selectedTemplateId === "minimal-void-glow" ||
    selectedTemplateId === "minimal-void-stardust" ||
    selectedTemplateId === "cinematic-particles-background" ||
    selectedTemplateId === "dark-parchment-background";

  const isVoidCategory =
    selectedTemplateId === "minimal-void-particles" ||
    selectedTemplateId === "minimal-void-glow" ||
    selectedTemplateId === "minimal-void-stardust";

  // Upload handler for portrait / photo cutout in Lower Third
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    updateLowerThirdProp("photoUrl", localUrl);

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
          updateLowerThirdProp("photoUrl", data.url);
        }
      }
    } catch (err) {
      console.warn("Upload fallback to local URL:", err);
    }
  };

  return (
    <aside className="w-96 h-full bg-[#101016] border-r border-white/10 flex flex-col z-20 flex-shrink-0">
      {/* Template & Category Selector Banner */}
      <div className="p-4 border-b border-white/10 bg-[#13131c] space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
            Wybór Sekcji & Szablonu
          </label>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
            {isIntroCategory
              ? "SEKCJA: INTRO"
              : isBackgroundCategory
              ? "SEKCJA: TŁO"
              : "SEKCJA: NAKŁADKA"}
          </span>
        </div>

        {/* Category switcher pills (3 Sekcje: Intro, Tła, Nakładki) */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#0c0c12] rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => onSelectTemplate("joy-division-cassette-morph")}
            className={`py-2 px-1 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isIntroCategory
                ? "bg-amber-500 text-black shadow-md font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Intro</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTemplate("minimal-void-particles")}
            className={`py-2 px-1 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isBackgroundCategory
                ? "bg-amber-500 text-black shadow-md font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Tła</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTemplate("documentary-lower-third")}
            className={`py-2 px-1 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
              !isIntroCategory && !isBackgroundCategory
                ? "bg-amber-500 text-black shadow-md font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Nakładki</span>
          </button>
        </div>

        {/* When in Intro Category: 2-way template selector */}
        {isIntroCategory && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center justify-between">
              <span>Wybór Szablonu Intro:</span>
              <span className="text-amber-400 font-bold">2 Animacje</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {/* Option 1: Joy Division 25 Kaset */}
              <button
                type="button"
                onClick={() => onSelectTemplate("joy-division-cassette-morph")}
                className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedTemplateId === "joy-division-cassette-morph"
                    ? "bg-amber-500/20 border-amber-500/70 shadow text-amber-300 font-bold"
                    : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400 hover:text-white"
                }`}
                title="25 kaset w białym outline przeistacza się w okładkę Joy Division Unknown Pleasures"
              >
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] leading-tight font-bold">25 Kaset → Joy Div</span>
                <span className="text-[8px] font-mono text-zinc-400">Pulsar Wave</span>
              </button>

              {/* Option 2: Retro Kaseta & Podpis */}
              <button
                type="button"
                onClick={() => onSelectTemplate("retro-cassette-intro")}
                className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedTemplateId === "retro-cassette-intro"
                    ? "bg-amber-500/20 border-amber-500/70 shadow text-amber-300 font-bold"
                    : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Vintage kaseta z kręcącymi się szpulkami i długopisem podpisującym tytuł"
              >
                <Disc className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] leading-tight font-bold">Kaseta & Podpis</span>
                <span className="text-[8px] font-mono text-zinc-400">Długopis BiC</span>
              </button>
            </div>
          </div>
        )}

        {/* When in Background Category: 3 versions selector */}
        {isBackgroundCategory && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center justify-between">
              <span>Wersje z cząsteczkami:</span>
              <span className="text-emerald-400 font-bold">3 Wersje</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {/* Option 1: Pitch Black */}
              <button
                type="button"
                onClick={() => onSelectTemplate("minimal-void-particles")}
                className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedTemplateId === "minimal-void-particles"
                    ? "bg-amber-500/20 border-amber-500/70 shadow text-amber-300 font-bold"
                    : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Wersja 1: 100% Czysta Czerń #000000 - zero gradientu, zero bandingu"
              >
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] leading-tight font-bold">1. Czerń</span>
                <span className="text-[8px] font-mono text-emerald-400">Zero Banding</span>
              </button>

              {/* Option 2: Minimal Glow */}
              <button
                type="button"
                onClick={() => onSelectTemplate("minimal-void-glow")}
                className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedTemplateId === "minimal-void-glow"
                    ? "bg-amber-500/20 border-amber-500/70 shadow text-amber-300 font-bold"
                    : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Wersja 2: Subtelny Antracyt - minimalna poświata ~3.5%"
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] leading-tight font-bold">2. Antracyt</span>
                <span className="text-[8px] font-mono text-blue-400">Min Glow</span>
              </button>

              {/* Option 3: Star Dust 3D */}
              <button
                type="button"
                onClick={() => onSelectTemplate("minimal-void-stardust")}
                className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-0.5 ${
                  selectedTemplateId === "minimal-void-stardust"
                    ? "bg-amber-500/20 border-amber-500/70 shadow text-amber-300 font-bold"
                    : "bg-[#181822] hover:bg-[#20202e] border-white/5 text-zinc-400 hover:text-white"
                }`}
                title="Wersja 3: Gwiezdny Pył 3D - głębia z mikro-cząsteczek bez gradientu"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] leading-tight font-bold">3. Pył 3D</span>
                <span className="text-[8px] font-mono text-purple-400">Dual-Layer</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BODY CONTENT DEPENDING ON TEMPLATE TYPE */}
      {selectedTemplateId === "joy-division-cassette-morph" ? (
        /* ================= 0A. JOY DIVISION 25 KASET MORPH CONTROLS ================= */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <JoyDivisionControls
            props={joyDivisionProps}
            updateProp={updateJoyDivisionProp}
            durationFrames={durationFrames}
            setDurationFrames={setDurationFrames}
            fps={fps}
          />
        </div>
      ) : selectedTemplateId === "retro-cassette-intro" ? (
        /* ================= 0B. RETRO CASSETTE INTRO CONTROLS ================= */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <CassetteIntroControls
            props={cassetteProps}
            updateProp={updateCassetteProp}
            durationFrames={durationFrames}
            setDurationFrames={setDurationFrames}
            fps={fps}
          />
        </div>
      ) : isVoidCategory ? (
        /* ================= 1. MINIMAL VOID PARTICLES CONTROLS (3 WERSJE) ================= */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <VoidControls
            props={voidProps}
            updateProp={updateVoidProp}
            applyFullProps={setVoidProps}
            durationFrames={durationFrames}
            setDurationFrames={setDurationFrames}
            fps={fps}
          />
        </div>
      ) : selectedTemplateId === "dark-parchment-background" ? (
        /* ================= 2. DARK PARCHMENT CONTROLS ================= */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <ParchmentControls
            props={parchmentProps}
            updateProp={updateParchmentProp}
            durationFrames={durationFrames}
            setDurationFrames={setDurationFrames}
            fps={fps}
          />
        </div>
      ) : selectedTemplateId === "cinematic-particles-background" ? (
        /* ================= 3. PARTICLES GRADIENT CONTROLS ================= */
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <ParticlesControls
            props={particlesProps}
            updateProp={updateParticlesProp}
            durationFrames={durationFrames}
            setDurationFrames={setDurationFrames}
            fps={fps}
          />
        </div>
      ) : (
        /* ================= 4. OVERLAY LOWER THIRD CONTROLS ================= */
        <>
          {/* Overlay Navigation Tabs */}
          <div className="flex items-center border-b border-white/10 bg-[#0e0e14] px-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveOverlayTab("content")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-all ${
                activeOverlayTab === "content"
                  ? "border-amber-500 text-amber-400 font-bold bg-white/[0.02]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Wsad</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveOverlayTab("themes")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-all ${
                activeOverlayTab === "themes"
                  ? "border-amber-500 text-amber-400 font-bold bg-white/[0.02]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Styl</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveOverlayTab("physics")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium border-b-2 transition-all ${
                activeOverlayTab === "physics"
                  ? "border-amber-500 text-amber-400 font-bold bg-white/[0.02]"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Fizyka</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeOverlayTab === "content" && (
              <div className="space-y-4 animate-in fade-in">
                {/* Style Variant Selector */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Wariant Stylistyczny
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "dossier", label: "Akt / Dossier" },
                      { id: "modern-minimal", label: "Vox / Minimal" },
                      { id: "technical-hud", label: "HUD / Intel" },
                    ].map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => updateLowerThirdProp("styleVariant", v.id as any)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          lowerThirdProps.styleVariant === v.id
                            ? "bg-amber-500 text-black font-bold shadow-sm"
                            : "bg-[#181822] hover:bg-[#20202e] text-zinc-300 border border-white/5"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-amber-400" />
                    <span>Tytuł Główny / Nazwisko</span>
                  </label>
                  <input
                    type="text"
                    value={lowerThirdProps.title}
                    onChange={(e) => updateLowerThirdProp("title", e.target.value)}
                    className="w-full studio-input text-xs font-semibold"
                    placeholder="np. DR. J. ROBERT OPPENHEIMER"
                  />
                </div>

                {/* Subtitle Input */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-amber-400" />
                    <span>Podtytuł / Rola / Opis</span>
                  </label>
                  <input
                    type="text"
                    value={lowerThirdProps.subtitle}
                    onChange={(e) => updateLowerThirdProp("subtitle", e.target.value)}
                    className="w-full studio-input text-xs"
                    placeholder="np. Dyrektor Laboratorium Los Alamos (1943–1945)"
                  />
                </div>

                {/* Badge Tag Input */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>Znacznik Archiwalny</span>
                  </label>
                  <input
                    type="text"
                    value={lowerThirdProps.badgeText}
                    onChange={(e) => updateLowerThirdProp("badgeText", e.target.value)}
                    className="w-full studio-input text-xs font-mono"
                    placeholder="np. ARCHIVAL RECORD #0492 // MANHATTAN PROJECT"
                  />
                </div>

                {/* Date & Location Input */}
                <div>
                  <label className="block text-[11px] text-zinc-300 font-medium mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Data & Miejsce</span>
                  </label>
                  <input
                    type="text"
                    value={lowerThirdProps.dateLocation}
                    onChange={(e) => updateLowerThirdProp("dateLocation", e.target.value)}
                    className="w-full studio-input text-xs font-mono"
                    placeholder="np. JULY 16, 1945 • WHITE SANDS PROVING GROUND"
                  />
                </div>

                {/* Photo / Cutout Upload Section */}
                <div className="pt-2 border-t border-white/10">
                  <label className="block text-[11px] text-zinc-300 font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-amber-400" />
                      Portret / Zdjęcie archiwalne
                    </span>
                    {lowerThirdProps.photoUrl && (
                      <button
                        type="button"
                        onClick={() => updateLowerThirdProp("photoUrl", "")}
                        className="text-[10px] text-red-400 hover:underline"
                      >
                        Usuń zdjęcie
                      </button>
                    )}
                  </label>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 rounded-xl border border-dashed border-white/20 hover:border-amber-500/50 bg-[#161622]/60 hover:bg-[#1b1b2a] transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-amber-500/10 text-zinc-400 group-hover:text-amber-400 flex items-center justify-center transition-colors mb-1.5">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-medium text-white group-hover:text-amber-300">
                      {lowerThirdProps.photoUrl ? "Zmień zdjęcie" : "Przeciągnij zdjęcie lub kliknij"}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      PNG, JPG lub WebP
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  {lowerThirdProps.photoUrl && (
                    <div className="mt-3">
                      <span className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">
                        Kształt ramki portretu:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        {(["rounded-rect", "circle", "stamp"] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => updateLowerThirdProp("photoShape", s)}
                            className={`py-1 rounded text-xs transition-all ${
                              lowerThirdProps.photoShape === s
                                ? "bg-amber-500 text-black font-bold"
                                : "bg-[#181822] text-zinc-400 hover:text-white"
                            }`}
                          >
                            {s === "rounded-rect" ? "Zaokrąglony" : s === "circle" ? "Koło" : "Znaczek"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeOverlayTab === "themes" && (
              <div className="animate-in fade-in">
                <ColorThemePicker
                  currentThemeId={lowerThirdProps.themeId}
                  onSelectTheme={(id) => updateLowerThirdProp("themeId", id)}
                  customPrimary={lowerThirdProps.customPrimary}
                  setCustomPrimary={(col) => updateLowerThirdProp("customPrimary", col)}
                  customSecondary={lowerThirdProps.customSecondary}
                  setCustomSecondary={(col) => updateLowerThirdProp("customSecondary", col)}
                  customCardBg={lowerThirdProps.customCardBg}
                  setCustomCardBg={(col) => updateLowerThirdProp("customCardBg", col)}
                  showScanline={lowerThirdProps.showScanline}
                  setShowScanline={(val) => updateLowerThirdProp("showScanline", val)}
                  showCrosshair={lowerThirdProps.showCrosshair}
                  setShowCrosshair={(val) => updateLowerThirdProp("showCrosshair", val)}
                />
              </div>
            )}

            {activeOverlayTab === "physics" && (
              <div className="animate-in fade-in">
                <PhysicsControls
                  damping={lowerThirdProps.springDamping}
                  setDamping={(val) => updateLowerThirdProp("springDamping", val)}
                  stiffness={lowerThirdProps.springStiffness}
                  setStiffness={(val) => updateLowerThirdProp("springStiffness", val)}
                  mass={lowerThirdProps.springMass}
                  setMass={(val) => updateLowerThirdProp("springMass", val)}
                  scale={lowerThirdProps.scale}
                  setScale={(val) => updateLowerThirdProp("scale", val)}
                  offsetX={lowerThirdProps.offsetX}
                  setOffsetX={(val) => updateLowerThirdProp("offsetX", val)}
                  offsetY={lowerThirdProps.offsetY}
                  setOffsetY={(val) => updateLowerThirdProp("offsetY", val)}
                  durationFrames={durationFrames}
                  setDurationFrames={setDurationFrames}
                  fps={fps}
                />
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
};
