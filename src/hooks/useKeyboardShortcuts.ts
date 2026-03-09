/**
 * Global keyboard shortcuts hook.
 * Handles ⌘Z (Undo), ⌘⇧Z (Redo), ⌘N (New Skill), ⌘S (Save), ⌘O (Open).
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/store';
import { createEmptySkill } from '@/models/skill';
import { saveSkillToFile, openSkillFile } from '@/lib/tauri-fs';
import { parseSkillYaml } from '@/generators/yaml/yaml-parser';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      const state = useEditorStore.getState();
      const activeId = state.activeTabId;

      switch (e.key.toLowerCase()) {
        // ⌘Z — Undo / ⌘⇧Z — Redo
        case 'z': {
          if (!activeId) return;
          e.preventDefault();
          if (e.shiftKey) {
            state.redo(activeId);
          } else {
            state.undo(activeId);
          }
          break;
        }

        // ⌘N — New Skill
        case 'n': {
          e.preventDefault();
          const skill = createEmptySkill();
          skill.internalName = 'NewSkill';
          state.setSkill(skill);
          state.openTab({
            id: skill.id,
            type: 'skill',
            title: skill.internalName,
            entityId: skill.id,
            dirty: false,
          });
          navigate(`/skill/${skill.id}`);
          break;
        }

        // ⌘S — Save active skill
        case 's': {
          e.preventDefault();
          if (!activeId) return;
          const skill = state.skills[activeId];
          if (skill) {
            saveSkillToFile(skill).then(() => {
              state.markTabDirty(activeId, false);
            });
          }
          break;
        }

        // ⌘O — Open YAML file and import as skill
        case 'o': {
          e.preventDefault();
          openSkillFile().then((result: { path: string; content: string } | null) => {
            if (!result) return;
            try {
              const parsed = parseSkillYaml(result.content);
              const skill = parsed.length > 0 ? parsed[0] : createEmptySkill();
              if (parsed.length === 0) {
                const baseName =
                  result.path
                    .replace(/\.(yml|yaml)$/, '')
                    .split('/')
                    .pop() ?? 'Skill';
                skill.internalName = baseName;
                skill.name = baseName;
              }
              state.setSkill(skill);
              state.openTab({
                id: skill.id,
                type: 'skill',
                title: skill.internalName,
                entityId: skill.id,
                dirty: false,
              });
              navigate(`/skill/${skill.id}`);
            } catch (err) {
              console.error('[shortcut:open] Failed to parse YAML:', err);
            }
          });
          break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);
}
