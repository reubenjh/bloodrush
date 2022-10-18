export const LineWithText = ({
  className = '',
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <div className={`w-full ${className} flex items-center`}>
      <div
        className={`grow h-[1px] bg-line-color dark:bg-dark-line-color`}
      ></div>
      <span className="shrink mx-2">{text}</span>
      <div
        className={`grow h-[1px] bg-line-color dark:bg-dark-line-color`}
      ></div>
    </div>
  );
};
