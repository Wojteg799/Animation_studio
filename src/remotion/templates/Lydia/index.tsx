import React from "react";
import { useCurrentFrame } from "remotion";
import { LydiaProps, defaultLydiaProps } from "./schema";
import { LydiaCharacter } from "./LydiaCharacter";

export const Lydia: React.FC<LydiaProps> = (rawProps) => {
  const frame = useCurrentFrame();

  const props: LydiaProps = {
    ...defaultLydiaProps,
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
      {/* Postać Lydii wchodząca na ekran */}
      <LydiaCharacter props={props} frame={frame} />
    </div>
  );
};
