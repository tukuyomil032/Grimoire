# ADR 004 — Docking Layout System

## Status

Accepted

## Context

Grimoire has many panels (Block Editor, Flow Editor, YAML Preview, Properties, Mechanics Browser, etc.). Users need flexibility to arrange these panels to match their workflow, similar to professional creative tools.

Options considered:
1. **Fixed layout** — Static panel positions, no customization
2. **Tab-based navigation** — Switch between full-screen views
3. **Docking layout** — Adobe Photoshop/Illustrator-style panel management
4. **Free-floating windows only** — Each panel as an independent window

## Decision

**Implement a docking layout system using rc-dock**, with multi-window support via Tauri's WebviewWindow API in a later phase.

## Rationale

### Why docking (Adobe-style)?
- Users of complex tools (IDEs, Photoshop, Blender) expect panel customization
- Different tasks benefit from different layouts (skill building vs. reviewing vs. mob editing)
- Professional feel that matches the tool's ambition
- Layout presets reduce setup time for common workflows

### Why rc-dock specifically?
| Library | Pros | Cons |
|---------|------|------|
| `rc-dock` | Lightweight, React-native, serializable layout, tabs, floating panels | Smaller community |
| `react-mosaic` | Used by Palantir, simpler API | No floating panels, limited tab support |
| `golden-layout` | Full-featured, mature | jQuery-era API, complex React integration |
| `flexlayout-react` | Good React support | Less maintained |

rc-dock provides the best balance of features (tabs, dock, float, serialize) with clean React integration.

### Multi-window (Phase 4)
- Tauri's `WebviewWindow` API allows creating real OS windows
- Panels can be fully detached to separate monitors (critical for productivity)
- Communication via Tauri events maintains state consistency
- Deferred to Phase 4 because it requires additional routing and state sync complexity

### Why not fixed layout?
- Too restrictive for a tool with 8+ panels
- Different screen sizes and workflows need different arrangements
- Users of creative tools actively expect this feature

## Consequences

- rc-dock adds ~50KB to bundle size (acceptable)
- Layout serialization must be robust (corrupt layouts fallback to default)
- rc-dock theming requires CSS overrides for dark theme
- Multi-window adds significant complexity in Phase 4 (Tauri events, route-based panel rendering)
- Need to handle Blockly/React Flow lifecycle when panels are moved/hidden
