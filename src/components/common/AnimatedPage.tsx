import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useSettingsStore } from '@/store';

interface AnimatedPageProps {
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

/**
 * Wrap page content in a fade/slide transition.
 * Respects the animationsEnabled setting.
 */
export function AnimatedPage({ children }: AnimatedPageProps) {
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);

  if (!animationsEnabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className="h-full w-full"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated container for panels (sidebar sections, modal overlays, etc.)
 */
export function AnimatedPanel({ children }: AnimatedPageProps) {
  const animationsEnabled = useSettingsStore((s) => s.animationsEnabled);

  if (!animationsEnabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
