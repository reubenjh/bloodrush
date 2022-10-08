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
        return 't.text-primary hover:t.text-primary-light';
      case 'inherit':
        return 't.text-inherit hover:t.text-inherit';
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
