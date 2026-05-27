export default function TextContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <section className="flex flex-col py-5 px-5 md:px-10 gap-2">
      <h2>{title}</h2>
      <span className="my-2 px-2">{text}</span>
    </section>
  );
}