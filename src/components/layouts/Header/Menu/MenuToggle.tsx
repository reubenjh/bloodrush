import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BiMenu } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useTheme } from 'src/providers/ThemeProvider';
import { homePath } from 'src/utils/paths';
import { Menu } from './Menu';

export const MenuToggle = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { theme, isDark } = useTheme();
  const { pathname } = useRouter();
  const [parent] = useAutoAnimate({ duration: 150 });

  const Icon = useMemo(() => {
    return isOpen ? IoCloseOutline : BiMenu;
  }, [isOpen]);

  if (!theme) return null;

  return (
    <div className="px-1 cursor-pointer relative" ref={parent as any}>
      <div onMouseDown={() => setIsOpen(!isOpen)}>
        <Icon
          size={20}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="inline-block mb-[2px] mr-[2px] animate-in fade-in"
          color={isDark || pathname === homePath ? 'white' : 'rgba(0,0,0,0.55)'}
        />
        <span
          className={`text-sm ${
            isDark || pathname === homePath ? 'text-white' : 'text-nav-color'
          }`}
        >
          Menu
        </span>
      </div>

      {isOpen && <Menu onClose={() => setIsOpen(false)} />}
    </div>
  );
};
