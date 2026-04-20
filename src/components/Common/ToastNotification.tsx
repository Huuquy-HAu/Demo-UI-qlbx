import React, { useEffect, useState } from 'react';
import { IconCheck, IconX, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import './ToastNotification.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastNotificationProps {
  onRef: (ref: { show: (msg: string, type: ToastType) => void }) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ onRef }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      remove(id);
    }, 3000);
  };

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    onRef({ show });
  }, [onRef]);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <IconCheck size={18} />;
      case 'error': return <IconX size={18} />;
      case 'warning': return <IconAlertTriangle size={18} />;
      default: return <IconInfoCircle size={18} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div className="toast-icon">{getIcon(toast.type)}</div>
          <div className="toast-message">{toast.message}</div>
          <button className="toast-close" onClick={() => remove(toast.id)}>
            <IconX size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastNotification;
