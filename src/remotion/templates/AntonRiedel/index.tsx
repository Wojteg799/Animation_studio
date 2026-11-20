import React from "react";
import { useCurrentFrame } from "remotion";
import { AntonRiedelProps, defaultAntonRiedelProps } from "./schema";
import { AntonCharacter } from "./AntonCharacter";

export const AntonRiedel: React.FC<AntonRiedelProps> = (rawProps) => {
  const frame = useCurrentFrame();

  const props: AntonRiedelProps = {
    ...defaultAntonRiedelProps,
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
      {/* Postać Antona Riedla (Lydia w okularach kamuflażu z nosem i wąsem) */}
      <AntonCharacter props={props} frame={frame} />
    </div>
  );
};
