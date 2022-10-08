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
    <div className={`input-group t.mb-3`}>
      {IconComponent && (
        <span className="input-group-text t.bg-secondary">
          <IconComponent color={'white'} />
        </span>
      )}
      <input
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        type={type ?? 'text'}
        className={`form-control t.text-base ${error && 'error'} ${
          isCopyThingy && 't.cursor-pointer'
        }`}
        placeholder={placeholder ?? ''}
        min="0"
        {...optionalAttributes}
      />
    </div>
  );
};
