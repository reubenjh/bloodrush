import { useRouter } from 'next/router';
import { homePath } from 'src/utils/paths';

export const HeaderButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: {
  children: any;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}) => {
  const { pathname } = useRouter();
  return (
    <button
      className={`
        rounded-md transition-all px-3 py-2 min-w-[100px] border-[1.5px] 
       border-black
        disabled:opacity-40 
        ${
          // if on home route, force dark styles, otherwise only in darkmode
          pathname === homePath
            ? '!border-white text-dark-text-color'
            : 'dark:!border-white '
        }
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
