/**
 * Persistent store integration via @tauri-apps/plugin-store.
 *
 * Provides helpers to load/save app state (recent projects, settings)
 * across sessions. Falls back to localStorage in browser-only environments.
 */
import type { LayoutPreset, RecentProject } from '@/models/types';

const STORE_FILE = 'grimoire.bin';
const KEY_RECENT_PROJECTS = 'recentProjects';
const KEY_LANGUAGE = 'language';
const KEY_THEME = 'theme';
const KEY_AUTO_SAVE = 'autoSaveEnabled';
const KEY_AUTO_SAVE_INTERVAL = 'autoSaveInterval';
const KEY_LAYOUT_PRESETS = 'layoutPresets';

function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

// ─── Internal: get store instance ─────────────────────────────────────────────

let _store: import('@tauri-apps/plugin-store').Store | null = null;

async function getStore() {
  if (_store) return _store;
  if (!isTauri()) return null;
  try {
    const { Store } = await import('@tauri-apps/plugin-store');
    _store = await Store.load(STORE_FILE);
    return _store;
  } catch (err) {
    console.error('[persistence] Failed to open store:', err);
    return null;
  }
}

// ─── Generic get / set helpers ─────────────────────────────────────────────────

async function persistGet<T>(key: string, fallback: T): Promise<T> {
  const store = await getStore();
  if (store) {
    const value = await store.get<T>(key);
    return value !== null && value !== undefined ? value : fallback;
  }
  // localStorage fallback
  try {
    const raw = localStorage.getItem(`grimoire:${key}`);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

async function persistSet<T>(key: string, value: T): Promise<void> {
  const store = await getStore();
  if (store) {
    await store.set(key, value);
    await store.save();
    return;
  }
  // localStorage fallback
  try {
    localStorage.setItem(`grimoire:${key}`, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

// ─── Recent Projects ──────────────────────────────────────────────────────────

export async function loadRecentProjects(): Promise<RecentProject[]> {
  return persistGet<RecentProject[]>(KEY_RECENT_PROJECTS, []);
}

export async function saveRecentProjects(projects: RecentProject[]): Promise<void> {
  await persistSet(KEY_RECENT_PROJECTS, projects.slice(0, 10));
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface PersistedSettings {
  language: string;
  theme: string;
  autoSaveEnabled: boolean;
  autoSaveInterval: number;
}

export async function loadSettings(): Promise<Partial<PersistedSettings>> {
  const [language, theme, autoSaveEnabled, autoSaveInterval] = await Promise.all([
    persistGet<string>(KEY_LANGUAGE, 'en'),
    persistGet<string>(KEY_THEME, 'dark'),
    persistGet<boolean>(KEY_AUTO_SAVE, true),
    persistGet<number>(KEY_AUTO_SAVE_INTERVAL, 30),
  ]);
  return { language, theme, autoSaveEnabled, autoSaveInterval };
}

export async function saveSettings(settings: Partial<PersistedSettings>): Promise<void> {
  const tasks: Promise<void>[] = [];
  if (settings.language !== undefined) tasks.push(persistSet(KEY_LANGUAGE, settings.language));
  if (settings.theme !== undefined) tasks.push(persistSet(KEY_THEME, settings.theme));
  if (settings.autoSaveEnabled !== undefined)
    tasks.push(persistSet(KEY_AUTO_SAVE, settings.autoSaveEnabled));
  if (settings.autoSaveInterval !== undefined)
    tasks.push(persistSet(KEY_AUTO_SAVE_INTERVAL, settings.autoSaveInterval));
  await Promise.all(tasks);
}

// ─── Layout Presets ───────────────────────────────────────────────────────────

export async function loadLayoutPresets(): Promise<LayoutPreset[]> {
  return persistGet<LayoutPreset[]>(KEY_LAYOUT_PRESETS, []);
}

export async function saveLayoutPresets(presets: LayoutPreset[]): Promise<void> {
  await persistSet(KEY_LAYOUT_PRESETS, presets);
}
