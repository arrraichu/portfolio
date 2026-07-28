import StandardWrapper from '../wrappers/standard-wrapper';

export default function TitleContent({ title, subheader, text }: Readonly<{
  title: string,
  subheader?: string,
  text: string
}>) {
  return (
    <StandardWrapper>
      <h1 className="text-4xl! lg:text-5xl! leading-normal! font-black text-(--accent-color) lg:mb-2">{title}</h1>
      {subheader && subheader !== '' && (
        <div className="my-2 px-2 font-semibold text-lg">
          {subheader}
        </div>
      )}
      <span className="my-2 px-2">
        {text}
      </span>
    </StandardWrapper>
  );
}