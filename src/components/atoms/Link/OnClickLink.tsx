interface OnClickLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  children: any;
  className?: string;
  color?: 'primary' | 'inherit';
}

// Separate link component for using with an `onClick` handler
// Requires extra utility classes to appear visually similar to other links
export const OnClickLink = ({
  className = '',
  children,
  color = 'inherit',
  ...props
}: OnClickLinkProps) => {
  const buildLinkColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary hover:text-primary-light';
      case 'inherit':
        return 'text-inherit';
    }
  };

  return (
    <a
      className={`cursor-pointer transition-all ${buildLinkColorClasses()} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};
