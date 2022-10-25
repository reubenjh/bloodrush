export const H4 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h4 className={`text-xl font-semibold mb-4 ${className}`}>{children}</h4>
  );
};
