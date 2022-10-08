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
      <span className="t.font-logo t.text-lg t.font-bold">🩸</span>
      <span className="t.pr-3">Bloodrush</span>
    </div>
  );
};
