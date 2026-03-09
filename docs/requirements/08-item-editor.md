# 08 — Item Editor

## Overview

The Item Editor provides a form-based interface for defining MythicMobs item configurations. Items are defined in `plugins/MythicMobs/Items/*.yml`.

## Phase

Phase 2 — After Skill Editor MVP is complete.

## Editor Layout

```
┌─────────────────────────────────────┐
│ Item Editor: [InternalName]         │
├─────────────────────────────────────┤
│ ▼ Basic Info                        │
│   Material (Id): [diamond_sword ▾]  │
│   Display: [<green>Legendary...]    │
│   Amount: [1]                       │
│   Rarity: [EPIC ▾]                 │
│   CustomModelData: [12345]          │
├─────────────────────────────────────┤
│ ▼ Lore                              │
│   [<red>A powerful weapon</red>]    │
│   [<gray>Damage: +15</gray>]       │
│   [+ Add Line]                      │
├─────────────────────────────────────┤
│ ▼ Durability                        │
│   Durability: [100]                 │
│   MaxDurability: [600]              │
├─────────────────────────────────────┤
│ ▼ Attributes                        │
│   Slot: [MainHand ▾]               │
│     Damage: [15]                    │
│     AttackSpeed: [1.2]              │
│   [+ Add Slot]                      │
├─────────────────────────────────────┤
│ ▼ Enchantments                      │
│   [SHARPNESS ▾] Level: [5]         │
│   [+ Add Enchantment]              │
├─────────────────────────────────────┤
│ ▼ Hide Flags                        │
│   [✓] ATTRIBUTES                    │
│   [ ] ENCHANTS                      │
│   [ ] UNBREAKABLE                   │
├─────────────────────────────────────┤
│ ▼ NBT Tags                          │
│   [customTag] = [someValue]         │
│   [+ Add Tag]                       │
├─────────────────────────────────────┤
│ ▼ Food (1.20.5+)                    │
│   Nutrition: [2]                    │
│   Saturation: [2]                   │
├─────────────────────────────────────┤
│ ▼ Equippable                        │
│   Slot: [HEAD ▾]                    │
│   Model: [namespace:model]          │
├─────────────────────────────────────┤
│ ▼ Tool                              │
│   DamagePerBlock: [1]               │
│   Rules:                            │
│     [OBSIDIAN] Speed: [1000]        │
│     [+ Add Rule]                    │
├─────────────────────────────────────┤
│ ▼ Options                           │
│   Color: [255, 0, 0] (for leather) │
│   Unbreakable: [ ]                  │
├─────────────────────────────────────┤
│ ▼ Skills (triggers on item use)     │
│   [+ Add Skill]                     │
└─────────────────────────────────────┘
```

## Key Features

- **Material Picker**: Searchable dropdown for all Minecraft materials with icons
- **MiniMessage Live Preview**: Display name and lore lines render with formatting
- **Enchantment Catalog**: All Minecraft enchantments as a searchable list
- **Attribute Slots**: Per-slot attribute editing with add/remove
- **NBT Editor**: Key-value editor with type inference
- **Skill Integration**: Links to Skill Editor for item-triggered skills
- **YAML Preview**: Real-time generated `Items/*.yml` output
