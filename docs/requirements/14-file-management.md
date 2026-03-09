# 14 — File Management

## Overview

Grimoire manages MythicMobs YAML files and project data through Tauri's file system APIs. All file operations use Tauri IPC commands for security and cross-platform compatibility.

## Tauri Plugins Required

- `@tauri-apps/plugin-fs` — Read/write files
- `@tauri-apps/plugin-dialog` — Open/save file dialogs
- `@tauri-apps/plugin-store` — Persistent key-value storage

## File Operations

### Export YAML

Export individual or batch YAML files:

```
Export Single Skill → Skills/Fireball.yml
Export All Skills  → Skills/*.yml (one file per skill)
Export Single Mob  → Mobs/UndeadBoss.yml
Export All         → Skills/*.yml + Mobs/*.yml + Items/*.yml
```

### Import YAML (Phase 3)

Parse existing MythicMobs YAML files and convert to internal models:

1. User selects file(s) via Tauri file dialog
2. Parse YAML with `js-yaml.load()`
3. Parse inline MythicMobs syntax with regex parser
4. Convert to internal TypeScript model
5. Load into editors

### Project Save/Load

Grimoire project files (`.grimoire` extension, JSON format):

```json
{
  "version": "0.1.0",
  "name": "MyServer",
  "skills": { ... },
  "mobs": { ... },
  "items": { ... },
  "metadata": {
    "createdAt": "2026-03-09T00:00:00Z",
    "updatedAt": "2026-03-09T12:00:00Z"
  }
}
```

### Auto-Save

- Auto-save to temp file every 60 seconds
- Recover unsaved work on crash/restart
- Auto-save location: Tauri app data directory

## Tauri Commands (Rust)

```rust
// src-tauri/src/commands/file_io.rs

#[tauri::command]
async fn read_yaml_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
async fn write_yaml_file(path: String, content: String) -> Result<(), String> {
    std::fs::write(&path, &content).map_err(|e| e.to_string())
}

#[tauri::command]
async fn list_yaml_files(dir: String) -> Result<Vec<String>, String> {
    // List all .yml files in directory
}
```

## Recent Projects

Store recent project paths in `@tauri-apps/plugin-store`:

```typescript
const store = await load('settings.json');
await store.set('recentProjects', [...paths]);
```

Display in File menu and welcome screen.

## Directory Structure Convention

When exporting, follow MythicMobs' expected directory structure:

```
plugins/MythicMobs/
  Skills/
    Fireball.yml
    DashAttack.yml
  Mobs/
    UndeadBoss.yml
    Minion.yml
  Items/
    LegendarySword.yml
```

Users can choose a custom export directory or target their server's MythicMobs plugin folder directly.
