# 02 — Tech Stack

## Core

| Library | Version | Role | Reason |
|---------|---------|------|--------|
| **Tauri** | v2 | Desktop app framework | Lightweight (~600KB), Rust backend, native webview, cross-platform |
| **Vite** | ^7 | Bundler / dev server | Blazing fast HMR, excellent Tauri compatibility (no SSR needed) |
| **React** | ^19 | UI framework | Component-based, huge ecosystem, Blockly/ReactFlow compatibility |
| **TypeScript** | ~5.8 | Language | Type safety across the entire codebase |
| **Tailwind CSS** | v4 | Styling | Utility-first, design-token ready, Vite plugin integration |

## Editor

| Library | Role | Reason |
|---------|------|--------|
| **Blockly** | Scratch-style block editor | Google-backed, mature, extensible block definitions, code generation |
| **React Flow** (`@xyflow/react`) | Node-based flow editor | De-facto standard for React node editors, custom nodes, minimap, zoom |
| **rc-dock** | Docking layout system | Adobe-style panel docking, tabs, floating windows, layout serialization |

## UI

| Library | Role | Reason |
|---------|------|--------|
| **shadcn/ui** | Base UI components | Tailwind-native, copy-paste model, highly customizable |
| **spell-ui** | Animation components | BlurReveal, ShimmerText, FlowButton, AnimatedCheckbox, etc. |
| **Lucide React** | Icons | Clean line icons, consistent style (no emoji — keeps UI professional) |
| **Framer Motion** | Animations | Page transitions, hover effects, modal animations, drag feedback |

## State & Data

| Library | Role | Reason |
|---------|------|--------|
| **Zustand** | State management | Lightweight, minimal boilerplate, Tauri-friendly |
| **js-yaml** | YAML generation | MythicMobs YAML output from internal JSON models |
| **React Router** | Routing | URL-style navigation between Skill/Mob/Item editors |
| **i18next** + **react-i18next** | Internationalization | English default, Japanese support |

## Storage

| Library | Role | Reason |
|---------|------|--------|
| **@tauri-apps/plugin-store** | Persistent settings | User preferences, layout presets, recent projects |
| **@tauri-apps/plugin-fs** | File system access | Read/write MythicMobs YAML files, project save/load |
| **@tauri-apps/plugin-dialog** | File dialogs | Open/save file pickers |

## Dev Tools

| Tool | Role |
|------|------|
| **bun** | Package manager (unified with husky scripts) |
| **ESLint** + **typescript-eslint** | Linting |
| **Prettier** | Formatting |
| **Husky** + **lint-staged** | Git hooks |
| **rustfmt** | Rust formatting |

## Explicitly Not Used

| Library | Reason |
|---------|--------|
| **Next.js** | SSR unnecessary; Vite is lighter and better suited for Tauri |
| **Express / NestJS** | No backend API server needed — this is a local desktop app |
| **Redux** | Zustand is lighter with lower learning curve |
| **Electron** | Tauri is significantly smaller (600KB vs 150MB+) and more performant |
| **Emoji icons** | Create a cheap appearance — Lucide provides consistent professional icons |
