import type { NextRequest } from 'next/server';

import { Content } from '@/app/_types/content';

interface ServerResponse {
  ok: boolean;
  error: string;
  posts?: Content[];
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams ?? {};
  const fetchAll = searchParams.get('fetch_all');
  const pathname= searchParams.get('page_path');
  if (!fetchAll && !pathname) {
    return Response.json([]);
  }

  const url = fetchAll
    ? `${process.env.PORTFOLIO_SERVER_URL}/content?force_fetch_all=true`
    : `${process.env.PORTFOLIO_SERVER_URL}/content?page_path=${encodeURIComponent(pathname!)}`;
  const res = await fetch(url, { next: { tags: ['content'] } });

  const responseBody = await res.json() as ServerResponse;
  if (!responseBody.ok) {
    return Response.json([]);
  }

  return Response.json(responseBody.posts ?? []);
};
