import Link, { LinkProps } from 'next/link';

interface InternalLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  color?: 'primary' | 'inherit' | 'white';
}

export const InternalLink = ({
  className = '',
  children,
  color = 'inherit',
  ...props
}: InternalLinkProps) => {
  const buildLinkColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-primary hover:text-primary-light';
      case 'white':
        return 'text-white hover:text-primary';
      case 'inherit':
        return 'text-inherit';
    }
  };

  return (
    <Link {...props}>
      <a
        className={`cursor-pointer transition-all ${buildLinkColorClasses()} ${className}`}
      >
        {children}
      </a>
    </Link>
  );
};
