// ============================================================
// DISCOVERY ENGINE — Toast Notification Component
// ============================================================

import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { Toast } from '@/types';

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export default function ToastItem({ toast, onRemove }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 50);

    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      handleExit();
    }, toast.duration || 4000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(dismissTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExit = () => {
    setExiting(true);
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const config = {
    success: {
      bg: 'bg-green-light',
      border: 'border-l-green',
      icon: CheckCircle2,
      iconColor: 'text-green',
    },
    error: {
      bg: 'bg-red-light',
      border: 'border-l-red',
      icon: AlertCircle,
      iconColor: 'text-red',
    },
    info: {
      bg: 'bg-orange-light',
      border: 'border-l-orange',
      icon: Info,
      iconColor: 'text-orange',
    },
  }[toast.type];

  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 px-5 py-4 rounded-xl border-l-[4px] shadow-lg ${config.bg} ${config.border} transition-all duration-300 ${
        visible && !exiting
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-full'
      }`}
      style={{ minWidth: '300px', maxWidth: '420px' }}
    >
      <Icon size={18} className={`${config.iconColor} mt-0.5 flex-shrink-0`} />
      <p className="text-sm text-black flex-1">{toast.message}</p>
      <button
        onClick={handleExit}
        className="text-gray-500 hover:text-black transition-colors flex-shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// Toast container
interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
