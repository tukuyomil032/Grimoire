import { useEffect, useRef } from 'react';
import { useEditorStore, useSettingsStore, useNotificationStore } from '@/store';
import { saveSkillToFile } from '@/lib/tauri-fs';

/**
 * Auto-save hook: periodically saves dirty tabs when auto-save is enabled.
 */
export function useAutoSave() {
  const autoSave = useSettingsStore((s) => s.autoSave);
  const interval = useSettingsStore((s) => s.autoSaveInterval);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!autoSave) return;

    timerRef.current = setInterval(async () => {
      const state = useEditorStore.getState();
      const dirtyTabs = state.tabs.filter((t) => t.dirty && t.type === 'skill');

      for (const tab of dirtyTabs) {
        const skill = state.skills[tab.entityId];
        if (skill) {
          try {
            const success = await saveSkillToFile(skill);
            if (success) {
              useEditorStore.getState().markTabDirty(tab.id, false);
            }
          } catch {
            // Silent failure for auto-save
          }
        }
      }

      if (dirtyTabs.length > 0) {
        addNotification({
          type: 'info',
          message: `Auto-saved ${dirtyTabs.length} file(s)`,
          duration: 2000,
        });
      }
    }, interval * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoSave, interval, addNotification]);
}
