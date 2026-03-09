# 12 — React Flow Integration

## Overview

React Flow (`@xyflow/react`) provides the node-based graph editor for visualizing relationships between multiple MythicMobs skills, showing skill call chains, aura dependencies, and projectile hit skill links.

## Role Separation

| Blockly | React Flow |
|---------|------------|
| Internal structure of ONE skill | Relationships between MULTIPLE skills |
| Trigger → Condition → Mechanic | SkillA → calls → SkillB |
| Linear/nested block stacking | Free-form graph connections |
| Editing parameters | Viewing architecture |

## Custom Node Types

### SkillNode

```tsx
interface SkillNodeData {
  skillId: string;
  name: string;
  triggerType: string;
  actionCount: number;
  hasConditions: boolean;
}
```

Visual: Purple-bordered card showing skill name, trigger badge, and action count.

### MechanicGroupNode

Collapsed representation of a skill's mechanic chain, shown as a compact list inside the SkillNode.

### ConditionBadge

Small indicator on SkillNode showing condition status (amber dot if conditions exist).

## Edge Types

### SkillCallEdge

When a skill contains `skill{s=OtherSkill}` mechanic, draw an animated edge:
- Dashed line with flowing animation
- Arrow at target
- Label showing the mechanic that creates the link (e.g., "projectile onHit")

### AuraDependencyEdge

When a skill uses aura mechanics (`onAttack`, `onDamaged`, etc.) with skill references:
- Dotted line
- Colored by aura type

## Workspace Setup

```tsx
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';

export function FlowWorkspace() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useFlowStore();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={customNodeTypes}
      edgeTypes={customEdgeTypes}
      fitView
      colorMode="dark"
      defaultEdgeOptions={{ animated: true }}
    >
      <Background color="#2D2D4A" gap={20} />
      <Controls />
      <MiniMap
        nodeColor="#7C3AED"
        maskColor="rgba(10, 10, 15, 0.8)"
        style={{ background: '#12121A' }}
      />
    </ReactFlow>
  );
}
```

## Synchronization with Blockly

1. User edits skill in Blockly → internal JSON model updates in Zustand store
2. Store change triggers React Flow node update:
   - SkillNode data refreshed
   - Edges recalculated by scanning all skills for `skill{s=...}` references
3. User clicks SkillNode in React Flow → Blockly workspace loads that skill's blocks

## Auto Layout

Use `dagre` or `elkjs` for automatic node positioning:
- Skills are laid out top-to-bottom
- Called skills are positioned below their callers
- Aura dependencies shown as horizontal connections
- User can manually reposition after auto-layout

## Interactions

| Action | Result |
|--------|--------|
| Click node | Load skill in Blockly, show in Property Panel |
| Double-click node | Focus Blockly on this skill (zoom-to-fit) |
| Drag from output port | Create `skill{s=...}` reference to target node |
| Delete edge | Remove `skill{s=...}` mechanic from source skill |
| Right-click node | Context menu: Edit, Duplicate, Delete, Export YAML |
| Scroll wheel | Zoom in/out |
| Cmd/Ctrl+Click | Multi-select nodes |

## Dark Theme Customization

```css
.react-flow {
  --xy-background-color: #0A0A0F;
  --xy-node-border-radius: 8px;
  --xy-minimap-background: #12121A;
  --xy-controls-button-background: #1A1A2E;
  --xy-controls-button-color: #F1F1F6;
}
```
