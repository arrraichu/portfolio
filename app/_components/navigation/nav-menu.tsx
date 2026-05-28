import clsx from 'clsx';
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import GitIcon from '@/public/git.svg';

export default function NavMenu({ref, isOpen, setOpen}: {
  ref: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  setOpen: (open: boolean) => void
}) {
  return (
    <nav
      className={clsx(
        "fixed w-full mt-(--navbar-height) z-10 bg-(--site-color) border-b border-b-(--line-color) ease-out duration-300 lg:hidden",
        {
          'translate-y-0': isOpen,
          '-translate-y-full': !isOpen
        }
      )}
      ref={ref as React.RefObject<HTMLDivElement>}
      >
      <div className="flex flex-col w-full">
        <NavMenuItemMainBlock
          title="Portfolio"
          description="The tech stack used in this site"
          href="#" />
        <NavMenuItemMainBlock
          title="Demos"
          description="Things worth showing off"
          href="#" />
        <NavMenuItemMainBlock
          title="Resume"
          description="My past experiences"
          href="#" />
        <NavMenuItemBottomBlock />
      </div>
    </nav>
  );
}

function NavMenuItemMainBlock({ title, description, href }: Readonly<{
  title: string,
  description: string,
  href: string,
}>) {
  return (
    <div className="w-full flex flex-col gap-2 py-5 px-5 md:px-8 border-b border-b-(--line-color)">
      <div className="text-xs text-(--accent-color) font-semibold uppercase tracking-wider">{title}</div>
      <div className="flex justify-between">
        <span className="text-xl px-0">{description}</span>
        <ArrowRightCircleIcon className="size-6 text-(--accent-color)" />
      </div>
    </div>
  )
}

function NavMenuItemBottomBlock() {
  return (
    <div className="w-full flex flex-col gap-2 py-5 px-5 md:px-8">
      <div className="text-xs text-(--accent-color) font-semibold uppercase tracking-wider">Contact</div>
      <div className="w-full flex py-2 px-4 justify-between">
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-2 opacity-50">
            <GitIcon className="size-5 text-(--font-color) dark:text-(--accent-color)" />
            <span className="text-s px-2">arrraichu</span>
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="flex gap-2 opacity-50">
            <GitIcon className="size-5 text-(--font-color) dark:text-(--accent-color)" />
            <span className="text-s px-2">arrraichu</span>
          </div>
        </div>
      </div>
    </div>
  );
}