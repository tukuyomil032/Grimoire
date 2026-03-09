import { Outlet } from 'react-router-dom';
import { Topbar } from '@/components/layout/Topbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusBar } from '@/components/layout/StatusBar';
import { useLayoutStore } from '@/store';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAutoSave } from '@/hooks/useAutoSave';
import { usePersistence } from '@/hooks/usePersistence';

export function AppLayout() {
  const sidebarCollapsed = useLayoutStore((s) => s.sidebarCollapsed);

  // Initialize cross-session persistence (loads recent projects, settings)
  usePersistence();
  // Register global keyboard shortcuts (⌘Z, ⌘N, ⌘S, ⌘O)
  useKeyboardShortcuts();
  // Auto-save dirty tabs based on settings
  useAutoSave();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Topbar */}
      <Topbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Editor area */}
        <main
          className="flex-1 overflow-hidden transition-all duration-200"
          style={{ marginLeft: sidebarCollapsed ? 48 : 240 }}
        >
          <Outlet />
        </main>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}
