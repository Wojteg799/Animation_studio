import React from "react";
import { useCurrentFrame } from "remotion";
import { GabaskinsQuestProps, defaultGabaskinsQuestProps } from "./schema";
import { GabaskinsCharacter } from "./GabaskinsCharacter";
import { PlatformBadges } from "./PlatformBadges";
import { MysteryCassetteBadge } from "./MysteryCassetteBadge";
import { BroadcastLines } from "./BroadcastLines";

export const GabaskinsQuest: React.FC<GabaskinsQuestProps> = (rawProps) => {
  const frame = useCurrentFrame();

  const props: GabaskinsQuestProps = {
    ...defaultGabaskinsQuestProps,
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
      {/* 1. Dynamiczne linie transmisyjne łączące Gabaskinsa z YouTube i Redditem */}
      <BroadcastLines props={props} frame={frame} />

      {/* 2. Główna postać: Gabaskins (zielony awatar z antenką Reddit Snoo) */}
      <GabaskinsCharacter props={props} frame={frame} />

      {/* 3. Tajemnicza kaseta audio ("kiedy nagraniem interesuje się Gabriel Vieira...") */}
      <MysteryCassetteBadge props={props} frame={frame} />

      {/* 4. Platformy YouTube & Reddit ("zamieszcza na YouTubie i publikuje na różnych subredditach") */}
      <PlatformBadges props={props} frame={frame} />
    </div>
  );
};
