import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X } from 'lucide-react';
import { useLayoutStore, useNotificationStore } from '@/store';
import type { LayoutPreset } from '@/models/types';
import { cn } from '@/lib/utils';

interface SavePresetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SavePresetDialog({ isOpen, onClose }: SavePresetDialogProps) {
  const { t, i18n } = useTranslation();
  const addNotification = useNotificationStore((s) => s.addNotification);
  const currentLayout = useLayoutStore((s) => s.currentLayout);
  const saveCustomPreset = useLayoutStore((s) => s.saveCustomPreset);

  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const preset: LayoutPreset = {
      id: `custom-${Date.now()}`,
      name: trimmed,
      description: { [i18n.language]: trimmed },
      layout: currentLayout ?? { preset: 'custom' },
    };

    await saveCustomPreset(preset);
    addNotification({ type: 'success', message: t('layout.presetSaved') });
    setName('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface-1 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">{t('layout.savePreset')}</h2>
          <button
            className="flex h-6 w-6 items-center justify-center rounded text-foreground/60 hover:bg-surface-2 hover:text-foreground"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-3 px-4 py-4">
          <div>
            <label className="mb-1 block text-xs text-foreground/60">
              {t('layout.presetName')}
            </label>
            <input
              type="text"
              className={cn(
                'w-full rounded border border-border bg-surface-2 px-3 py-1.5 text-sm text-foreground',
                'outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30'
              )}
              placeholder={t('layout.presetName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
          <button
            className="rounded px-3 py-1.5 text-xs text-foreground/60 hover:bg-surface-2 hover:text-foreground"
            onClick={onClose}
          >
            {t('common.cancel')}
          </button>
          <button
            className={cn(
              'flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium',
              name.trim()
                ? 'bg-accent-primary text-white hover:bg-accent-primary/90'
                : 'cursor-not-allowed bg-surface-2 text-foreground/30'
            )}
            disabled={!name.trim()}
            onClick={handleSave}
          >
            <Save size={12} />
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}
