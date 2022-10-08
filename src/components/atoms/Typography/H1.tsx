export const H1 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h1 className={`t.text-8xl t.font-bold t.mb-8 ${className}`}>{children}</h1>
  );
};
