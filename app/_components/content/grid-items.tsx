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
    <div className="flex flex-col m-2 py-6 px-8 rounded-lg border-2 gap-5 bg-(--site-color) hover:bg-(--mixed-background-color) transition-colors">
      <div className="text-xl text-center md:text-left font-bold underline underline-offset-8">{title}</div>
      <div className="text-md text-center md:text-left">{subtitle}</div>
    </div>
  );
};
