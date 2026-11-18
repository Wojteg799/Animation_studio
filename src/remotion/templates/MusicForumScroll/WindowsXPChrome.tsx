import React from "react";
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Star } from "lucide-react";

interface WindowsXPChromeProps {
  title: string;
  url: string;
}

export const WindowsXPChrome: React.FC<WindowsXPChromeProps> = ({
  title,
  url,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", userSelect: "none" }}>
      {/* 1. LUNA BLUE TITLEBAR */}
      <div
        style={{
          height: "30px",
          background: "linear-gradient(180deg, #0058e6 0%, #267eff 12%, #0053e1 45%, #0045ce 88%, #0030a0 100%)",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          padding: "0 6px 0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.45)",
          position: "relative",
          zIndex: 30,
        }}
      >
        {/* Left: Internet Explorer "e" icon & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
          {/* Classic IE icon with golden orbit */}
          <div
            style={{
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 32 32" width="16" height="16">
              {/* Outer gold halo */}
              <ellipse
                cx="16"
                cy="16"
                rx="14"
                ry="5"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                transform="rotate(-25 16 16)"
              />
              {/* Blue 'e' */}
              <circle cx="15" cy="16" r="9" fill="#1d4ed8" />
              <path
                d="M10 16 h11 a5 5 0 0 0 -9 -3 a5 5 0 0 0 9 5"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "'Trebuchet MS', Tahoma, sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#ffffff",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.85)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: "0.2px",
            }}
          >
            {title}
          </span>
        </div>

        {/* Right: Iconic Windows XP Window Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "3px", flexShrink: 0 }}>
          {/* Minimize Button */}
          <div
            style={{
              width: "21px",
              height: "21px",
              background: "linear-gradient(180deg, #3a93ff 0%, #1a6fe8 50%, #0049ce 100%)",
              border: "1px solid #ffffff",
              borderRadius: "3px",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "3px",
            }}
          >
            <div style={{ width: "8px", height: "2px", backgroundColor: "#ffffff" }} />
          </div>

          {/* Maximize Button */}
          <div
            style={{
              width: "21px",
              height: "21px",
              background: "linear-gradient(180deg, #3a93ff 0%, #1a6fe8 50%, #0049ce 100%)",
              border: "1px solid #ffffff",
              borderRadius: "3px",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "9px",
                height: "9px",
                border: "1.5px solid #ffffff",
                borderTopWidth: "3px",
              }}
            />
          </div>

          {/* Close Button (Iconic Red XP X) */}
          <div
            style={{
              width: "22px",
              height: "21px",
              background: "linear-gradient(180deg, #f2624a 0%, #d83a1e 40%, #be2005 100%)",
              border: "1px solid #ffffff",
              borderRadius: "3px",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 2px rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 900,
                fontFamily: "Tahoma, Arial, sans-serif",
                lineHeight: 1,
                textShadow: "0 1px 1px rgba(0, 0, 0, 0.6)",
              }}
            >
              ✕
            </span>
          </div>
        </div>
      </div>

      {/* 2. CLASSIC MENU BAR (Plik, Edycja, Widok, ...) */}
      <div
        style={{
          height: "22px",
          backgroundColor: "#ece9d8",
          borderBottom: "1px solid #dcd9c8",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Tahoma, sans-serif",
          fontSize: "11px",
          color: "#000000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span><u style={{ textDecorationThickness: "1px" }}>P</u>lik</span>
          <span><u style={{ textDecorationThickness: "1px" }}>E</u>dycja</span>
          <span><u style={{ textDecorationThickness: "1px" }}>W</u>idok</span>
          <span><u style={{ textDecorationThickness: "1px" }}>U</u>lubione</span>
          <span><u style={{ textDecorationThickness: "1px" }}>N</u>arzędzia</span>
          <span><u style={{ textDecorationThickness: "1px" }}>P</u>omoc</span>
        </div>

        {/* Windows XP animated flag square */}
        <div
          style={{
            width: "20px",
            height: "16px",
            backgroundColor: "#2563eb",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 2px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              width: "10px",
              height: "10px",
            }}
          >
            <div style={{ backgroundColor: "#ef4444" }} />
            <div style={{ backgroundColor: "#3b82f6" }} />
            <div style={{ backgroundColor: "#10b981" }} />
            <div style={{ backgroundColor: "#f59e0b" }} />
          </div>
        </div>
      </div>

      {/* 3. TOOLBAR & ADDRESS BAR */}
      <div
        style={{
          height: "36px",
          backgroundColor: "#ece9d8",
          borderBottom: "2px solid #d4d0c8",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Navigation round buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {/* Back button */}
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "linear-gradient(180deg, #7ad672 0%, #3a9b2a 100%)",
              border: "1px solid #236916",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>

          {/* Forward button (disabled grey) */}
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#dcd9c8",
              border: "1px solid #b8b4a8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
            }}
          >
            <ArrowRight className="w-3 h-3 text-zinc-500 stroke-[2.5]" />
          </div>
        </div>

        {/* Separator */}
        <div style={{ width: "1px", height: "20px", backgroundColor: "#c0bcaf" }} />

        {/* Address Label */}
        <span
          style={{
            fontFamily: "Tahoma, sans-serif",
            fontSize: "11px",
            color: "#444444",
            fontWeight: 500,
          }}
        >
          Adres:
        </span>

        {/* Address Box */}
        <div
          style={{
            flex: 1,
            height: "22px",
            backgroundColor: "#ffffff",
            border: "1px solid #7f9db9",
            borderRadius: "1px",
            padding: "0 6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            boxShadow: "inset 1px 1px 1px rgba(0,0,0,0.1)",
          }}
        >
          {/* Small favicon */}
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#2563eb",
              borderRadius: "1px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              color: "#ffffff",
              fontWeight: 900,
            }}
          >
            e
          </div>

          <span
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: "11px",
              color: "#000000",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {url}
          </span>
        </div>

        {/* Green "Przejdź" (Go) Button */}
        <div
          style={{
            height: "22px",
            padding: "0 8px",
            borderRadius: "2px",
            background: "linear-gradient(180deg, #7ad672 0%, #3a9b2a 100%)",
            border: "1px solid #236916",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "Tahoma, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#ffffff",
              textShadow: "0 1px 1px rgba(0,0,0,0.5)",
            }}
          >
            Przejdź
          </span>
          <ArrowRight className="w-3 h-3 text-white stroke-[3]" />
        </div>
      </div>
    </div>
  );
};

