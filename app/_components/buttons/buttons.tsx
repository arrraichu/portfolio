import clsx from 'clsx';

export function PrimaryButton({ text, type }: Readonly<{
  text: string,
  type?: 'button' | 'submit' | 'reset'
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
      type={type ?? 'button'}
    >
      {text}
    </button>
  );
}

export function SecondaryButton({ text, type }: Readonly<{
  text: string
  type?: 'button' | 'submit' | 'reset'
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
      type={type ?? 'button'}
    >
      {text}
    </button>
  );
}