export function PrimaryButton({ text }: Readonly<{
  text: string
}>) {
  return (
    <button className="px-4 py-2 rounded-lg bg-(--button-color-primary-fill) text-(--button-color-primary-font) hover:shadow-sm hover:shadow-violet-700 dark:hover:shadow-emerald-50 active:shadow-none">
      {text}
    </button>
  );
}

export function SecondaryButton({ text }: Readonly<{
  text: string
}>) {
  return (
    <button className="px-4 py-2 rounded-lg bg-(--button-color-secondary-fill) text-(--button-color-secondary-font) hover:shadow-sm hover:shadow-violet-500 dark:hover:shadow-emerald-600 active:shadow-none">
      {text}
    </button>
  );
}