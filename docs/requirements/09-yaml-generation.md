# 09 — YAML Generation

## Overview

The YAML Generator converts internal JSON models (Skill, Mob, Item) into valid MythicMobs YAML. It is a **pure function layer** — no side effects, no DOM access.

## Architecture

```
Internal JSON Model (TypeScript)
         │
         ▼
  YAML Generator (pure functions)
         │
         ▼
  MythicMobs-compatible YAML string
```

## Skill YAML Generation

### Input → Output Example

**Internal Model:**
```json
{
  "name": "Fireball",
  "cooldown": 10,
  "conditions": [
    { "condition": "distance", "parameters": { "d": "<10" }, "action": { "type": "boolean", "value": true } }
  ],
  "actions": [
    {
      "mechanic": "projectile",
      "parameters": { "s": "FireballHit", "velocity": 5 },
      "targeter": { "type": "@target" },
      "trigger": "~onAttack"
    }
  ]
}
```

**Generated YAML:**
```yaml
Fireball:
  Cooldown: 10
  Conditions:
  - distance{d=<10} true
  Skills:
  - projectile{s=FireballHit;velocity=5} @target ~onAttack
```

### Mechanic Inline Syntax

```
mechanic{param1=value1;param2=value2} @Targeter ~onTrigger =healthRange chance
```

Rules:
- Parameters are joined with `;` inside `{}`
- Empty parameters → no `{}`
- Targeter is prefixed with `@`
- Trigger is prefixed with `~`
- Health range is prefixed with `=`
- Chance is a bare decimal (e.g., `0.5`)
- Universal attributes are appended inside `{}` if present

### Condition Syntax

```
conditionName{param=value} action
```

Compound conditions:
```
(condition1 true && condition2 false)
(condition1 true || condition2 false)
```

### YAML Formatting

- Use `js-yaml` with `dump()` for YAML serialization
- Custom representer for inline mechanic lines (flow scalar strings)
- Indentation: 2 spaces
- No trailing whitespace
- LF line endings
- MythicMobs keys are PascalCase (e.g., `Cooldown`, `Skills`, `Conditions`)

## Mob YAML Generation

Maps `Mob` model fields to MythicMobs `Mobs/*.yml` format. Key mappings:

| Model Field | YAML Key |
|-------------|----------|
| `type` | `Type` |
| `display` | `Display` |
| `health` | `Health` |
| `damage` | `Damage` |
| `skills` | `Skills` |
| `equipment` | `Equipment` |
| `drops` | `Drops` |
| `options` | `Options` |

## Item YAML Generation

Maps `Item` model fields to MythicMobs `Items/*.yml` format.

| Model Field | YAML Key |
|-------------|----------|
| `material` | `Id` |
| `display` | `Display` |
| `lore` | `Lore` |
| `attributes` | `Attributes` |
| `enchantments` | `Enchantments` |

## Validation

Before YAML generation, validate:
1. Required fields are present (e.g., Mob.Type, Item.Id)
2. Parameter values match expected types from schema
3. Skill references point to defined skills
4. No circular skill references
5. Targeter types match mechanic target expectations (entity vs location)

Validation errors are displayed inline in the YAML Preview panel as comments:
```yaml
# ERROR: 'amount' must be a number
- damage{amount=abc} @target
```

## Reverse Parsing (Phase 3)

Import existing MythicMobs YAML files and convert to internal JSON models:
- Parse YAML with `js-yaml.load()`
- Parse inline mechanic syntax with regex
- Map to internal model interfaces
- Display in Blockly/React Flow editors
