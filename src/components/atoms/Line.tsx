export const Line = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={`t.h-[1px] t.bg-line-color dark:t.bg-dark-line-color ${className}`}
    ></div>
  );
};
