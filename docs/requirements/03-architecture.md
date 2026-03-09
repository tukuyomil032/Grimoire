# 03 — Architecture

## Directory Structure

```
grimoire/
├── docs/                           # Requirements & ADRs
├── public/                         # Static assets
├── src/
│   ├── app/                        # Routing & top-level layout
│   │   ├── layout.tsx              # Root layout with docking system
│   │   └── routes.tsx              # React Router route definitions
│   ├── components/
│   │   ├── ui/                     # shadcn/ui + spell-ui wrappers
│   │   ├── panels/                 # Dockable panel containers
│   │   │   ├── yaml-preview.tsx    # YAML output preview
│   │   │   ├── property-panel.tsx  # Selected block/node properties
│   │   │   └── mechanics-browser.tsx # Searchable mechanics catalog
│   │   ├── topbar/                 # Application menu bar
│   │   │   ├── topbar.tsx
│   │   │   ├── menu-file.tsx
│   │   │   ├── menu-edit.tsx
│   │   │   └── menu-view.tsx
│   │   ├── sidebar/                # Navigation sidebar
│   │   │   └── sidebar.tsx
│   │   └── common/                 # Shared components
│   ├── editor/
│   │   ├── blockly/                # Blockly workspace & custom blocks
│   │   │   ├── blocks/             # MythicMobs custom block definitions
│   │   │   │   ├── triggers.ts     # 32 trigger blocks
│   │   │   │   ├── conditions.ts   # Condition blocks
│   │   │   │   ├── mechanics.ts    # Mechanic blocks
│   │   │   │   └── targeters.ts    # Targeter blocks
│   │   │   ├── generators/         # Block → Internal JSON converters
│   │   │   │   └── skill-generator.ts
│   │   │   ├── toolbox/            # Toolbox category definitions
│   │   │   │   └── toolbox.ts
│   │   │   ├── theme.ts            # Dark theme for Blockly
│   │   │   └── workspace.tsx       # Blockly React wrapper
│   │   ├── reactflow/              # React Flow node editor
│   │   │   ├── nodes/              # Custom node types
│   │   │   │   ├── skill-node.tsx
│   │   │   │   ├── mechanic-node.tsx
│   │   │   │   └── condition-node.tsx
│   │   │   ├── edges/              # Custom edge types
│   │   │   │   └── animated-edge.tsx
│   │   │   └── workspace.tsx       # React Flow wrapper
│   │   ├── skill/                  # Skill Editor composite view
│   │   │   └── skill-editor.tsx
│   │   ├── mob/                    # Mob Editor
│   │   │   └── mob-editor.tsx
│   │   └── item/                   # Item Editor
│   │       └── item-editor.tsx
│   ├── generators/
│   │   └── yaml/                   # Internal JSON → MythicMobs YAML
│   │       ├── skill-yaml.ts
│   │       ├── mob-yaml.ts
│   │       └── item-yaml.ts
│   ├── models/                     # TypeScript type definitions
│   │   ├── skill.ts
│   │   ├── mob.ts
│   │   ├── item.ts
│   │   ├── mechanic.ts
│   │   ├── condition.ts
│   │   ├── trigger.ts
│   │   └── targeter.ts
│   ├── schema/                     # MythicMobs JSON Schema definitions
│   │   ├── mechanics/
│   │   │   ├── damage.ts
│   │   │   ├── movement.ts
│   │   │   ├── particle.ts
│   │   │   └── index.ts
│   │   ├── conditions/
│   │   │   └── index.ts
│   │   ├── triggers/
│   │   │   └── index.ts
│   │   └── targeters/
│   │       └── index.ts
│   ├── store/                      # Zustand stores
│   │   ├── editor-store.ts         # Current editor state
│   │   ├── project-store.ts        # Project file management
│   │   ├── settings-store.ts       # User preferences
│   │   └── layout-store.ts         # Panel layout state
│   ├── locales/                    # i18n translation files
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── editor.json
│   │   │   └── mechanics.json
│   │   └── ja/
│   │       ├── common.json
│   │       ├── editor.json
│   │       └── mechanics.json
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-yaml-generator.ts
│   │   └── use-blockly-workspace.ts
│   ├── lib/                        # Utility libraries
│   │   ├── i18n.ts                 # i18next configuration
│   │   └── utils.ts                # General utilities (cn, etc.)
│   ├── styles/
│   │   └── globals.css             # Tailwind imports, global overrides
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── vite-env.d.ts              # Vite type declarations
├── src-tauri/
│   ├── src/
│   │   ├── commands/               # Tauri IPC commands
│   │   │   ├── file_io.rs          # Read/write YAML files
│   │   │   └── yaml_export.rs      # Batch export
│   │   ├── lib.rs
│   │   └── main.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User Interaction                   │
│         (drag blocks, connect nodes, edit forms)      │
└──────────────┬──────────────────────┬────────────────┘
               ▼                      ▼
┌──────────────────────┐  ┌──────────────────────────┐
│   Blockly Workspace  │  │  React Flow Workspace    │
│  (Trigger/Condition/  │  │  (Skill flow graph,      │
│   Mechanic blocks)    │  │   multi-skill relations) │
└──────────┬───────────┘  └──────────┬───────────────┘
           ▼                          ▼
┌─────────────────────────────────────────────────────┐
│              Zustand Editor Store                     │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Internal JSON Model (Skill / Mob / Item)       │ │
│  │  - Source of truth for all editor state          │ │
│  │  - Bi-directional sync with both editors        │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────┬──────────────────────┬────────────────┘
               ▼                      ▼
┌──────────────────────┐  ┌──────────────────────────┐
│   YAML Generator     │  │   Property Panel         │
│  (js-yaml dump)      │  │  (auto-generated forms)  │
└──────────┬───────────┘  └──────────────────────────┘
           ▼
┌──────────────────────┐
│   YAML Preview       │
│  (syntax highlighted) │
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│  File Export (Tauri)  │
│  .yml files to disk   │
└──────────────────────┘
```

## Layer Separation Principles

1. **UI Layer** (Blockly / React Flow / Panels) — Only reads/writes the Zustand store
2. **Model Layer** (Zustand stores) — Single source of truth; TypeScript interfaces enforce shape
3. **Generator Layer** (YAML generators) — Pure functions: `InternalModel → string`
4. **Schema Layer** (MythicMobs schemas) — Declarative JSON defining every mechanic/condition/trigger/targeter
5. **Platform Layer** (Tauri commands) — File I/O, window management, system integration

Each layer depends only on the layers below it. UI never directly generates YAML; generators never touch the DOM.

## Key Architectural Decisions

- **Schema-driven GUI**: All MythicMobs components are defined as JSON schemas. The GUI auto-generates forms and blocks from these schemas. Adding a new mechanic = adding one schema entry.
- **Blockly for structure, React Flow for flow**: Blockly handles the linear Trigger→Condition→Mechanic pipeline. React Flow handles multi-skill relationships and complex branching.
- **Docking layout system**: Adobe-style dockable panels via `rc-dock` enable users to customize their workspace.
- **Offline-first**: No server required. All data stays local. Tauri handles file system access.
