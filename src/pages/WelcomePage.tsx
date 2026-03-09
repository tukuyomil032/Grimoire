import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Wand2, FilePlus, FolderOpen, Skull, Sword, Clock, ArrowRight } from 'lucide-react';
import { useEditorStore, useProjectStore } from '@/store';
import { createEmptySkill } from '@/models/skill';
import { createEmptyMob } from '@/models/mob';
import { createEmptyItem } from '@/models/item';
import { openSkillFile } from '@/lib/tauri-fs';
import { parseSkillYaml } from '@/generators/yaml/yaml-parser';
import { SKILL_TEMPLATES } from '@/models/templates';

export function WelcomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setSkill = useEditorStore((s) => s.setSkill);
  const setMob = useEditorStore((s) => s.setMob);
  const setItem = useEditorStore((s) => s.setItem);
  const openTab = useEditorStore((s) => s.openTab);
  const recentProjects = useProjectStore((s) => s.recentProjects);

  const handleNewSkill = () => {
    const skill = createEmptySkill();
    skill.internalName = t('editor.untitled');
    setSkill(skill);
    openTab({
      id: skill.id,
      type: 'skill',
      title: skill.internalName,
      entityId: skill.id,
      dirty: false,
    });
    navigate(`/skill/${skill.id}`);
  };

  const handleNewMob = () => {
    const mob = createEmptyMob();
    mob.internalName = t('editor.untitled');
    setMob(mob);
    openTab({ id: mob.id, type: 'mob', title: mob.internalName, entityId: mob.id, dirty: false });
    navigate(`/mob/${mob.id}`);
  };

  const handleNewItem = () => {
    const item = createEmptyItem();
    item.internalName = t('editor.untitled');
    setItem(item);
    openTab({
      id: item.id,
      type: 'item',
      title: item.internalName,
      entityId: item.id,
      dirty: false,
    });
    navigate(`/item/${item.id}`);
  };

  const handleOpen = async () => {
    const result = await openSkillFile();
    if (result) {
      try {
        const skills = parseSkillYaml(result.content);
        if (skills.length > 0) {
          const skill = skills[0];
          setSkill(skill);
          openTab({
            id: skill.id,
            type: 'skill',
            title: skill.internalName,
            entityId: skill.id,
            dirty: false,
          });
          navigate(`/skill/${skill.id}`);
        }
      } catch (err) {
        console.error('[open] Failed to parse YAML:', err);
      }
    }
  };

  const handleTemplate = (templateId: string) => {
    const template = SKILL_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;
    const skill = template.create();
    setSkill(skill);
    openTab({
      id: skill.id,
      type: 'skill',
      title: skill.internalName,
      entityId: skill.id,
      dirty: false,
    });
    navigate(`/skill/${skill.id}`);
  };

  return (
    <div className="flex h-full overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-8 py-12">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 ring-1 ring-accent-primary/30">
            <Wand2 size={40} className="text-accent-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('app.name')}</h1>
          <p className="text-sm text-foreground/50">{t('app.subtitle')}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ActionCard
            icon={<FilePlus size={20} />}
            title={t('editor.newSkill')}
            description="Create a new MythicMobs skill"
            onClick={handleNewSkill}
          />
          <ActionCard
            icon={<Skull size={20} />}
            title={t('editor.newMob')}
            description="Design a custom mob"
            onClick={handleNewMob}
          />
          <ActionCard
            icon={<Sword size={20} />}
            title={t('editor.newItem')}
            description="Craft a mythic item"
            onClick={handleNewItem}
          />
          <ActionCard
            icon={<FolderOpen size={20} />}
            title={t('menu.open')}
            description="Open an existing YAML file"
            onClick={handleOpen}
          />
        </div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <Clock size={16} />
              {t('welcome.recentProjects')}
            </h2>
            <div className="flex flex-col gap-1.5">
              {recentProjects.slice(0, 5).map((project) => (
                <button
                  key={project.path}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-1 px-4 py-3 text-left transition-all hover:border-accent-primary/30 hover:bg-surface-2"
                  onClick={() => {
                    /* TODO: open project by path */
                  }}
                >
                  <FolderOpen size={16} className="shrink-0 text-accent-secondary" />
                  <div className="flex-1 truncate">
                    <div className="text-sm font-medium text-foreground">{project.name}</div>
                    <div className="truncate text-xs text-foreground/40">{project.path}</div>
                  </div>
                  <span className="text-xs text-foreground/30">
                    {new Date(project.lastOpened).toLocaleDateString()}
                  </span>
                  <ArrowRight size={14} className="text-foreground/20" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Templates */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Wand2 size={16} />
            {t('template.title')}
          </h2>
          <p className="mb-4 text-xs text-foreground/40">{t('template.description')}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface-1 p-3 text-left transition-all hover:border-accent-primary/30 hover:bg-surface-2"
                onClick={() => handleTemplate(tmpl.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tmpl.icon}</span>
                  <span className="text-xs font-medium text-foreground">{t(tmpl.nameKey)}</span>
                </div>
                <span className="text-[11px] text-foreground/40">{t(tmpl.descKey)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Keyboard shortcuts hint */}
        <div className="flex items-center justify-center gap-4 text-xs text-foreground/30 pb-4">
          <span>
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-foreground/50">⌘N</kbd> New
            Skill
          </span>
          <span>
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-foreground/50">⌘O</kbd> Open
            File
          </span>
          <span>
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 text-foreground/50">⌘S</kbd> Save
          </span>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex items-center gap-4 rounded-lg border border-border bg-surface-1 p-4 text-left transition-all hover:border-accent-primary/30 hover:bg-surface-2"
      onClick={onClick}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-accent-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="truncate text-xs text-foreground/50">{description}</div>
      </div>
    </button>
  );
}
