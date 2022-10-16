import Image from 'next/future/image';
import { useRouter } from 'next/router';
import black from 'public/images/logo-black.png';
import white from 'public/images/logo-white.png';
import { useTheme } from 'src/providers/ThemeProvider';
import { homePath } from 'src/utils/paths';

export const Logo = ({ className = '' }: { className?: string }) => {
  const { pathname } = useRouter();

  const { theme, isDark } = useTheme();
  if (!theme) return null;

  return (
    <div
    // className={` t.border-b t.mt-[2px]
    // ${
    //   pathname === homePath
    //     ? 't.text-white'
    //     : 't.text-black dark:t.text-white'
    // } ${className}`}
    >
      <Image
        src={isDark || pathname === homePath ? black : white}
        width={80}
        height={80}
        alt=""
        placeholder="blur"
      />

      {/* <span className="t.font-logo t.font-bold">🩸</span>
      <span className="t.pr-3 t.relative t.top-[1px]">Bloodrush</span> */}
    </div>
  );
};
