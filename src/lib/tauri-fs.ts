/**
 * Tauri filesystem integration.
 *
 * Provides save/load/export for skills, mobs, items, and projects
 * via Tauri plugin-fs, plugin-dialog, and custom Rust commands.
 * Falls back to browser-compatible methods when running outside Tauri.
 */
import type { Skill } from '@/models/skill';
import { generateSkillYaml } from '@/generators';

// ─── Tauri detection ────────────────────────────────
function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

// ─── Save skill as YAML ─────────────────────────────

export async function saveSkillToFile(skill: Skill, filePath?: string): Promise<boolean> {
  const yaml = generateSkillYaml(skill);

  if (isTauri()) {
    try {
      const { save } = await import('@tauri-apps/plugin-dialog');
      const { writeTextFile } = await import('@tauri-apps/plugin-fs');

      const path =
        filePath ??
        (await save({
          title: `Save Skill: ${skill.internalName}`,
          defaultPath: `${skill.internalName}.yml`,
          filters: [{ name: 'YAML', extensions: ['yml', 'yaml'] }],
        }));

      if (!path) return false;

      await writeTextFile(path, yaml);
      return true;
    } catch (err) {
      console.error('[tauri-fs] Save failed:', err);
      return false;
    }
  }

  // Browser fallback: download as blob
  downloadBlob(yaml, `${skill.internalName}.yml`, 'text/yaml');
  return true;
}

// ─── Open / Load skill YAML ─────────────────────────

export async function openSkillFile(): Promise<{ path: string; content: string } | null> {
  if (isTauri()) {
    try {
      const { open } = await import('@tauri-apps/plugin-dialog');
      const { readTextFile } = await import('@tauri-apps/plugin-fs');

      const selected = await open({
        title: 'Open Skill File',
        multiple: false,
        filters: [{ name: 'YAML', extensions: ['yml', 'yaml'] }],
      });

      if (!selected) return null;

      const path = typeof selected === 'string' ? selected : selected;
      const content = await readTextFile(path);

      return { path, content };
    } catch (err) {
      console.error('[tauri-fs] Open failed:', err);
      return null;
    }
  }

  // Browser fallback: file input
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.yml,.yaml';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const content = await file.text();
      resolve({ path: file.name, content });
    };
    input.click();
  });
}

// ─── Export / Download ──────────────────────────────

export async function exportSkillYaml(skill: Skill): Promise<void> {
  const yaml = generateSkillYaml(skill);

  if (isTauri()) {
    try {
      const { save } = await import('@tauri-apps/plugin-dialog');
      const { writeTextFile } = await import('@tauri-apps/plugin-fs');

      const path = await save({
        title: `Export Skill: ${skill.internalName}`,
        defaultPath: `${skill.internalName}.yml`,
        filters: [{ name: 'YAML', extensions: ['yml', 'yaml'] }],
      });

      if (path) {
        await writeTextFile(path, yaml);
      }
    } catch (err) {
      console.error('[tauri-fs] Export failed:', err);
    }
    return;
  }

  downloadBlob(yaml, `${skill.internalName}.yml`, 'text/yaml');
}

// ─── Project save / load (.grimoire) ────────────────

/** Save the entire project state as a .grimoire JSON file. */
export async function saveProject(content: string, filePath?: string): Promise<string | null> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      const { save } = await import('@tauri-apps/plugin-dialog');

      const path =
        filePath ??
        (await save({
          title: 'Save Grimoire Project',
          defaultPath: 'project.grimoire',
          filters: [{ name: 'Grimoire Project', extensions: ['grimoire'] }],
        }));

      if (!path) return null;

      await invoke('save_project', { path, content });
      return path;
    } catch (err) {
      console.error('[tauri-fs] saveProject failed:', err);
      return null;
    }
  }

  // Browser fallback
  downloadBlob(content, 'project.grimoire', 'application/json');
  return 'project.grimoire';
}

/** Load a .grimoire project file. Returns the raw JSON string and the chosen path. */
export async function loadProject(): Promise<{ path: string; content: string } | null> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      const { open } = await import('@tauri-apps/plugin-dialog');

      const selected = await open({
        title: 'Open Grimoire Project',
        multiple: false,
        filters: [{ name: 'Grimoire Project', extensions: ['grimoire'] }],
      });

      if (!selected) return null;
      const path = typeof selected === 'string' ? selected : (selected as string);

      const content = await invoke<string>('load_project', { path });
      return { path, content };
    } catch (err) {
      console.error('[tauri-fs] loadProject failed:', err);
      return null;
    }
  }

  // Browser fallback: file input
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.grimoire';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      const content = await file.text();
      resolve({ path: file.name, content });
    };
    input.click();
  });
}

// ─── Auto-save backup / crash recovery ──────────────

/** Save a crash-recovery backup to the app data directory. */
export async function saveBackup(content: string): Promise<void> {
  if (!isTauri()) return;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('save_backup', { content });
  } catch (err) {
    console.error('[tauri-fs] saveBackup failed:', err);
  }
}

/** Load the latest crash-recovery backup. Returns null if none exists. */
export async function loadBackup(): Promise<string | null> {
  if (!isTauri()) return null;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke<string | null>('load_backup');
  } catch (err) {
    console.error('[tauri-fs] loadBackup failed:', err);
    return null;
  }
}

/** Remove the crash-recovery backup after a successful project save. */
export async function clearBackup(): Promise<void> {
  if (!isTauri()) return;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('clear_backup');
  } catch (err) {
    console.error('[tauri-fs] clearBackup failed:', err);
  }
}

// ─── Batch export ────────────────────────────────────

/** Export all skills, mobs, and items to a MythicMobs directory structure. */
export async function exportAllYaml(
  skillsYaml: string,
  mobsYaml: string,
  itemsYaml: string
): Promise<boolean> {
  if (isTauri()) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      const { open } = await import('@tauri-apps/plugin-dialog');

      const dir = await open({
        title: 'Choose Export Directory',
        directory: true,
        multiple: false,
      });

      if (!dir) return false;
      const dirPath = typeof dir === 'string' ? dir : (dir as string);

      await invoke('export_all_yaml', {
        dir: dirPath,
        skillsYaml,
        mobsYaml,
        itemsYaml,
      });
      return true;
    } catch (err) {
      console.error('[tauri-fs] exportAllYaml failed:', err);
      return false;
    }
  }

  // Browser fallback: download separate files
  downloadBlob(skillsYaml, 'skills.yml', 'text/yaml');
  downloadBlob(mobsYaml, 'mobs.yml', 'text/yaml');
  downloadBlob(itemsYaml, 'items.yml', 'text/yaml');
  return true;
}

/** Return the OS app data directory path (Tauri only). */
export async function getAppDataDir(): Promise<string | null> {
  if (!isTauri()) return null;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke<string>('get_app_data_dir');
  } catch (err) {
    console.error('[tauri-fs] getAppDataDir failed:', err);
    return null;
  }
}

// ─── Helpers ────────────────────────────────────────

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
