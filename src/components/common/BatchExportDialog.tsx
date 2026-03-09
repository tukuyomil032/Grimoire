import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileDown, FolderOpen, X, Check, Loader2 } from 'lucide-react';
import { useEditorStore, useNotificationStore } from '@/store';
import { generateSkillYaml } from '@/generators/yaml/skill-yaml';
import { generateMobYamlFull } from '@/generators/yaml/mob-yaml';
import { generateItemYaml } from '@/generators/yaml/item-yaml';
import { exportAllYaml } from '@/lib/tauri-fs';
import { cn } from '@/lib/utils';

interface BatchExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BatchExportDialog({ isOpen, onClose }: BatchExportDialogProps) {
  const { t } = useTranslation();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const skills = useEditorStore((s) => s.skills);
  const mobs = useEditorStore((s) => s.mobs);
  const items = useEditorStore((s) => s.items);

  const [exporting, setExporting] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({
    skills: true,
    mobs: true,
    items: true,
  });

  const skillCount = Object.keys(skills).length;
  const mobCount = Object.keys(mobs).length;
  const itemCount = Object.keys(items).length;

  const toggleType = (type: keyof typeof selectedTypes) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      // Generate YAML for each type
      let skillsYaml = '';
      let mobsYaml = '';
      let itemsYaml = '';

      if (selectedTypes.skills && skillCount > 0) {
        const yamlParts: string[] = [];
        for (const skill of Object.values(skills)) {
          yamlParts.push(generateSkillYaml(skill));
        }
        skillsYaml = yamlParts.join('\n---\n');
      }

      if (selectedTypes.mobs && mobCount > 0) {
        const yamlParts: string[] = [];
        for (const mob of Object.values(mobs)) {
          yamlParts.push(generateMobYamlFull(mob));
        }
        mobsYaml = yamlParts.join('\n---\n');
      }

      if (selectedTypes.items && itemCount > 0) {
        const yamlParts: string[] = [];
        for (const item of Object.values(items)) {
          yamlParts.push(generateItemYaml(item));
        }
        itemsYaml = yamlParts.join('\n---\n');
      }

      const success = await exportAllYaml(skillsYaml, mobsYaml, itemsYaml);
      if (success) {
        addNotification({ type: 'success', message: t('notification.exported') });
        onClose();
      }
    } catch (err) {
      console.error('[BatchExport]', err);
      addNotification({ type: 'error', message: t('notification.error') });
    } finally {
      setExporting(false);
    }
  };

  if (!isOpen) return null;

  const totalCount =
    (selectedTypes.skills ? skillCount : 0) +
    (selectedTypes.mobs ? mobCount : 0) +
    (selectedTypes.items ? itemCount : 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[420px] rounded-xl border border-border bg-surface-1 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <FileDown size={16} className="text-accent-primary" />
            <h2 className="text-sm font-semibold text-foreground">Batch Export</h2>
          </div>
          <button
            className="rounded p-1 text-foreground/40 hover:bg-surface-2 hover:text-foreground"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-xs text-foreground/50">
            Export all entities to a MythicMobs-compatible directory structure. Select which types
            to include:
          </p>

          {/* Type checkboxes */}
          <div className="space-y-2">
            <TypeCheckbox
              label="Skills"
              count={skillCount}
              checked={selectedTypes.skills}
              onChange={() => toggleType('skills')}
            />
            <TypeCheckbox
              label="Mobs"
              count={mobCount}
              checked={selectedTypes.mobs}
              onChange={() => toggleType('mobs')}
            />
            <TypeCheckbox
              label="Items"
              count={itemCount}
              checked={selectedTypes.items}
              onChange={() => toggleType('items')}
            />
          </div>

          {/* Summary */}
          <div className="rounded border border-border bg-surface-2 px-3 py-2">
            <div className="flex justify-between text-xs text-foreground/50">
              <span>Total entities to export</span>
              <span className="font-medium text-foreground">{totalCount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-border px-4 py-3">
          <button
            className="rounded px-3 py-1.5 text-xs text-foreground/60 hover:bg-surface-2"
            onClick={onClose}
          >
            {t('common.cancel')}
          </button>
          <button
            className={cn(
              'flex items-center gap-1.5 rounded bg-accent-primary px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-primary/90',
              (totalCount === 0 || exporting) && 'opacity-50 cursor-not-allowed'
            )}
            onClick={handleExport}
            disabled={totalCount === 0 || exporting}
          >
            {exporting ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FolderOpen size={13} />
                Export ({totalCount})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function TypeCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded border border-border bg-surface-2 px-3 py-2 transition-colors hover:bg-surface-2/80">
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border transition-colors',
          checked ? 'border-accent-primary bg-accent-primary' : 'border-foreground/20'
        )}
        onClick={(e) => {
          e.preventDefault();
          onChange();
        }}
      >
        {checked && <Check size={10} className="text-white" />}
      </div>
      <span className="flex-1 text-xs font-medium text-foreground">{label}</span>
      <span className="rounded-full bg-surface-1 px-2 py-0.5 text-[10px] text-foreground/40">
        {count}
      </span>
    </label>
  );
}
