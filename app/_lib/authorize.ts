'use server'

import { redirect } from 'next/navigation';

import type { SessionData } from '@auth0/nextjs-auth0/types';
import { auth0 } from '@/app/_lib/auth0';

interface AuthorizeOpts {
  returnTo?: string
};

export default async function authorize(
  allowNoSession: boolean = false,
  opts: AuthorizeOpts = {}
): Promise<SessionData | null> {
  const session = await auth0.getSession();

  if (!session) {
    if (!allowNoSession) {
      const redirectUrl = new URL('/login', process.env.APP_BASE_URL);
      if (opts!.returnTo) {
        redirectUrl.searchParams.set(
          'returnTo',
          opts.returnTo
        );
      }
      redirect(redirectUrl.toString());
    }

    return null;
  }

  const allowedAccounts = process.env.ALLOWED_USER_ACCOUNTS?.split(',') || [];
  const email = session!.user.email || '';
  if (email === '' || !allowedAccounts.includes(email)) {
    const redirectUrl = new URL('/auth/logout', process.env.APP_BASE_URL);
    redirectUrl.searchParams.set(
      'returnTo',
      `${process.env.APP_BASE_URL}/login?hint=unauthorized_user`
    );

    redirect(redirectUrl.toString());
    return null;
  }

  return session;
};
