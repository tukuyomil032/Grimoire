import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { NotificationToast } from '@/components/common/NotificationToast';
import { AppLayout } from '@/components/layout/AppLayout';
import { WelcomePage } from '@/pages/WelcomePage';
import { AnimatedPage } from '@/components/common/AnimatedPage';
import { PanelPage } from '@/pages/PanelPage';
import { SkillEditorPage } from '@/pages/SkillEditorPage';
import { MobEditorPage } from '@/pages/MobEditorPage';
import { ItemEditorPage } from '@/pages/ItemEditorPage';

function AnimatedRoutes() {
  const location = useLocation();

  if (location.pathname.startsWith('/panel/')) {
    return (
      <Routes location={location} key="panel">
        <Route path="/panel/:panelId" element={<PanelPage />} />
      </Routes>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <WelcomePage />
              </AnimatedPage>
            }
          />
          <Route
            path="/skill/:id"
            element={
              <AnimatedPage>
                <SkillEditorPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/mob/:id"
            element={
              <AnimatedPage>
                <MobEditorPage />
              </AnimatedPage>
            }
          />
          <Route
            path="/item/:id"
            element={
              <AnimatedPage>
                <ItemEditorPage />
              </AnimatedPage>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary fallbackMessage="Grimoire encountered an error">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-[#050505] text-white">
            Loading Grimoire...
          </div>
        }
      >
        <AnimatedRoutes />
      </Suspense>
      <NotificationToast />
    </ErrorBoundary>
  );
}

export default App;
