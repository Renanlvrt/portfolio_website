/**
 * Easter Egg System Types
 * 
 * Extensible type system for easter eggs and hidden features.
 * Easy to add new easter eggs by extending these types.
 */

export type EasterEggId =
  | "konami-code"
  | "click-counter"
  | "console-command"
  | "time-based"
  | "cursor-hide"
  | "secret-zone";

export type EasterEggTrigger = 
  | "keyboard-sequence"
  | "click-count"
  | "console-command"
  | "time-based"
  | "cursor-inactivity"
  | "zone-visit";

export interface EasterEggConfig {
  id: EasterEggId;
  trigger: EasterEggTrigger;
  condition: (context: EasterEggContext) => boolean;
  effect: (context: EasterEggContext) => void | Promise<void>;
  cooldown?: number; // Milliseconds before can trigger again
  oneTimeOnly?: boolean; // Can only trigger once
}

export interface EasterEggContext {
  clickCount: number;
  keySequence: string[];
  currentTime: Date;
  cursorInactiveTime: number;
  zonesVisited: Set<string>;
  consoleCommands: string[];
}

export interface EasterEggState {
  triggered: Set<EasterEggId>;
  lastTriggered: Map<EasterEggId, number>;
  clickCount: number;
  keySequence: string[];
  cursorInactiveTime: number;
}

