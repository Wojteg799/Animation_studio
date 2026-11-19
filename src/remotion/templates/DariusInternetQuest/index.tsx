import React from "react";
import { useCurrentFrame } from "remotion";
import {
  DariusInternetQuestProps,
  defaultDariusInternetQuestProps,
} from "./schema";
import { DariusLydiaCharacters } from "./DariusLydiaCharacters";
import { WebsiteTrackerCard } from "./WebsiteTrackerCard";

export const DariusInternetQuest: React.FC<DariusInternetQuestProps> = (
  rawProps
) => {
  const frame = useCurrentFrame();

  const props: DariusInternetQuestProps = {
    ...defaultDariusInternetQuestProps,
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
      {/* 1. Postacie (Lydia - niebieska, Darius - żółty), Prezent Urodzinowy i Domena */}
      <DariusLydiaCharacters props={props} frame={frame} />

      {/* 2. Okno strony www, Odtwarzacz próbek i Lista Utworów (✓ i ?) */}
      {props.showWebsite && <WebsiteTrackerCard props={props} frame={frame} />}
    </div>
  );
};
