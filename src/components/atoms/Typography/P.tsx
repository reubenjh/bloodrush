export const P = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return <p className={`t.mb-4 ${className}`}>{children}</p>;
};
