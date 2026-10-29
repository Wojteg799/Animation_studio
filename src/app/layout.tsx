import { Metadata, Viewport } from "next";
import "../../styles/global.css";

export const metadata: Metadata = {
  title: "DocuMotion Studio – Generator Nakładek Wideo z Przezroczystym Tłem (ProRes 4444)",
  description:
    "Profesjonalne studio do tworzenia animacji graficznych, infografik i nakładek do filmów dokumentalnych na YouTube z natywnym eksportem Apple ProRes 4444 Alpha do DaVinci Resolve i Premiere Pro.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="dark">
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased">
        {children}
      </body>
    </html>
  );
}
