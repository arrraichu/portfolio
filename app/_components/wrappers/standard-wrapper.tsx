export default function StandardWrapper({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="flex flex-col py-8 md:py-10 lg:py-12 px-7 md:px-12 lg:px-20 gap-2">
      {children}
    </section>
  );
};
