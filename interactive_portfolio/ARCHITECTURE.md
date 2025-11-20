# Interactive Portfolio Architecture

## Overview

This portfolio is built with a clean, extensible architecture that prioritizes:
- **Modularity**: Each system is self-contained and can be extended independently
- **Type Safety**: Full TypeScript coverage with strict types
- **Performance**: Optimized for 60 FPS with LOD and lazy loading
- **Responsiveness**: Adaptive to all device types
- **Extensibility**: Easy to add new features without breaking existing code

## System Architecture

### 1. Audio System (`src/lib/audio/`)

**Purpose**: Centralized audio management with spatial audio support

**Key Files**:
- `types.ts` - Type definitions for all audio-related types
- `AudioManager.ts` - Singleton audio manager with sound pooling

**Features**:
- Master volume control
- Category-based volume control (ambient, UI, robot, etc.)
- Spatial audio with 3D positioning
- Sound pooling for performance
- Easy to add new sounds via type system

**Usage**:
```typescript
import { useAudio } from "@/hooks/useAudio";

const { play, setMasterVolume } = useAudio();
await play("robot-move", { position: [0, 0, 5] });
```

### 2. Easter Egg System (`src/lib/easterEggs/`)

**Purpose**: Extensible system for hidden features and easter eggs

**Key Files**:
- `types.ts` - Type definitions for easter eggs
- `EasterEggManager.ts` - Central manager for all easter eggs

**Features**:
- Konami code detection
- Click counter (50 clicks = turbo mode)
- Console command detection
- Time-based triggers (midnight mode)
- Cursor inactivity detection
- Easy to register new easter eggs

**Adding New Easter Egg**:
```typescript
manager.register({
  id: "my-egg",
  trigger: "click-count",
  condition: (ctx) => ctx.clickCount >= 100,
  effect: async () => {
    // Your effect here
  },
});
```

### 3. Performance System (`src/lib/performance/`)

**Purpose**: Optimize performance based on device capabilities

**Key Files**:
- `LODManager.ts` - Level of Detail management

**Features**:
- Automatic device tier detection (high/medium/low/mobile)
- GPU detection
- Dynamic LOD based on distance
- Poly count limits
- Particle count limits

### 4. Responsive System (`src/lib/responsive/`)

**Purpose**: Detect device capabilities and adapt UI/UX

**Key Files**:
- `deviceDetection.ts` - Device capability detection

**Features**:
- Device type detection (desktop/tablet/mobile)
- Input method detection (mouse/touch/keyboard)
- WebGL support detection
- Spatial audio support detection
- Low-end device detection
- Auto-updates on resize

**Usage**:
```typescript
import { useDevice } from "@/hooks/useDevice";

const { type, supports3D, isLowEnd } = useDevice();
```

### 5. Robot System (`src/components/robot/`)

**Purpose**: Procedural robot generation and animations

**Key Files**:
- `ProceduralRobot.tsx` - Procedurally generated robot
- `RobotAnimations.tsx` - Animation system
- `RobotCompanion.tsx` - AI companion chat

**Features**:
- Zone-adaptive appearance
- Multiple animation states (idle, walking, pointing, etc.)
- Learning personality system
- Interactive companion

### 6. Console Commands (`src/lib/console/`)

**Purpose**: Browser console interaction system

**Features**:
- `robot.dance()` - Make robot dance
- `robot.wave()` - Make robot wave
- `robot.stats()` - Show robot stats
- Extensible command system

## Component Structure

```
src/
├── components/
│   ├── core/          # Core initialization components
│   ├── easterEggs/    # Easter egg UI handlers
│   ├── environment/   # 3D environment components
│   ├── hero/          # Hero section
│   ├── hub/           # Main navigation hub
│   ├── loading/       # Loading screens
│   ├── missions/      # Mission pages
│   ├── robot/         # Robot components
│   └── ui/            # Reusable UI components
├── hooks/             # React hooks
├── lib/               # Core libraries
│   ├── audio/         # Audio system
│   ├── console/       # Console commands
│   ├── easterEggs/    # Easter egg system
│   ├── performance/   # Performance utilities
│   └── responsive/    # Responsive utilities
└── data/              # Static data
```

## Adding New Features

### Adding a New Sound

1. Add sound ID to `src/lib/audio/types.ts`:
```typescript
export type SoundId = 
  | "existing-sound"
  | "my-new-sound";  // Add here
```

2. Add sound definition to `src/lib/audio/AudioManager.ts`:
```typescript
const SOUND_DEFINITIONS: Record<SoundId, Omit<SoundConfig, "id">> = {
  // ... existing sounds
  "my-new-sound": {
    category: "ui",
    volume: 0.5,
  },
};
```

3. Use it:
```typescript
await play("my-new-sound");
```

### Adding a New Easter Egg

1. Add easter egg ID to `src/lib/easterEggs/types.ts`
2. Register in `EasterEggManager.ts`:
```typescript
this.register({
  id: "my-egg",
  trigger: "click-count",
  condition: (ctx) => ctx.clickCount >= 100,
  effect: async () => {
    // Your effect
  },
});
```

### Adding a New Robot Animation

1. Add animation state to `RobotAnimations.tsx`:
```typescript
export type RobotAnimationState = 
  | "existing-state"
  | "my-new-animation";
```

2. Add handler function:
```typescript
function handleMyNewAnimation(robot: THREE.Group, time: number) {
  // Your animation logic
}
```

3. Add to switch statement in `useRobotAnimations`

## Performance Best Practices

1. **Use LOD Manager**: Check device tier before rendering complex 3D
2. **Lazy Load**: Use `useLazyLoad` hook for below-fold content
3. **Sound Pooling**: AudioManager handles this automatically
4. **Device Detection**: Use `useDevice` to adapt UI to device capabilities

## Type Safety

All systems use strict TypeScript types. When extending:
- Always update type definitions first
- Use discriminated unions for state
- Avoid `any` types (use proper types or `unknown`)

## Testing Strategy

1. **Unit Tests**: Test individual systems in isolation
2. **Integration Tests**: Test system interactions
3. **E2E Tests**: Test user flows
4. **Performance Tests**: Monitor FPS and load times

## Future Extensibility

The architecture is designed to easily support:
- New robot behaviors
- Additional easter eggs
- More audio categories
- New device types
- Additional performance optimizations
- New interaction patterns

