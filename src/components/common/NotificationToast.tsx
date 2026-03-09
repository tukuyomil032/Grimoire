import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useNotificationStore } from '@/store/notification-store';
import { cn } from '@/lib/utils';

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const colorMap = {
  info: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  success: 'border-green-500/30 bg-green-500/10 text-green-400',
  warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
};

export function NotificationToast() {
  const notifications = useNotificationStore((s) => s.notifications);
  const removeNotification = useNotificationStore((s) => s.removeNotification);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed right-4 bottom-10 z-50 flex flex-col gap-2">
      {notifications.map((n) => {
        const Icon = iconMap[n.type];
        return (
          <div
            key={n.id}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm animate-in slide-in-from-right-5 fade-in duration-300',
              colorMap[n.type]
            )}
          >
            <Icon size={16} className="shrink-0" />
            <span className="text-sm">{n.message}</span>
            <button
              onClick={() => removeNotification(n.id)}
              className="ml-2 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
