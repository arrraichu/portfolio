import Link from 'next/link';

import authorize from '@/app/_lib/authorize';
import Title from '@/app/_components/title/title';

import { GridItems, GridTextItem } from '../_components/content/grid-items';

const _CURRENT_PATHNAME = "/private";

export default async function Home() {
  const session = await authorize(false, { returnTo: _CURRENT_PATHNAME })
  const logoutRedirect = encodeURIComponent(`${process.env.HOST}login`);

  if (!session) {
    return (
      <>
        <h1>Not Authorized...</h1>
      </>
    );
  }

  return (
    <>
      <Title
        title={`Welcome ${session!.user.name}`}
        subtitle="Your projects..." />
      
      <GridItems>
        <Link href="/">
          <GridTextItem title="Content manager" subtitle="Edit your website's content" />
        </Link>
        <a href={`/auth/logout?returnTo=${logoutRedirect}`}>
          <GridTextItem title="Log out" subtitle="Log out and return to Home" />
        </a>
      </GridItems>
    </>
  );
};
