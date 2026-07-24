import type { NextRequest } from 'next/server';
import type { ServerResponse } from '../route';

export async function DELETE(request: NextRequest, ctx: RouteContext<'/api/content/[id]'>) {
  const { id } = await ctx.params;

  const url = `${process.env.PORTFOLIO_SERVER_URL}/content/${id}`;
  const options = {
    method: 'DELETE',
    next: { tags: ['content'] }
  };
  const res = await fetch(url, options);

  const responseBody = await res.json() as ServerResponse;
  if (!responseBody.ok) {
    console.error(JSON.stringify(responseBody));
    return Response.json({ ok: false });
  }

  return Response.json({ ok: true, last_updated: new Date().toISOString() });
}
