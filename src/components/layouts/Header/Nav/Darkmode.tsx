import { useRouter } from 'next/router';
import { BsSun, BsMoonFill } from 'react-icons/bs';
import { Tooltip } from 'src/components/atoms/Tooltip';
import { Theme, useTheme } from 'src/providers/ThemeProvider';
import { homePath } from 'src/utils/paths';

export const Darkmode = () => {
  const { setTheme, theme, isDark } = useTheme();
  const { pathname } = useRouter();
  const handleChange = () => {
    setTheme(isDark ? Theme.LIGHT : Theme.DARK);
  };
  if (!theme) return null;

  return (
    <Tooltip
      message={isDark ? 'Light Mode' : 'Dark Mode'}
      onClick={handleChange}
    >
      <span className="t.px-1">
        {isDark ? (
          <BsSun
            size={15}
            color={
              isDark || pathname === homePath ? 'white' : 'rgba(0,0,0,0.55)'
            }
          />
        ) : (
          <BsMoonFill
            size={15}
            color={
              isDark || pathname === homePath ? 'white' : 'rgba(0,0,0,0.55)'
            }
          />
        )}
      </span>
    </Tooltip>
  );
};
