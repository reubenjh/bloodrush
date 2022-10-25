export const Line = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`h-[1px] bg-line-color dark:bg-dark-line-color ${className}`}
    ></div>
  );
};
