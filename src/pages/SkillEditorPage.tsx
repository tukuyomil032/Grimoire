import { useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DockLayout, { type LayoutData, type TabData } from 'rc-dock';
import 'rc-dock/dist/rc-dock-dark.css';
import '@/styles/rc-dock-override.css';
import { useEditorStore, useLayoutStore } from '@/store';
import { createEmptySkill } from '@/models/skill';
import { BlocklyPanel } from '@/components/editor/BlocklyPanel';
import { YamlPreviewPanel } from '@/components/editor/YamlPreviewPanel';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { NodeEditorPanel } from '@/components/editor/NodeEditorPanel';
import { MechanicsBrowser } from '@/components/editor/MechanicsBrowser';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useTranslation } from 'react-i18next';

export function SkillEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dockRef = useRef<DockLayout>(null);

  const skills = useEditorStore((s) => s.skills);
  const setSkill = useEditorStore((s) => s.setSkill);
  const openTab = useEditorStore((s) => s.openTab);
  const setCurrentLayout = useLayoutStore((s) => s.setCurrentLayout);

  // Ensure the skill exists in the store
  useEffect(() => {
    if (!id) {
      // No id provided, create a new skill
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
      navigate(`/skill/${skill.id}`, { replace: true });
      return;
    }

    if (!skills[id]) {
      // Skill not loaded yet — create placeholder
      const skill = createEmptySkill();
      skill.id = id;
      skill.internalName = t('editor.untitled');
      setSkill(skill);
      openTab({
        id: skill.id,
        type: 'skill',
        title: skill.internalName,
        entityId: skill.id,
        dirty: false,
      });
    }
  }, [id, skills, setSkill, openTab, navigate, t]);

  const currentSkillId = id || '';

  const loadTab = useCallback(
    (tab: TabData): TabData => {
      const tabId = tab.id as string;
      switch (tabId) {
        case 'blockly':
          return {
            ...tab,
            title: t('panel.blockEditor'),
            content: (
              <ErrorBoundary compact fallbackMessage="Block editor error">
                <BlocklyPanel skillId={currentSkillId} />
              </ErrorBoundary>
            ),
            closable: false,
          };
        case 'yaml':
          return {
            ...tab,
            title: t('panel.yamlPreview'),
            content: (
              <ErrorBoundary compact fallbackMessage="YAML preview error">
                <YamlPreviewPanel skillId={currentSkillId} />
              </ErrorBoundary>
            ),
          };
        case 'properties':
          return {
            ...tab,
            title: t('panel.properties'),
            content: (
              <ErrorBoundary compact fallbackMessage="Properties error">
                <PropertyPanel skillId={currentSkillId} />
              </ErrorBoundary>
            ),
          };
        case 'nodeEditor':
          return {
            ...tab,
            title: t('panel.nodeEditor'),
            content: (
              <ErrorBoundary compact fallbackMessage="Node editor error">
                <NodeEditorPanel skillId={currentSkillId} />
              </ErrorBoundary>
            ),
          };
        case 'mechanicsBrowser':
          return {
            ...tab,
            title: t('panel.mechanicsBrowser'),
            content: (
              <ErrorBoundary compact fallbackMessage="Mechanics browser error">
                <MechanicsBrowser />
              </ErrorBoundary>
            ),
          };
        default:
          return { ...tab, title: 'Unknown', content: <div /> };
      }
    },
    [currentSkillId, t]
  );

  const defaultLayout: LayoutData = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          size: 600,
          children: [
            {
              size: 400,
              tabs: [{ id: 'blockly', title: '', content: <div /> } as TabData],
            },
            {
              size: 200,
              tabs: [{ id: 'nodeEditor', title: '', content: <div /> } as TabData],
            },
          ],
        },
        {
          mode: 'vertical',
          size: 300,
          children: [
            {
              size: 200,
              tabs: [{ id: 'properties', title: '', content: <div /> } as TabData],
            },
            {
              size: 200,
              tabs: [{ id: 'mechanicsBrowser', title: '', content: <div /> } as TabData],
            },
            {
              size: 200,
              tabs: [{ id: 'yaml', title: '', content: <div /> } as TabData],
            },
          ],
        },
      ],
    },
  };

  const handleLayoutChange = (newLayout: LayoutData) => {
    setCurrentLayout(newLayout);
  };

  if (!currentSkillId) {
    return null;
  }

  return (
    <div className="h-full w-full">
      <DockLayout
        ref={dockRef}
        defaultLayout={defaultLayout}
        loadTab={loadTab}
        onLayoutChange={handleLayoutChange}
        style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </div>
  );
}
