"use client";

import { useState } from "react";
import { RoboticHero } from "@/components/hero/RoboticHero";
import { RobotCenteredHub } from "@/components/hub/RobotCenteredHub";
import { MissionDeck } from "@/components/missions/MissionDeck";
import { RobotBootSequence } from "@/components/loading/RobotBootSequence";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HUDOverlay } from "@/components/ui/HUDOverlay";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { KeyboardHelp } from "@/components/ui/KeyboardHelp";
import { RobotCompanion } from "@/components/robot/RobotCompanion";
import { AudioControls } from "@/components/ui/AudioControls";
import { EasterEggHandler } from "@/components/easterEggs/EasterEggHandler";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { missionDeck, portalNodes } from "@/data/portals";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { showHelp, setShowHelp } = useKeyboardNavigation();

  if (isLoading) {
    return <RobotBootSequence onComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />
      <HUDOverlay />
      <RobotCompanion />
      <AudioControls />
      <EasterEggHandler />
      <KeyboardHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <div className="min-h-screen bg-slate-950 pb-24 pt-16 text-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-0">
          <RoboticHero />
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <RobotCenteredHub nodes={portalNodes} />
            <TelemetryPanel />
        </div>
          <MissionDeck missions={missionDeck} />
        </div>
    </div>
    </>
  );
}
