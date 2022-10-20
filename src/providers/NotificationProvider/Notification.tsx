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
        return 't.bg-secondary t.text-white';
      case 'error':
        return 't.bg-red t.text-white';
    }
  };

  return (
    <div className={className}>
      <div
        className={`t.flex t.items-center t.justify-center t.px-4 t.py-2 t.w-full t.text-sm t.font-medium t.rounded-md t.transition-all t.shadow-[0_0_14px_rgba(0,0,0,0.2)] ${buildNotificationTypeClasses()}`}
      >
        {children}
      </div>
    </div>
  );
};
