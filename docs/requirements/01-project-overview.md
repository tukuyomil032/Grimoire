# 01 — Project Overview

## Project Name

**Grimoire** — MythicMobs Visual Editor

## Vision

Grimoire is an open-source desktop application that transforms the tedious process of hand-writing MythicMobs YAML configurations into an intuitive visual editing experience. By combining Scratch-style block programming with node-based flow editing, Grimoire eliminates syntax errors and dramatically reduces the time required to create complex MythicMobs skills, mobs, and items.

## Background & Problem

[MythicMobs](https://mythicmobs.net/) is one of the most popular Minecraft server plugins, enabling server administrators to create custom mobs, items, and skills using YAML configuration files. However:

- **YAML syntax is error-prone**: Spaces, indentation, special characters, and MythicMobs' inline syntax (`mechanic{param=val} @Targeter ~onTrigger`) are frequent sources of bugs
- **Skill system is complex**: 240+ mechanics, 165+ conditions, 32 triggers, and 89+ targeters create an enormous configuration surface
- **No existing GUI tools**: There are virtually no visual editing tools for MythicMobs — everyone writes YAML by hand while referencing the wiki
- **High learning curve**: New users must learn both YAML syntax and MythicMobs' domain-specific language simultaneously

## Solution

A hybrid **Scratch-style block editor + node-based flow editor** that:

1. **Eliminates syntax errors** — Block connections enforce valid structure; parameters use typed form inputs
2. **Provides real-time YAML generation** — See the exact MythicMobs output as you build visually
3. **Covers all MythicMobs components** — 530+ components (mechanics, conditions, triggers, targeters) accessible through searchable, categorized UI
4. **Supports customizable workspace** — Adobe Photoshop/Illustrator-style dockable panels and layout presets
5. **Includes skill simulation** (future) — Preview skill behavior in a 2D simulation space

## Target Users

- Minecraft server administrators using MythicMobs
- MythicMobs plugin developers and configuration authors
- Minecraft content creators building custom boss encounters
- Teams managing large MythicMobs configurations

## Distribution

- **License**: MIT
- **Platform**: GitHub open-source
- **Targets**: macOS, Windows, Linux (via Tauri cross-compilation)

## MythicMobs Coverage

| Component | Count | MVP | Full |
|-----------|-------|-----|------|
| Mechanics (Meta) | ~54 | 15 | All |
| Mechanics (Standard) | ~190 | 35 | All |
| Conditions | ~165 | 30 | All |
| Triggers | 32 | All | All |
| Targeters | ~89 | 20 | All |
| **Total** | **~530+** | **~132** | **All** |

## Success Metrics

- GitHub stars: 100+ within 6 months of public release
- Zero YAML syntax errors in generated output
- All 530+ MythicMobs components have GUI schema definitions
- Sub-second YAML generation latency
