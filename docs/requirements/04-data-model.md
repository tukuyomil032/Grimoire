# 04 — Data Model

## Core Principle

All editor state is represented as typed TypeScript interfaces. The UI reads/writes these models via Zustand. YAML is generated as a pure function from these models. MythicMobs-specific knowledge lives in schemas, not in UI code.

## Skill Model

```typescript
interface Skill {
  id: string;
  name: string;
  cooldown?: number;
  cancelIfNoTargets?: boolean;
  onCooldownSkill?: string;
  failedConditionsSkill?: string;
  conditions: ConditionEntry[];
  targetConditions: ConditionEntry[];
  triggerConditions: ConditionEntry[];
  actions: SkillAction[];
  variables?: Record<string, VariableValue>;
}

interface SkillAction {
  id: string;
  type: 'mechanic' | 'delay' | 'skill-ref';
  mechanic?: string;               // mechanic name (e.g., "damage", "projectile")
  parameters: Record<string, unknown>;
  targeter?: Targeter;
  trigger?: string;                 // e.g., "~onAttack"
  healthRange?: string;             // e.g., "=50%-100%"
  chance?: number;                  // 0.0 - 1.0
  // Universal attributes
  delay?: number;
  repeat?: number;
  repeatInterval?: number;
  cooldown?: number;
  power?: number;
  forceSync?: boolean;
  fromOrigin?: boolean;
  targetIsOrigin?: boolean;
  origin?: string;
}

type VariableValue =
  | { type: 'string'; value: string }
  | { type: 'int'; value: number }
  | { type: 'float'; value: number };
```

## Condition Model

```typescript
interface ConditionEntry {
  id: string;
  condition: string;              // e.g., "health", "distance", "biome"
  parameters: Record<string, unknown>;
  action: ConditionAction;
  // For compound conditions
  logic?: 'and' | 'or';
  children?: ConditionEntry[];
}

type ConditionAction =
  | { type: 'boolean'; value: boolean }
  | { type: 'power'; multiplier: number }
  | { type: 'cast'; skill: string }
  | { type: 'castinstead'; skill: string }
  | { type: 'orElseCast'; skill: string };
```

## Targeter Model

```typescript
interface Targeter {
  id: string;
  type: string;                   // e.g., "@Self", "@PlayersInRadius"
  parameters: Record<string, unknown>;
  filters?: TargeterFilter;
  limit?: number;
  sort?: 'NEAREST' | 'FURTHEST' | 'RANDOM' | 'HIGHEST_HEALTH' | 'LOWEST_HEALTH';
}

interface TargeterFilter {
  target?: string[];              // e.g., ["players", "animals"]
  ignore?: string[];              // e.g., ["monsters"]
}
```

## Mob Model

```typescript
interface Mob {
  id: string;
  name: string;                   // internal name
  type: string;                   // Minecraft entity type
  display?: string;               // display name (MiniMessage format)
  health?: number;
  damage?: number;
  armor?: number;
  faction?: string;
  mount?: string;
  bossBar?: BossBarConfig;
  options?: Record<string, unknown>;
  modules?: MobModules;
  aiGoalSelectors?: string[];
  aiTargetSelectors?: string[];
  equipment?: EquipmentEntry[];
  drops?: DropEntry[];
  damageModifiers?: DamageModifier[];
  levelModifiers?: Record<string, number>;
  killMessages?: string[];
  variables?: Record<string, VariableValue>;
  skills?: MobSkillEntry[];
  template?: string;
}

interface BossBarConfig {
  enabled: boolean;
  title?: string;
  range?: number;
  color?: string;
  style?: string;
}

interface MobModules {
  threatTable?: boolean;
  immunityTable?: boolean;
}

interface EquipmentEntry {
  item: string;
  slot: 'HAND' | 'OFF_HAND' | 'HEAD' | 'CHEST' | 'LEGS' | 'FEET';
}

interface DropEntry {
  item: string;
  amount: number;
  chance: number;
}

interface DamageModifier {
  cause: string;
  multiplier: number;
}

interface MobSkillEntry {
  skillLine: string;              // Full inline syntax OR reference to Skill
  // Parsed components (if building visually):
  skillRef?: string;
  targeter?: Targeter;
  trigger?: string;
  healthRange?: string;
  chance?: number;
}
```

## Item Model

```typescript
interface Item {
  id: string;
  name: string;                   // internal name
  material: string;               // Minecraft material type
  display?: string;               // MiniMessage display name
  lore?: string[];
  customModelData?: number;
  durability?: number;
  maxDurability?: number;
  amount?: number;
  rarity?: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC';
  attributes?: ItemAttributes;
  enchantments?: EnchantmentEntry[];
  options?: Record<string, unknown>;
  hide?: string[];
  nbt?: Record<string, unknown>;
  food?: FoodConfig;
  equippable?: EquippableConfig;
  tool?: ToolConfig;
  skills?: MobSkillEntry[];       // Items can have skills too
}

interface ItemAttributes {
  mainHand?: Record<string, number>;
  offHand?: Record<string, number>;
  head?: Record<string, number>;
  chest?: Record<string, number>;
  legs?: Record<string, number>;
  feet?: Record<string, number>;
}

interface EnchantmentEntry {
  enchantment: string;
  level: number;
}

interface FoodConfig {
  nutrition: number;
  saturation: number;
}

interface EquippableConfig {
  slot: string;
  model?: string;
}

interface ToolConfig {
  damagePerBlock?: number;
  rules?: ToolRule[];
}

interface ToolRule {
  materials: string;
  speed: number;
}
```

## Project Model

```typescript
interface GrimoireProject {
  version: string;                // "0.1.0"
  name: string;
  skills: Record<string, Skill>;
  mobs: Record<string, Mob>;
  items: Record<string, Item>;
  metadata: {
    createdAt: string;
    updatedAt: string;
    mythicMobsVersion?: string;
  };
}
```

## MythicMobs Schema (for GUI auto-generation)

```typescript
interface MechanicSchema {
  name: string;
  aliases: string[];
  category: MechanicCategory;
  description: { en: string; ja: string };
  targetType: 'entity' | 'location' | 'both' | 'none';
  parameters: ParameterSchema[];
  premium?: boolean;
}

interface ParameterSchema {
  name: string;
  aliases: string[];
  type: 'number' | 'string' | 'boolean' | 'enum' | 'material' | 'skill' | 'location' | 'color';
  required: boolean;
  default?: unknown;
  enumValues?: string[];
  min?: number;
  max?: number;
  description: { en: string; ja: string };
}

type MechanicCategory =
  | 'damage'
  | 'healing'
  | 'movement'
  | 'particle'
  | 'block'
  | 'entity'
  | 'player-ui'
  | 'bossbar'
  | 'disguise'
  | 'item'
  | 'scoreboard'
  | 'ai'
  | 'projectile'
  | 'meta'
  | 'variable'
  | 'sound'
  | 'other';
```
