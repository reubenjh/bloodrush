import { useMemo } from 'react';
import { IconType } from 'react-icons';

type Props = {
  placeholder?: string;
  type?: string;
  onChange?: (v: string) => void;
  error?: boolean;
  disabled?: boolean;
  value?: string;
  autoFocus?: boolean;
  IconComponent?: IconType;
  isCopyThingy?: boolean;
};

export const Input = ({
  placeholder,
  type,
  onChange,
  error,
  disabled,
  value,
  autoFocus,
  IconComponent,
  isCopyThingy,
}: Props) => {
  const optionalAttributes = useMemo(() => {
    return {
      value,
      disabled,
      autoFocus,
    };
  }, [disabled, autoFocus, value]);

  return (
    <div className="mb-2 flex items-stretch w-full">
      {IconComponent && (
        <span
          className="rounded-tr-none rounded-br-none flex items-center py-1.5 px-3 text-center whitespace-nowrap border rounded-md
        bg-secondary border-line-color 
        dark:border-dark-line-color dark:bg-dark-background
        "
        >
          <IconComponent color={'white'} />
        </span>
      )}
      <input
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        type={type ?? 'text'}
        className={`ml-[-1px] grow py-2 px-4 transition-all border outline-none rounded-md 
        border-line-color 
        focus:!border-primary-border focus:shadow-[0_0_0_0.25rem] focus:shadow-primary-border-shadow 
        placeholder:dark:text-dark-text-color dark:border-dark-line-color dark:bg-dark-background ${
          isCopyThingy ? 'cursor-pointer' : ''
        } 
        ${
          error
            ? '!border-red !shadow-[0_0_0_0.25rem] !shadow-red-border-shadow'
            : ''
        } 
        ${!!IconComponent ? 'rounded-tl-none rounded-bl-none' : ''}`}
        placeholder={placeholder ?? ''}
        min="0"
        {...optionalAttributes}
      />
    </div>
  );
};
