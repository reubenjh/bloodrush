import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import { homePath } from 'src/utils/paths';

interface LoadingSpinnerProps {
  children?: any;
  isLoading: boolean;
}

export const LoadingSpinner = ({
  children,
  isLoading,
}: LoadingSpinnerProps) => {
  const whiteSpinnerClasses = useMemo(
    () => '!t.border-t-white !t.border-l-white !t.border-r-white',
    [],
  );
  const blackSpinnerClasses = useMemo(
    () => '!t.border-t-secondary !t.border-l-secondary !t.border-r-secondary',
    [],
  );
  const darkSpinnerClasses = useMemo(
    () =>
      'dark:!t.border-t-white dark:!t.border-l-white dark:!t.border-r-white',
    [],
  );
  const router = useRouter();
  return isLoading ? (
    <div className="t.flex t.flex-col t.justify-center t.h-full">
      <ClipLoader
        cssOverride={{ display: 'block' }}
        className={`t.m-auto ${
          router.pathname === homePath
            ? whiteSpinnerClasses
            : `${blackSpinnerClasses} ${darkSpinnerClasses}`
        }`}
        size={40}
      />
    </div>
  ) : (
    children
  );
};
