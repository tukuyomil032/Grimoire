/**
 * Common project-level types used across the application.
 */

/** Supported locales */
export type Locale = 'en' | 'ja';

/** Tab types in the editor */
export type EditorTabType = 'skill' | 'mob' | 'item';

/** Editor tab */
export interface EditorTab {
  id: string;
  type: EditorTabType;
  title: string;
  entityId: string;
  dirty: boolean;
}

/** Project file (on-disk representation) */
export interface ProjectFile {
  name: string;
  path: string;
  type: EditorTabType;
  lastModified: string;
}

/** Layout preset */
export interface LayoutPreset {
  id: string;
  name: string;
  description: Record<string, string>;
  layout: unknown; // rc-dock LayoutData
}

/** Notification */
export interface AppNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
  duration?: number;
}

/** Recent project entry */
export interface RecentProject {
  name: string;
  path: string;
  lastOpened: string;
}
