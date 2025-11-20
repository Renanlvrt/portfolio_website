import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ClientInitializer } from "@/components/core/ClientInitializer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renan Lavirotte | Autonomous Robotics Portfolio",
  description:
    "Explore Renan Lavirotte’s AI-driven robotics, artificial heart R&D, and VR education projects through an immersive autonomous navigation console.",
  metadataBase: new URL("https://renan-interactive-portfolio.local"),
  openGraph: {
    title: "Renan Lavirotte | Autonomous Robotics Portfolio",
    description:
      "Navigate artificial hearts, VR learning engines, and autonomous robotics missions through an AI-guided console.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_45%)]">
          <div className="noise-overlay" aria-hidden />
          <ClientInitializer />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
