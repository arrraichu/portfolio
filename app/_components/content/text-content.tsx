import StandardWrapper from '../wrappers/standard-wrapper';
import SimpleMarkup from './simple-markup';

export default function TextContent({ title, text }: Readonly<{
  title?: string,
  text: string
}>) {
  return (
    <StandardWrapper>
      {title && title !== '' && (
        <h2 className="font-stretch-expanded underline underline-offset-6 decoration-4 decoration-(--accent-color)">
          {title.toUpperCase()}
        </h2>
      )}
      {SimpleMarkup(text, "my-1 px-2")}
      
    </StandardWrapper>
  );
}