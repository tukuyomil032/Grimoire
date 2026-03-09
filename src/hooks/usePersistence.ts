/**
 * Initializes cross-session persistence on app startup.
 *
 * - Loads recent projects from plugin-store / localStorage into Zustand.
 * - Loads persisted settings into the settings store.
 * - Subscribes to store changes and saves back automatically.
 */
import { useEffect } from 'react';
import { useProjectStore, useSettingsStore } from '@/store';
import {
  loadRecentProjects,
  saveRecentProjects,
  loadSettings,
  saveSettings,
} from '@/lib/persistence';

export function usePersistence() {
  useEffect(() => {
    // ── Load persisted data on mount ──────────────────────────────────────
    async function init() {
      try {
        const [recentProjects, settings] = await Promise.all([
          loadRecentProjects(),
          loadSettings(),
        ]);

        if (recentProjects.length > 0) {
          useProjectStore.getState().setRecentProjects(recentProjects);
        }

        if (settings.language) {
          useSettingsStore.getState().setLocale(settings.language as 'en' | 'ja');
        }
        if (settings.autoSaveEnabled !== undefined) {
          useSettingsStore.getState().setAutoSave(settings.autoSaveEnabled);
        }
        if (settings.autoSaveInterval !== undefined) {
          useSettingsStore.getState().setAutoSaveInterval(settings.autoSaveInterval);
        }
      } catch (err) {
        console.error('[persistence] init failed:', err);
      }
    }

    init();

    // ── Subscribe to project store changes → persist ──────────────────────
    const unsubProject = useProjectStore.subscribe((state, prevState) => {
      if (state.recentProjects !== prevState.recentProjects) {
        saveRecentProjects(state.recentProjects).catch(console.error);
      }
    });

    // ── Subscribe to settings store changes → persist ─────────────────────
    const unsubSettings = useSettingsStore.subscribe((state, prevState) => {
      const changed: Parameters<typeof saveSettings>[0] = {};
      if (state.locale !== prevState.locale) changed.language = state.locale;
      if (state.autoSave !== prevState.autoSave) changed.autoSaveEnabled = state.autoSave;
      if (state.autoSaveInterval !== prevState.autoSaveInterval)
        changed.autoSaveInterval = state.autoSaveInterval;
      if (Object.keys(changed).length > 0) {
        saveSettings(changed).catch(console.error);
      }
    });

    return () => {
      unsubProject();
      unsubSettings();
    };
  }, []);
}
