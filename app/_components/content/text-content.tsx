import StandardWrapper from '../wrappers/standard-wrapper';
import SimpleMarkup from './simple-markup';

export default function TextContent({ title, text }: Readonly<{
  title?: string,
  text: string
}>) {
  return (
    <StandardWrapper>
      {title && title !== '' && (
        <h2>{title}</h2>
      )}
      {SimpleMarkup(text, "my-2 px-2")}
      
    </StandardWrapper>
  );
}