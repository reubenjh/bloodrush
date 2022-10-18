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
    () => '!border-t-white !border-l-white !border-r-white',
    [],
  );
  const blackSpinnerClasses = useMemo(
    () => '!border-t-secondary !border-l-secondary !border-r-secondary',
    [],
  );
  const darkSpinnerClasses = useMemo(
    () => 'dark:!border-t-white dark:!border-l-white dark:!border-r-white',
    [],
  );
  const router = useRouter();
  return isLoading ? (
    <div className="flex flex-col justify-center h-full">
      <ClipLoader
        cssOverride={{ display: 'block' }}
        className={`m-auto ${
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
