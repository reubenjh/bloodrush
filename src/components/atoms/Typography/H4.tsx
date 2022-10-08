export const H4 = ({
  children,
  className = '',
}: {
  children: any;
  className?: string;
}) => {
  return (
    <h4
      className={`t.text-xl t.font-title t.font-semibold t.mb-4 ${className}`}
    >
      {children}
    </h4>
  );
};
