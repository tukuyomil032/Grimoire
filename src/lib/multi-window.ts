/**
 * Multi-window support via Tauri WebviewWindow API.
 *
 * Allows detaching editor panels into separate OS windows.
 * Falls back to a no-op in browser-only environments.
 */

/** Panel definitions for detachable panels */
export interface DetachablePanelInfo {
  id: string;
  titleKey: string; // i18n key
  defaultWidth: number;
  defaultHeight: number;
}

/** Panels available for detaching */
export const DETACHABLE_PANELS: DetachablePanelInfo[] = [
  { id: 'blockly', titleKey: 'panel.blockEditor', defaultWidth: 800, defaultHeight: 600 },
  { id: 'nodeEditor', titleKey: 'panel.nodeEditor', defaultWidth: 800, defaultHeight: 600 },
  { id: 'yaml', titleKey: 'panel.yamlPreview', defaultWidth: 500, defaultHeight: 400 },
  { id: 'properties', titleKey: 'panel.properties', defaultWidth: 400, defaultHeight: 500 },
  {
    id: 'mechanicsBrowser',
    titleKey: 'panel.mechanicsBrowser',
    defaultWidth: 500,
    defaultHeight: 600,
  },
];

/** Track which panels are currently detached */
const detachedWindows = new Map<string, unknown>();

function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

/**
 * Detach a panel into a new OS window via Tauri WebviewWindow.
 * In browser-only environments, opens a popup window instead.
 */
export async function detachPanel(
  panelId: string,
  title: string,
  width = 600,
  height = 400
): Promise<boolean> {
  if (detachedWindows.has(panelId)) {
    console.warn(`[multi-window] Panel "${panelId}" is already detached.`);
    return false;
  }

  if (isTauri()) {
    try {
      const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
      const label = `panel-${panelId}`;
      const webview = new WebviewWindow(label, {
        url: `/panel/${panelId}`,
        title,
        width,
        height,
        decorations: true,
        resizable: true,
        center: true,
      });

      // Listen for the window to be destroyed
      webview.once('tauri://destroyed', () => {
        detachedWindows.delete(panelId);
      });

      detachedWindows.set(panelId, webview);
      return true;
    } catch (err) {
      console.error('[multi-window] Failed to create WebviewWindow:', err);
      return false;
    }
  }

  // Browser fallback — open a popup window
  try {
    const popup = window.open(
      `/panel/${panelId}`,
      `panel-${panelId}`,
      `width=${width},height=${height},resizable=yes`
    );
    if (popup) {
      detachedWindows.set(panelId, popup);
      const timer = setInterval(() => {
        if (popup.closed) {
          detachedWindows.delete(panelId);
          clearInterval(timer);
        }
      }, 1000);
      return true;
    }
  } catch {
    /* noop */
  }
  return false;
}

/**
 * Check if a panel is currently detached.
 */
export function isPanelDetached(panelId: string): boolean {
  return detachedWindows.has(panelId);
}

/**
 * Get the IDs of all currently detached panels.
 */
export function getDetachedPanels(): string[] {
  return Array.from(detachedWindows.keys());
}
