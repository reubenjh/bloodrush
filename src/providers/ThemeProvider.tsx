import { useTheme as useNextTheme } from 'next-themes';
import React, {
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}
type ThemeContextProps = {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLight: boolean;
};

const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);

const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const memoisedValue = useMemo(
    () => ({
      theme: mounted ? (theme as Theme) : undefined,
      setTheme,
      isDark: theme === Theme.DARK,
      isLight: theme === Theme.LIGHT,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, mounted],
  );
  return (
    <ThemeContext.Provider value={memoisedValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Note: If using this hook to conditionally render different UI, you'll need to refrain from returning anything
 * until 'theme' is defined. This is to account for a known SSR cycle hydration mismatch bug.
 * https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
 */
const useTheme = (): ThemeContextProps => useContext(ThemeContext);
export { ThemeProvider, useTheme };
