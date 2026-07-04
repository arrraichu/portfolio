import { Dispatch } from 'react';
import { z } from 'zod';

import Input from '@/app/_components/input/input';
import Textarea from '@/app/_components/input/textarea';

export const API_PATH_CONTENT = '/api/content';
export const API_PATH_CONTENT_TYPES = '/api/content-type';

export interface ContentState {
  errors: {
    [k: string]: string
  },
  status?: number,
  response?: string
};
export const INITIAL_CONTENT_STATE: ContentState = {
  errors: {}
};

export interface ContentType {
  code: string,
  label: string,
  reqs?: string
};
export const PLACEHOLDER_CONTENT_TYPE : ContentType = {
  code: 'NA',
  label: 'Loading...'
};

export const CONTENT_TYPES = {
  HEADER : 'header',
  SUBHEADER_1 : 'subheader1',
  SUBHEADER_2 : 'subheader2',

  TEXTBLOCK_1 : 'textblock1',
  TEXTBLOCK_2 : 'textblock2',

  BUTTONTEXT_1 : 'button1text',
  BUTTONHREF_1 : 'button1href',
  BUTTONTEXT_2 : 'button2text',
  BUTTONHREF_2 : 'button2href',

  IMAGESRC_1 : 'image1src',
  IMAGEALT_1 : 'image1alt',
  IMAGEPLC_1 : 'image1placement',
  IMAGESRC_2 : 'image2src',
  IMAGEALT_2 : 'image2alt',
  IMAGEPLC_2 : 'image2placement'
};

export function getUserInput(
  type: string,
  value: string,
  setValue: Dispatch<string>,
  errorStr?: string
): React.ReactNode {

  switch (type) {
    case CONTENT_TYPES.HEADER: {
      return <Input
        key={type}
        name={type}
        preLabel="Header"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.SUBHEADER_1: {
      return <Textarea
        key={type}
        name={type}
        preLabel="Subheader 1"
        rows={2}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.SUBHEADER_2: {
      return <Textarea
        key={type}
        name={type}
        preLabel="Subheader 2"
        rows={2}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.TEXTBLOCK_1: {
      return <Textarea
        key={type}
        name={type}
        preLabel="Text block 1"
        rows={4}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.TEXTBLOCK_2: {
      return <Textarea
        key={type}
        name={type}
        preLabel="Text block 2"
        rows={4}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.BUTTONTEXT_1: {
      return <Input
        key={type}
        name={type}
        preLabel="Button 1 text"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.BUTTONHREF_1: {
      return <Input
        key={type}
        name={type}
        preLabel="Button 1 href"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.BUTTONTEXT_2: {
      return <Input
        key={type}
        name={type}
        preLabel="Button 2 text"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.BUTTONHREF_2: {
      return <Input
        key={type}
        name={type}
        preLabel="Button 2 href"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGESRC_1: {
      return <Input
        key={type}
        name={type}
        preLabel="Image 1 source"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGESRC_2: {
      return <Input
        key={type}
        name={type}
        preLabel="Image 2 source"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGEALT_1: {
      return <Input
        key={type}
        name={type}
        preLabel="Image 1 alternate text"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGEALT_2: {
      return <Input
        key={type}
        name={type}
        preLabel="Image 2 alternate text"
        placeholder={type}
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGEPLC_1: {
      return <Input
        key={type}
        name={type}
        preLabel="Image 1 placement"
        placeholder="full"
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    case CONTENT_TYPES.IMAGEPLC_2: {
      return <Input
        key={type}
        name={type}
        preLabel="Image 2 placement"
        placeholder="full"
        error={errorStr}
        value={value}
        setValue={setValue}
      />;
    }

    default: {
      return <div key={type}></div>;
    }
  }
};

const ContentInitialSchemaObject = {
  id: z.number(),
  page_path: z.string(),
  type: z.string(),
  index: z.number(),

  header: z.optional(z.string()),
  subheader1: z.optional(z.string()),
  subheader2: z.optional(z.string()),

  textblock1: z.optional(z.string()),
  textblock2: z.optional(z.string()),

  button1text: z.optional(z.string()),
  button1href: z.optional(z.string()),
  button2text: z.optional(z.string()),
  button2href: z.optional(z.string()),
  button3text: z.optional(z.string()),
  button3href: z.optional(z.string()),
  button4text: z.optional(z.string()),
  button4href: z.optional(z.string()),

  image1src: z.optional(z.string()),
  image1alt: z.optional(z.string()),
  image1placement: z.optional(z.string()),
  image2src: z.optional(z.string()),
  image2alt: z.optional(z.string()),
  image2placement: z.optional(z.string()),
  image3src: z.optional(z.string()),
  image3alt: z.optional(z.string()),
  image3placement: z.optional(z.string()),
  image4src: z.optional(z.string()),
  image4alt: z.optional(z.string()),
  image4placement: z.optional(z.string())
};
export const ContentInitialSchema = z.object(ContentInitialSchemaObject);
export type Content = z.infer<typeof ContentInitialSchema>;
