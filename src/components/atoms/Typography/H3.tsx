export const H3 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h3
      className={`t.text-2xl t.font-title t.font-semibold t.mb-5 ${className}`}
    >
      {children}
    </h3>
  );
};
