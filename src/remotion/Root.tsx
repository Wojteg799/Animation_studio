import React from "react";
import { Composition } from "remotion";
import { JoyDivisionCassetteMorph } from "./templates/JoyDivisionCassetteMorph";
import {
  JoyDivisionCassetteMorphProps,
  defaultJoyDivisionCassetteMorphProps,
} from "./templates/JoyDivisionCassetteMorph/schema";
import { RetroCassetteIntro } from "./templates/RetroCassetteIntro";
import {
  RetroCassetteIntroProps,
  defaultRetroCassetteIntroProps,
} from "./templates/RetroCassetteIntro/schema";
import { DocumentaryLowerThird } from "./templates/DocumentaryLowerThird";
import {
  DocumentaryLowerThirdProps,
  defaultDocumentaryLowerThirdProps,
} from "./templates/DocumentaryLowerThird/schema";
import { MinimalVoidParticles } from "./templates/MinimalVoidParticles";
import {
  MinimalVoidParticlesProps,
  defaultMinimalVoidParticlesProps,
} from "./templates/MinimalVoidParticles/schema";
import { CinematicParticlesBackground } from "./templates/CinematicParticlesBackground";
import {
  CinematicParticlesBackgroundProps,
  defaultCinematicParticlesBackgroundProps,
} from "./templates/CinematicParticlesBackground/schema";
import { DarkParchmentBackground } from "./templates/DarkParchmentBackground";
import {
  DarkParchmentBackgroundProps,
  defaultDarkParchmentBackgroundProps,
} from "./templates/DarkParchmentBackground/schema";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 0. SEKCJA: JOY DIVISION 25 KASET -> UNKNOWN PLEASURES */}
      <Composition
        id="JoyDivisionCassetteMorph"
        component={JoyDivisionCassetteMorph}
        durationInFrames={240} // 8 sekund przy 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultJoyDivisionCassetteMorphProps}
        calculateMetadata={async ({ props }) => {
          const customProps = props as JoyDivisionCassetteMorphProps & {
            videoWidth?: number;
            videoHeight?: number;
            customFps?: number;
            customDuration?: number;
          };
          return {
            width: customProps.videoWidth || 1920,
            height: customProps.videoHeight || 1080,
            fps: customProps.customFps || 30,
            durationInFrames: customProps.customDuration || 240,
            props: customProps,
          };
        }}
      />

      <Composition
        id="JoyDivisionCassetteMorph-4K"
        component={JoyDivisionCassetteMorph}
        durationInFrames={240}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          ...defaultJoyDivisionCassetteMorphProps,
          lineWidth: 3.2,
        }}
      />

      <Composition
        id="JoyDivisionCassetteMorph-Shorts"
        component={JoyDivisionCassetteMorph}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultJoyDivisionCassetteMorphProps,
          initialLayout: "vertical-stack",
          lineWidth: 2.2,
        }}
      />

      {/* 1. SEKCJA INTRO: Retro Kaseta Magnetofonowa & Pismo Odręczne */}
      <Composition
        id="RetroCassetteIntro"
        component={RetroCassetteIntro}
        durationInFrames={210} // 7 sekund przy 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultRetroCassetteIntroProps}
        calculateMetadata={async ({ props }) => {
          const customProps = props as RetroCassetteIntroProps & {
            videoWidth?: number;
            videoHeight?: number;
            customFps?: number;
            customDuration?: number;
          };
          return {
            width: customProps.videoWidth || 1920,
            height: customProps.videoHeight || 1080,
            fps: customProps.customFps || 30,
            durationInFrames: customProps.customDuration || 210,
            props: customProps,
          };
        }}
      />

      <Composition
        id="RetroCassetteIntro-4K"
        component={RetroCassetteIntro}
        durationInFrames={210}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          ...defaultRetroCassetteIntroProps,
          scale: 1.8,
        }}
      />

      <Composition
        id="RetroCassetteIntro-Shorts"
        component={RetroCassetteIntro}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultRetroCassetteIntroProps,
          scale: 0.8,
        }}
      />

      {/* 2. SEKCJA TŁA: Czysta Kinowa Czerń & Cząsteczki (Zero Banding, Velvet Void) */}
      <Composition
        id="MinimalVoidParticles"
        component={MinimalVoidParticles}
        durationInFrames={3600} // 2 minuty przy 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultMinimalVoidParticlesProps}
        calculateMetadata={async ({ props }) => {
          const customProps = props as MinimalVoidParticlesProps & {
            videoWidth?: number;
            videoHeight?: number;
            customFps?: number;
            customDuration?: number;
          };
          return {
            width: customProps.videoWidth || 1920,
            height: customProps.videoHeight || 1080,
            fps: customProps.customFps || 30,
            durationInFrames: customProps.customDuration || 3600,
            props: customProps,
          };
        }}
      />

      <Composition
        id="MinimalVoidParticles-4K"
        component={MinimalVoidParticles}
        durationInFrames={3600}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          ...defaultMinimalVoidParticlesProps,
          particleSize: 1.8,
        }}
      />

      <Composition
        id="MinimalVoidParticles-Shorts"
        component={MinimalVoidParticles}
        durationInFrames={3600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultMinimalVoidParticlesProps,
          particleCount: 65,
        }}
      />

      {/* 3. SEKCJA TŁA: Ciemny Papier Archiwalny & Kurz */}
      <Composition
        id="DarkParchmentBackground"
        component={DarkParchmentBackground}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultDarkParchmentBackgroundProps}
        calculateMetadata={async ({ props }) => {
          const customProps = props as DarkParchmentBackgroundProps & {
            videoWidth?: number;
            videoHeight?: number;
            customFps?: number;
            customDuration?: number;
          };
          return {
            width: customProps.videoWidth || 1920,
            height: customProps.videoHeight || 1080,
            fps: customProps.customFps || 30,
            durationInFrames: customProps.customDuration || 3600,
            props: customProps,
          };
        }}
      />

      <Composition
        id="DarkParchmentBackground-4K"
        component={DarkParchmentBackground}
        durationInFrames={3600}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          ...defaultDarkParchmentBackgroundProps,
          dustSize: 1.8,
        }}
      />

      <Composition
        id="DarkParchmentBackground-Shorts"
        component={DarkParchmentBackground}
        durationInFrames={3600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultDarkParchmentBackgroundProps,
          dustCount: 45,
        }}
      />

      {/* 4. SEKCJA TŁA: Czarne Tło z Gradientem & Cząsteczkami */}
      <Composition
        id="CinematicParticlesBackground"
        component={CinematicParticlesBackground}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultCinematicParticlesBackgroundProps}
        calculateMetadata={async ({ props }) => {
          const customProps = props as CinematicParticlesBackgroundProps & {
            videoWidth?: number;
            videoHeight?: number;
            customFps?: number;
            customDuration?: number;
          };
          return {
            width: customProps.videoWidth || 1920,
            height: customProps.videoHeight || 1080,
            fps: customProps.customFps || 30,
            durationInFrames: customProps.customDuration || 3600,
            props: customProps,
          };
        }}
      />

      <Composition
        id="CinematicParticlesBackground-4K"
        component={CinematicParticlesBackground}
        durationInFrames={3600}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          ...defaultCinematicParticlesBackgroundProps,
          particleSize: 1.8,
        }}
      />

      <Composition
        id="CinematicParticlesBackground-Shorts"
        component={CinematicParticlesBackground}
        durationInFrames={3600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultCinematicParticlesBackgroundProps,
          particleCount: 65,
        }}
      />

      {/* 5. SEKCJA NAKŁADKI: Archival Dossier / Lower Third (Alpha Channel) */}
      <Composition
        id="DocumentaryLowerThird"
        component={DocumentaryLowerThird}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultDocumentaryLowerThirdProps}
        calculateMetadata={async ({ props }) => {
          const customProps = props as DocumentaryLowerThirdProps & {
            videoWidth?: number;
            videoHeight?: number;
            customFps?: number;
            customDuration?: number;
          };
          return {
            width: customProps.videoWidth || 1920,
            height: customProps.videoHeight || 1080,
            fps: customProps.customFps || 30,
            durationInFrames: customProps.customDuration || 180,
            props: customProps,
          };
        }}
      />

      <Composition
        id="DocumentaryLowerThird-4K"
        component={DocumentaryLowerThird}
        durationInFrames={180}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          ...defaultDocumentaryLowerThirdProps,
          scale: 2.0,
          offsetX: 180,
          offsetY: 1560,
        }}
      />

      <Composition
        id="DocumentaryLowerThird-Shorts"
        component={DocumentaryLowerThird}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          ...defaultDocumentaryLowerThirdProps,
          scale: 0.85,
          offsetX: 60,
          offsetY: 1300,
        }}
      />
    </>
  );
};
