'use server';

import { redirect } from 'next/navigation';

import { parseNumber } from '@/app/_lib/number';
import { ContentState } from '@/app/_types/content';

// import { z } from 'zod';

// const ZOD_INITIAL_CONTENT = z.object({
//   page_path: z.string(),
//   content_type: z.string(),
//   index: z.coerce.number<number>(),

//   header: z.optional(z.string()),
//   subheader1: z.optional(z.string()),
//   subheader2: z.optional(z.string()),

//   textblock1: z.optional(z.string()),
//   textblock2: z.optional(z.string()),

//   button1text: z.optional(z.string()),
//   button1href: z.optional(z.string()),
//   button2text: z.optional(z.string()),
//   button2href: z.optional(z.string()),
//   button3text: z.optional(z.string()),
//   button3href: z.optional(z.string()),
//   button4text: z.optional(z.string()),
//   button4href: z.optional(z.string()),

//   image1src: z.optional(z.string()),
//   image1alt: z.optional(z.string()),
//   image2src: z.optional(z.string()),
//   image2alt: z.optional(z.string()),
//   image3src: z.optional(z.string()),
//   image3alt: z.optional(z.string()),
//   image4src: z.optional(z.string()),
//   image4alt: z.optional(z.string())
// });
// type ZodContent = z.infer<typeof ZOD_INITIAL_CONTENT>

const POST_CONTENT_URL = `${process.env.PORTFOLIO_SERVER_URL}/content`;

const CONTENT_TYPE = 'content_type[code]';
const CONTENT_TYPE_VALUES = 'content_type[reqs]';

export async function createContent(initialState: ContentState, formData: FormData): Promise<ContentState> {
  const index = parseNumber(formData.get('sequence') as string);
  if (index == null) {
    return {
      errors: {
        sequence: 'needs to be a number!'
      }
    }
  }

  const data: {[k: string]: unknown} = {
    page_path: formData.get('page_path'),
    type: formData.get(CONTENT_TYPE),
    index
  };

  for (const label of (formData.get(CONTENT_TYPE_VALUES) as string).split(',')) {
    data[label] = formData.get(label)
  }

  const response = await fetch(POST_CONTENT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const status = response.status;
  const responseBody = await response.json();
  console.log(status);
  console.log(JSON.stringify(responseBody));

  const resp: ContentState = {
    errors: {},
    status
  };
  if (status !== 200) {
    resp.response = responseBody.error;
    redirect(`/private/csm/new?error=${resp.response}`);
    return resp;
  }

  redirect('/private');
  return resp;
}
