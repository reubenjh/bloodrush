import { Combobox as CBUI, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiChevronDown } from 'react-icons/hi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Option = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  options: Option[];
  placeholder?: string;
};

export const Combobox = ({ title, options, placeholder }: Props) => {
  const [selected, setSelected] = useState<Option | null>();
  const [focus, setFocus] = useState<boolean>();
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((o) => {
          return o.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''));
        });

  return (
    <CBUI
      value={selected}
      onChange={(o) => {
        setFocus(false);
        setSelected(o);
        if (o) setQuery(o.label);
      }}
    >
      {({ open }) => (
        <div onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
          <div className="block text-sm mb-1">{title}</div>

          <div className="relative">
            <div className="flex items-stretch w-full">
              {BiSearch && (
                <span
                  className="rounded-tr-none rounded-br-none flex items-center py-1.5 px-3 text-center whitespace-nowrap border rounded-md
                bg-secondary border-line-color 
                dark:border-dark-line-color dark:bg-dark-background
                "
                >
                  <BiSearch color={'white'} />
                </span>
              )}
              <CBUI.Input
                onChange={(event) => setQuery(event.target.value)}
                className="relative ml-[-1px] grow w-full cursor-default rounded-md border py-2 px-4 pr-10 text-left shadow-sm sm:text-sm transition-all outline-none rounded-tl-none rounded-bl-none 
                border-line-color 
                focus:!border-primary-border focus:shadow-[0_0_0_0.25rem] focus:shadow-primary-border-shadow 
                placeholder:dark:text-dark-text-color dark:border-dark-line-color dark:bg-dark-background"
                placeholder={placeholder ?? 'Start typing...'}
                displayValue={(option: Option | undefined) =>
                  option?.label ?? query
                }
              />
              <CBUI.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <HiChevronDown className="h-5 w-5" aria-hidden="true" />
                </span>
              </CBUI.Button>
            </div>

            <Transition
              show={open || focus}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <CBUI.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-dark-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <CBUI.Option
                      key={option.value}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-info' : '',
                          'relative cursor-default select-none py-2 pl-3 pr-9 hover:text-white hover:bg-info',
                        )
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate capitalize',
                              )}
                            >
                              {option.label}
                            </span>
                          </div>
                        </>
                      )}
                    </CBUI.Option>
                  ))
                )}
              </CBUI.Options>
            </Transition>
          </div>
        </div>
      )}
    </CBUI>
  );
};
