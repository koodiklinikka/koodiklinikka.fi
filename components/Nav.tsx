'use client';

import Link, { LinkProps } from 'next/link';
import Wrapper from './Wrapper';
import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 h-32 w-full">
      <Wrapper>
        <div className="relative flex items-center justify-between py-5 sm:px-6 md:px-12">
          <div className="shrink-0">
            <a href="/">
              <img
                src="/koodiklinikka-logo.svg"
                alt="Koodiklinikka"
                width="600"
                height="114"
                className="w-40"
                loading="eager"
              />
            </a>
          </div>
          <div ref={navRef} className="relative">
            <button
              type="button"
              className="relative top-3 -mr-6 -mt-6 rounded-full bg-black/0 p-6 hover:bg-black/20 lg:hidden"
              onMouseDown={() => setNavOpen(!navOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div
              className={`${navOpen ? 'flex' : 'hidden'} text-shadow absolute right-0 top-12 flex-col divide-white/20 rounded-lg bg-black/90 py-2 text-xs uppercase tracking-widest text-pink-100  backdrop-blur-md lg:static lg:-mr-6 lg:flex lg:flex-row lg:divide-x lg:bg-transparent lg:backdrop-blur-none`}
            >
              <NavLink href="https://github.com/koodiklinikka">GitHub</NavLink>
              <NavLink href="https://koodiklinikka.slack.com">Slack</NavLink>
              <NavLink href="https://resources.koodiklinikka.fi">Resurssit</NavLink>
              <NavLink href="https://koodiklinikka.myspreadshop.fi/">Kauppa</NavLink>
              <NavLink href="https://github.com/koodiklinikka/code-of-conduct">Käytöskoodi</NavLink>
            </div>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
}

const NavLink = (props: React.PropsWithChildren<LinkProps>) => (
  <Link className="px-6 py-4 underline-offset-4 hover:underline lg:px-6 lg:py-1" {...props} />
);
