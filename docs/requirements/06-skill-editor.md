# 06 — Skill Editor (MVP)

## Overview

The Skill Editor is the first and most critical feature — the MVP. It enables users to visually construct MythicMobs skills using a hybrid Scratch-style block editor (Blockly) and node-based flow editor (React Flow), with real-time YAML generation.

## Editor Composition

The Skill Editor view is composed of four dockable panels:

1. **Blockly Workspace** (left) — Build individual skill logic with blocks
2. **React Flow Workspace** (right) — Visualize and connect multiple skills
3. **Property Panel** (right sidebar) — Edit selected block/node parameters
4. **YAML Preview** (bottom) — Real-time generated YAML output

## Blockly Workspace

### Block Categories

#### Trigger Blocks (purple, 32 types)
Represent `~onTrigger` events. One trigger per skill tree root.

```
┌─────────────────────────┐
│ 🔔 when  [onAttack ▾]  │
└─────────────┬───────────┘
```

All 32 triggers: `onCombat`, `onAttack`, `onDamaged`, `onSpawn`, `onDespawn`, `onReady`, `onLoad`, `onSpawnOrLoad`, `onDeath`, `onTimer:N`, `onInteract`, `onPlayerKill`, `onEnterCombat`, `onDropCombat`, `onChangeTarget`, `onExplode`, `onPrime`, `onCreeperCharge`, `onTeleport`, `onSignal`, `onShoot`, `onBowHit`, `onTame`, `onBreed`, `onTrade`, `onChangeWorld`, `onBucket`, `onSkillDamage`, `onHear`, `onProjectileHit`, `onProjectileLand`, `onDismounted`

#### Condition Blocks (amber, categorized)
Represent conditions with action responses.

```
┌─────────────────────────────────────┐
│ ❓ if  [health ▾]  [< ▾]  [50%]   │
│        then  [true ▾]              │
└─────────────┬───────────────────────┘
```

Categories: Entity (~90), Location (~35), Compare (~8), Meta (~30)

Compound conditions support:
```
┌─────────────────────────────────────┐
│ 🔗 ALL of (AND)                    │
│   ├─ if health > 50%               │
│   └─ if distance < 10              │
└─────────────────────────────────────┘
```

#### Mechanic Blocks (cyan, categorized)
The core action blocks.

```
┌─────────────────────────────────────┐
│ ⚡ damage  amount=[20]             │
│            at  [@target ▾]         │
└─────────────────────────────────────┘
```

MVP core mechanics (~50):
- **Damage**: `damage`, `baseDamage`, `percentDamage`
- **Healing**: `heal`, `healPercent`, `shield`
- **Movement**: `teleport`, `teleportTo`, `velocity`, `leap`, `lunge`, `pull`, `throw`, `jump`
- **Particle**: `particle`, `particleLine`, `particleRing`, `particleSphere`
- **Entity**: `summon`, `remove`, `setHealth`, `setMaxHealth`, `setSpeed`, `equip`, `setName`
- **Player UI**: `message`, `sendTitle`, `sendActionMessage`, `sound`, `sendToast`
- **Projectile**: `projectile`, `missile`, `orbital`, `shoot`
- **Meta**: `skill`, `delay`, `randomSkill`, `aura`, `onAttack`, `onDamaged`
- **Block**: `setBlockType`, `breakBlock`
- **Item**: `giveItem`, `takeItem`
- **Other**: `command`, `explosion`, `lightning`, `ignite`, `potion`, `potionClear`

#### Targeter Blocks (green, embedded within mechanics)
```
┌────────────────────────────┐
│ 🎯 [@PlayersInRadius ▾]   │
│    radius=[10]             │
└────────────────────────────┘
```

MVP core targeters (~20):
`@Self`, `@Target`, `@Trigger`, `@NearestPlayer`, `@Owner`, `@Parent`, `@PlayersInRadius`, `@EntitiesInRadius`, `@LivingInCone`, `@MobsInRadius`, `@SelfLocation`, `@TargetLocation`, `@TriggerLocation`, `@Forward`, `@Origin`, `@Ring`, `@Line`, `@None`

### Block Connection Rules

```
[Trigger] ──→ [Condition?] ──→ [Mechanic] ──→ [Mechanic] ──→ ...
                                    │
                                [Targeter]
```

- A skill tree must start with exactly one Trigger block
- Conditions are optional and can be nested (AND/OR groups)
- Mechanics stack vertically (sequential execution)
- Each Mechanic can have an embedded Targeter
- Delay blocks insert pauses between mechanics

### Universal Attribute Editor (on every mechanic block)

Each mechanic block has an expandable "Advanced" section:
- `cooldown`: number (seconds)
- `delay`: number (ticks)
- `repeat`: number
- `repeatInterval`: number (ticks)
- `chance`: number (0.0–1.0)
- `power`: number (multiplier)
- `forceSync`: boolean
- `fromOrigin`: boolean
- `targetIsOrigin`: boolean

## React Flow Workspace

### Purpose

While Blockly handles the internal structure of a single skill, React Flow visualizes:

1. **Multi-skill relationships**: Skill A calls `skill{s=SkillB}` → visible edge between nodes
2. **Aura skill chains**: `onAttack{s=DamageSkill}` → shows attack aura dependencies
3. **Projectile skill chains**: `projectile{s=OnHitSkill}` → projectile impact skill links

### Node Types

| Node | Color | Content |
|------|-------|---------|
| SkillNode | Purple outline | Skill name, trigger type, action count |
| MechanicNode | Cyan | Individual mechanic with parameters (detail view) |
| ConditionNode | Amber | Condition with action |

### Interactions

- Click a SkillNode to load its Blockly workspace
- Drag from skill output port to another skill input to create `skill{s=...}` reference
- Double-click a node to open its Property Panel
- Minimap in bottom-right corner
- Zoom controls + fit-to-view button

## Property Panel

Auto-generated from MythicMobs JSON Schema:

| Parameter Type | UI Control |
|----------------|------------|
| `number` | Numeric input with optional slider + min/max |
| `string` | Text input |
| `boolean` | Toggle switch (AnimatedCheckbox from spell-ui) |
| `enum` | Dropdown select |
| `material` | Material picker (searchable dropdown with Minecraft material list) |
| `skill` | Skill reference picker (dropdown of project skills) |
| `color` | Color picker (RGB input) |

## YAML Preview Panel

- **Real-time**: Updates on every block change (debounced 100ms)
- **Syntax highlighting**: YAML keywords, strings, numbers colored
- **Copy button**: One-click copy to clipboard
- **Export button**: Save to `.yml` file via Tauri file dialog
- **Toggle**: Switch between single-skill view and full-file view

## Mechanics Search

- Search bar at top of Blockly toolbox
- Incremental search across all 240+ mechanic names and aliases
- Category filter chips (Damage, Movement, Particle, etc.)
- Results show mechanic name + brief description
- Click to add block to workspace

## Skill Templates

Pre-built skill configurations for quick start:

| Template | Description |
|----------|-------------|
| Fireball | Projectile + fire damage + particle |
| Dash | Velocity + particle trail |
| Teleport | Random teleport + smoke particle |
| AOE Damage | PlayersInRadius + damage + particle sphere |
| Heal Aura | Timer + heal + particle |
| Lightning Strike | Lightning + damage + sound |
| Summon Minions | Summon + AI + timer despawn |
| Shield | Aura + damage reduction |
