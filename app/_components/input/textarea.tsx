import clsx from 'clsx';

import { Field, Label, Textarea } from '@headlessui/react';
import { Dispatch } from 'react';

export default function CustomTextarea({ name, preLabel, rows, value, setValue }: Readonly<{
  name?: string,
  preLabel?: string,
  rows: number,
  value: string,
  setValue: Dispatch<string>
}>) {
  return (
    <section className="flex flex-col py-5 px-5 md:px-10 lg:px-18">
      <Field>

        {preLabel && (
          <Label className="block px-2 text-md font-semibold text-(--font-color)">
            {preLabel}
          </Label>
        )}

        <div className="flex mt-2 px-2">

          <Textarea
            name={name}
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={rows}
            className={clsx(
              'w-180 px-4 py-2',
              'rounded-lg bg-(--boss-color)',
              'text-sm text-(--font-color)',
              'deboss-edges',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-white/25'
            )}
          />

        </div>

      </Field>
    </section>
  );
};
