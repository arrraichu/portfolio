export default function TitleContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <section className="flex flex-col py-8 md:py-10 lg:py-12 px-5 md:px-10 lg:px-18 gap-2">
      <h1 className="text-5xl! font-black text-(--accent-color) mb-2">{title}</h1>
      <span className="my-2 px-2">
        {text}
      </span>
    </section>
  );
}