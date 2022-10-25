export const Radio = ({
  item,
  checked,
  onSelect,
}: {
  item: string;
  checked: boolean;
  onSelect: (item: string) => void;
}) => {
  return (
    <div className="mr-2 flex items-center py-2 px-3 border border-line-color dark: dark:border-dark-line-color rounded-md">
      <input
        className="cursor-pointer"
        id={`radio-${item}`}
        type="radio"
        checked={checked}
        onChange={(e) => e.target.checked && onSelect(item)}
      />
      <label
        htmlFor={`radio-${item}`}
        className="ml-2 cursor-pointer capitalize"
      >
        {item}
      </label>
    </div>
  );
};
