import { NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/app/_lib/auth0';

export async function proxy(request: NextRequest) {
  const session = await auth0.getSession(request);

  if (!session && request.nextUrl.pathname.startsWith('/private')) {
    const redirectUrl = new URL('/login', request.nextUrl.origin);
    redirectUrl.searchParams.set(
      'returnTo',
      request.nextUrl.pathname
    );
    return NextResponse.redirect(redirectUrl);
  }

  return auth0.middleware(request);
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ]
};
