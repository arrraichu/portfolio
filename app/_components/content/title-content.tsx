export default function TitleContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <section className="flex flex-col py-8 md:py-10 lg:py-12 px-7 md:px-12 lg:px-20 gap-2">
      <h1 className="text-4xl! lg:text-5xl! leading-normal! font-black text-(--accent-color) lg:mb-2">{title}</h1>
      <span className="my-2 px-2">
        {text}
      </span>
    </section>
  );
}