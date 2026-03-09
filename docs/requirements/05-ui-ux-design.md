# 05 — UI/UX Design

## Design Philosophy

Grimoire's interface draws inspiration from **Next.js** and **ElectroBun** official sites — modern developer-tool aesthetics with dark themes, subtle animations, and smooth transitions. The goal is a professional, trust-inspiring interface that makes complex MythicMobs configuration feel accessible.

## Theme

- **Base**: Dark theme exclusively (dark gray backgrounds with subtle gradients)
- **Primary accent**: Purple/indigo (#7C3AED → #4F46E5) — evokes magic/grimoire imagery
- **Secondary accent**: Cyan/teal (#06B6D4) — for success states, active connections
- **Error**: Red (#EF4444)
- **Warning**: Amber (#F59E0B)
- **Surface colors**:
  - Background: `#0A0A0F`
  - Surface 1: `#12121A`
  - Surface 2: `#1A1A2E`
  - Surface 3: `#252540`
  - Border: `#2D2D4A`
- **Text**:
  - Primary: `#F1F1F6`
  - Secondary: `#9CA3AF`
  - Muted: `#6B7280`

## Typography

- **Font**: Inter (sans-serif) for UI, JetBrains Mono for code/YAML preview
- **Scale**: 12px (small), 14px (body), 16px (subhead), 20px (heading), 28px (title)

## Icons

**Lucide React** — Clean line icons throughout. No emoji anywhere in the application. Icon weight and style must remain consistent across all UI elements.

## Animations (Framer Motion + spell-ui)

### Page Transitions
```
AnimatePresence + motion.div
- Enter: opacity 0→1, y 8→0, duration 200ms
- Exit: opacity 1→0, y 0→-8, duration 150ms
```

### Panel Animations
- Sidebar open/close: `width` spring animation (stiffness: 300, damping: 30)
- Property panel slide: `x` spring from right
- Modal overlay: `opacity` fade + `scale` 0.95→1.0
- Dropdown menus: `opacity` + `y` offset, 150ms ease-out

### spell-ui Components Usage
| Component | Usage Location |
|-----------|---------------|
| `BlurReveal` | Welcome screen, onboarding, about dialog |
| `ShimmerText` | Loading states, section titles on hover |
| `FlowButton` | Primary action buttons (Export, Generate) |
| `SlideUpText` | Panel header transitions |
| `AnimatedCheckbox` | Settings toggles |
| `Marquee` | Skill template gallery scrolling |
| `GradientWaveText` | App title in topbar |
| `RichButton` | Secondary action buttons |
| `Kbd` | Keyboard shortcut indicators |
| `BarsSpinner` | Loading spinners |
| `LabelInput` | Form inputs throughout editors |

### Micro-interactions
- Button hover: subtle scale (1.02) + border glow
- List items: hover background transition 150ms
- Block drag: shadow elevation increase + slight scale
- Node connection: animated dashed line during drag

## Main Layout

```
┌──────────────────────────────────────────────────────────┐
│  Topbar (h: 40px)                                        │
│  ┌─Logo──┬─File─Edit─View─Help──────┬─🔍─┬─🌐─┬─⚙─┐   │
│  └───────┴──────────────────────────┴────┴────┴────┘    │
├────────┬─────────────────────────────────────────────────┤
│Sidebar │  Main Editor Area (rc-dock managed)             │
│(w:48px)│                                                 │
│        │  ┌─────────────────┬───────────────────────┐   │
│ Skills │  │  Blockly Panel  │  React Flow Panel     │   │
│ Mobs   │  │                 │                       │   │
│ Items  │  │  [blocks here]  │  [nodes here]         │   │
│ ───    │  │                 │                       │   │
│ Search │  ├─────────────────┴───────────────────────┤   │
│ ───    │  │  YAML Preview Panel (h: 200px)          │   │
│ Presets│  │  ┌─────────────────────────────────────┐ │   │
│ Layout │  │  │ skills:                             │ │   │
│        │  │  │   - damage{amount=20} @target       │ │   │
│        │  │  └──────────────────────────Copy Export─┘ │   │
│        │  └─────────────────────────────────────────┘   │
├────────┴─────────────────────────────────────────────────┤
│  Status Bar (h: 24px)  │ Skill: Fireball │ EN/JA │ v0.1 │
└──────────────────────────────────────────────────────────┘
```

All panels within the main editor area are managed by rc-dock and can be:
- Rearranged via drag-and-drop
- Detached into floating windows
- Tabbed together
- Resized by dragging dividers
- Saved/restored as layout presets

## Responsive Behavior

- **Minimum window**: 1024×768px
- **Default window**: 1400×900px
- **Panel collapse**: Sidebar collapses to icon-only (48px) or fully hidden
- **Split views**: Draggable dividers between all panel pairs

## Accessibility

- Keyboard navigation for all menus and panels
- `Kbd` component from spell-ui for shortcut visualization
- Focus rings on interactive elements
- Sufficient color contrast (WCAG AA minimum)
