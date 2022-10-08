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
        return 't.text-primary hover:t.text-primary-light';
      case 'inherit':
        return 't.text-inherit';
    }
  };

  return (
    <a
      className={`t.cursor-pointer t.transition-all ${buildLinkColorClasses()} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};
