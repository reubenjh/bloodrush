export const H3 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h3 className={`text-2xl font-semibold mb-5 ${className}`}>{children}</h3>
  );
};
