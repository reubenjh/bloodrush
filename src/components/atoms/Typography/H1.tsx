export const H1 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return <h1 className={`text-8xl font-bold mb-8 ${className}`}>{children}</h1>;
};
