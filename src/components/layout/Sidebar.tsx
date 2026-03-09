import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Wand2,
  Skull,
  Sword,
  Search,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  FilePlus,
  Trash2,
  Copy,
} from 'lucide-react';
import { useLayoutStore, useEditorStore } from '@/store';
import { createEmptySkill } from '@/models/skill';
import { createEmptyMob } from '@/models/mob';
import { createEmptyItem } from '@/models/item';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const sidebarCollapsed = useLayoutStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useLayoutStore((s) => s.toggleSidebar);
  const skills = useEditorStore((s) => s.skills);
  const mobs = useEditorStore((s) => s.mobs);
  const items = useEditorStore((s) => s.items);
  const setSkill = useEditorStore((s) => s.setSkill);
  const setMob = useEditorStore((s) => s.setMob);
  const setItem = useEditorStore((s) => s.setItem);
  const removeSkill = useEditorStore((s) => s.removeSkill);
  const removeMob = useEditorStore((s) => s.removeMob);
  const removeItem = useEditorStore((s) => s.removeItem);
  const openTab = useEditorStore((s) => s.openTab);
  const closeTab = useEditorStore((s) => s.closeTab);
  const activeTabId = useEditorStore((s) => s.activeTabId);

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
    openTab({
      id: mob.id,
      type: 'mob',
      title: mob.internalName,
      entityId: mob.id,
      dirty: false,
    });
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

  const handleDuplicateSkill = (skillId: string) => {
    const original = skills[skillId];
    if (!original) return;
    const dupe = {
      ...structuredClone(original),
      id: crypto.randomUUID(),
      name: `${original.name} (copy)`,
      internalName: `${original.internalName}_copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSkill(dupe);
    openTab({
      id: dupe.id,
      type: 'skill',
      title: dupe.internalName,
      entityId: dupe.id,
      dirty: false,
    });
    navigate(`/skill/${dupe.id}`);
  };

  const handleDeleteSkill = (skillId: string) => {
    removeSkill(skillId);
    closeTab(skillId);
    if (location.pathname.includes(skillId)) navigate('/');
  };

  const handleDeleteMob = (mobId: string) => {
    removeMob(mobId);
    closeTab(mobId);
    if (location.pathname.includes(mobId)) navigate('/');
  };

  const handleDeleteItem = (itemId: string) => {
    removeItem(itemId);
    closeTab(itemId);
    if (location.pathname.includes(itemId)) navigate('/');
  };

  // Determine which entity type is active in nav
  const activeNav = location.pathname.startsWith('/mob')
    ? 'mob'
    : location.pathname.startsWith('/item')
      ? 'item'
      : 'skill';

  // Get entity list, filtered by search
  const skillList = Object.values(skills).filter(
    (s) =>
      !searchQuery ||
      s.internalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const mobList = Object.values(mobs).filter(
    (m) =>
      !searchQuery ||
      m.internalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const itemList = Object.values(items).filter(
    (i) =>
      !searchQuery ||
      i.internalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    {
      icon: Wand2,
      label: t('nav.skills'),
      path: '/skill',
      key: 'skill' as const,
      active: activeNav === 'skill',
    },
    {
      icon: Skull,
      label: t('nav.mobs'),
      path: '/mob',
      key: 'mob' as const,
      active: activeNav === 'mob',
    },
    {
      icon: Sword,
      label: t('nav.items'),
      path: '/item',
      key: 'item' as const,
      active: activeNav === 'item',
    },
  ];

  const handleNew =
    activeNav === 'mob' ? handleNewMob : activeNav === 'item' ? handleNewItem : handleNewSkill;
  const newLabel =
    activeNav === 'mob'
      ? t('editor.newMob')
      : activeNav === 'item'
        ? t('editor.newItem')
        : t('editor.newSkill');

  return (
    <aside
      className={cn(
        'fixed left-0 top-10 bottom-0 z-20 flex flex-col border-r border-border bg-surface-1 transition-all duration-200',
        sidebarCollapsed ? 'w-12' : 'w-60'
      )}
    >
      {/* Navigation icons / labels */}
      <nav className="flex flex-col gap-0.5 p-1.5">
        {navItems.map(({ icon: Icon, label, path, active }) => (
          <button
            key={path}
            className={cn(
              'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors',
              active
                ? 'bg-accent-primary/10 text-accent-primary'
                : 'text-foreground/60 hover:bg-surface-2 hover:text-foreground'
            )}
            onClick={() => navigate(path)}
            title={sidebarCollapsed ? label : undefined}
          >
            <Icon size={18} />
            {!sidebarCollapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Separator */}
      <div className="mx-3 my-1 h-px bg-border" />

      {/* Quick actions */}
      <div className="flex flex-col gap-0.5 p-1.5">
        <button
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/60 transition-colors hover:bg-surface-2 hover:text-foreground"
          onClick={handleNew}
          title={sidebarCollapsed ? newLabel : undefined}
        >
          <FilePlus size={18} />
          {!sidebarCollapsed && <span>{newLabel}</span>}
        </button>

        <button
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/60 transition-colors hover:bg-surface-2 hover:text-foreground"
          onClick={() => {
            setShowSearch(!showSearch);
            setSearchQuery('');
          }}
          title={sidebarCollapsed ? t('common.search') : undefined}
        >
          <Search size={18} />
          {!sidebarCollapsed && <span>{t('common.search')}</span>}
        </button>
      </div>

      {/* Search bar (when expanded) */}
      {showSearch && !sidebarCollapsed && (
        <div className="px-2 pb-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search') + '...'}
            className="w-full rounded bg-surface-2 px-2 py-1 text-xs text-foreground placeholder:text-foreground/30 outline-none focus:ring-1 focus:ring-accent-primary/50"
            autoFocus
          />
        </div>
      )}

      {/* Entity list */}
      {!sidebarCollapsed && (
        <div className="flex-1 overflow-y-auto px-1.5 scrollbar-thin">
          {/* Skills */}
          {activeNav === 'skill' && (
            <>
              {skillList.length === 0 ? (
                <div className="px-2 py-4 text-center text-xs text-foreground/30">
                  {t('common.noResults')}
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {skillList.map((skill) => {
                    const isActive =
                      activeTabId === skill.id || location.pathname.includes(skill.id);
                    return (
                      <div
                        key={skill.id}
                        className={cn(
                          'group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer',
                          isActive
                            ? 'bg-accent-primary/15 text-accent-primary'
                            : 'text-foreground/60 hover:bg-surface-2 hover:text-foreground'
                        )}
                        onClick={() => {
                          openTab({
                            id: skill.id,
                            type: 'skill',
                            title: skill.internalName,
                            entityId: skill.id,
                            dirty: false,
                          });
                          navigate(`/skill/${skill.id}`);
                        }}
                      >
                        <Wand2 size={13} className="shrink-0" />
                        <span className="flex-1 truncate">{skill.internalName}</span>
                        <div className="hidden gap-0.5 group-hover:flex">
                          <button
                            className="rounded p-0.5 text-foreground/30 hover:bg-surface-3 hover:text-foreground/60"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateSkill(skill.id);
                            }}
                            title="Duplicate"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            className="rounded p-0.5 text-foreground/30 hover:bg-red-500/20 hover:text-red-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSkill(skill.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Mobs */}
          {activeNav === 'mob' && (
            <>
              {mobList.length === 0 ? (
                <div className="px-2 py-4 text-center text-xs text-foreground/30">
                  {t('common.noResults')}
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {mobList.map((mob) => {
                    const isActive = activeTabId === mob.id || location.pathname.includes(mob.id);
                    return (
                      <div
                        key={mob.id}
                        className={cn(
                          'group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer',
                          isActive
                            ? 'bg-accent-primary/15 text-accent-primary'
                            : 'text-foreground/60 hover:bg-surface-2 hover:text-foreground'
                        )}
                        onClick={() => {
                          openTab({
                            id: mob.id,
                            type: 'mob',
                            title: mob.internalName || mob.displayName,
                            entityId: mob.id,
                            dirty: false,
                          });
                          navigate(`/mob/${mob.id}`);
                        }}
                      >
                        <Skull size={13} className="shrink-0" />
                        <span className="flex-1 truncate">
                          {mob.internalName || mob.displayName}
                        </span>
                        <div className="hidden gap-0.5 group-hover:flex">
                          <button
                            className="rounded p-0.5 text-foreground/30 hover:bg-red-500/20 hover:text-red-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMob(mob.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Items */}
          {activeNav === 'item' && (
            <>
              {itemList.length === 0 ? (
                <div className="px-2 py-4 text-center text-xs text-foreground/30">
                  {t('common.noResults')}
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {itemList.map((item) => {
                    const isActive = activeTabId === item.id || location.pathname.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          'group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors cursor-pointer',
                          isActive
                            ? 'bg-accent-primary/15 text-accent-primary'
                            : 'text-foreground/60 hover:bg-surface-2 hover:text-foreground'
                        )}
                        onClick={() => {
                          openTab({
                            id: item.id,
                            type: 'item',
                            title: item.internalName || item.displayName,
                            entityId: item.id,
                            dirty: false,
                          });
                          navigate(`/item/${item.id}`);
                        }}
                      >
                        <Sword size={13} className="shrink-0" />
                        <span className="flex-1 truncate">
                          {item.internalName || item.displayName}
                        </span>
                        <div className="hidden gap-0.5 group-hover:flex">
                          <button
                            className="rounded p-0.5 text-foreground/30 hover:bg-red-500/20 hover:text-red-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Spacer (only when collapsed) */}
      {sidebarCollapsed && <div className="flex-1" />}

      {/* Bottom actions */}
      <div className="flex flex-col gap-0.5 border-t border-border p-1.5">
        <button
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground/60 transition-colors hover:bg-surface-2 hover:text-foreground"
          onClick={() => navigate('/settings')}
          title={sidebarCollapsed ? t('nav.settings') : undefined}
        >
          <Settings size={18} />
          {!sidebarCollapsed && <span>{t('nav.settings')}</span>}
        </button>

        <button
          className="flex items-center justify-center rounded-md px-2.5 py-2 text-foreground/40 transition-colors hover:bg-surface-2 hover:text-foreground/80"
          onClick={toggleSidebar}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
    </aside>
  );
}
