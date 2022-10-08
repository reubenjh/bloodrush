import { useRouter } from 'next/router';
import { homePath } from 'src/utils/paths';

export const Logo = ({ className = '' }: { className?: string }) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`${
        pathname === homePath
          ? 't.text-white'
          : 't.text-black dark:t.text-white'
      } ${className}`}
    >
      <span className="t.font-logo t.text-3xl t.font-bold">🩸</span>
      <span className="t.font-title t.relative t.top-[-2px] t.text-2xl t.pr-3">
        Bloodrush
      </span>
    </div>
  );
};
