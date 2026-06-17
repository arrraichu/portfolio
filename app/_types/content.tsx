import { Dispatch } from 'react';
import { z } from 'zod';

import Input from '@/app/_components/input/input';
import Textarea from '@/app/_components/input/textarea';

export const API_PATH_CONTENT = '/api/content';

export interface ContentType {
  code: string,
  label: string,
  reqs?: string
};
export const PLACEHOLDER_CONTENT_TYPE : ContentType = {
  code: 'NA',
  label: 'Loading...'
};

export const ContentSchema = z.object({});
export type ContentForm = z.infer<typeof ContentSchema>;

export const CONTENT_TYPES = {
  HEADER : 'header',
  SUBHEADER_1 : 'subheader1',
  SUBHEADER_2 : 'subheader2',

  TEXTBLOCK_1 : 'textblock1',
  TEXTBLOCK_2 : 'textblock2',

  IMAGESRC_1 : 'image1src',
  IMAGEALT_1 : 'image1alt',
  IMAGESRC_2 : 'image2src',
  IMAGEALT_2 : 'image2alt'
};

export function getUserInput(type: string, value: string, setValue: Dispatch<string>): React.ReactNode {
  switch (type) {
    case CONTENT_TYPES.HEADER: {
      return <Input
        key={type}
        preLabel="Header"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.SUBHEADER_1: {
      return <Input
        key={type}
        preLabel="Subheader 1"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.SUBHEADER_2: {
      return <Input
        key={type}
        preLabel="Subheader 2"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.TEXTBLOCK_1: {
      return <Textarea
        key={type}
        preLabel="Text block 1"
        rows={4}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.TEXTBLOCK_2: {
      return <Textarea
        key={type}
        preLabel="Text block 2"
        rows={4}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGESRC_1: {
      return <Input
        key={type}
        preLabel="Image 1 source"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGESRC_2: {
      return <Input
        key={type}
        preLabel="Image 2 source"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGEALT_1: {
      return <Input
        key={type}
        preLabel="Image 1 alternate text"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGEALT_1: {
      return <Input
        key={type}
        preLabel="Image 2 alternate text"
        placeholder={type}
        value={value}
        setValue={setValue}
      />;
    }

    default: {
      return <></>;
    }
  }
}

