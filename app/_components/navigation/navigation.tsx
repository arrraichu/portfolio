'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Bars3Icon, SunIcon } from '@heroicons/react/24/outline';

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
        <nav className="flex justify-between items-center px-5">
          <div className="left-content flex gap-2">
            <Image src="/vdiamond.svg" width={24} height={24} alt="Website icon" />
            <span className="text-xl font-medium [text-box:trim-end_cap_alphabetic] align-baseline">Raymond Chu</span>
          </div>
          <div className="icons flex gap-6">
            <SunIcon
              className="size-6 text-(--icon-color-interaction-stroke)"
              onClick={() => flipTheme()}
            />
            <Bars3Icon
              className="size-6 text-(--icon-color-interaction-stroke)"
              ref={hamburgerIconRef}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </nav>
      </header>

      <NavMenu ref={navMenuRef} isOpen={menuOpen} setOpen={setMenuOpen} />
    </>
  );
}