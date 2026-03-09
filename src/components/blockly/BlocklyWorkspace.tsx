import { useEffect, useRef, useState, useCallback } from 'react';
import Blockly from 'blockly';
import { grimoireDarkTheme } from './theme';
import { registerAllBlocks } from './blocks';
import { generateToolboxXml } from './toolbox';
import { serializeWorkspace } from './serializer';
import { deserializeToWorkspace } from './deserializer';
import { useEditorStore } from '@/store';

// Register blocks once globally
let blocksRegistered = false;

interface BlocklyWorkspaceProps {
  skillId: string;
  className?: string;
}

export function BlocklyWorkspace({ skillId, className }: BlocklyWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [isReady, setIsReady] = useState(false);
  const isDeserializing = useRef(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialLoadDone = useRef(false);

  const pushUndo = useEditorStore((s) => s.pushUndo);
  const skills = useEditorStore((s) => s.skills);
  const updateSkill = useEditorStore((s) => s.updateSkill);
  const markTabDirty = useEditorStore((s) => s.markTabDirty);
  const setSelectedBlock = useEditorStore((s) => s.setSelectedBlock);

  // Register blocks once
  useEffect(() => {
    if (!blocksRegistered) {
      registerAllBlocks();
      blocksRegistered = true;
    }
  }, []);

  // Initialize workspace
  useEffect(() => {
    if (!containerRef.current) return;

    const toolboxXml = generateToolboxXml();

    const workspace = Blockly.inject(containerRef.current, {
      theme: grimoireDarkTheme,
      toolbox: toolboxXml,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#1A1A2E',
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.9,
        maxScale: 2,
        minScale: 0.3,
        scaleSpeed: 1.1,
        pinch: true,
      },
      trashcan: true,
      move: {
        scrollbars: {
          horizontal: true,
          vertical: true,
        },
        drag: true,
        wheel: false,
      },
      renderer: 'zelos',
      sounds: false,
    });

    workspaceRef.current = workspace;
    setIsReady(true);

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      workspace.dispose();
      workspaceRef.current = null;
      setIsReady(false);
      initialLoadDone.current = false;
    };
  }, []);

  // Load skill into Blockly on first mount / when skillId changes
  useEffect(() => {
    if (!workspaceRef.current || !isReady) return;
    const skill = skills[skillId];
    if (!skill || initialLoadDone.current) return;

    isDeserializing.current = true;
    deserializeToWorkspace(workspaceRef.current, skill);
    isDeserializing.current = false;
    initialLoadDone.current = true;
  }, [isReady, skillId, skills]);

  // ─── Serialize Blockly → Skill (debounced) ─────
  const syncBlocklyToSkill = useCallback(() => {
    if (!workspaceRef.current || isDeserializing.current) return;

    const data = serializeWorkspace(workspaceRef.current);

    // Push undo snapshot before applying
    const currentSkill = useEditorStore.getState().skills[skillId];
    if (currentSkill) {
      pushUndo(skillId, structuredClone(currentSkill));
    }

    updateSkill(skillId, (s) => ({
      ...s,
      triggers: data.triggers.length > 0 ? data.triggers : s.triggers,
      actions: data.actions,
      conditions: data.conditions.length > 0 ? data.conditions : s.conditions,
    }));

    markTabDirty(skillId, true);
  }, [skillId, pushUndo, updateSkill, markTabDirty]);

  // Listen for block selection changes
  const handleBlockSelected = useCallback(
    (event: Blockly.Events.Abstract) => {
      if (event.type === Blockly.Events.SELECTED) {
        const selectedEvent = event as Blockly.Events.Selected;
        setSelectedBlock(selectedEvent.newElementId ?? null);
      }
    },
    [setSelectedBlock]
  );

  // Listen for workspace changes → debounced sync
  const handleWorkspaceChange = useCallback(
    (event: Blockly.Events.Abstract) => {
      if (isDeserializing.current) return;

      // Only respond to meaningful block-level changes
      if (
        event.type === Blockly.Events.BLOCK_CHANGE ||
        event.type === Blockly.Events.BLOCK_CREATE ||
        event.type === Blockly.Events.BLOCK_DELETE ||
        event.type === Blockly.Events.BLOCK_MOVE
      ) {
        // Debounce serialization to avoid excessive updates
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(syncBlocklyToSkill, 300);
      }
    },
    [syncBlocklyToSkill]
  );

  // Attach event listeners
  useEffect(() => {
    if (!workspaceRef.current || !isReady) return;

    const workspace = workspaceRef.current;
    workspace.addChangeListener(handleBlockSelected);
    workspace.addChangeListener(handleWorkspaceChange);

    return () => {
      workspace.removeChangeListener(handleBlockSelected);
      workspace.removeChangeListener(handleWorkspaceChange);
    };
  }, [isReady, handleBlockSelected, handleWorkspaceChange]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full ${className || ''}`}
      style={{ minHeight: 300 }}
    />
  );
}
