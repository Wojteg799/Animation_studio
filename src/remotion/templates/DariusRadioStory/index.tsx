import React from "react";
import { useCurrentFrame } from "remotion";
import { DariusRadioStoryProps } from "./schema";
import { DariusCharacter } from "./DariusCharacter";
import { RadioCassetteDeck } from "./RadioCassetteDeck";
import { CassetteTracklistCard } from "./CassetteTracklistCard";

export const DariusRadioStory: React.FC<DariusRadioStoryProps> = (rawProps) => {
  const frame = useCurrentFrame();

  const props: DariusRadioStoryProps = {
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
      {/* 1. Postać Dariusa (Lewa strona / Centrum) z podpisem DARIUS, sercem, nutami i pytajnikiem */}
      <DariusCharacter props={props} frame={frame} />

      {/* 2. Proste radio i kaseta wireframe (Prawa strona) z falami dźwiękowymi i szpulami */}
      {props.showRadioAndCassette && <RadioCassetteDeck props={props} frame={frame} />}

      {/* 3. Prosta karta z liniami utworów i rysującym ołówkiem (Prawa strona - dół) */}
      {props.showWritingPencil && <CassetteTracklistCard props={props} frame={frame} />}
    </div>
  );
};
