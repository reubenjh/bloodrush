import { ReactNode } from 'react';

export const Tooltip = ({
  message,
  children,
  onClick,
}: {
  message: string;
  children: ReactNode;
  onClick?: any;
}) => {
  return (
    <div
      className="t.group t.relative t.flex t.flex-col t.items-center t.whitespace-nowrap t.cursor-pointer"
      onClick={onClick}
    >
      {children}
      <div className="group-hover:t.flex t.absolute t.top-6 t.flex-col t.items-center t.hidden t.mb-6">
        <div className="t.w-3 t.h-3 t.mt-3 t.rotate-45 t.bg-secondary dark:t.bg-white t.animate-in t.fade-in"></div>
        <span className="t.relative t.-mt-2 t.z-20 t.p-2 t.text-xs t.whitespace-no-wrap t.shadow-lg t.rounded-md t.text-white t.bg-secondary dark:t.text-black dark:t.bg-white">
          {message}
        </span>
      </div>
    </div>
  );
};
