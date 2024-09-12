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
    // className={` border-b mt-[2px]
    // ${
    //   pathname === homePath
    //     ? 'text-white'
    //     : 'text-black dark:text-white'
    // } ${className}`}
    >
      <Image
        src={isDark || pathname === homePath ? black : white}
        width={80}
        height={80}
        alt=""
        placeholder="blur"
      />

      {/* <span className="font-logo font-bold">🩸</span>
      <span className="pr-3 relative top-[1px]">Bloodrush</span> */}
    </div>
  );
};
