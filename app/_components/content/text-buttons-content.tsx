export default function TextButtonsContent({
  title, text, primaryButtonText, primaryButtonHref, secondaryButtonText, secondaryButtonHref
}: Readonly<{
  title: string,
  text: string,
  primaryButtonText: string,
  primaryButtonHref: string,
  secondaryButtonText?: string,
  secondaryButtonHref?: string
}>) {
  return (
    <section className="flex flex-col p-5 gap-2">
      <h2>{title}</h2>
      <span>{text}</span>
      <div className="flex pt-4 gap-2">
        <div className="p-2">
          <button className="px-4 py-2 rounded-lg bg-(--button-color-primary-fill) text-(--button-color-primary-font) hover:shadow-sm hover:shadow-violet-700 dark:hover:shadow-emerald-50 active:shadow-none">
            {primaryButtonText}
          </button>
        </div>
        {secondaryButtonText && (
          <div className="p-2">
            <button className="px-4 py-2 rounded-lg bg-(--button-color-secondary-fill) text-(--button-color-secondary-font) hover:shadow-sm hover:shadow-violet-500 dark:shadow-emerald-600 active:shadow-none">
              {secondaryButtonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}