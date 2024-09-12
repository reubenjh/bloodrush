export const P = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return <p className={`mb-4 ${className}`}>{children}</p>;
};
