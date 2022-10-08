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
        return 't.border-[1.5px] t.border-primary hover:t.text-white hover:t.bg-primary t.px-3 t.py-2 t.min-w-[100px]';
      case 'secondary':
        return 't.border-[1.5px] t.border-line-color hover:t.text-black dark:t.border-dark-line-color hover:t.border-black dark:hover:t.border-white dark:hover:t.text-white t.px-3 t.py-2 t.min-w-[100px]';
      case 'danger':
        return 't.border-[1.5px] t.border-red hover:t.text-white hover:t.bg-red t.px-3 t.py-2 t.min-w-[100px]';
      case 'minimal':
        return '';
    }
  };
  return (
    <button
      className={`
        t.rounded-md t.transition-all 
        disabled:t.opacity-60
        ${getVariantClasses()} 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
