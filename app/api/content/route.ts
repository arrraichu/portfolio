import type { NextRequest } from 'next/server';

import { Content } from '@/app/_types/content';

interface ServerResponse {
  ok: boolean;
  error: string;
  posts?: Content[];
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams ?? {};
  const pathname = searchParams.get('page_path');
  if (!pathname) {
    return Response.json([]);
  }

  const url = `${process.env.PORTFOLIO_SERVER_URL}/content?page_path=${encodeURIComponent(pathname)}`;
  const res = await fetch(url);

  const responseBody = await res.json() as ServerResponse;
  if (!responseBody.ok) {
    return Response.json([]);
  }

  return Response.json(responseBody.posts ?? []);
};
