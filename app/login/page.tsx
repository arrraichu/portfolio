import authorize from '@/app/_lib/authorize';
import { PrimaryButton } from '../_components/buttons/buttons';

export default async function Home() {
  const session = await authorize(true);

  const loginReturnTo = encodeURIComponent(`${process.env.APP_BASE_URL}/private`);

  if (!session) {
    return (
      <section className="flex flex-col py-5 px-5 md:px-10 lg:px-18 gap-2">
        <h1>You are not logged in</h1>
        
        <a className="my-2 px-2" href={`/auth/login?connection=google-oauth2&returnTo=${loginReturnTo}`}>
          <PrimaryButton text="Log in" />
        </a>
      </section>
    );
  }

  return (
    <section className="flex flex-col py-5 px-5 md:px-10 lg:px-18 gap-2">
      <h1>User Profile</h1>
      <p className="my-2 px-2">You are logged in as {session!.user.email}.</p>

      <a className="my-2 px-2" href="/auth/logout">
        <PrimaryButton text="Log out" />
      </a>
    </section>
  );
};
