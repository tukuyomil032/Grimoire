# 11 — Blockly Integration

## Overview

Blockly provides the Scratch-style block programming interface for building MythicMobs skill logic. Custom blocks are defined for all MythicMobs components (triggers, conditions, mechanics, targeters).

## React Integration

Use `@blockly/react` or a custom React wrapper:

```tsx
// src/editor/blockly/workspace.tsx
import Blockly from 'blockly';
import { useEffect, useRef } from 'react';

export function BlocklyWorkspace({ onWorkspaceChange }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ws = Blockly.inject(containerRef.current, {
      toolbox: mythicToolbox,
      theme: grimoireDarkTheme,
      renderer: 'zelos',  // rounded block style
      zoom: { controls: true, wheel: true, startScale: 0.9 },
      move: { scrollbars: true, drag: true, wheel: true },
      grid: { spacing: 20, length: 3, colour: '#2D2D4A', snap: true },
    });
    ws.addChangeListener((e) => onWorkspaceChange(e, ws));
    workspaceRef.current = ws;
    return () => ws.dispose();
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
```

## Custom Block Definitions

### Block Color Scheme

| Block Type | Hue | Hex |
|------------|-----|-----|
| Trigger | 270 | Purple (#7C3AED) |
| Condition | 40 | Amber (#F59E0B) |
| Mechanic | 190 | Cyan (#06B6D4) |
| Targeter | 130 | Green (#10B981) |
| Logic (AND/OR) | 210 | Blue (#3B82F6) |
| Delay/Flow | 330 | Pink (#EC4899) |

### Trigger Block Example

```typescript
Blockly.Blocks['mythic_trigger'] = {
  init() {
    this.appendDummyInput()
      .appendField('when')
      .appendField(new Blockly.FieldDropdown([
        ['onAttack', 'onAttack'],
        ['onDamaged', 'onDamaged'],
        ['onSpawn', 'onSpawn'],
        ['onDeath', 'onDeath'],
        ['onTimer', 'onTimer'],
        // ... all 32 triggers
      ]), 'TRIGGER');
    this.appendStatementInput('CONDITIONS')
      .setCheck('Condition');
    this.appendStatementInput('ACTIONS')
      .setCheck('Mechanic');
    this.setColour(270);
    this.setTooltip('Trigger event for this skill');
  }
};
```

### Mechanic Block Example (schema-driven)

```typescript
function createMechanicBlock(schema: MechanicSchema) {
  Blockly.Blocks[`mythic_mechanic_${schema.name}`] = {
    init() {
      const input = this.appendDummyInput()
        .appendField(schema.name);

      for (const param of schema.parameters) {
        switch (param.type) {
          case 'number':
            input.appendField(param.name + '=')
              .appendField(new Blockly.FieldNumber(param.default ?? 0, param.min, param.max), param.name);
            break;
          case 'enum':
            input.appendField(param.name + '=')
              .appendField(new Blockly.FieldDropdown(
                param.enumValues!.map(v => [v, v])
              ), param.name);
            break;
          case 'boolean':
            input.appendField(param.name + '=')
              .appendField(new Blockly.FieldCheckbox(param.default ? 'TRUE' : 'FALSE'), param.name);
            break;
          default:
            input.appendField(param.name + '=')
              .appendField(new Blockly.FieldTextInput(String(param.default ?? '')), param.name);
        }
      }

      this.appendValueInput('TARGETER').setCheck('Targeter');
      this.setPreviousStatement(true, 'Mechanic');
      this.setNextStatement(true, 'Mechanic');
      this.setColour(190);
    }
  };
}
```

## Toolbox Configuration

```typescript
const mythicToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Triggers',
      colour: '270',
      contents: [{ kind: 'block', type: 'mythic_trigger' }]
    },
    {
      kind: 'category',
      name: 'Conditions',
      colour: '40',
      contents: [
        { kind: 'category', name: 'Entity', contents: [...] },
        { kind: 'category', name: 'Location', contents: [...] },
        { kind: 'category', name: 'Compare', contents: [...] },
        { kind: 'category', name: 'Logic', contents: [...] },
      ]
    },
    {
      kind: 'category',
      name: 'Mechanics',
      colour: '190',
      contents: [
        { kind: 'category', name: 'Damage', contents: [...] },
        { kind: 'category', name: 'Movement', contents: [...] },
        { kind: 'category', name: 'Particle', contents: [...] },
        { kind: 'category', name: 'Projectile', contents: [...] },
        // ... all categories
      ]
    },
    {
      kind: 'category',
      name: 'Targeters',
      colour: '130',
      contents: [
        { kind: 'category', name: 'Single Entity', contents: [...] },
        { kind: 'category', name: 'Multi Entity', contents: [...] },
        { kind: 'category', name: 'Location', contents: [...] },
      ]
    }
  ]
};
```

## Dark Theme

```typescript
const grimoireDarkTheme = Blockly.Theme.defineTheme('grimoire-dark', {
  name: 'grimoire-dark',
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: '#0A0A0F',
    toolboxBackgroundColour: '#12121A',
    toolboxForegroundColour: '#F1F1F6',
    flyoutBackgroundColour: '#1A1A2E',
    flyoutForegroundColour: '#F1F1F6',
    flyoutOpacity: 0.95,
    scrollbarColour: '#4A4A6A',
    scrollbarOpacity: 0.5,
    insertionMarkerColour: '#7C3AED',
    insertionMarkerOpacity: 0.5,
  },
  fontStyle: {
    family: 'Inter, sans-serif',
    weight: '500',
    size: 12,
  },
});
```

## Block → Internal JSON Generator

Each Blockly workspace change triggers a traversal that produces the internal `Skill` JSON model:

```typescript
function generateSkillFromWorkspace(workspace: Blockly.WorkspaceSvg): Skill {
  const triggerBlock = workspace.getTopBlocks(false)
    .find(b => b.type === 'mythic_trigger');
  if (!triggerBlock) return emptySkill();

  return {
    id: generateId(),
    name: workspace.name ?? 'NewSkill',
    conditions: extractConditions(triggerBlock.getInputTargetBlock('CONDITIONS')),
    actions: extractActions(triggerBlock.getInputTargetBlock('ACTIONS')),
  };
}
```

This JSON model is pushed to the Zustand store, which triggers YAML generation and React Flow updates.
