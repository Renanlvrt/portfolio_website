/**
 * Easter Egg Manager
 * 
 * Centralized system for managing easter eggs and hidden features.
 * Clean architecture allows easy addition of new easter eggs.
 */

import type {
  EasterEggId,
  EasterEggConfig,
  EasterEggContext,
  EasterEggState,
} from "./types";

// Konami Code sequence
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

class EasterEggManager {
  private state: EasterEggState = {
    triggered: new Set(),
    lastTriggered: new Map(),
    clickCount: 0,
    keySequence: [],
    cursorInactiveTime: 0,
  };

  private configs: Map<EasterEggId, EasterEggConfig> = new Map();
  private context: EasterEggContext = {
    clickCount: 0,
    keySequence: [],
    currentTime: new Date(),
    cursorInactiveTime: 0,
    zonesVisited: new Set(),
    consoleCommands: [],
  };

  constructor() {
    this.registerDefaultEasterEggs();
    this.initializeListeners();
  }

  private registerDefaultEasterEggs() {
    // Konami Code
    this.register({
      id: "konami-code",
      trigger: "keyboard-sequence",
      condition: (ctx) => {
        const sequence = ctx.keySequence.slice(-KONAMI_CODE.length);
        return sequence.length === KONAMI_CODE.length &&
          sequence.every((key, i) => key === KONAMI_CODE[i]);
      },
      effect: async () => {
        // Trigger confetti and robot dance
        this.triggerEffect("konami-code");
      },
      oneTimeOnly: false,
      cooldown: 5000,
    });

    // Click Counter (50 clicks = turbo mode)
    this.register({
      id: "click-counter",
      trigger: "click-count",
      condition: (ctx) => ctx.clickCount >= 50 && ctx.clickCount % 50 === 0,
      effect: async () => {
        this.triggerEffect("click-counter");
      },
      cooldown: 1000,
    });

    // Console Command
    this.register({
      id: "console-command",
      trigger: "console-command",
      condition: (ctx) => {
        return ctx.consoleCommands.some((cmd) => 
          cmd.toLowerCase().includes("robot.dance") ||
          cmd.toLowerCase().includes("robot.wave")
        );
      },
      effect: async () => {
        this.triggerEffect("console-command");
      },
    });

    // Time-based (midnight mode)
    this.register({
      id: "time-based",
      trigger: "time-based",
      condition: (ctx) => {
        const hour = ctx.currentTime.getHours();
        return hour >= 0 && hour < 4; // Midnight to 4 AM
      },
      effect: async () => {
        this.triggerEffect("time-based");
      },
    });

    // Cursor Hide Detection
    this.register({
      id: "cursor-hide",
      trigger: "cursor-inactivity",
      condition: (ctx) => ctx.cursorInactiveTime > 10000, // 10 seconds
      effect: async () => {
        this.triggerEffect("cursor-hide");
      },
      cooldown: 30000,
    });
  }

  register(config: EasterEggConfig) {
    this.configs.set(config.id, config);
  }

  private initializeListeners() {
    if (typeof window === "undefined") return;

    // Click counter
    document.addEventListener("click", () => {
      this.state.clickCount++;
      this.context.clickCount = this.state.clickCount;
      this.checkEasterEggs();
    });

    // Keyboard sequence
    document.addEventListener("keydown", (e) => {
      this.state.keySequence.push(e.code);
      // Keep only last 20 keys
      if (this.state.keySequence.length > 20) {
        this.state.keySequence.shift();
      }
      this.context.keySequence = [...this.state.keySequence];
      this.checkEasterEggs();
    });

    // Cursor inactivity
    let cursorTimer: NodeJS.Timeout;
    document.addEventListener("mousemove", () => {
      this.state.cursorInactiveTime = 0;
      this.context.cursorInactiveTime = 0;
      clearTimeout(cursorTimer);
      cursorTimer = setInterval(() => {
        this.state.cursorInactiveTime += 100;
        this.context.cursorInactiveTime = this.state.cursorInactiveTime;
        this.checkEasterEggs();
      }, 100);
    });

    // Time-based check
    setInterval(() => {
      this.context.currentTime = new Date();
      this.checkEasterEggs();
    }, 60000); // Check every minute

    // Console command detection (via custom event)
    window.addEventListener("console-command", ((e: CustomEvent) => {
      this.context.consoleCommands.push(e.detail.command);
      this.checkEasterEggs();
    }) as EventListener);
  }

  private checkEasterEggs() {
    this.configs.forEach((config) => {
      // Check if already triggered (for one-time eggs)
      if (config.oneTimeOnly && this.state.triggered.has(config.id)) {
        return;
      }

      // Check cooldown
      const lastTriggered = this.state.lastTriggered.get(config.id);
      if (lastTriggered && config.cooldown) {
        const timeSince = Date.now() - lastTriggered;
        if (timeSince < config.cooldown) {
          return;
        }
      }

      // Check condition
      if (config.condition(this.context)) {
        this.triggerEasterEgg(config.id);
      }
    });
  }

  private async triggerEasterEgg(id: EasterEggId) {
    const config = this.configs.get(id);
    if (!config) return;

    this.state.triggered.add(id);
    this.state.lastTriggered.set(id, Date.now());

    await config.effect(this.context);
  }

  private triggerEffect(id: EasterEggId) {
    // Dispatch custom event for UI to react
    window.dispatchEvent(
      new CustomEvent("easter-egg-triggered", { detail: { id } })
    );
  }

  recordZoneVisit(zoneId: string) {
    this.context.zonesVisited.add(zoneId);
  }

  getState(): EasterEggState {
    return { ...this.state };
  }
}

// Singleton instance
let easterEggManagerInstance: EasterEggManager | null = null;

export function getEasterEggManager(): EasterEggManager {
  if (!easterEggManagerInstance) {
    easterEggManagerInstance = new EasterEggManager();
  }
  return easterEggManagerInstance;
}

