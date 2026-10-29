"use client";

import React, { useState, useCallback } from "react";
import { StudioHeader } from "../components/studio/StudioHeader";
import { LeftSidebar } from "../components/studio/LeftSidebar";
import { PreviewPlayer } from "../components/studio/PreviewPlayer";
import { RenderModal } from "../components/studio/RenderModal";
import { PresetManager } from "../components/studio/PresetManager";
import {
  JoyDivisionCassetteMorphProps,
  defaultJoyDivisionCassetteMorphProps,
} from "../remotion/templates/JoyDivisionCassetteMorph/schema";
import {
  RetroCassetteIntroProps,
  defaultRetroCassetteIntroProps,
} from "../remotion/templates/RetroCassetteIntro/schema";
import {
  DocumentaryLowerThirdProps,
  defaultDocumentaryLowerThirdProps,
} from "../remotion/templates/DocumentaryLowerThird/schema";
import {
  MinimalVoidParticlesProps,
  defaultMinimalVoidParticlesProps,
  presetPitchBlack,
  presetMinimalGlow,
  presetStarDust,
} from "../remotion/templates/MinimalVoidParticles/schema";
import {
  CinematicParticlesBackgroundProps,
  defaultCinematicParticlesBackgroundProps,
} from "../remotion/templates/CinematicParticlesBackground/schema";
import {
  DarkParchmentBackgroundProps,
  defaultDarkParchmentBackgroundProps,
} from "../remotion/templates/DarkParchmentBackground/schema";
import { AspectRatioType, RenderFormat } from "../lib/types";

