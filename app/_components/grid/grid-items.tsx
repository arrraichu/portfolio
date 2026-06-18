import clsx from 'clsx';

export function GridItems({ children }: Readonly<{
  children?: React.ReactNode
}>) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 py-5 px-5 md:px-10 lg:px-18 gap-2">
      {children}
    </section>
  );
};

export function GridTextItem({ title, subtitle }: Readonly<{
  title?: string,
  subtitle?: string
}>) {
  return (
    <div
      className={clsx(
        'flex flex-col m-2 py-6 px-8 gap-5',
        'rounded-lg bg-(--boss-color)',
        'emboss-edges hover:deboss-edges',
        'transition duration-150 ease-in',
        'active:[box-shadow:none] active:transition-none active-translate-none'
      )}
    >
      <div className="text-xl text-center md:text-left font-bold underline underline-offset-8">{title}</div>
      <div className="text-md text-center md:text-left">{subtitle}</div>
    </div>
  );
};
