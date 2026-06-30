import StandardWrapper from '../wrappers/standard-wrapper';

export default function TitleContent({ title, text }: Readonly<{
  title: string,
  text: string
}>) {
  return (
    <StandardWrapper>
      <h1 className="text-4xl! lg:text-5xl! leading-normal! font-black text-(--accent-color) lg:mb-2">{title}</h1>
      <span className="my-2 px-2">
        {text}
      </span>
    </StandardWrapper>
  );
}