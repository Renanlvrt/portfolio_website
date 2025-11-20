# Interactive Robotic Portfolio

An immersive, AI-driven portfolio experience built with Next.js, React Three Fiber, and Framer Motion.

## Features

- **3D Interactive Navigation Hub** - Navigate through missions using a 3D autonomous AI scout interface
- **Loading Screen** - EKG-style animated loading sequence
- **Custom Cursor** - Robotic HUD-style cursor with crosshair targeting
- **Keyboard Navigation** - Full keyboard support (1-5 for missions, arrows for selection, ? for help)
- **HUD Overlay** - Real-time system status and telemetry
- **Mission Pages** - Individual pages for each project/mission
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D graphics
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
interactive_portfolio/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   │   ├── hero/         # Hero section
│   │   ├── hub/          # 3D navigation hub
│   │   ├── missions/     # Mission deck
│   │   ├── loading/      # Loading screen
│   │   └── ui/           # UI components
│   ├── data/             # Data definitions
│   └── hooks/            # Custom hooks
```

## Keyboard Shortcuts

- `1-5` - Navigate to mission
- `↑↓` - Select mission
- `Enter` - Open selected mission
- `Esc` - Return to hub
- `?` or `H` - Toggle help

## License

MIT
