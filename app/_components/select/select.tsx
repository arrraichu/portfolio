import clsx from 'clsx';

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Dispatch } from 'react';

export default function Select({ preLabel, selected, setSelected, allItems, getItemString, getItemKey }: Readonly<{
  preLabel?: string;
  selected: unknown,
  setSelected: Dispatch<unknown>,
  allItems: unknown[],
  getItemString: (item: unknown) => string,
  getItemKey: (item: unknown) => string
}>) {
  return (
    <section className="flex flex-col py-5 px-5 md:px-10 lg:px-18">
      <Listbox value={selected} onChange={setSelected}>

        {preLabel && (
          <Label className="block px-2 text-md font-semibold text-(--font-color)">
            {preLabel}
          </Label>
        )}

        <div className="flex mt-2 px-2">

          <ListboxButton
            className={clsx(
              'flex justify-between gap-4 w-50 pl-4 pr-2 py-2',
              'rounded-lg bg-(--boss-color)',
              'text-sm text-left text-(--font-color)',
              'deboss-edges',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline:white/25'
            )}
          >

            {getItemString(selected)}
            <ChevronDownIcon
              className="size-5"
              aria-hidden={true}
            />

          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'flex flex-col w-50 mt-1',
              'rounded-lg bg-(--boss-color)',
              'emboss-edges',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline:white/25',
              'transition duration-100 ease-in data-leave:data-closed:opacity-0'
            )}
          >

            {allItems.map((i: unknown) => (
              
              <ListboxOption
                key={getItemKey(i)}
                value={i}
                className={clsx(
                  'flex items-center py-1.5 px-2 gap-2',
                  'group cursor-default select-none',
                  'data-focus:bg-white/25'
                )}
              >

                <CheckIcon
                  className={clsx(
                    'size-4 fill-(--font-color)',
                    'invisible group-data-selected:visible'
                  )}
                />
                <div className="text-sm font-(--font-color)">
                  {getItemString(i)}
                </div>

              </ListboxOption>

            ))}

          </ListboxOptions>

        </div>

      </Listbox>
    </section>
  );
};
