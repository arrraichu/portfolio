export default function TitleContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <section className="flex flex-col py-8 px-5 md:px-10 lg:px-18 gap-2">
      <h1 className="font-black text-(--accent-color)">{title}</h1>
      <span className="my-2 px-2">
        {text}
      </span>
    </section>
  );
}