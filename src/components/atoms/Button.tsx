export const Button = ({
  children,

  variant = 'secondary',
  onClick,
  disabled = false,
  className = '',
}: {
  children: any;

  variant?: 'primary' | 'secondary' | 'danger' | 'minimal';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'border-[1.5px] border-primary hover:text-white hover:bg-primary px-3 py-2 min-w-[100px]';
      case 'secondary':
        return 'border-[1.5px] border-line-color hover:text-black dark:border-dark-line-color hover:border-black dark:hover:border-white dark:hover:text-white px-3 py-2 min-w-[100px]';
      case 'danger':
        return 'border-[1.5px] border-red hover:text-white hover:bg-red px-3 py-2 min-w-[100px]';
      case 'minimal':
        return '';
    }
  };
  return (
    <button
      className={`
        rounded-md transition-all 
        disabled:opacity-60
        ${getVariantClasses()} 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
