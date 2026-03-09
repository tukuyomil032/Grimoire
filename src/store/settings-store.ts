import { create } from 'zustand';
import type { Locale } from '@/models/types';
import i18n from '@/lib/i18n';

interface SettingsState {
  locale: Locale;
  theme: 'dark'; // dark only for now; future: 'light' | 'system'
  fontSize: number;
  autoSave: boolean;
  autoSaveInterval: number; // seconds
  showYamlPreview: boolean;
  editorMode: 'block' | 'node' | 'both';
  animationsEnabled: boolean;

  // Actions
  setLocale: (locale: Locale) => void;
  setFontSize: (size: number) => void;
  setAutoSave: (enabled: boolean) => void;
  setAutoSaveInterval: (seconds: number) => void;
  setShowYamlPreview: (show: boolean) => void;
  setEditorMode: (mode: 'block' | 'node' | 'both') => void;
  setAnimationsEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  locale: 'en',
  theme: 'dark',
  fontSize: 14,
  autoSave: true,
  autoSaveInterval: 30,
  showYamlPreview: true,
  editorMode: 'both',
  animationsEnabled: true,

  setLocale: (locale) => {
    i18n.changeLanguage(locale);
    set({ locale });
  },

  setFontSize: (fontSize) => set({ fontSize }),
  setAutoSave: (autoSave) => set({ autoSave }),
  setAutoSaveInterval: (autoSaveInterval) => set({ autoSaveInterval }),
  setShowYamlPreview: (showYamlPreview) => set({ showYamlPreview }),
  setEditorMode: (editorMode) => set({ editorMode }),
  setAnimationsEnabled: (animationsEnabled) => set({ animationsEnabled }),
}));
