import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { DariusInternetQuestProps } from "./schema";

interface DariusLydiaCharactersProps {
  props: DariusInternetQuestProps;
  frame: number;
}

export const DariusLydiaCharacters: React.FC<DariusLydiaCharactersProps> = ({
  props,
  frame,
}) => {
  const { fps } = useVideoConfig();
  const {
    dariusName = "DARIUS",
    lydiaName = "LYDIA",
    dariusColor = "#facc15",
    lydiaColor = "#38bdf8",
    circleSize = 200,

    dariusHeadSize = 42,
    dariusBodySize = 75,
    dariusHeadY = 55,
    dariusBodyY = 168,

    lydiaHeadSize = 42,
    lydiaBodySize = 75,
    lydiaHeadY = 55,
    lydiaBodyY = 168,

    charactersScale = 1.15,
    giftBoxScale = 1.2,
    questionMarkScale = 1.35,

    domainText = "www.unknown-song.net",
    showGift = true,
    showMysteryQuestion = true,

    lineColor = "#ffffff",

    charactersEnterFrame = 5,
    giftOpenFrame = 28,
    giftEndFrame = 90,
    websiteStartFrame = 95,
    mysteryQuestionFrame = 285,
  } = props;

  // 1. Wejście postaci na ekran (sprężysty wlot)
  const enterSpring = spring({
    frame: frame - charactersEnterFrame,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });
  const clampedEnter = Math.max(0, Math.min(1, enterSpring));

  // 2. Pozycja Dariusa:
  // Faza 1 (prezent od Lydii): Darius stoi po prawej stronie (X = 64%)
  // Faza 2 (strona www): Darius przesuwa się płynnie w lewo (X = 18%)
  const shiftProgress = Math.max(
    0,
    Math.min(1, (frame - (websiteStartFrame - 10)) / 22)
  );
  const shiftEased =
    shiftProgress * shiftProgress * (3 - 2 * shiftProgress); // smoothstep
  const dariusX = interpolate(shiftEased, [0, 1], [64, 18]);

  // Lydia: stoi po lewej stronie (X = 36%), a po zakończeniu wręczenia prezentu (giftEndFrame) płynnie zanika
  const lydiaExitProgress = Math.max(
    0,
    Math.min(1, (frame - giftEndFrame) / 16)
  );
  const lydiaOpacity = Math.max(0, 1 - lydiaExitProgress);
  const lydiaX = interpolate(lydiaExitProgress, [0, 1], [36, 20]);

  // Naturalny oddech (idle bobbing)
  const dariusBob = Math.sin(frame * 0.08) * 3;
  const lydiaBob = Math.sin((frame + 12) * 0.08) * 3;

  // 3. Faza Prezentu Urodzinowego
  const giftEnter = spring({
    frame: frame - (charactersEnterFrame + 8),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const giftExit = Math.max(0, Math.min(1, (frame - (giftEndFrame - 8)) / 14));
  const giftOpacity = Math.max(0, giftEnter - giftExit);

  // Otwarcie pudełka i wyskok domeny internetowej
  const giftOpenSpring = spring({
    frame: frame - giftOpenFrame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const clampedGiftOpen = Math.max(0, Math.min(1, giftOpenSpring));

  // Lot paska domeny od prezentu do Dariusa
  const domainFlyProgress = Math.max(
    0,
    Math.min(1, (frame - (giftOpenFrame + 6)) / 24)
  );
  const domainFlyEased =
    domainFlyProgress * domainFlyProgress * (3 - 2 * domainFlyProgress);
  const domainX = interpolate(domainFlyEased, [0, 1], [50, 64]);
  const domainY = interpolate(
    domainFlyEased,
    [0, 0.45, 1],
    [-70, -110, -75]
  );
  const domainScale = interpolate(domainFlyEased, [0, 1], [0.85, 1.05]);

  // 4. Żółty znak zapytania przy Dariusie w fazie tajemnicy
  const questionSpring = spring({
    frame: frame - mysteryQuestionFrame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const questionBob = Math.sin(frame * 0.14) * 4;

  if (frame < charactersEnterFrame) {
    return null;
  }

  return (
    <>
      {/* ================= 1. POSTAĆ LYDII (NIEBIESKA) ================= */}
      {lydiaOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: `${lydiaX}%`,
            top: "50%",
            transform: `translate(-50%, -50%) translateY(${lydiaBob}px) scale(${
              clampedEnter * charactersScale
            })`,
            opacity: Math.min(1, clampedEnter * 1.5) * lydiaOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          {/* Avatar Lydii (Niebieskie geometryczne koła) */}
          <div
            style={{
              width: circleSize,
              height: circleSize,
              position: "relative",
              borderRadius: "50%",
              border: `3.5px solid ${lineColor}`,
              overflow: "hidden",
              backgroundColor: "#000000",
              boxShadow: "none",
            }}
          >
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <circle cx="100" cy="100" r="100" fill="#000000" />
              {/* Tułów Lydii (niebieski) */}
              <circle
                cx="100"
                cy={lydiaBodyY}
                r={lydiaBodySize}
                fill={lydiaColor}
              />
              {/* Głowa Lydii (niebieska) */}
              <circle
                cx="100"
                cy={lydiaHeadY}
                r={lydiaHeadSize}
                fill={lydiaColor}
              />
            </svg>
          </div>

          {/* Podpis "LYDIA" */}
          <div
            style={{
              marginTop: 14,
              backgroundColor: "#000000",
              border: `2px solid ${lineColor}`,
              borderRadius: 8,
              padding: "5px 22px",
              boxShadow: "none",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                color: lineColor,
                letterSpacing: 2.5,
              }}
            >
              {lydiaName}
            </span>
          </div>
        </div>
      )}

      {/* ================= 2. PREZENT URODZINOWY & DOMENA INTERNETOWA ================= */}
      {showGift && giftOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${
              giftEnter * giftBoxScale
            })`,
            opacity: giftOpacity,
            zIndex: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {/* Pudełko prezentowe ze wstążką */}
          <div
            style={{
              position: "relative",
              width: 110,
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Wieczko pudełka unoszące się w górę przy otwarciu */}
            <div
              style={{
                position: "absolute",
                top: 0,
                width: 104,
                height: 28,
                backgroundColor: "#000000",
                border: `3px solid ${lineColor}`,
                borderRadius: 4,
                transform: `translateY(${-clampedGiftOpen * 32}px) rotate(${
                  clampedGiftOpen * -8
                }deg)`,
                transformOrigin: "bottom left",
                transition: "transform 0.1s ease-out",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Kokarda na wieczku */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  display: "flex",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 14,
                    border: `2.5px solid ${lydiaColor}`,
                    borderRadius: "50% 50% 0 50%",
                    transform: "rotate(-25deg)",
                  }}
                />
                <div
                  style={{
                    width: 18,
                    height: 14,
                    border: `2.5px solid ${lydiaColor}`,
                    borderRadius: "50% 50% 50% 0",
                    transform: "rotate(25deg)",
                  }}
                />
              </div>
              {/* Wstążka pionowa na wieczku */}
              <div
                style={{
                  width: 12,
                  height: "100%",
                  backgroundColor: lydiaColor,
                }}
              />
            </div>

            {/* Korpus pudełka */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: 96,
                height: 78,
                backgroundColor: "#000000",
                border: `3px solid ${lineColor}`,
                borderRadius: 4,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              {/* Wstążka pionowa */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: 12,
                  transform: "translateX(-50%)",
                  backgroundColor: lydiaColor,
                }}
              />
              {/* Wstążka pozioma */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 12,
                  transform: "translateY(-50%)",
                  backgroundColor: lydiaColor,
                }}
              />
            </div>

            {/* Wyskakujący z pudełka globus i domena internetowa */}
            {frame >= giftOpenFrame && (
              <div
                style={{
                  position: "absolute",
                  left: `${domainX - 50}%`,
                  top: `${domainY}px`,
                  transform: `scale(${clampedGiftOpen * domainScale})`,
                  opacity: Math.min(1, clampedGiftOpen * 1.4),
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#000000",
                  border: `2.5px solid ${dariusColor}`,
                  borderRadius: 24,
                  padding: "7px 18px",
                  boxShadow: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Ikona globu internetowego (SVG) */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={dariusColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    color: "#ffffff",
                    letterSpacing: 1.2,
                  }}
                >
                  {domainText}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 3. POSTAĆ DARIUSA (ŻÓŁTA) ================= */}
      <div
        style={{
          position: "absolute",
          left: `${dariusX}%`,
          top: "50%",
          transform: `translate(-50%, -50%) translateY(${dariusBob}px) scale(${
            clampedEnter * charactersScale
          })`,
          opacity: Math.min(1, clampedEnter * 1.5),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        {/* Wyrazisty żółty pytajnik przy Dariusie w fazie tajemnicy */}
        {showMysteryQuestion && frame >= mysteryQuestionFrame && (
          <div
            style={{
              position: "absolute",
              top: -circleSize * 0.42,
              right: -circleSize * 0.25,
              transform: `translateY(${questionBob}px) scale(${
                questionSpring * questionMarkScale
              })`,
              zIndex: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#000000",
                border: `3px solid ${dariusColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  color: dariusColor,
                  lineHeight: 1,
                  transform: "translateY(-1px)",
                }}
              >
                ?
              </span>
            </div>
          </div>
        )}

        {/* Avatar Dariusa (Żółte geometryczne koła) */}
        <div
          style={{
            width: circleSize,
            height: circleSize,
            position: "relative",
            borderRadius: "50%",
            border: `3.5px solid ${lineColor}`,
            overflow: "hidden",
            backgroundColor: "#000000",
            boxShadow: "none",
          }}
        >
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <circle cx="100" cy="100" r="100" fill="#000000" />
            {/* Tułów Dariusa (żółty) */}
            <circle
              cx="100"
              cy={dariusBodyY}
              r={dariusBodySize}
              fill={dariusColor}
            />
            {/* Głowa Dariusa (żółta) */}
            <circle
              cx="100"
              cy={dariusHeadY}
              r={dariusHeadSize}
              fill={dariusColor}
            />
          </svg>
        </div>

        {/* Podpis "DARIUS" */}
        <div
          style={{
            marginTop: 14,
            backgroundColor: "#000000",
            border: `2px solid ${lineColor}`,
            borderRadius: 8,
            padding: "5px 22px",
            boxShadow: "none",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              color: lineColor,
              letterSpacing: 2.5,
            }}
          >
            {dariusName}
          </span>
        </div>
      </div>
    </>
  );
};
