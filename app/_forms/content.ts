'use server';

import { redirect } from 'next/navigation';

import { parseNumber } from '@/app/_lib/number';
import { ContentState } from '@/app/_types/content';
import { updateTag } from 'next/cache';

const POST_CONTENT_URL = `${process.env.PORTFOLIO_SERVER_URL}/content`;

const CONTENT_TYPE = 'content_type[code]';
const CONTENT_TYPE_VALUES = 'content_type[reqs]';

export async function createContent(initialState: ContentState, formData: FormData): Promise<ContentState> {
  'use server';

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
    redirect(`/private/cms/new?error=${resp.response}`);
    return resp;
  }

  updateTag('content');
  return resp;
}

export async function updateContent(initialState: ContentState, formData: FormData): Promise<ContentState> {
  'use server';

  const id = parseNumber(formData.get('id') as string);
  if (id == null) {
    return {
      errors: {
        id: 'needs to be a number!'
      }
    };
  }

  const index = parseNumber(formData.get('sequence') as string);
  if (index == null) {
    return {
      errors: {
        sequence: 'needs to be a number!'
      }
    };
  }

  const data: {[k: string]: unknown} = {
    id,
    page_path: formData.get('page_path'),
    type: formData.get(CONTENT_TYPE),
    index
  };

  for (const label of (formData.get(CONTENT_TYPE_VALUES) as string).split(',')) {
    data[label] = formData.get(label);
  }

  console.log(JSON.stringify(data, null, 2));

  const response = await fetch(POST_CONTENT_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const status = response.status;
  console.log(`status: ${status}`);
  const responseBody = await response.json();
  console.log(`response body: ${JSON.stringify(responseBody, null, 2)}`);

  const resp: ContentState = {
    errors: {},
    status
  };
  if (status != 200) {
    resp.response = responseBody.error;
    redirect(`/private/cms?error=${resp.response}`);
    return resp;
  }

  updateTag('content');
  return resp;
}
