import clsx from 'clsx';

export function PrimaryButton({ text }: Readonly<{
  text: string
}>) {
  return (
    <button
      className={clsx(
        'px-4 py-2',
        'rounded-lg bg-(--button-color-primary-fill)',
        'text-(--button-color-primary-font)',
        'emboss-edges hover:deboss-edges hover:translate-y-0.5',
        'hover:shadow-sm hover:shadow-violet-700 dark:hover:shadow-emerald-50 active:shadow-none',
        'transition-shadow duration-150 ease-in'
      )}
    >
      {text}
    </button>
  );
}

export function SecondaryButton({ text }: Readonly<{
  text: string
}>) {
  return (
    <button
      className={clsx(
        'px-4 py-2',
        'rounded-lg bg-(--button-color-secondary-fill)',
        'text-(--button-color-secondary-font)',
        'emboss-edges hover:deboss-edges hover:translate-y-0.5',
        'hover:shadow-sm hover:shadow-violet-500 dark:hover:shadow-emerald-600 active:shadow-none',
        'transition duration-150 ease-in'
      )}
    >
      {text}
    </button>
  );
}