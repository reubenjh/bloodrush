export const H2 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h2 className={`t.text-3xl t.font-bold t.mb-6 ${className}`}>{children}</h2>
  );
};
