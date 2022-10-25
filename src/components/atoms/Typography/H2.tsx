export const H2 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return <h2 className={`text-3xl font-bold mb-6 ${className}`}>{children}</h2>;
};
