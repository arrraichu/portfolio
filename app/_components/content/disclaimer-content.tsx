import clsx from 'clsx';

export default function DisclaimerContent({ title, text }: Readonly<{
  title?: string,
  text: string
}>) {
  return (
    <section
      className={clsx(
        'flex flex-col py-8 md:py-10 lg:py-12 px-0 md:px-12 lg:px-16 gap-2',
      )}
    >
      <div
        className={clsx(
          'text-(--font-color) px-10 md:px-8 lg:px-8 pt-2 pb-6',
          'lg:rounded-xs bg-(--disclaimer-color)/80 dark:bg-(--disclaimer-color)/80',
          'deboss-edges'
        )}
      >
        {title && title !== '' && (
          <h3 className="font-semibold!">{title}</h3>
        )}
        <span className="my-2 px-2">{text}</span>
      </div>
    </section>
  );
}