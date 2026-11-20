"use client";

import React, { useState, useCallback } from "react";
import { StudioHeader } from "../components/studio/StudioHeader";
import { LeftSidebar } from "../components/studio/LeftSidebar";
import { PreviewPlayer } from "../components/studio/PreviewPlayer";
import { RenderModal } from "../components/studio/RenderModal";
import { PresetManager } from "../components/studio/PresetManager";
import {
  AnimatedPhotoFrameProps,
  defaultAnimatedPhotoFrameProps,
} from "../remotion/templates/AnimatedPhotoFrame/schema";
import {
  CharacterStageProps,
  defaultCharacterStageProps,
} from "../remotion/templates/CharacterStage/schema";
import {
  DariusRadioStoryProps,
  defaultDariusRadioStoryProps,
} from "../remotion/templates/DariusRadioStory/schema";
import {
  DariusInternetQuestProps,
  defaultDariusInternetQuestProps,
} from "../remotion/templates/DariusInternetQuest/schema";
import {
  AntonRiedelProps,
  defaultAntonRiedelProps,
} from "../remotion/templates/AntonRiedel/schema";
import {
  LydiaProps,
  defaultLydiaProps,
} from "../remotion/templates/Lydia/schema";
import {
  GabaskinsQuestProps,
  defaultGabaskinsQuestProps,
} from "../remotion/templates/GabaskinsQuest/schema";
import {
  GabrielPaulFacebookProps,
  defaultGabrielPaulFacebookProps,
} from "../remotion/templates/GabrielPaulFacebook/schema";
import {
  InvestigationBreakthroughProps,
  defaultInvestigationBreakthroughProps,
} from "../remotion/templates/InvestigationBreakthrough/schema";
import {
  MusicForumScrollProps,
  defaultMusicForumScrollProps,
  defaultMusicForum2007XPProps,
} from "../remotion/templates/MusicForumScroll/schema";
import {
  JoyDivisionCassetteMorphProps,
  defaultJoyDivisionCassetteMorphProps,
} from "../remotion/templates/JoyDivisionCassetteMorph/schema";
import {
  SingleCassetteProps,
  defaultSingleCassetteProps,
} from "../remotion/templates/SingleCassette/schema";
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
  // Domyślnie animacja: Darius i Lydia 1 (Prezent & Domena)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    "darius-internet-quest"
  );
  const [resolution, setResolution] = useState<AspectRatioType>("16:9");
  const [fps, setFps] = useState<number>(30);
  const [durationFrames, setDurationFrames] = useState<number>(360); // 12 sekund dla Darius & Lydia

  // Props for templates
  const [photoFrameProps, setPhotoFrameProps] = useState<AnimatedPhotoFrameProps>(
    defaultAnimatedPhotoFrameProps
  );
  const [characterStageProps, setCharacterStageProps] = useState<CharacterStageProps>(
    defaultCharacterStageProps
  );
  const [dariusProps, setDariusProps] = useState<DariusRadioStoryProps>(
    defaultDariusRadioStoryProps
  );
  const [dariusQuestProps, setDariusQuestProps] = useState<DariusInternetQuestProps>(
    defaultDariusInternetQuestProps
  );
  const [antonProps, setAntonProps] = useState<AntonRiedelProps>(
    defaultAntonRiedelProps
  );
  const [lydiaProps, setLydiaProps] = useState<LydiaProps>(
    defaultLydiaProps
  );
  const [gabaskinsProps, setGabaskinsProps] = useState<GabaskinsQuestProps>(
    defaultGabaskinsQuestProps
  );
  const [gabrielPaulProps, setGabrielPaulProps] = useState<GabrielPaulFacebookProps>(
    defaultGabrielPaulFacebookProps
  );
  const [breakthroughProps, setBreakthroughProps] = useState<InvestigationBreakthroughProps>(
    defaultInvestigationBreakthroughProps
  );
  const [musicForumProps, setMusicForumProps] = useState<MusicForumScrollProps>(
    defaultMusicForumScrollProps
  );
  const [joyDivisionProps, setJoyDivisionProps] = useState<JoyDivisionCassetteMorphProps>(
    defaultJoyDivisionCassetteMorphProps
  );
  const [singleCassetteProps, setSingleCassetteProps] = useState<SingleCassetteProps>(
    defaultSingleCassetteProps
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

      if (templateId === "animated-photo-frame") {
        setDurationFrames(240); // 8 seconds @ 30fps
      } else if (templateId === "music-forum-scroll") {
        setDurationFrames(240); // 8 seconds @ 30fps
        setMusicForumProps((prev) => ({ ...prev, forumThemeVariant: "modern-dark" }));
      } else if (templateId === "music-forum-2007-xp") {
        setDurationFrames(240); // 8 seconds @ 30fps
        setMusicForumProps((prev) => ({ ...prev, forumThemeVariant: "retro-xp-2007" }));
      } else if (templateId === "character-stage") {
        setDurationFrames(240); // 8 seconds @ 30fps
      } else if (templateId === "darius-radio-story") {
        setDurationFrames(dariusProps.durationInFrames || 360);
      } else if (templateId === "darius-internet-quest") {
        setDurationFrames(dariusQuestProps.durationInFrames || 360);
      } else if (templateId === "anton-riedel") {
        setDurationFrames(antonProps.durationInFrames || 180);
      } else if (templateId === "lydia") {
        setDurationFrames(lydiaProps.durationInFrames || 180);
      } else if (templateId === "gabaskins-quest") {
        setDurationFrames(gabaskinsProps.durationInFrames || 240);
      } else if (templateId === "gabriel-paul-facebook") {
        setDurationFrames(gabrielPaulProps.durationInFrames || 240);
      } else if (templateId === "investigation-breakthrough") {
        setDurationFrames(breakthroughProps.durationInFrames || 300);
      } else if (templateId === "joy-division-cassette-morph") {
        setDurationFrames(joyDivisionProps.durationInFrames || 240);
      } else if (templateId === "single-cassette") {
        setDurationFrames(singleCassetteProps.durationInFrames || 240);
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

    // Update a single prop for Animated Photo Frame
  const updatePhotoFrameProp = useCallback(
    <K extends keyof AnimatedPhotoFrameProps>(
      key: K,
      val: AnimatedPhotoFrameProps[K]
    ) => {
      setPhotoFrameProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Music Forum Scroll
  const updateMusicForumProp = useCallback(
    <K extends keyof MusicForumScrollProps>(
      key: K,
      val: MusicForumScrollProps[K]
    ) => {
      setMusicForumProps((prev) => ({
        ...prev,
        [key]: val,
      }));
    },
    []
  );

  // Update a single prop for Character Stage
    const updateCharacterStageProp = useCallback(
      <K extends keyof CharacterStageProps>(
        key: K,
        val: CharacterStageProps[K]
      ) => {
        setCharacterStageProps((prev) => ({
          ...prev,
          [key]: val,
        }));
      },
      []
    );

    // Update a single prop for Darius Radio Story
    const updateDariusProp = useCallback(
      <K extends keyof DariusRadioStoryProps>(
        key: K,
        val: DariusRadioStoryProps[K]
      ) => {
        setDariusProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Darius & Lydia Internet Quest
    const updateDariusQuestProp = useCallback(
      <K extends keyof DariusInternetQuestProps>(
        key: K,
        val: DariusInternetQuestProps[K]
      ) => {
        setDariusQuestProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Anton Riedel
    const updateAntonProp = useCallback(
      <K extends keyof AntonRiedelProps>(
        key: K,
        val: AntonRiedelProps[K]
      ) => {
        setAntonProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Lydia
    const updateLydiaProp = useCallback(
      <K extends keyof LydiaProps>(
        key: K,
        val: LydiaProps[K]
      ) => {
        setLydiaProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Gabaskins (Gabriel Vieira)
    const updateGabaskinsProp = useCallback(
      <K extends keyof GabaskinsQuestProps>(
        key: K,
        val: GabaskinsQuestProps[K]
      ) => {
        setGabaskinsProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Gabriel & Paul Baskerville
    const updateGabrielPaulProp = useCallback(
      <K extends keyof GabrielPaulFacebookProps>(
        key: K,
        val: GabrielPaulFacebookProps[K]
      ) => {
        setGabrielPaulProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Investigation Breakthrough (Darius, Lydia, Gabriel)
    const updateBreakthroughProp = useCallback(
      <K extends keyof InvestigationBreakthroughProps>(
        key: K,
        val: InvestigationBreakthroughProps[K]
      ) => {
        setBreakthroughProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

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
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
      },
      []
    );

    // Update a single prop for Single Cassette
    const updateSingleCassetteProp = useCallback(
      <K extends keyof SingleCassetteProps>(
        key: K,
        val: SingleCassetteProps[K]
      ) => {
        setSingleCassetteProps((prev) => ({
          ...prev,
          [key]: val,
        }));
        if (key === "durationInFrames" && typeof val === "number") {
          setDurationFrames(val);
        }
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

        if (selectedTemplateId === "animated-photo-frame") {
          compositionId = "AnimatedPhotoFrame";
          inputProps = {
            ...defaultAnimatedPhotoFrameProps,
            ...photoFrameProps,
          };
        } else if (selectedTemplateId === "music-forum-2007-xp") {
          compositionId = "MusicForum2007XP";
          inputProps = {
            ...defaultMusicForum2007XPProps,
            ...musicForumProps,
            forumThemeVariant: "retro-xp-2007",
          };
        } else if (selectedTemplateId === "music-forum-scroll") {
          compositionId = "MusicForumScroll";
          inputProps = {
            ...defaultMusicForumScrollProps,
            ...musicForumProps,
          };
        } else if (selectedTemplateId === "character-stage") {
            compositionId = "CharacterStage";
            inputProps = {
              ...defaultCharacterStageProps,
              ...characterStageProps,
            };
          } else if (selectedTemplateId === "darius-radio-story") {
            compositionId = "DariusRadioStory";
            inputProps = {
              ...defaultDariusRadioStoryProps,
              ...dariusProps,
            };
          } else if (selectedTemplateId === "darius-internet-quest") {
            compositionId = "DariusInternetQuest";
            inputProps = {
              ...defaultDariusInternetQuestProps,
              ...dariusQuestProps,
            };
          } else if (selectedTemplateId === "anton-riedel") {
            compositionId = "AntonRiedel";
            inputProps = {
              ...defaultAntonRiedelProps,
              ...antonProps,
            };
          } else if (selectedTemplateId === "lydia") {
            compositionId = "Lydia";
            inputProps = {
              ...defaultLydiaProps,
              ...lydiaProps,
            };
          } else if (selectedTemplateId === "gabaskins-quest") {
            compositionId = "GabaskinsQuest";
            inputProps = {
              ...defaultGabaskinsQuestProps,
              ...gabaskinsProps,
            };
          } else if (selectedTemplateId === "gabriel-paul-facebook") {
            compositionId = "GabrielPaulFacebook";
            inputProps = {
              ...defaultGabrielPaulFacebookProps,
              ...gabrielPaulProps,
            };
          } else if (selectedTemplateId === "investigation-breakthrough") {
            compositionId = "InvestigationBreakthrough";
            inputProps = {
              ...defaultInvestigationBreakthroughProps,
              ...breakthroughProps,
            };
          } else if (selectedTemplateId === "joy-division-cassette-morph") {
            compositionId = "JoyDivisionCassetteMorph";
            inputProps = {
              ...defaultJoyDivisionCassetteMorphProps,
              ...joyDivisionProps,
            };
          } else if (selectedTemplateId === "single-cassette") {
            compositionId = "SingleCassette";
            inputProps = {
              ...defaultSingleCassetteProps,
              ...singleCassetteProps,
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
        selectedTemplateId === "animated-photo-frame"
          ? photoFrameProps
          : selectedTemplateId === "music-forum-scroll" ||
            selectedTemplateId === "music-forum-2007-xp"
          ? musicForumProps
          : selectedTemplateId === "character-stage"
        ? characterStageProps
        : selectedTemplateId === "darius-radio-story"
          ? dariusProps
        : selectedTemplateId === "darius-internet-quest"
          ? dariusQuestProps
        : selectedTemplateId === "anton-riedel"
          ? antonProps
        : selectedTemplateId === "lydia"
          ? lydiaProps
        : selectedTemplateId === "gabaskins-quest"
          ? gabaskinsProps
        : selectedTemplateId === "gabriel-paul-facebook"
          ? gabrielPaulProps
        : selectedTemplateId === "investigation-breakthrough"
          ? breakthroughProps
        : selectedTemplateId === "joy-division-cassette-morph"
          ? joyDivisionProps
        : selectedTemplateId === "single-cassette"
          ? singleCassetteProps
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
              photoFrameProps={photoFrameProps}
              updatePhotoFrameProp={updatePhotoFrameProp}
              musicForumProps={musicForumProps}
              updateMusicForumProp={updateMusicForumProp}
              characterStageProps={characterStageProps}
              updateCharacterStageProp={updateCharacterStageProp}
              dariusProps={dariusProps}
              updateDariusProp={updateDariusProp}
              dariusQuestProps={dariusQuestProps}
              updateDariusQuestProp={updateDariusQuestProp}
              antonProps={antonProps}
              updateAntonProp={updateAntonProp}
              lydiaProps={lydiaProps}
              updateLydiaProp={updateLydiaProp}
              gabaskinsProps={gabaskinsProps}
              updateGabaskinsProp={updateGabaskinsProp}
              gabrielPaulProps={gabrielPaulProps}
              updateGabrielPaulProp={updateGabrielPaulProp}
              breakthroughProps={breakthroughProps}
              updateBreakthroughProp={updateBreakthroughProp}
              joyDivisionProps={joyDivisionProps}
              updateJoyDivisionProp={updateJoyDivisionProp}
              singleCassetteProps={singleCassetteProps}
              updateSingleCassetteProp={updateSingleCassetteProp}
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
              durationFrames={
                selectedTemplateId === "darius-radio-story" && dariusProps.durationInFrames
                  ? dariusProps.durationInFrames
                  : selectedTemplateId === "darius-internet-quest" && dariusQuestProps.durationInFrames
                  ? dariusQuestProps.durationInFrames
                  : selectedTemplateId === "anton-riedel" && antonProps.durationInFrames
                  ? antonProps.durationInFrames
                  : selectedTemplateId === "lydia" && lydiaProps.durationInFrames
                  ? lydiaProps.durationInFrames
                  : selectedTemplateId === "gabaskins-quest" && gabaskinsProps.durationInFrames
                  ? gabaskinsProps.durationInFrames
                  : selectedTemplateId === "gabriel-paul-facebook" && gabrielPaulProps.durationInFrames
                  ? gabrielPaulProps.durationInFrames
                  : selectedTemplateId === "investigation-breakthrough" && breakthroughProps.durationInFrames
                  ? breakthroughProps.durationInFrames
                  : selectedTemplateId === "joy-division-cassette-morph" && joyDivisionProps.durationInFrames
                  ? joyDivisionProps.durationInFrames
                  : selectedTemplateId === "single-cassette" && singleCassetteProps.durationInFrames
                  ? singleCassetteProps.durationInFrames
                  : durationFrames
              }
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
