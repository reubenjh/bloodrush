import { ReactNode } from 'react';

export interface NotificationProps {
  children?: ReactNode;
  className?: string;
  type?: 'info' | 'error';
}

export const Notification = ({
  children,
  className = '',
  type = 'info',
}: NotificationProps) => {
  const buildNotificationTypeClasses = () => {
    switch (type) {
      case 'info':
        return 'bg-secondary text-white';
      case 'error':
        return 'bg-red text-white';
    }
  };

  return (
    <div className={className}>
      <div
        className={`flex items-center justify-center px-4 py-2 w-full text-sm font-medium rounded-md transition-all shadow-[0_0_14px_rgba(0,0,0,0.2)] ${buildNotificationTypeClasses()}`}
      >
        {children}
      </div>
    </div>
  );
};
