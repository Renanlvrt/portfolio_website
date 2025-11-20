"use client";

import { useState } from "react";
import { RobotBootSequence } from "@/components/loading/RobotBootSequence";
import { ScrollableContentLayout } from "@/components/layout/ScrollableContentLayout";
import { RoboticHero } from "@/components/hero/RoboticHero";
import { ProjectCard } from "@/components/content/ProjectCard";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { HUDOverlay } from "@/components/ui/HUDOverlay";
import { RobotCompanion } from "@/components/robot/RobotCompanion";
import { AudioControls } from "@/components/ui/AudioControls";
import { EasterEggHandler } from "@/components/easterEggs/EasterEggHandler";
import { KeyboardHelp } from "@/components/ui/KeyboardHelp";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { portalNodes } from "@/data/portals";

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
      
      <ScrollableContentLayout nodes={portalNodes}>
        {/* Scrollable Content */}
        <div className="min-h-screen pt-32 pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-32">
            {/* Hero Section */}
            <section className="relative">
              <RoboticHero />
            </section>
            
            {/* Project Sections - Creative Asymmetric Grid */}
            <section className="relative">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mission Portfolio</h2>
                <p className="text-slate-400">Autonomous droid exploring projects below</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {portalNodes.map((node, index) => (
                  <ProjectCard key={node.id} node={node} index={index} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </ScrollableContentLayout>
    </>
  );
}
