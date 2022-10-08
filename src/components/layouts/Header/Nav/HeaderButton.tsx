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
        t.rounded-md t.transition-all t.px-3 t.py-2 t.min-w-[100px] t.border-[1.5px] 
       t.border-black
        disabled:t.opacity-40 
        ${
          // if on home route, force dark styles, otherwise only in darkmode
          pathname === homePath
            ? '!t.border-white t.text-dark-text-color'
            : 'dark:!t.border-white '
        }
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
