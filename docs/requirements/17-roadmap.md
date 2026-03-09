# 17 — Roadmap

## Phase Overview

| Phase | Name | Scope | Status |
|-------|------|-------|--------|
| **1** | MVP — Skill Editor | Block editor + YAML generation | In Progress |
| **2** | Mob & Item Editors | Form-based mob/item creation | Planned |
| **3** | Full MythicMobs Coverage | All 530+ component schemas | Planned |
| **4** | Advanced Features | Layout system, templates, YAML import | Planned |
| **5** | Simulation & Community | Skill preview, shared templates | Planned |

---

## Phase 1 — MVP: Skill Editor

**Goal**: A functional desktop app that lets users build MythicMobs skills visually and export valid YAML.

### Deliverables

- [ ] Project scaffolding (Tauri + Vite + React + TypeScript + Tailwind)
- [ ] Dark theme UI with Framer Motion animations
- [ ] Sidebar navigation (Skills / Mobs / Items tabs)
- [ ] Topbar with File / Edit / View / Help menus
- [ ] i18n setup (en/ja) with language toggle
- [ ] Blockly workspace with dark theme
  - [ ] Trigger blocks (all 32)
  - [ ] Core condition blocks (~30)
  - [ ] Core mechanic blocks (~50)
  - [ ] Core targeter blocks (~20)
  - [ ] Block → internal JSON generator
- [ ] React Flow workspace
  - [ ] SkillNode display
  - [ ] Skill-to-skill edges (skill{s=...} references)
  - [ ] Minimap and zoom controls
- [ ] Property panel (auto-generated from schema)
- [ ] YAML real-time preview with syntax highlighting
- [ ] YAML export to file (Tauri file dialog)
- [ ] Mechanics search (name, alias, description)
- [ ] Skill templates (8 presets)
- [ ] Zustand stores (editor, project, settings)
- [ ] Basic docking layout with rc-dock

### Schema Coverage (Phase 1)

| Category | Components |
|----------|-----------|
| **Triggers** | All 32 |
| **Mechanics** | damage, baseDamage, percentDamage, heal, healPercent, shield, teleport, teleportTo, velocity, leap, lunge, pull, throw, jump, disengage, particle, particleLine, particleRing, particleSphere, summon, remove, setHealth, setMaxHealth, setSpeed, equip, setName, message, sendTitle, sendActionMessage, sound, sendToast, projectile, missile, orbital, shoot, skill, delay, randomSkill, aura, onAttack, onDamaged, setBlockType, breakBlock, giveItem, takeItem, command, explosion, lightning, ignite, potion, potionClear |
| **Conditions** | health, distance, biome, blockType, day, night, isMythicMob, hasAura, wearing, holding, entityType, faction, hasTag, crouching, mounted, moving, burning, chance, stringEquals, variableEquals, variableInRange, playersOnline, inCombat, lineOfSight, owner, targetWithin, altitude, onBlock, lightLevel |
| **Targeters** | @Self, @Target, @Trigger, @NearestPlayer, @Owner, @Parent, @PlayersInRadius, @EntitiesInRadius, @LivingInCone, @MobsInRadius, @SelfLocation, @TargetLocation, @TriggerLocation, @Forward, @Origin, @Ring, @Line, @None, @Location, @SpawnLocation |

---

## Phase 2 — Mob & Item Editors

**Goal**: Complete the three pillars of MythicMobs configuration.

### Deliverables

- [ ] Mob Editor form (all fields from data model)
- [ ] Item Editor form (all fields from data model)
- [ ] Skill linking (mob/item skills reference Skill Editor definitions)
- [ ] Template inheritance (Mob.Template, Item.Template)
- [ ] MiniMessage formatting preview
- [ ] Entity type picker (all Minecraft entity types)
- [ ] Material picker (all Minecraft materials)
- [ ] Enchantment picker
- [ ] Equipment drag-and-drop
- [ ] Batch YAML export (Skills + Mobs + Items in MythicMobs directory structure)

---

## Phase 3 — Full MythicMobs Coverage

**Goal**: Schema definitions for every MythicMobs component, achieving full GUI coverage.

### Deliverables

- [ ] All 240+ mechanic schemas
  - [ ] Meta mechanics (~54): Skill, VariableSkill, SudoSkill, RandomSkill, Switch, all Aura variants, all Projectile control, pattern generators, flow control, variable operations
  - [ ] Standard mechanics (~190): All damage, healing, movement, particle, block, entity, player UI, bossbar, disguise, item, scoreboard, AI, shooting, miscellaneous
- [ ] All 165+ condition schemas
  - [ ] Entity conditions (~90)
  - [ ] Location conditions (~35)
  - [ ] Compare conditions (~8)
  - [ ] Meta conditions (~30)
- [ ] All 89+ targeter schemas
  - [ ] Single entity (~18)
  - [ ] Multi entity (~19)
  - [ ] ThreatTable (4)
  - [ ] Single location (~19)
  - [ ] Multi location (~15)
  - [ ] Meta/special (~14)
- [ ] YAML reverse parser (import existing .yml files → internal models)
- [ ] Compound condition editor (AND/OR groups with visual nesting)
- [ ] Inline metaskill syntax support

---

## Phase 4 — Advanced Features

**Goal**: Power-user features and workflow optimization.

### Deliverables

- [ ] Full docking layout system (Adobe-style)
  - [ ] All panels detachable/reattachable
  - [ ] Built-in layout presets (Default, Skill Focus, Flow View, Compact, Wide Screen)
  - [ ] Save/load custom layout presets
  - [ ] Reset to default
- [ ] Multi-window support (Tauri WebviewWindow)
  - [ ] Detach any panel to separate OS window
  - [ ] Cross-window state sync via Tauri events
- [ ] Skill template gallery with community submissions
- [ ] Project management (multiple projects, recent files)
- [ ] Undo/redo system (full action history)
- [ ] Keyboard shortcuts (Ctrl+S save, Ctrl+Z undo, etc.)
- [ ] Copy/paste skills between projects
- [ ] Auto-layout for React Flow graph (dagre/elkjs)

---

## Phase 5 — Simulation & Community

**Goal**: Visual skill preview and ecosystem features.

### Deliverables

- [ ] 2D skill simulation canvas
  - [ ] Entity positioning (caster, target, summons)
  - [ ] Movement mechanic trajectories
  - [ ] Projectile path visualization
  - [ ] Particle effect approximation
  - [ ] Damage/heal number popups
  - [ ] Timeline scrubber (play/pause/speed control)
- [ ] Addon plugin support (ModelEngine, Mythic Crucible schemas)
- [ ] Community template sharing (optional cloud integration)
- [ ] Plugin version selector (MythicMobs 5.x compatibility)
- [ ] Documentation integration (inline MythicMobs wiki links)

---

## Timeline Estimate

| Phase | Estimated Duration |
|-------|-------------------|
| Phase 1 (MVP) | 4-6 weeks |
| Phase 2 | 2-3 weeks |
| Phase 3 | 3-4 weeks |
| Phase 4 | 3-4 weeks |
| Phase 5 | 4-6 weeks |
| **Total** | **16-23 weeks** |

These estimates assume focused development effort. Phases can overlap partially.
