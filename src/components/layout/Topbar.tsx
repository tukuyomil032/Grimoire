import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  FolderOpen,
  Undo2,
  Redo2,
  Settings,
  Globe,
  FilePlus,
  FileDown,
  FileUp,
  ChevronDown,
} from 'lucide-react';
import { useEditorStore, useSettingsStore, useNotificationStore, useLayoutStore } from '@/store';
import { saveSkillToFile, openSkillFile } from '@/lib/tauri-fs';
import { createEmptySkill } from '@/models/skill';
import { createEmptyMob } from '@/models/mob';
import { createEmptyItem } from '@/models/item';
import { parseSkillYaml } from '@/generators/yaml/yaml-parser';
import { cn } from '@/lib/utils';
import { BatchExportDialog } from '@/components/common/BatchExportDialog';
import { SavePresetDialog } from '@/components/common/SavePresetDialog';
import { DETACHABLE_PANELS, detachPanel } from '@/lib/multi-window';

export function Topbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = useSettingsStore((s) => s.locale);
  const setLocale = useSettingsStore((s) => s.setLocale);
  const addNotification = useNotificationStore((s) => s.addNotification);

  const tabs = useEditorStore((s) => s.tabs);
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const setActiveTab = useEditorStore((s) => s.setActiveTab);
  const closeTab = useEditorStore((s) => s.closeTab);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [batchExportOpen, setBatchExportOpen] = useState(false);
  const [savePresetOpen, setSavePresetOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Layout store
  const presets = useLayoutStore((s) => s.presets);
  const activePresetId = useLayoutStore((s) => s.activePresetId);
  const setActivePreset = useLayoutStore((s) => s.setActivePreset);
  const toggleSidebar = useLayoutStore((s) => s.toggleSidebar);
  const resetPresets = useLayoutStore((s) => s.resetPresets);

  // Undo/Redo state
  const undoStacks = useEditorStore((s) => s.undoStacks);
  const redoStacks = useEditorStore((s) => s.redoStacks);
  const canUndo = activeTabId ? (undoStacks[activeTabId]?.length ?? 0) > 0 : false;
  const canRedo = activeTabId ? (redoStacks[activeTabId]?.length ?? 0) > 0 : false;

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ja' : 'en');
  };

  const handleSave = useCallback(async () => {
    if (!activeTabId) return;
    const skill = useEditorStore.getState().skills[activeTabId];
    if (skill) {
      const success = await saveSkillToFile(skill);
      if (success) {
        useEditorStore.getState().markTabDirty(activeTabId, false);
        addNotification({ type: 'success', message: t('notification.saved') });
      }
    }
  }, [activeTabId, addNotification, t]);

  const handleOpen = useCallback(async () => {
    const result = await openSkillFile();
    if (result) {
      try {
        const skills = parseSkillYaml(result.content);
        if (skills.length > 0) {
          const skill = skills[0];
          useEditorStore.getState().setSkill(skill);
          useEditorStore.getState().openTab({
            id: skill.id,
            type: 'skill',
            title: skill.internalName,
            entityId: skill.id,
            dirty: false,
          });
          navigate(`/skill/${skill.id}`);
          addNotification({ type: 'success', message: t('notification.imported') });
        }
      } catch (err) {
        console.error('[open] Failed to parse YAML:', err);
        addNotification({ type: 'error', message: t('notification.error') });
      }
    }
  }, [navigate, addNotification, t]);

  const handleNewSkill = useCallback(() => {
    const skill = createEmptySkill();
    skill.internalName = t('editor.untitled');
    useEditorStore.getState().setSkill(skill);
    useEditorStore.getState().openTab({
      id: skill.id,
      type: 'skill',
      title: skill.internalName,
      entityId: skill.id,
      dirty: false,
    });
    navigate(`/skill/${skill.id}`);
  }, [navigate, t]);

  const handleNewMob = useCallback(() => {
    const mob = createEmptyMob();
    mob.internalName = t('editor.untitled');
    useEditorStore.getState().setMob(mob);
    useEditorStore.getState().openTab({
      id: mob.id,
      type: 'mob',
      title: mob.internalName,
      entityId: mob.id,
      dirty: false,
    });
    navigate(`/mob/${mob.id}`);
  }, [navigate, t]);

  const handleNewItem = useCallback(() => {
    const item = createEmptyItem();
    item.internalName = t('editor.untitled');
    useEditorStore.getState().setItem(item);
    useEditorStore.getState().openTab({
      id: item.id,
      type: 'item',
      title: item.internalName,
      entityId: item.id,
      dirty: false,
    });
    navigate(`/item/${item.id}`);
  }, [navigate, t]);

  const handleUndo = () => {
    if (activeTabId) useEditorStore.getState().undo(activeTabId);
  };

  const handleRedo = () => {
    if (activeTabId) useEditorStore.getState().redo(activeTabId);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if (meta && e.key === 'o') {
        e.preventDefault();
        handleOpen();
      }
      if (meta && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if (meta && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        handleRedo();
      }
      if (meta && e.key === 'n') {
        e.preventDefault();
        handleNewSkill();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave, handleOpen, handleNewSkill]);

  const menus: { key: string; label: string; items: MenuItem[] }[] = [
    {
      key: 'file',
      label: t('menu.file'),
      items: [
        {
          label: t('menu.newSkill'),
          shortcut: '⌘N',
          action: handleNewSkill,
          icon: <FilePlus size={14} />,
        },
        { label: t('menu.newMob'), action: handleNewMob },
        { label: t('menu.newItem'), action: handleNewItem },
        { type: 'separator' },
        {
          label: t('menu.open'),
          shortcut: '⌘O',
          action: handleOpen,
          icon: <FolderOpen size={14} />,
        },
        { label: t('menu.save'), shortcut: '⌘S', action: handleSave, icon: <Save size={14} /> },
        { type: 'separator' },
        { label: t('menu.exportYaml'), action: handleSave, icon: <FileDown size={14} /> },
        {
          label: 'Batch Export...',
          action: () => setBatchExportOpen(true),
          icon: <FileDown size={14} />,
        },
        { label: t('menu.importYaml'), action: handleOpen, icon: <FileUp size={14} /> },
      ],
    },
    {
      key: 'edit',
      label: t('menu.edit'),
      items: [
        { label: t('menu.undo'), shortcut: '⌘Z', action: handleUndo, icon: <Undo2 size={14} /> },
        { label: t('menu.redo'), shortcut: '⌘⇧Z', action: handleRedo, icon: <Redo2 size={14} /> },
        { type: 'separator' },
        {
          label: t('menu.selectAll'),
          shortcut: '⌘A',
          action: () => document.execCommand('selectAll'),
        },
      ],
    },
    {
      key: 'view',
      label: t('menu.view'),
      items: [
        {
          label: t('menu.toggleSidebar'),
          shortcut: '⌘B',
          action: () => toggleSidebar(),
        },
        { type: 'separator' },
        // Layout presets
        ...presets.map((preset) => ({
          label: `${preset.id === activePresetId ? '● ' : '  '}${preset.name}`,
          action: () => setActivePreset(preset.id),
        })),
        { type: 'separator' },
        {
          label: t('layout.savePreset'),
          icon: <Save size={14} />,
          action: () => setSavePresetOpen(true),
        },
        {
          label: t('layout.resetToDefault'),
          action: () => {
            resetPresets();
            addNotification({ type: 'info', message: t('layout.presetsReset') });
          },
        },
        { type: 'separator' },
        { label: t('menu.zoomIn'), shortcut: '⌘+', action: () => {} },
        { label: t('menu.zoomOut'), shortcut: '⌘-', action: () => {} },
        { label: t('menu.fitView'), action: () => {} },
        { type: 'separator' },
        // Detach panel
        ...DETACHABLE_PANELS.map((panel) => ({
          label: `↗ ${t(panel.titleKey)}`,
          action: () =>
            detachPanel(panel.id, t(panel.titleKey), panel.defaultWidth, panel.defaultHeight),
        })),
      ],
    },
    {
      key: 'help',
      label: t('menu.help'),
      items: [
        { label: t('menu.shortcuts'), action: () => {} },
        {
          label: t('menu.documentation'),
          action: () =>
            window.open('https://git.lumine.io/mythiccraft/MythicMobs/-/wikis/home', '_blank'),
        },
        { type: 'separator' },
        { label: t('menu.about'), action: () => navigate('/settings') },
      ],
    },
  ];

  return (
    <header
      className="flex h-10 items-center border-b border-border bg-surface-1 px-2 select-none"
      data-tauri-drag-region
    >
      {/* App title */}
      <div className="flex items-center gap-2 px-2" data-tauri-drag-region>
        <span className="text-sm font-semibold text-foreground">{t('app.name')}</span>
      </div>

      {/* Dropdown menus */}
      <div className="flex items-center" ref={menuRef}>
        {menus.map((menu) => (
          <div key={menu.key} className="relative">
            <button
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 text-xs transition-colors rounded',
                openMenu === menu.key
                  ? 'bg-surface-2 text-foreground'
                  : 'text-foreground/60 hover:bg-surface-2/50 hover:text-foreground'
              )}
              onClick={() => setOpenMenu(openMenu === menu.key ? null : menu.key)}
              onMouseEnter={() => openMenu && setOpenMenu(menu.key)}
            >
              {menu.label}
              <ChevronDown size={12} />
            </button>
            {openMenu === menu.key && (
              <div className="absolute left-0 top-full z-50 mt-0.5 min-w-48 rounded-md border border-border bg-surface-1 py-1 shadow-xl">
                {menu.items.map((item, i) =>
                  'type' in item && item.type === 'separator' ? (
                    <div key={i} className="mx-2 my-1 h-px bg-border" />
                  ) : (
                    <button
                      key={i}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-accent-primary/10 hover:text-foreground"
                      onClick={() => {
                        setOpenMenu(null);
                        if ('action' in item && item.action) item.action();
                      }}
                    >
                      {'icon' in item && item.icon ? (
                        <span className="w-4">{item.icon}</span>
                      ) : (
                        <span className="w-4" />
                      )}
                      <span className="flex-1 text-left">{'label' in item ? item.label : ''}</span>
                      {'shortcut' in item && item.shortcut && (
                        <span className="text-foreground/30 text-[10px]">{item.shortcut}</span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="ml-2 flex flex-1 items-center gap-0.5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              'group flex items-center gap-1.5 rounded-t px-3 py-1 text-xs transition-colors',
              tab.id === activeTabId
                ? 'bg-surface-2 text-foreground'
                : 'text-foreground/60 hover:bg-surface-2/50 hover:text-foreground/80'
            )}
            onClick={() => {
              setActiveTab(tab.id);
              const prefix = tab.type === 'mob' ? '/mob' : tab.type === 'item' ? '/item' : '/skill';
              navigate(`${prefix}/${tab.entityId}`);
            }}
          >
            <span>{tab.title}</span>
            {tab.dirty && <span className="text-accent-primary">●</span>}
            <span
              className="ml-1 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              ×
            </span>
          </button>
        ))}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-1 border-l border-border pl-2">
        <TopbarButton
          icon={<Undo2 size={15} />}
          tooltip={`${t('menu.undo')} (⌘Z)`}
          onClick={handleUndo}
          disabled={!canUndo}
        />
        <TopbarButton
          icon={<Redo2 size={15} />}
          tooltip={`${t('menu.redo')} (⌘⇧Z)`}
          onClick={handleRedo}
          disabled={!canRedo}
        />
        <div className="mx-1 h-4 w-px bg-border" />
        <TopbarButton
          icon={<Globe size={15} />}
          tooltip={locale === 'en' ? '日本語に切替' : 'Switch to English'}
          onClick={toggleLocale}
        />
        <TopbarButton
          icon={<Settings size={15} />}
          tooltip={t('nav.settings')}
          onClick={() => navigate('/settings')}
        />
      </div>

      {/* Batch Export Dialog */}
      <BatchExportDialog isOpen={batchExportOpen} onClose={() => setBatchExportOpen(false)} />

      {/* Save Preset Dialog */}
      <SavePresetDialog isOpen={savePresetOpen} onClose={() => setSavePresetOpen(false)} />
    </header>
  );
}

type MenuItem =
  | { label: string; shortcut?: string; action: () => void; icon?: React.ReactNode }
  | { type: 'separator' };

function TopbarButton({
  icon,
  tooltip,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded transition-colors',
        disabled
          ? 'cursor-not-allowed text-foreground/20'
          : 'text-foreground/60 hover:bg-surface-2 hover:text-foreground'
      )}
      title={tooltip}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