export default function StudioPage() {
  // Domyślnie nowa animacja: Joy Division 25 Kaset -> Unknown Pleasures
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    "joy-division-cassette-morph"
  );
  const [resolution, setResolution] = useState<AspectRatioType>("16:9");
  const [fps, setFps] = useState<number>(30);
  const [durationFrames, setDurationFrames] = useState<number>(240); // 8 sekund dla Joy Division morph

  // Props for templates
  const [joyDivisionProps, setJoyDivisionProps] = useState<JoyDivisionCassetteMorphProps>(
    defaultJoyDivisionCassetteMorphProps
  );
  const [cassetteProps, setCassetteProps] = useState<RetroCassetteIntroProps>(
    defaultRetroCassetteIntroProps
  );
  const [lowerThirdProps, setLowerThirdProps] = useState<DocumentaryLowerThirdProps>(
    defaultDocumentaryLowerThirdProps
  );
  const [voidProps, setVoidProps] = useState<MinimalVoidParticlesProps>(
    defaultMinimalVoidParticlesProps
  );
  const [particlesProps, setParticlesProps] = useState<CinematicParticlesBackgroundProps>(
    defaultCinematicParticlesBackgroundProps
  );
  const [parchmentProps, setParchmentProps] = useState<DarkParchmentBackgroundProps>(
    defaultDarkParchmentBackgroundProps
  );

  // Modals state
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  // Switch template category and adjust duration / props accordingly
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);

    const isBackground =
      templateId === "minimal-void-particles" ||
      templateId === "minimal-void-glow" ||
      templateId === "minimal-void-stardust" ||
      templateId === "cinematic-particles-background" ||
      templateId === "dark-parchment-background";

    if (templateId === "joy-division-cassette-morph") {
      setDurationFrames(240); // 8 seconds @ 30fps
    } else if (templateId === "retro-cassette-intro") {
      setDurationFrames(210); // 7 seconds @ 30fps
    } else if (isBackground) {
      setDurationFrames(3600); // 2 minutes (120s * 30fps)
      if (templateId === "minimal-void-particles") {
        setVoidProps(presetPitchBlack);
      } else if (templateId === "minimal-void-glow") {
        setVoidProps(presetMinimalGlow);
      } else if (templateId === "minimal-void-stardust") {
        setVoidProps(presetStarDust);
      }
    } else {
      setDurationFrames(180); // 6 seconds for lower thirds
    }
  };

  // Update a single prop for Joy Division Cassette Morph
  const updateJoyDivisionProp = useCallback(
    <K extends keyof JoyDivisionCassetteMorphProps>(
      key: K,
      val: JoyDivisionCassetteMorphProps[K]
    ) => {
      setJoyDivisionProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Retro Cassette Intro
  const updateCassetteProp = useCallback(
    <K extends keyof RetroCassetteIntroProps>(
      key: K,
      val: RetroCassetteIntroProps[K]
    ) => {
      setCassetteProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Lower Third
  const updateLowerThirdProp = useCallback(
    <K extends keyof DocumentaryLowerThirdProps>(
      key: K,
      val: DocumentaryLowerThirdProps[K]
    ) => {
      setLowerThirdProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Minimal Void Particles (3 Versions)
  const updateVoidProp = useCallback(
    <K extends keyof MinimalVoidParticlesProps>(
      key: K,
      val: MinimalVoidParticlesProps[K]
    ) => {
      setVoidProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Legacy Particles Background
  const updateParticlesProp = useCallback(
    <K extends keyof CinematicParticlesBackgroundProps>(
      key: K,
      val: CinematicParticlesBackgroundProps[K]
    ) => {
      setParticlesProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Legacy Dark Parchment Background
  const updateParchmentProp = useCallback(
    <K extends keyof DarkParchmentBackgroundProps>(
      key: K,
      val: DarkParchmentBackgroundProps[K]
    ) => {
      setParchmentProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Apply a preset (for Lower Third)
  const handleApplyPreset = (presetProps: Partial<DocumentaryLowerThirdProps>) => {
    setLowerThirdProps((prev) => ({
      ...prev,
      ...presetProps,
    }));
  };

  // Start Render action
  const handleRender = async (format: RenderFormat = "prores4444") => {
    try {
      setIsRendering(true);

      let compositionId = "DocumentaryLowerThird";
      let inputProps: any = lowerThirdProps;

      if (selectedTemplateId === "joy-division-cassette-morph") {
        compositionId = "JoyDivisionCassetteMorph";
        inputProps = {
          ...defaultJoyDivisionCassetteMorphProps,
          ...joyDivisionProps,
        };
      } else if (selectedTemplateId === "retro-cassette-intro") {
        compositionId = "RetroCassetteIntro";
        inputProps = cassetteProps;
      } else if (
        selectedTemplateId === "minimal-void-particles" ||
        selectedTemplateId === "minimal-void-glow" ||
        selectedTemplateId === "minimal-void-stardust"
      ) {
        compositionId = "MinimalVoidParticles";
        inputProps = voidProps;
      } else if (selectedTemplateId === "dark-parchment-background") {
        compositionId = "DarkParchmentBackground";
        inputProps = parchmentProps;
      } else if (selectedTemplateId === "cinematic-particles-background") {
        compositionId = "CinematicParticlesBackground";
        inputProps = particlesProps;
      }

      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          resolution,
          fps,
          compositionId,
          inputProps,
          customDuration: durationFrames,
        }),
      });

      const data = await res.json();
      if (data.success && data.jobId) {
        setActiveJobId(data.jobId);
        setIsRenderModalOpen(true);
      } else {
        alert("Błąd podczas uruchamiania renderu: " + (data.error || "Nieznany błąd"));
      }
    } catch (err: any) {
      alert("Błąd połączenia z API: " + err.message);
    } finally {
      setIsRendering(false);
    }
  };

  const isVoidTemplate =
    selectedTemplateId === "minimal-void-particles" ||
    selectedTemplateId === "minimal-void-glow" ||
    selectedTemplateId === "minimal-void-stardust";

  const activeProps =
    selectedTemplateId === "joy-division-cassette-morph"
      ? joyDivisionProps
      : selectedTemplateId === "retro-cassette-intro"
      ? cassetteProps
      : isVoidTemplate
      ? voidProps
      : selectedTemplateId === "dark-parchment-background"
      ? parchmentProps
      : selectedTemplateId === "cinematic-particles-background"
      ? particlesProps
      : lowerThirdProps;

  const isCurrentBackground =
    selectedTemplateId === "minimal-void-particles" ||
    selectedTemplateId === "minimal-void-glow" ||
    selectedTemplateId === "minimal-void-stardust" ||
    selectedTemplateId === "cinematic-particles-background" ||
    selectedTemplateId === "dark-parchment-background";

  return (
    <div className="h-screen w-screen flex flex-col bg-[#09090b] text-white overflow-hidden select-none">
      {/* Studio Navigation & Export Header */}
      <StudioHeader
        resolution={resolution}
        setResolution={setResolution}
        fps={fps}
        setFps={setFps}
        onRender={handleRender}
        isRendering={isRendering}
        onOpenPresets={() => setIsPresetModalOpen(true)}
        isBackground={isCurrentBackground}
      />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Control Sidebar */}
        <LeftSidebar
          selectedTemplateId={selectedTemplateId}
          onSelectTemplate={handleSelectTemplate}
          joyDivisionProps={joyDivisionProps}
          updateJoyDivisionProp={updateJoyDivisionProp}
          cassetteProps={cassetteProps}
          updateCassetteProp={updateCassetteProp}
          lowerThirdProps={lowerThirdProps}
          updateLowerThirdProp={updateLowerThirdProp}
          voidProps={voidProps}
          updateVoidProp={updateVoidProp}
          setVoidProps={setVoidProps}
          particlesProps={particlesProps}
          updateParticlesProp={updateParticlesProp}
          parchmentProps={parchmentProps}
          updateParchmentProp={updateParchmentProp}
          durationFrames={durationFrames}
          setDurationFrames={setDurationFrames}
          fps={fps}
        />

        {/* Center Live Remotion Canvas */}
        <PreviewPlayer
          templateId={selectedTemplateId}
          props={activeProps}
          resolution={resolution}
          fps={fps}
          durationFrames={durationFrames}
        />
      </div>

      {/* Preset Manager Modal (for Lower Thirds) */}
      <PresetManager
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        currentProps={lowerThirdProps}
        onApplyPreset={handleApplyPreset}
      />

      {/* Real-time Render Progress & ProRes Download Modal */}
      <RenderModal
        isOpen={isRenderModalOpen}
        onClose={() => setIsRenderModalOpen(false)}
        jobId={activeJobId}
      />
    </div>
  );
}
