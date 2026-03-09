# 15 — Layout System

## Overview

Grimoire implements a customizable docking layout system inspired by **Adobe Photoshop** and **Adobe Illustrator**. Users can rearrange, detach, and save panel configurations to match their workflow.

## Reference: Adobe Photoshop Workspace

Adobe Photoshop's workspace system offers:
- **Dockable panels**: Any panel can be docked to edges, stacked as tabs, or float freely
- **Workspace presets**: "Photography", "Painting", "3D" — preconfigured layouts
- **Save custom workspaces**: Users save their own panel arrangements
- **Reset workspace**: One-click return to default layout
- **Multi-monitor support**: Panels can be dragged to separate monitors

Grimoire replicates this paradigm for a code/editor tool context.

## Implementation: rc-dock

[rc-dock](https://github.com/nicedoc/rc-dock) provides:
- Tab-based docking
- Drag-and-drop panel rearrangement
- Floating (undocked) panels
- Split views (horizontal/vertical)
- Serializable layout state
- Custom tab rendering

### Layout Definition

```typescript
import { DockLayout, LayoutData } from 'rc-dock';

const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 400,
        children: [
          {
            tabs: [
              { id: 'blockly', title: 'Block Editor', content: <BlocklyWorkspace /> },
            ],
          },
        ],
      },
      {
        mode: 'vertical',
        size: 600,
        children: [
          {
            tabs: [
              { id: 'reactflow', title: 'Skill Flow', content: <FlowWorkspace /> },
            ],
            size: 600,
          },
          {
            tabs: [
              { id: 'yaml', title: 'YAML Preview', content: <YamlPreview /> },
            ],
            size: 250,
          },
        ],
      },
      {
        mode: 'vertical',
        size: 300,
        children: [
          {
            tabs: [
              { id: 'properties', title: 'Properties', content: <PropertyPanel /> },
              { id: 'mechanics', title: 'Mechanics', content: <MechanicsBrowser /> },
            ],
          },
        ],
      },
    ],
  },
};
```

## Panels

| Panel ID | Title | Description |
|----------|-------|-------------|
| `blockly` | Block Editor | Blockly workspace for skill structure |
| `reactflow` | Skill Flow | React Flow workspace for skill relationships |
| `yaml` | YAML Preview | Real-time generated YAML output |
| `properties` | Properties | Selected block/node parameter editor |
| `mechanics` | Mechanics Browser | Searchable mechanics catalog |
| `mob-editor` | Mob Editor | Mob definition form (Phase 2) |
| `item-editor` | Item Editor | Item definition form (Phase 2) |
| `simulation` | Simulation | Skill preview canvas (Phase 5) |
| `templates` | Templates | Skill template gallery |
| `console` | Console | Validation messages and logs |

## Layout Presets

### Built-in Presets

| Preset | Description | Layout |
|--------|-------------|--------|
| **Default** | Balanced 3-column layout | Blockly \| ReactFlow + YAML \| Properties |
| **Skill Focus** | Maximized block editing | Blockly (full width) + YAML (bottom) |
| **Flow View** | Maximized graph view | ReactFlow (full width) + Properties (right) |
| **Compact** | Minimal panel set | Blockly + YAML only |
| **Wide Screen** | Optimized for ultrawide | All panels side-by-side |

### Custom Presets

Users can:
1. Arrange panels to their preference
2. **Save Workspace** → Name the layout → Stored in `@tauri-apps/plugin-store`
3. **Load Workspace** → Select from saved layouts
4. **Delete Workspace** → Remove saved layout

### Storage Format

```typescript
interface LayoutPreset {
  id: string;
  name: string;
  isBuiltIn: boolean;
  layout: LayoutData;  // rc-dock serialized layout
  createdAt: string;
}
```

Presets are serialized to JSON and stored in Tauri's app data directory.

## Multi-Window Support (Phase 4)

### Tauri WebviewWindow API

Panels can be detached into separate OS windows using Tauri's multi-window capability:

```typescript
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

async function detachPanel(panelId: string) {
  const panel = new WebviewWindow(`panel-${panelId}`, {
    url: `/panel/${panelId}`,
    title: panelTitle[panelId],
    width: 600,
    height: 400,
    decorations: true,
    resizable: true,
  });
}
```

### Communication

Detached windows communicate with the main window via Tauri events:
- `panel:state-update` — Sync editor state changes
- `panel:selection-change` — Propagate block/node selection
- `panel:layout-change` — Notify layout changes

### Reattach

Closing a detached window returns the panel to its previous dock position.

## View Menu Integration

```
View
├── Layout
│   ├── Default
│   ├── Skill Focus
│   ├── Flow View
│   ├── Compact
│   ├── Wide Screen
│   ├── ──────────
│   ├── Save Current Layout...
│   ├── Manage Layouts...
│   └── Reset to Default
├── Panels
│   ├── ✓ Block Editor
│   ├── ✓ Skill Flow
│   ├── ✓ YAML Preview
│   ├── ✓ Properties
│   ├──   Mechanics Browser
│   ├──   Console
│   └──   Templates
└── Detach Panel →
    ├── Block Editor
    ├── Skill Flow
    └── YAML Preview
```

## rc-dock Theming

Custom dark theme for rc-dock tabs and panels:

```css
.dock-layout {
  --dock-tab-background: #12121A;
  --dock-tab-active: #1A1A2E;
  --dock-tab-color: #9CA3AF;
  --dock-tab-active-color: #F1F1F6;
  --dock-panel-background: #0A0A0F;
  --dock-divider-color: #2D2D4A;
  --dock-drop-indicator: #7C3AED;
}
```
