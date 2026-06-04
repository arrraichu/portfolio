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
        'emboss-edges hover:deboss-edges',
        'transition duration-150 ease-in',
        'active:[box-shadow:none] active:transition-none active:translate-none'
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
        'emboss-edges hover:deboss-edges',
        'transition duration-150 ease-in',
        'active:[box-shadow:none] active:transition-none active:translate-none'
      )}
    >
      {text}
    </button>
  );
}