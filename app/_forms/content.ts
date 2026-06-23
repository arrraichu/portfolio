'use server';

import { redirect } from 'next/navigation';

import { parseNumber } from '@/app/_lib/number';
import { ContentState } from '@/app/_types/content';

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
