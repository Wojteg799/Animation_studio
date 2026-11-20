import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SingleCassetteProps, defaultSingleCassetteProps } from "./schema";
import { CassetteWireframe } from "../JoyDivisionCassetteMorph/CassetteWireframe";

export const SingleCassette: React.FC<SingleCassetteProps> = (rawProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const props: SingleCassetteProps = {
    ...defaultSingleCassetteProps,
    ...rawProps,
  };

  const {
    cassetteWidth = 640,
    cassetteHeight = 405,
    cassetteScale = 1.15,
    positionX = 50,
    positionY = 50,
    lineColor = "#ffffff",
    lineWidth = 2.2,
    chassisFill = "#000000",
    transparentBackground = true,
    spoolColor = "#facc15",
    showLabel = true,
    labelText = "????",
    labelColor = "#ffffff",
    spoolSpeed = 3.8,
    reverseSpools = false,
    idleBobbing = true,
    bobbingAmount = 4.0,
    detailsOpacity = 1.0,
    enterType = "spring-pop",
    enterFrame = 5,
  } = props;

  // 1. Animacja wejścia
  let enterProgress = 1;
  let enterOffsetY = 0;
  let enterRot = 0;

  if (enterType === "spring-pop") {
    const s = spring({
      frame: frame - enterFrame,
      fps,
      config: { damping: 14, stiffness: 95, mass: 0.85 },
    });
    enterProgress = Math.max(0, Math.min(1, s));
    enterOffsetY = (1 - enterProgress) * 40;
    enterRot = (1 - enterProgress) * -3;
  } else if (enterType === "slide-up") {
    const s = spring({
      frame: frame - enterFrame,
      fps,
      config: { damping: 16, stiffness: 90, mass: 0.9 },
    });
    enterProgress = Math.max(0, Math.min(1, s));
    enterOffsetY = (1 - enterProgress) * 90;
  } else if (enterType === "smooth-fade") {
    enterProgress = Math.max(0, Math.min(1, (frame - enterFrame) / 18));
  }

  if (enterType !== "none" && frame < enterFrame) {
    return null;
  }

  // 2. Obrót szpulek taśmy
  const spoolRotation = (frame * spoolSpeed * (reverseSpools ? -1 : 1)) % 360;

  // 3. Subtelne unoszenie i kołysanie w przestrzeni (idle floating)
  const bobY = idleBobbing ? Math.sin(frame * 0.08) * bobbingAmount : 0;
  const bobRot = idleBobbing ? Math.sin(frame * 0.04) * 0.75 : 0;

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
      <div
        style={{
          position: "absolute",
          left: `${positionX}%`,
          top: `${positionY}%`,
          transform: `translate(-50%, -50%) translateY(${bobY + enterOffsetY}px) rotate(${bobRot + enterRot}deg) scale(${enterProgress * cassetteScale})`,
          opacity: Math.min(1, enterProgress * 1.5),
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Dokładnie ten sam minimalistyczny wireframe kasety co w Unknown Pleasures z opcją etykiety i złotych szpulek */}
        <CassetteWireframe
          width={cassetteWidth}
          height={cassetteHeight}
          strokeColor={lineColor}
          strokeWidth={lineWidth}
          spoolRotation={spoolRotation}
          opacity={1}
          detailsOpacity={detailsOpacity}
          squashFactor={1}
          chassisFill={chassisFill}
          spoolColor={spoolColor}
          showLabel={showLabel}
          labelText={labelText}
          labelColor={labelColor}
        />
      </div>
    </div>
  );
};
