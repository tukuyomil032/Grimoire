# 13 — MythicMobs Schema

## Overview

The MythicMobs Schema layer is the **most important architectural component** of Grimoire. It declaratively defines every MythicMobs mechanic, condition, trigger, and targeter as structured JSON. The GUI (Blockly blocks, property panels, toolbox categories, search results) is auto-generated from these schemas.

## Schema Architecture

```
src/schema/
  mechanics/
    index.ts          # Registry: exports all mechanic schemas
    damage.ts         # Damage category schemas
    healing.ts        # Healing category schemas
    movement.ts       # Movement category schemas
    particle.ts       # Particle category schemas
    entity.ts         # Entity manipulation schemas
    player-ui.ts      # Player UI schemas
    projectile.ts     # Projectile/missile schemas
    meta.ts           # Meta-mechanic schemas
    block.ts          # Block manipulation schemas
    item.ts           # Item manipulation schemas
    ai.ts             # AI control schemas
    bossbar.ts        # Boss bar schemas
    disguise.ts       # Disguise schemas
    scoreboard.ts     # Scoreboard/tag schemas
    variable.ts       # Variable manipulation schemas
    sound.ts          # Sound schemas
    other.ts          # Uncategorized schemas
  conditions/
    index.ts
    entity.ts
    location.ts
    compare.ts
    meta.ts
  triggers/
    index.ts          # All 32 triggers
  targeters/
    index.ts
    single-entity.ts
    multi-entity.ts
    single-location.ts
    multi-location.ts
    meta.ts
    special.ts
```

## Schema Interfaces

```typescript
// src/models/mechanic.ts
export interface MechanicSchema {
  name: string;
  aliases: string[];
  category: MechanicCategory;
  description: Record<string, string>;  // { en: "...", ja: "..." }
  targetType: 'entity' | 'location' | 'both' | 'none';
  parameters: ParameterSchema[];
  premium?: boolean;
}

export interface ParameterSchema {
  name: string;
  aliases: string[];
  type: ParameterType;
  required: boolean;
  default?: unknown;
  enumValues?: string[];
  min?: number;
  max?: number;
  description: Record<string, string>;
}

export type ParameterType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'enum'
  | 'material'
  | 'skill'
  | 'location'
  | 'color'
  | 'particle'
  | 'sound'
  | 'entity-type'
  | 'potion-effect';

export type MechanicCategory =
  | 'damage' | 'healing' | 'movement' | 'particle'
  | 'block' | 'entity' | 'player-ui' | 'bossbar'
  | 'disguise' | 'item' | 'scoreboard' | 'ai'
  | 'projectile' | 'meta' | 'variable' | 'sound' | 'other';
```

## Schema Example: Damage Mechanics

```typescript
// src/schema/mechanics/damage.ts
import { MechanicSchema } from '@/models/mechanic';

export const damageMechanics: MechanicSchema[] = [
  {
    name: 'damage',
    aliases: ['d'],
    category: 'damage',
    description: {
      en: 'Deals damage to the target entity.',
      ja: 'ターゲットエンティティにダメージを与える。',
    },
    targetType: 'entity',
    parameters: [
      {
        name: 'amount',
        aliases: ['a'],
        type: 'number',
        required: true,
        default: 1,
        min: 0,
        description: {
          en: 'Amount of damage to deal.',
          ja: '与えるダメージ量。',
        },
      },
      {
        name: 'ignoreArmor',
        aliases: ['ia'],
        type: 'boolean',
        required: false,
        default: false,
        description: {
          en: 'Whether to ignore armor when dealing damage.',
          ja: 'ダメージ計算時にアーマーを無視するかどうか。',
        },
      },
      {
        name: 'preventKnockback',
        aliases: ['pkb', 'pk'],
        type: 'boolean',
        required: false,
        default: false,
        description: {
          en: 'Whether to prevent knockback.',
          ja: 'ノックバックを防止するかどうか。',
        },
      },
      {
        name: 'preventImmunity',
        aliases: ['pi'],
        type: 'boolean',
        required: false,
        default: false,
        description: {
          en: 'Whether to bypass the invulnerability frames.',
          ja: '無敵フレームをバイパスするかどうか。',
        },
      },
      {
        name: 'element',
        aliases: ['e', 'damagetype', 'type'],
        type: 'string',
        required: false,
        description: {
          en: 'The MythicMobs damage element/type.',
          ja: 'MythicMobsのダメージ要素/タイプ。',
        },
      },
      {
        name: 'damageCause',
        aliases: ['dc', 'cause'],
        type: 'enum',
        required: false,
        default: 'ENTITY_ATTACK',
        enumValues: [
          'ENTITY_ATTACK', 'PROJECTILE', 'FIRE', 'FIRE_TICK', 'LAVA',
          'MAGIC', 'POISON', 'WITHER', 'FALL', 'DROWNING', 'STARVATION',
          'LIGHTNING', 'VOID', 'CUSTOM',
        ],
        description: {
          en: 'The Bukkit damage cause to use.',
          ja: '使用するBukkitのダメージ原因。',
        },
      },
    ],
  },
  {
    name: 'baseDamage',
    aliases: ['bd', 'basedamage'],
    category: 'damage',
    description: {
      en: 'Deals damage based on the mob\'s base damage value.',
      ja: 'モブの基本ダメージ値に基づいてダメージを与える。',
    },
    targetType: 'entity',
    parameters: [
      {
        name: 'multiplier',
        aliases: ['m'],
        type: 'number',
        required: false,
        default: 1,
        min: 0,
        description: {
          en: 'Multiplier for the base damage.',
          ja: '基本ダメージの倍率。',
        },
      },
    ],
  },
  {
    name: 'percentDamage',
    aliases: ['pdamage', 'pd'],
    category: 'damage',
    description: {
      en: 'Deals damage equal to a percentage of the target\'s max health.',
      ja: 'ターゲットの最大体力の割合分のダメージを与える。',
    },
    targetType: 'entity',
    parameters: [
      {
        name: 'percent',
        aliases: ['p'],
        type: 'number',
        required: true,
        default: 10,
        min: 0,
        max: 100,
        description: {
          en: 'Percentage of max health to deal as damage.',
          ja: '最大体力に対するダメージの割合。',
        },
      },
    ],
  },
];
```

## Full coverage plan

### MVP (Phase 1): ~132 components

| Category | Count |
|----------|-------|
| Core mechanics | ~50 |
| All triggers | 32 |
| Core conditions | ~30 |
| Core targeters | ~20 |

### Phase 3: All ~530+ components

Complete schema definitions for every MythicMobs component. Schema files are extended incrementally. Adding a new mechanic requires only a new entry in the appropriate schema file — the GUI auto-generates blocks, property panels, and toolbox entries.

## How schemas drive the GUI

1. **Blockly block auto-generation**: `createMechanicBlock(schema)` reads parameters and generates appropriate Blockly fields
2. **Property Panel auto-generation**: Schema `parameters` determine which form controls to render
3. **Toolbox categories**: Schema `category` determines toolbox placement
4. **Search index**: Schema `name`, `aliases`, `description` are indexed for search
5. **YAML generation**: Schema defines parameter names used in inline syntax
6. **Validation**: Schema defines `required`, `min`, `max`, `enumValues` for input validation
7. **i18n**: Schema `description` contains per-language strings
