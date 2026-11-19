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

    charactersScale = 1.35,
    dariusScale = 1.0,
    lydiaScale = 1.0,
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

  // Otwarcie pudełka
  const lidSpring = spring({
    frame: frame - giftOpenFrame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.7 },
  });
  const clampedLid = Math.max(0, Math.min(1.2, lidSpring));

  // Animacja wyskakiwania i lotu domeny internetowej
  const domainPopSpring = spring({
    frame: frame - (giftOpenFrame + 2),
    fps,
    config: { damping: 11, stiffness: 120, mass: 0.7 },
  });
  const clampedPop = Math.max(0, domainPopSpring);

  const glideProgress = Math.max(
    0,
    Math.min(1, (frame - (giftEndFrame - 15)) / 22)
  );
  const glideEased = glideProgress * glideProgress * (3 - 2 * glideProgress);

  const initialY = 52;
  const targetPopY = 34;
  const targetWebY = 27;

  const currentDomainY =
    glideProgress > 0
      ? interpolate(glideEased, [0, 1], [targetPopY, targetWebY])
      : interpolate(Math.min(1, clampedPop), [0, 1], [initialY, targetPopY]);

  const currentDomainX = interpolate(glideEased, [0, 1], [50, 68]);

  const domainRot =
    glideProgress > 0
      ? interpolate(glideEased, [0, 1], [0, 2])
      : interpolate(Math.min(1, clampedPop), [0, 0.5, 1], [-6, 3, 0]);

  const domainScale =
    (clampedPop > 0 ? Math.min(1.15, clampedPop * 1.05) : 0) *
    interpolate(glideEased, [0, 1], [1, 0.95]);

  const domainFloatY =
    frame >= giftOpenFrame + 15 && glideProgress < 0.9
      ? Math.sin((frame - giftOpenFrame) * 0.1) * 4
      : 0;

  const fadeToWeb = Math.max(
    0,
    Math.min(1, (frame - (websiteStartFrame - 6)) / 10)
  );
  const popOpacity = Math.min(1, Math.max(0, (frame - (giftOpenFrame + 2)) / 5));
  const currentDomainOpacity = popOpacity * (1 - fadeToWeb);

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
              clampedEnter * charactersScale * lydiaScale
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
            top: "52%",
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
                transform: `translate(${-clampedLid * 35}px, ${-clampedLid * 75}px) rotate(${
                  -clampedLid * 25
                }deg)`,
                transformOrigin: "bottom left",
                zIndex: 4,
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

            {/* Błyski/promyki radości przy otwarciu pudełka */}
            {frame >= giftOpenFrame && frame < giftOpenFrame + 22 && (
              <div
                style={{
                  position: "absolute",
                  top: 25,
                  left: "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                {[-45, -15, 15, 45].map((deg, i) => {
                  const sparkProgress = Math.min(1, (frame - giftOpenFrame) / 18);
                  const sparkDist = interpolate(sparkProgress, [0, 1], [10, 55]);
                  const sparkOpacity = interpolate(sparkProgress, [0, 0.4, 1], [0, 1, 0]);
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: 14,
                        height: 2.5,
                        backgroundColor: dariusColor,
                        borderRadius: 2,
                        transform: `rotate(${deg}deg) translate(${sparkDist}px, 0)`,
                        opacity: sparkOpacity,
                      }}
                    />
                  );
                })}
              </div>
            )}

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
          </div>
        </div>
      )}


      {/* ================= 2B. DOMENA INTERNETOWA WYSKAKUJĄCA Z PREZENTU ================= */}
      {showGift && currentDomainOpacity > 0.001 && (
        <div
          style={{
            position: "absolute",
            left: `${currentDomainX}%`,
            top: `${currentDomainY}%`,
            transform: `translate(-50%, -50%) translateY(${domainFloatY}px) scale(${domainScale}) rotate(${domainRot}deg)`,
            opacity: currentDomainOpacity,
            zIndex: 35,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#000000",
            border: `2.5px solid ${dariusColor}`,
            borderRadius: 24,
            padding: "8px 20px",
            boxShadow: "none",
            whiteSpace: "nowrap",
            pointerEvents: "none",
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
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span
            style={{
              fontSize: 15,
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

      {/* ================= 3. POSTAĆ DARIUSA (ŻÓŁTA) ================= */}
      <div
        style={{
          position: "absolute",
          left: `${dariusX}%`,
          top: "50%",
          transform: `translate(-50%, -50%) translateY(${dariusBob}px) scale(${
            clampedEnter * charactersScale * dariusScale
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
