export const LineWithText = ({
  className = '',
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <div className={`t.w-full ${className} t.flex t.items-center`}>
      <div
        className={`t.grow t.h-[1px] t.bg-line-color dark:t.bg-dark-line-color`}
      ></div>
      <span className="t.shrink t.mx-2">{text}</span>
      <div
        className={`t.grow t.h-[1px] t.bg-line-color dark:t.bg-dark-line-color`}
      ></div>
    </div>
  );
};
