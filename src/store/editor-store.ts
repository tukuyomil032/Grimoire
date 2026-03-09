import { create } from 'zustand';
import type { Skill } from '@/models/skill';
import type { MobConfig } from '@/models/mob';
import type { ItemConfig } from '@/models/item';
import type { EditorTab } from '@/models/types';

interface EditorState {
  // Tabs
  tabs: EditorTab[];
  activeTabId: string | null;

  // Skills being edited (keyed by id)
  skills: Record<string, Skill>;
  // Mobs being edited (keyed by id)
  mobs: Record<string, MobConfig>;
  // Items being edited (keyed by id)
  items: Record<string, ItemConfig>;

  // Selection state within block editor
  selectedBlockId: string | null;
  selectedNodeId: string | null;

  // Undo/redo stacks per entity
  undoStacks: Record<string, Skill[]>;
  redoStacks: Record<string, Skill[]>;

  // Actions - Tabs
  openTab: (tab: EditorTab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  markTabDirty: (tabId: string, dirty: boolean) => void;

  // Actions - Skills
  setSkill: (skill: Skill) => void;
  updateSkill: (id: string, updater: (skill: Skill) => Skill) => void;
  removeSkill: (id: string) => void;

  // Actions - Mobs
  setMob: (mob: MobConfig) => void;
  updateMob: (id: string, updater: (mob: MobConfig) => MobConfig) => void;
  removeMob: (id: string) => void;

  // Actions - Items
  setItem: (item: ItemConfig) => void;
  updateItem: (id: string, updater: (item: ItemConfig) => ItemConfig) => void;
  removeItem: (id: string) => void;

  // Actions - Selection
  setSelectedBlock: (blockId: string | null) => void;
  setSelectedNode: (nodeId: string | null) => void;

  // Actions - Undo/Redo
  undo: (entityId: string) => void;
  redo: (entityId: string) => void;
  pushUndo: (entityId: string, snapshot: Skill) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  tabs: [],
  activeTabId: null,
  skills: {},
  mobs: {},
  items: {},
  selectedBlockId: null,
  selectedNodeId: null,
  undoStacks: {},
  redoStacks: {},

  openTab: (tab) =>
    set((state) => {
      const exists = state.tabs.find((t) => t.id === tab.id);
      if (exists) {
        return { activeTabId: tab.id };
      }
      return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }),

  closeTab: (tabId) =>
    set((state) => {
      const newTabs = state.tabs.filter((t) => t.id !== tabId);
      const newActiveTabId =
        state.activeTabId === tabId
          ? newTabs.length > 0
            ? newTabs[newTabs.length - 1].id
            : null
          : state.activeTabId;
      return { tabs: newTabs, activeTabId: newActiveTabId };
    }),

  setActiveTab: (tabId) => set({ activeTabId: tabId }),

  markTabDirty: (tabId, dirty) =>
    set((state) => ({
      tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, dirty } : t)),
    })),

  setSkill: (skill) =>
    set((state) => ({
      skills: { ...state.skills, [skill.id]: skill },
    })),

  updateSkill: (id, updater) =>
    set((state) => {
      const current = state.skills[id];
      if (!current) return state;
      const updated = updater(current);
      return {
        skills: { ...state.skills, [id]: { ...updated, updatedAt: new Date().toISOString() } },
      };
    }),

  removeSkill: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.skills;
      return { skills: rest };
    }),

  setMob: (mob) =>
    set((state) => ({
      mobs: { ...state.mobs, [mob.id]: mob },
    })),

  updateMob: (id, updater) =>
    set((state) => {
      const current = state.mobs[id];
      if (!current) return state;
      const updated = updater(current);
      return {
        mobs: { ...state.mobs, [id]: { ...updated, updatedAt: new Date().toISOString() } },
      };
    }),

  removeMob: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.mobs;
      return { mobs: rest };
    }),

  setItem: (item) =>
    set((state) => ({
      items: { ...state.items, [item.id]: item },
    })),

  updateItem: (id, updater) =>
    set((state) => {
      const current = state.items[id];
      if (!current) return state;
      const updated = updater(current);
      return {
        items: { ...state.items, [id]: { ...updated, updatedAt: new Date().toISOString() } },
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.items;
      return { items: rest };
    }),

  setSelectedBlock: (blockId) => set({ selectedBlockId: blockId }),
  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  undo: (entityId) => {
    const state = get();
    const stack = state.undoStacks[entityId] || [];
    if (stack.length === 0) return;

    const previous = stack[stack.length - 1];
    const current = state.skills[entityId];

    set({
      skills: { ...state.skills, [entityId]: previous },
      undoStacks: { ...state.undoStacks, [entityId]: stack.slice(0, -1) },
      redoStacks: {
        ...state.redoStacks,
        [entityId]: current
          ? [...(state.redoStacks[entityId] || []), current]
          : state.redoStacks[entityId] || [],
      },
    });
  },

  redo: (entityId) => {
    const state = get();
    const stack = state.redoStacks[entityId] || [];
    if (stack.length === 0) return;

    const next = stack[stack.length - 1];
    const current = state.skills[entityId];

    set({
      skills: { ...state.skills, [entityId]: next },
      redoStacks: { ...state.redoStacks, [entityId]: stack.slice(0, -1) },
      undoStacks: {
        ...state.undoStacks,
        [entityId]: current
          ? [...(state.undoStacks[entityId] || []), current]
          : state.undoStacks[entityId] || [],
      },
    });
  },

  pushUndo: (entityId, snapshot) =>
    set((state) => ({
      undoStacks: {
        ...state.undoStacks,
        [entityId]: [...(state.undoStacks[entityId] || []).slice(-49), snapshot],
      },
      redoStacks: { ...state.redoStacks, [entityId]: [] },
    })),
}));
