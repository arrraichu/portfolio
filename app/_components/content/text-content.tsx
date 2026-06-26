export default function TextContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <section className="flex flex-col py-8 md:py-10 lg:py-12 px-7 md:px-12 lg:px-20 gap-2">
      <h2>{title}</h2>
      <span className="my-2 px-2">{text}</span>
    </section>
  );
}