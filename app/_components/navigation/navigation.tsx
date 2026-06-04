'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import GitIcon from '@/public/git.svg';
import { useThemes } from '@/app/_hooks/theme-provider';
import NavMenu from './nav-menu';
import useClickAway from '@/app/_hooks/use-click-away';

export default function Nav() {
  const {
    flipTheme,
    menuOpen,
    setMenuOpen
  } = useThemes();

  const hamburgerIconRef = useRef<SVGSVGElement | null>(null);
  const navMenuRef = useClickAway([hamburgerIconRef], () => setMenuOpen(false));

  return (
    <>
      <header
        className={clsx(
          'fixed w-full z-50 h-(--navbar-height) py-4',
          'bg-(--site-color) border-b-[1.5px] border-b-(--line-color)',
          'shadow-[0px_-16px_12px_12px_var(--line-color)]'
        )}
      >
        <nav className="flex justify-between items-center px-5 md:px-8">
          <div className="left-content flex gap-2 lg:gap-8">
            <Link href="/">
              <Image className="lg:hidden" src="/vdiamond.svg" width={24} height={24} alt="Website icon" />
            </Link>
            <Link href="/">
              <span className="text-xl font-medium [text-box:trim-end_cap_alphabetic] align-baseline lg:hidden!">
                Raymond Chu
              </span>
            </Link>

            <div className="hidden lg:flex gap-2">
              <Link href="/">
                <Image src="/vdiamond.svg" width={24} height={24} alt="Website icon" />
              </Link>
              <Link href="/">
                <span className="text-xl font-medium [text-box:trim-end_cap_alphabetic] align-baseline">
                  Raymond Chu
                </span>
              </Link>
            </div>
            <div className="hidden lg:flex gap-4 items-center">
              <a className="opacity-75 hover:opacity-100"
                href="https://github.com/arrraichu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github link (opens in new tab)">
                <GitIcon className="size-5 text-(--accent-color)" />
              </a>
            </div>
          </div>
          <div className="icons flex gap-6 lg:gap-8">
            <SunIcon
              className="block dark:hidden size-6 text-(--icon-color-interaction-stroke) hover:cursor-pointer lg:hidden lg:dark:hidden"
              onClick={() => flipTheme()}
            />
            <MoonIcon
              className="hidden dark:block size-6 text-(--icon-color-interaction-stroke) hover:cursor-pointer lg:hidden lg:dark:hidden"
              onClick={() => flipTheme()}
            />
            <Bars3Icon
              className="size-6 text-(--icon-color-interaction-stroke) hover:cursor-pointer lg:hidden"
              ref={hamburgerIconRef}
              onClick={() => setMenuOpen(!menuOpen)}
            />

            <div className="hidden lg:flex gap-3 items-end">
              <span
                className={clsx(
                  'px-2 opacity-75 rounded-md select-none',
                  'text-xl font-extrabold tracking-wide text-(--accent-color)',
                  'noboss-edges hover:deboss-edges hover:cursor-pointer',
                  'dark:outline-(--line-color) dark:hover:outline-1',
                  'transition-all duration-150 ease-in',
                  'active:[box-shadow:none] active:transition-none active:translate-none'
                )}
              >
                Portfolio
              </span>
              <span
                className={clsx(
                  'px-2 opacity-75 rounded-md select-none',
                  'text-xl font-extrabold tracking-wide text-(--accent-color)',
                  'noboss-edges hover:deboss-edges hover:cursor-pointer',
                  'dark:outline-(--line-color) dark:hover:outline-1',
                  'transition-all duration-150 ease-in',
                  'active:[box-shadow:none] active:transition-none active:translate-none'
                )}
              >
                Demos
              </span>
              <span
                className={clsx(
                  'px-2 opacity-75 rounded-md select-none',
                  'text-xl font-extrabold tracking-wide text-(--accent-color)',
                  'noboss-edges hover:deboss-edges hover:cursor-pointer',
                  'dark:outline-(--line-color) dark:hover:outline-1',
                  'transition-all duration-150 ease-in',
                  'active:[box-shadow:none] active:transition-none active:translate-none'
                )}
              >
                Resume
              </span>
            </div>
            <div className="hidden lg:flex gap-6 items-center">
              <SunIcon
                className="block dark:hidden size-6 text-(--icon-color-interaction-stroke) hover:cursor-pointer"
                onClick={() => flipTheme()}
              />
              <MoonIcon
                className="hidden dark:block size-6 text-(--icon-color-interaction-stroke) hover:cursor-pointer"
                onClick={() => flipTheme()}
              />
            </div>
          </div>
        </nav>
      </header>

      <NavMenu ref={navMenuRef} isOpen={menuOpen} setOpen={setMenuOpen} />
    </>
  );
}