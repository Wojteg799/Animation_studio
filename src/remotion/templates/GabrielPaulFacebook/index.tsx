import React from "react";
import { useCurrentFrame } from "remotion";
import {
  GabrielPaulFacebookProps,
  defaultGabrielPaulFacebookProps,
} from "./schema";
import { GabrielPaulCharacters } from "./GabrielPaulCharacters";
import { FacebookInteraction } from "./FacebookInteraction";
import { MysteryResponseBadge } from "./MysteryResponseBadge";

export const GabrielPaulFacebook: React.FC<GabrielPaulFacebookProps> = (
  rawProps
) => {
  const frame = useCurrentFrame();

  const props: GabrielPaulFacebookProps = {
    ...defaultGabrielPaulFacebookProps,
    ...rawProps,
  };

  const { transparentBackground = true } = props;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: transparentBackground ? "transparent" : "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 1. Interakcja przez Facebooka: logo, linie sygnału i dymki czatu */}
      <FacebookInteraction props={props} frame={frame} />

      {/* 2. Dwie postacie: Gabriel (zielony) & Paul Baskerville (brązowy z radiowymi słuchawkami) */}
      <GabrielPaulCharacters props={props} frame={frame} />

      {/* 3. Znak zapytania obok Paula ("ale nie rozpoznaje utworu...") */}
      <MysteryResponseBadge props={props} frame={frame} />
    </div>
  );
};
