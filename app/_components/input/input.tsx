import clsx from 'clsx';

import { Field, Label, Input } from '@headlessui/react';
import { Dispatch } from 'react';

export default function CustomInput({ name, preLabel, placeholder, error, value, setValue }: Readonly<{
  name?: string,
  preLabel?: string,
  placeholder?: string,
  error?: string,
  value: string,
  setValue: Dispatch<string>
}>) {
  return (
    <section className="flex flex-col py-5 px-5 md:px-10 lg:px-18">
      <Field>

        {preLabel && (
          <div className="flex gap-2">
            <Label className="block px-2 text-md font-semibold text-(--font-color)">
              {preLabel}
            </Label>
            {error && 
              <span className="inline-block text-red-600 dark:text-red-400 font-medium self-end text-sm">
                {error}
              </span>
            }
          </div>
        )}

        <div className="flex mt-2 px-2">

          <Input
            name={name}
            placeholder={placeholder || ''}
            value={value}
            onChange={e => setValue(e.target.value)}
            className={clsx(
              'w-40 px-4 py-2',
              'rounded-lg bg-(--boss-color)',
              'text-sm text-(--font-color)',
              'deboss-edges',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
            )}
          />

        </div>

      </Field>
    </section>
  );
};
