'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    <nav className="fixed left-0 top-0 z-50 h-32 w-full bg-gradient-to-b from-black/40 to-fuchsia-950/0">
      <Wrapper>
        <div className="relative flex items-center justify-between px-6 py-5 md:px-12">
          <div className="shrink-0">
            <Image src="/koodiklinikka.svg" alt="Koodiklinikka" width="179" height="34" className="w-40" priority />
          </div>
          <div ref={navRef}>
            <button
              type="button"
              className="-mr-2 rounded bg-black/0 p-2 hover:bg-black/20 lg:hidden"
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
              className={`${navOpen ? 'flex' : 'hidden'} text-shadow absolute right-6 top-16 flex-col gap-5 rounded-lg bg-black/80 p-5 text-xs uppercase tracking-widest text-pink-100 backdrop-blur-md lg:static lg:flex lg:flex-row lg:bg-transparent lg:backdrop-blur-none`}
            >
              <Link className="underline-offset-4 hover:underline" href="https://github.com/koodiklinikka">
                GitHub
              </Link>
              <NavSeparator />
              <Link className="underline-offset-4 hover:underline" href="https://koodiklinikka.slack.com">
                Slack
              </Link>
              <NavSeparator />
              <Link className="underline-offset-4 hover:underline" href="https://resources.koodiklinikka.fi">
                Resources
              </Link>
              <NavSeparator />
              <Link className="underline-offset-4 hover:underline" href="https://koodiklinikka.myspreadshop.fi/">
                Shop
              </Link>
              <NavSeparator />
              <Link
                className="underline-offset-4 hover:underline"
                href="https://github.com/koodiklinikka/code-of-conduct"
              >
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
}

const NavSeparator = () => <div className="hidden opacity-20 lg:block">|</div>;
