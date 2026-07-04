import TitleContent from './title-content';
import DisclaimerContent from './disclaimer-content';
import TextContent from './text-content';
import TextButtonsContent from './text-buttons-content';
import ImageContent from './image-content';
import { Content } from '@/app/_types/content';

export default function MapContent({ content }: Readonly<{
  content: Content
}>) {

  switch (content.type) {

    case 'title': {
      return (
        <TitleContent
          title={content.header ?? ''}
          subheader={content.subheader1}
          text={content.textblock1 ?? ''}
        />
      );
    }

    case 'disclaimer': {
      return (
        <DisclaimerContent
          title={content.header ?? ''}
          text={content.textblock1 ?? ''}
        />
      );
    }

    case 'text': {
      return (
        <TextContent
          title={content.header}
          text={content.textblock1 ?? ''}
        />
      );
    }

    case 'text_buttons': {
      return (
        <TextButtonsContent
          title={content.header}
          text={content.textblock1 ?? ''}
          primaryButtonText={content.button1text ?? ''}
          primaryButtonHref={content.button1href ?? ''}
          secondaryButtonText={content.button2text}
          secondaryButtonHref={content.button2href}
        />
      );
    }

    case 'image': {
      return (
        <ImageContent
          src={content.image1src!}
          alt={content.image1alt || ''}
          placement={content.image1placement || 'full'}
        />
      )
    }

    default: {
      return <></>;
    }
  }
};
