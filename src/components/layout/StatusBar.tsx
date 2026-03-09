import { useTranslation } from 'react-i18next';
import { useEditorStore, useSettingsStore } from '@/store';
import { useProjectStore } from '@/store/project-store';

export function StatusBar() {
  const { t } = useTranslation();
  const locale = useSettingsStore((s) => s.locale);
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const skills = useEditorStore((s) => s.skills);
  const tabs = useEditorStore((s) => s.tabs);
  const projectName = useProjectStore((s) => s.projectName);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const activeSkill = activeTabId ? skills[activeTabId] : null;

  return (
    <footer className="flex h-6 items-center justify-between border-t border-border bg-surface-1 px-3 text-[11px] text-foreground/40 select-none">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {projectName && <span className="text-foreground/50">{projectName}</span>}
        {activeTab && (
          <>
            <span className="text-foreground/30">|</span>
            <span>
              {activeTab.type === 'skill'
                ? t('nav.skills')
                : activeTab.type === 'mob'
                  ? t('nav.mobs')
                  : t('nav.items')}
              : {activeSkill?.internalName || activeTab.title}
            </span>
            {activeTab.dirty && <span className="text-accent-primary">(unsaved)</span>}
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {activeSkill && (
          <span>
            {activeSkill.actions?.length || 0} {t('skill.mechanics').toLowerCase()} /{' '}
            {activeSkill.conditions?.length || 0} {t('skill.conditions').toLowerCase()}
          </span>
        )}
        <span className="text-foreground/30">|</span>
        <span>{locale.toUpperCase()}</span>
        <span className="text-foreground/30">|</span>
        <span>Grimoire v0.1.0</span>
      </div>
    </footer>
  );
}
