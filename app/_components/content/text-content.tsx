export default function TextContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <section className="flex flex-col p-5 gap-2">
      <h2>{title}</h2>
      <span>{text}</span>
    </section>
  );
}