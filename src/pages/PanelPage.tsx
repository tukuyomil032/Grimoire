/**
 * PanelPage — renders a single editor panel for detached windows.
 *
 * When a panel is detached via multi-window, this page is rendered
 * at /panel/:panelId in the new Tauri WebviewWindow.
 */
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEditorStore } from '@/store';
import { BlocklyPanel } from '@/components/editor/BlocklyPanel';
import { YamlPreviewPanel } from '@/components/editor/YamlPreviewPanel';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { NodeEditorPanel } from '@/components/editor/NodeEditorPanel';
import { MechanicsBrowser } from '@/components/editor/MechanicsBrowser';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export function PanelPage() {
  const { panelId } = useParams<{ panelId: string }>();
  const { t } = useTranslation();
  const activeTabId = useEditorStore((s) => s.activeTabId);

  // Need a skill/entity ID for context — use whatever is active
  const skillId = activeTabId ?? '';

  const renderPanel = () => {
    switch (panelId) {
      case 'blockly':
        return (
          <ErrorBoundary compact fallbackMessage="Block editor error">
            <BlocklyPanel skillId={skillId} />
          </ErrorBoundary>
        );
      case 'yaml':
        return (
          <ErrorBoundary compact fallbackMessage="YAML preview error">
            <YamlPreviewPanel skillId={skillId} />
          </ErrorBoundary>
        );
      case 'properties':
        return (
          <ErrorBoundary compact fallbackMessage="Properties error">
            <PropertyPanel skillId={skillId} />
          </ErrorBoundary>
        );
      case 'nodeEditor':
        return (
          <ErrorBoundary compact fallbackMessage="Node editor error">
            <NodeEditorPanel skillId={skillId} />
          </ErrorBoundary>
        );
      case 'mechanicsBrowser':
        return (
          <ErrorBoundary compact fallbackMessage="Mechanics browser error">
            <MechanicsBrowser />
          </ErrorBoundary>
        );
      default:
        return (
          <div className="flex h-full items-center justify-center text-foreground/60">
            {t('common.close')}: {panelId}
          </div>
        );
    }
  };

  return <div className="h-screen w-screen bg-surface-0 text-foreground">{renderPanel()}</div>;
}
