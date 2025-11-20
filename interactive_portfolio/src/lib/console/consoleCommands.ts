/**
 * Console Commands System
 * 
 * Extensible system for browser console commands.
 * Allows users to interact with the robot via console.
 */

import { getEasterEggManager } from "../easterEggs/EasterEggManager";

export interface ConsoleCommand {
  name: string;
  description: string;
  execute: (args: string[]) => void | Promise<void>;
}

const commands: ConsoleCommand[] = [
  {
    name: "robot.dance",
    description: "Make the robot perform a dance",
    execute: () => {
      window.dispatchEvent(
        new CustomEvent("console-command", { detail: { command: "robot.dance" } })
      );
      console.log("🤖 Robot is dancing!");
    },
  },
  {
    name: "robot.wave",
    description: "Make the robot wave",
    execute: () => {
      window.dispatchEvent(
        new CustomEvent("console-command", { detail: { command: "robot.wave" } })
      );
      console.log("👋 Robot is waving!");
    },
  },
  {
    name: "robot.stats",
    description: "Show robot personality stats",
    execute: () => {
      const manager = getEasterEggManager();
      const state = manager.getState();
      console.log("📊 Robot Stats:", {
        clicks: state.clickCount,
        triggeredEggs: Array.from(state.triggered),
      });
    },
  },
  {
    name: "help",
    description: "Show available commands",
    execute: () => {
      console.log("🤖 Available Robot Commands:");
      commands.forEach((cmd) => {
        console.log(`  ${cmd.name} - ${cmd.description}`);
      });
    },
  },
];

export function initializeConsoleCommands() {
  if (typeof window === "undefined") return;

  // Make commands available globally
  interface WindowWithRobot extends Window {
    robot?: {
      dance: () => void;
      wave: () => void;
      stats: () => void;
    };
  }
  
  (window as WindowWithRobot).robot = {
    dance: () => commands.find((c) => c.name === "robot.dance")?.execute(),
    wave: () => commands.find((c) => c.name === "robot.wave")?.execute(),
    stats: () => commands.find((c) => c.name === "robot.stats")?.execute(),
  };

  // Add welcome message
  console.log(
    "%c🤖 Robot Console Active!",
    "color: #00D9FF; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%cTry: robot.dance(), robot.wave(), or robot.stats()",
    "color: #94a3b8; font-size: 12px;"
  );
}

