import StandardWrapper from '../wrappers/standard-wrapper';

export default function TextContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <StandardWrapper>
      <h2>{title}</h2>
      <span className="my-2 px-2">{text}</span>
    </StandardWrapper>
  );
}