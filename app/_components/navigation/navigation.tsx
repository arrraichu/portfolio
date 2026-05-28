'use client';

import { useRef } from 'react';
import Image from 'next/image';
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
      <header className="fixed w-full h-(--navbar-height) py-4 bg-(--site-color) border-b-[1.5px] border-b-(--line-color) z-50">
        <nav className="flex justify-between items-center px-5 md:px-8">
          <div className="left-content flex gap-2 lg:gap-8">
            <Image className="lg:hidden" src="/vdiamond.svg" width={24} height={24} alt="Website icon" />
            <span className="text-xl font-medium [text-box:trim-end_cap_alphabetic] align-baseline lg:hidden!">Raymond Chu</span>

            <div className="hidden lg:flex gap-2">
              <Image src="/vdiamond.svg" width={24} height={24} alt="Website icon" />
              <span className="text-xl font-medium [text-box:trim-end_cap_alphabetic] align-baseline">Raymond Chu</span>
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

            <div className="hidden lg:flex gap-6 items-end">
              <span className="text-xl font-bold text-(--accent-color) opacity-75 hover:opacity-100 hover:underline">Portfolio</span>
              <span className="text-xl font-bold text-(--accent-color) opacity-75 hover:opacity-100 hover:underline">Demos</span>
              <span className="text-xl font-bold text-(--accent-color) opacity-75 hover:opacity-100 hover:underline">Resume</span>
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