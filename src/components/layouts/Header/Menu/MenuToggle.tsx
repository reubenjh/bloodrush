import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { BiMenu } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
// import { useTheme } from 'src/providers/ThemeProvider';
import { homePath } from 'src/utils/paths';
import { Menu } from './Menu';

export const MenuToggle = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  // const { theme, isDark } = useTheme();
  const { pathname } = useRouter();
  const [parent] = useAutoAnimate({ duration: 150 });

  const Icon = useMemo(() => {
    return isOpen ? IoCloseOutline : BiMenu;
  }, [isOpen]);

  // if (!theme) return null;

  return (
    <div className="t.px-1 t.cursor-pointer t.relative" ref={parent as any}>
      <div onMouseDown={() => setIsOpen(!isOpen)}>
        <Icon
          size={20}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="t.inline-block t.mb-[2px] t.mr-[2px] t.animate-in t.fade-in"
          color={
            // isDark || pathname === homePath ? 'white' : 'rgba(0,0,0,0.55)'
            'white'
          }
        />
        <span
          className={`t.text-sm ${
            // isDark || pathname === homePath
            //   ? 't.text-white'
            //   : 't.text-nav-color'
            'white'
          }`}
        >
          Menu
        </span>
      </div>

      {isOpen && <Menu onClose={() => setIsOpen(false)} />}
    </div>
  );
};
