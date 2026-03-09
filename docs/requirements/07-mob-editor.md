# 07 — Mob Editor

## Overview

The Mob Editor provides a form-based interface for defining MythicMobs mob configurations. It generates the YAML that goes into `plugins/MythicMobs/Mobs/*.yml`.

## Phase

Phase 2 — After Skill Editor MVP is complete.

## Editor Layout

A scrollable form panel with collapsible sections:

```
┌─────────────────────────────────────┐
│ Mob Editor: [InternalName]          │
├─────────────────────────────────────┤
│ ▼ Basic Info                        │
│   Type: [ZOMBIE ▾]                  │
│   Display: [<red>Boss</red>]        │
│   Health: [100]                     │
│   Damage: [20]                      │
│   Armor: [25]                       │
│   Faction: [Undead]                 │
│   Template: [BaseMob ▾]            │
├─────────────────────────────────────┤
│ ▼ Boss Bar                          │
│   Enabled: [✓]                      │
│   Title: [Boss]                     │
│   Range: [20]                       │
│   Color: [RED ▾]                    │
│   Style: [NOTCHED_6 ▾]             │
├─────────────────────────────────────┤
│ ▼ Options                           │
│   MovementSpeed: [0.025]            │
│   Despawn: [PERSISTENT ▾]           │
│   ...                               │
├─────────────────────────────────────┤
│ ▼ Modules                           │
│   ThreatTable: [✓]                  │
│   ImmunityTable: [ ]                │
├─────────────────────────────────────┤
│ ▼ AI                                │
│   Goals: [+ Add Goal]              │
│   Targets: [+ Add Target]          │
├─────────────────────────────────────┤
│ ▼ Equipment                         │
│   [HEAD    ] [diamond_helmet    ]   │
│   [HAND    ] [diamond_sword     ]   │
│   [+ Add Slot]                      │
├─────────────────────────────────────┤
│ ▼ Drops                             │
│   [diamond] [32] [100%]             │
│   [+ Add Drop]                      │
├─────────────────────────────────────┤
│ ▼ Damage Modifiers                  │
│   [ENTITY_ATTACK] [0.0]            │
│   [PROJECTILE] [1.25]              │
│   [+ Add Modifier]                  │
├─────────────────────────────────────┤
│ ▼ Level Modifiers                   │
│   Damage: [2]                       │
│   Health: [0.25]                    │
├─────────────────────────────────────┤
│ ▼ Kill Messages                     │
│   [<caster.name> destroyed ...]     │
│   [+ Add Message]                   │
├─────────────────────────────────────┤
│ ▼ Variables                         │
│   [SomeVar] = [something]           │
│   [NumVar] = [int/42]              │
│   [+ Add Variable]                  │
├─────────────────────────────────────┤
│ ▼ Skills                            │
│   [Skill Picker → Skill Editor]    │
│   skill{s=Fireball} @target ~onAttack│
│   [+ Add Skill Line]               │
└─────────────────────────────────────┘
```

## Key Features

- **Entity Type Picker**: Searchable dropdown for all Minecraft entity types
- **Template Inheritance**: Select a parent mob definition; inherited fields shown as dimmed
- **Equipment Drag-and-Drop**: Visual slot-based equipping
- **Skill Integration**: "Add Skill" opens the Skill Editor; references are linked
- **MiniMessage Preview**: Display name and lore render with MiniMessage formatting
- **YAML Preview**: Right panel shows generated mob YAML in real-time
