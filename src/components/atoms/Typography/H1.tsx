export const H1 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h1 className={`t.text-6xl t.font-title t.font-bold t.mb-8 ${className}`}>
      {children}
    </h1>
  );
};
