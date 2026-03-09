import { create } from 'zustand';
import type { LayoutPreset } from '@/models/types';
import { loadLayoutPresets, saveLayoutPresets } from '@/lib/persistence';

/** Built-in layout presets */
const BUILT_IN_PRESETS: LayoutPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: { en: 'Standard four-panel layout', ja: '標準四パネルレイアウト' },
    layout: {
      preset: 'default',
      panels: ['blockEditor', 'nodeEditor', 'properties', 'yamlPreview'],
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    description: { en: 'Minimal layout with editor only', ja: 'エディタのみのミニマルレイアウト' },
    layout: { preset: 'compact', panels: ['blockEditor', 'yamlPreview'] },
  },
  {
    id: 'wide-editor',
    name: 'Wide Editor',
    description: { en: 'Maximized editor with minimal panels', ja: 'エディタ最大化・最小パネル' },
    layout: { preset: 'wide-editor', panels: ['blockEditor', 'properties'] },
  },
  {
    id: 'split-view',
    name: 'Split View',
    description: {
      en: 'Block and node editor side by side',
      ja: 'ブロック＆ノードエディタ並列表示',
    },
    layout: { preset: 'split-view', panels: ['blockEditor', 'nodeEditor'] },
  },
  {
    id: 'focus-mode',
    name: 'Focus Mode',
    description: { en: 'Editor only, hidden sidebar', ja: 'エディタのみ・サイドバー非表示' },
    layout: { preset: 'focus-mode', panels: ['blockEditor'], hideSidebar: true },
  },
];

/** IDs of built-in presets (cannot be deleted) */
const BUILT_IN_IDS = new Set(BUILT_IN_PRESETS.map((p) => p.id));

interface LayoutState {
  /** Current rc-dock layout data */
  currentLayout: unknown | null;
  /** Saved layout presets (includes built-in + user-created) */
  presets: LayoutPreset[];
  /** Active preset ID */
  activePresetId: string;
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean;
  /** Active sidebar section */
  activeSidebarSection: 'explorer' | 'search' | 'settings';

  // Actions
  setCurrentLayout: (layout: unknown) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setActiveSidebarSection: (section: 'explorer' | 'search' | 'settings') => void;
  setActivePreset: (id: string) => void;
  addPreset: (preset: LayoutPreset) => void;
  removePreset: (id: string) => void;
  setPresets: (presets: LayoutPreset[]) => void;
  /** Load custom presets from persistent storage and merge with built-in */
  hydratePresets: () => Promise<void>;
  /** Save a new custom preset and persist to disk */
  saveCustomPreset: (preset: LayoutPreset) => Promise<void>;
  /** Delete a custom (non-built-in) preset and persist to disk */
  deleteCustomPreset: (id: string) => Promise<void>;
  /** Reset to built-in presets only */
  resetPresets: () => Promise<void>;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  currentLayout: null,
  presets: BUILT_IN_PRESETS,
  activePresetId: 'default',
  sidebarCollapsed: false,
  activeSidebarSection: 'explorer',

  setCurrentLayout: (layout) => set({ currentLayout: layout }),

  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setActiveSidebarSection: (activeSidebarSection) => set({ activeSidebarSection }),

  setActivePreset: (activePresetId) => set({ activePresetId }),

  addPreset: (preset) =>
    set((state) => ({
      presets: [...state.presets.filter((p) => p.id !== preset.id), preset],
    })),

  removePreset: (id) =>
    set((state) => ({
      presets: state.presets.filter((p) => p.id !== id),
    })),

  setPresets: (presets) => set({ presets }),

  hydratePresets: async () => {
    try {
      const customPresets = await loadLayoutPresets();
      if (customPresets.length > 0) {
        set(() => ({
          presets: [...BUILT_IN_PRESETS, ...customPresets.filter((cp) => !BUILT_IN_IDS.has(cp.id))],
        }));
      }
    } catch (err) {
      console.error('[layout-store] Failed to hydrate presets:', err);
    }
  },

  saveCustomPreset: async (preset) => {
    set((state) => ({
      presets: [...state.presets.filter((p) => p.id !== preset.id), preset],
    }));
    try {
      const allPresets = useLayoutStore.getState().presets;
      const customOnly = allPresets.filter((p) => !BUILT_IN_IDS.has(p.id));
      await saveLayoutPresets(customOnly);
    } catch (err) {
      console.error('[layout-store] Failed to save custom preset:', err);
    }
  },

  deleteCustomPreset: async (id) => {
    if (BUILT_IN_IDS.has(id)) return;
    set((state) => ({
      presets: state.presets.filter((p) => p.id !== id),
      activePresetId: state.activePresetId === id ? 'default' : state.activePresetId,
    }));
    try {
      const allPresets = useLayoutStore.getState().presets;
      const customOnly = allPresets.filter((p) => !BUILT_IN_IDS.has(p.id));
      await saveLayoutPresets(customOnly);
    } catch (err) {
      console.error('[layout-store] Failed to persist after delete:', err);
    }
  },

  resetPresets: async () => {
    set({ presets: BUILT_IN_PRESETS, activePresetId: 'default' });
    try {
      await saveLayoutPresets([]);
    } catch (err) {
      console.error('[layout-store] Failed to clear presets:', err);
    }
  },
}));
