# ADR 001 — Scratch-style Block + Node-based Flow Hybrid

## Status

Accepted

## Context

MythicMobs skills have a dual nature:
1. **Linear structure**: Each skill is a pipeline: Trigger → Conditions → Mechanics (sequential)
2. **Graph relationships**: Skills reference other skills (`skill{s=OtherSkill}`), creating a dependency graph

We considered three editor approaches:
- **Node editor only** (React Flow)
- **Block editor only** (Blockly/Scratch-style)
- **Hybrid** (both)

## Decision

**Adopt a hybrid approach**: Blockly for individual skill structure, React Flow for multi-skill relationships.

## Rationale

### Blockly (Scratch-style) for skill internals
- MythicMobs' Trigger→Condition→Mechanic pipeline maps directly to vertically stacking blocks
- Block connections enforce valid syntax — **zero syntax errors by design**
- Parameters as form inputs in blocks eliminate typos
- Lower learning curve for users unfamiliar with programming
- Matches the mental model of "stacking actions in order"

### React Flow for skill relationships
- Multi-skill call chains (e.g., projectile hitting → calls another skill) are naturally graph-shaped
- Aura dependencies create non-linear relationships
- Provides a high-level architecture view of all skills in a project
- Supports zoom, minimap, and pan for large skill sets

### Why not pure node editor?
- Individual skills are sequential, not graph-shaped — forcing them into nodes adds unnecessary complexity
- Node editors have higher learning curves
- Connecting individual mechanics as separate nodes creates visual clutter

### Why not pure Blockly?
- Multi-skill relationships are awkward in block form
- No way to see the "big picture" of how skills interconnect
- Blockly lacks built-in graph visualization

## Consequences

- Two distinct editor components to maintain
- Need synchronization logic between Blockly and React Flow via Zustand store
- Users learn two interaction paradigms (acceptable given their complementary roles)
- More complex initial development, but superior UX for both simple and complex use cases
