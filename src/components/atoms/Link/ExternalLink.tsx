interface ExternalLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  color?: 'primary' | 'inherit';
}

export const ExternalLink = ({
  className = '',
  children,
  color = 'inherit',
  ...props
}: ExternalLinkProps) => {
  const buildLinkColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary hover:text-primary-light';
      case 'inherit':
        return 'text-inherit hover:text-inherit';
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
