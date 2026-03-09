import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Download } from 'lucide-react';
import { useEditorStore, useNotificationStore } from '@/store';
import { generateSkillYaml } from '@/generators';
import { exportSkillYaml } from '@/lib/tauri-fs';

interface YamlPreviewPanelProps {
  skillId: string;
}

/** Simple YAML syntax highlighting via regex-based tokenization */
function highlightYaml(yaml: string): React.ReactNode[] {
  return yaml.split('\n').map((line, i) => {
    // Comment lines
    if (line.trimStart().startsWith('#')) {
      return (
        <div key={i} className="text-foreground/30 italic">
          {line}
        </div>
      );
    }

    // Key: value pattern
    const keyMatch = line.match(/^(\s*)([\w.]+)(\s*:\s*)(.*)/);
    if (keyMatch) {
      const [, indent, key, colon, value] = keyMatch;
      return (
        <div key={i}>
          <span>{indent}</span>
          <span className="text-cyan-400">{key}</span>
          <span className="text-foreground/50">{colon}</span>
          <span className={getValueColor(value)}>{value}</span>
        </div>
      );
    }

    // List items  - item
    const listMatch = line.match(/^(\s*)(- )(.*)/);
    if (listMatch) {
      const [, indent, dash, content] = listMatch;
      return (
        <div key={i}>
          <span>{indent}</span>
          <span className="text-yellow-500">{dash}</span>
          <span className="text-green-400">{content}</span>
        </div>
      );
    }

    return <div key={i}>{line}</div>;
  });
}

function getValueColor(value: string): string {
  if (!value || value.trim() === '') return 'text-foreground/60';
  const trimmed = value.trim();
  if (trimmed === 'true' || trimmed === 'false') return 'text-orange-400';
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return 'text-purple-400';
  if (trimmed.startsWith('"') || trimmed.startsWith("'")) return 'text-green-400';
  return 'text-green-400';
}

export function YamlPreviewPanel({ skillId }: YamlPreviewPanelProps) {
  const { t } = useTranslation();
  const skills = useEditorStore((s) => s.skills);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const skill = skills[skillId];

  const yamlOutput = useMemo(() => {
    if (!skill) return '# No skill loaded';
    try {
      return generateSkillYaml(skill);
    } catch {
      return '# Error generating YAML';
    }
  }, [skill]);

  const highlighted = useMemo(() => highlightYaml(yamlOutput), [yamlOutput]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(yamlOutput);
      addNotification({ type: 'success', message: t('notification.copied') });
    } catch {
      // Fallback
    }
  }, [yamlOutput, addNotification, t]);

  const handleExport = useCallback(async () => {
    if (skill) {
      await exportSkillYaml(skill);
      addNotification({ type: 'success', message: t('notification.exported') });
    }
  }, [skill, addNotification, t]);

  return (
    <div className="flex h-full flex-col bg-surface-1">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs font-medium text-foreground/60">{t('panel.yamlPreview')}</span>
        <div className="flex items-center gap-1">
          <button
            className="flex h-6 w-6 items-center justify-center rounded text-foreground/40 transition-colors hover:bg-surface-2 hover:text-foreground"
            onClick={handleCopy}
            title={t('notification.copied')}
          >
            <Copy size={13} />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded text-foreground/40 transition-colors hover:bg-surface-2 hover:text-foreground"
            onClick={handleExport}
            title={t('menu.export')}
          >
            <Download size={13} />
          </button>
        </div>
      </div>

      {/* YAML content with syntax highlighting */}
      <div className="flex-1 overflow-auto p-3">
        <pre className="font-mono text-xs leading-relaxed">
          <code>{highlighted}</code>
        </pre>
      </div>
    </div>
  );
}
