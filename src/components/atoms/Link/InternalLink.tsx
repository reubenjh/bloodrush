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
        return 't.text-primary hover:t.text-primary-light';
      case 'white':
        return 't.text-white hover:t.text-primary';
      case 'inherit':
        return 't.text-inherit';
    }
  };

  return (
    <Link {...props}>
      <a
        className={`t.cursor-pointer t.transition-all ${buildLinkColorClasses()} ${className}`}
      >
        {children}
      </a>
    </Link>
  );
};
