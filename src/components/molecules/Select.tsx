import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  title: string;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
};

export const Select = ({
  title,
  options,
  defaultValue,
  placeholder,
}: Props) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm mb-1">{title}</Listbox.Label>
          <div className="relative">
            <Listbox.Button
              className="relative w-full cursor-default rounded-md border py-2 px-4 pr-10 text-left shadow-sm sm:text-sm transition-all outline-none
              border-line-color 
              focus:!border-primary-border focus:shadow-[0_0_0_0.25rem] focus:shadow-primary-border-shadow 
              placeholder:dark:text-dark-text-color dark:border-dark-line-color dark:bg-dark-background"
            >
              <span className="flex items-center">
                <span
                  className={`block truncate ${selected ? 'capitalize' : ''}`}
                >
                  {selected ?? placeholder ?? 'Choose...'}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <HiChevronDown className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-dark-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((o) => (
                  <Listbox.Option
                    key={o}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-info' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={o}
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
                            {o}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
