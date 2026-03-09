import { create } from 'zustand';
import type { AppNotification } from '@/models/types';

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = crypto.randomUUID();
    const entry: AppNotification = {
      ...notification,
      id,
      timestamp: Date.now(),
    };
    set((state) => ({
      notifications: [...state.notifications, entry],
    }));

    // Auto-remove after duration (default 4s)
    const duration = notification.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, duration);
    }
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearAll: () => set({ notifications: [] }),
}));
