import React from "react";
import { useCurrentFrame } from "remotion";
import {
  InvestigationBreakthroughProps,
  defaultInvestigationBreakthroughProps,
} from "./schema";
import { TrioCharacters } from "./TrioCharacters";
import { RadioAndCassette } from "./RadioAndCassette";
import { Forum2007Badge } from "./Forum2007Badge";
import { MessengerFlow } from "./MessengerFlow";

export const InvestigationBreakthrough: React.FC<
  InvestigationBreakthroughProps
> = (rawProps) => {
  const frame = useCurrentFrame();

  const props: InvestigationBreakthroughProps = {
    ...defaultInvestigationBreakthroughProps,
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
      {/* 1. Radio i rozpoznanie kasety przez Dariusa */}
      <RadioAndCassette props={props} frame={frame} />

      {/* 2. Wspólne sprawdzenie śledztwa: Wpisy z 2007 roku */}
      <Forum2007Badge props={props} frame={frame} />

      {/* 3. Lydia pisze do Gabriela na Messengerze */}
      <MessengerFlow props={props} frame={frame} />

      {/* 4. Trzy postacie: Darius (żółty), Lydia (błękitna), Gabriel (zielony) */}
      <TrioCharacters props={props} frame={frame} />
    </div>
  );
};
