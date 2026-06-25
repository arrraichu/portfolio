import Link from "next/link";

interface Crumb {
  name: string;
  location: string;
};

export default function Breadcrumb({ crumbs }: Readonly<{
  crumbs: Crumb[]
}>) {
  return (
    <div className="pt-8 px-4 md:px-8 lg:px-14">
      <Link
        key={0}
        className="hover:underline hover:font-bold"
        href={crumbs[0].location}>
        {crumbs[0].name}
      </Link>

      {crumbs.length > 1 && crumbs.slice(1).map((crumb: Crumb, i: number) => (
        <span key={i+1}>
          <span className="px-2">&gt;</span>
          <Link
            className="hover:underline hover:font-bold"
            href={crumb.location}>
            {crumb.name}
          </Link>
        </span>
      ))}
    </div>
  );
}