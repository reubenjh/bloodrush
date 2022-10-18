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
      className="group relative flex flex-col items-center whitespace-nowrap cursor-pointer"
      onClick={onClick}
    >
      {children}
      <div className="group-hover:flex absolute top-6 flex-col items-center hidden mb-6">
        <div className="w-3 h-3 mt-3 rotate-45 bg-secondary dark:bg-white animate-in fade-in"></div>
        <span className="relative -mt-2 z-20 p-2 text-xs whitespace-no-wrap shadow-lg rounded-md text-white bg-secondary dark:text-black dark:bg-white">
          {message}
        </span>
      </div>
    </div>
  );
};
