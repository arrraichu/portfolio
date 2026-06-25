import Link from 'next/link';

import authorize from '@/app/_lib/authorize';
import Title from '@/app/_components/title/title';

import { GridItems, GridTextItem } from '../_components/grid/grid-items';
import Breadcrumb from '../_components/navigation/breadcrumb';

const _CURRENT_PATHNAME = "/private";

const PAGE_BREADCRUMBS = [
  { name: 'Home', location: '/' },
  { name: 'Private', location: '/private' }
];

export default async function Home() {
  const session = await authorize(false, { returnTo: _CURRENT_PATHNAME })
  const logoutRedirect = encodeURIComponent(`${process.env.APP_BASE_URL}/login`);

  if (!session) {
    return (
      <>
        <h1>Not Authorized...</h1>
      </>
    );
  }

  return (
    <>
      <Breadcrumb crumbs={PAGE_BREADCRUMBS} />

      <Title
        title={`Welcome ${session!.user.name}`}
        subtitle="Your projects..." />
      
      <GridItems>
        <Link href="/private/csm/new">
          <GridTextItem title="Content manager" subtitle="Edit your website's content" />
        </Link>
        <a href={`/auth/logout?returnTo=${logoutRedirect}`}>
          <GridTextItem title="Log out" subtitle="Log out and return to Home" />
        </a>
      </GridItems>
    </>
  );
};
