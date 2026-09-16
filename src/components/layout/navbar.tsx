"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navigationItems } from "@/data/navigation";

function MascotMark() {
  return (
    <Image
      src="/images/mascot-logo.png"
      alt="Charles Cong"
      width={40}
      height={20}
      className="h-5 w-auto"
      priority
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClassName = (href: string) =>
    `block rounded-full text-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
      pathname === href
        ? "bg-secondary/80 font-medium text-foreground"
        : "text-muted-foreground"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 isolate pt-4 md:pt-8">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-14 w-[calc(100%_-_48px)] items-center justify-between rounded-2xl border border-border/70 bg-surface/70 px-2 backdrop-blur-xl backdrop-saturate-150 md:hidden"
      >
        <Link
          href="/"
          aria-label="Charles Cong home"
          className="flex h-10 w-10 items-center justify-center rounded-full"
          onClick={() => setMenuOpen(false)}
        >
          <MascotMark />
        </Link>
        <button
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="relative z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-secondary/80 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mx-auto mt-2 w-[calc(100%_-_48px)] rounded-2xl border border-border/70 bg-surface/90 p-2 backdrop-blur-xl backdrop-saturate-150 md:hidden"
        >
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`${linkClassName(item.href)} px-4 py-3`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <nav
        aria-label="Primary navigation"
        className="mx-auto hidden w-[calc(100%_-_48px)] max-w-2xl grid-cols-5 items-center rounded-2xl border border-border/70 bg-surface/70 p-2 backdrop-blur-xl backdrop-saturate-150 md:grid"
      >
        <Link
          href="/"
          aria-label="Charles Cong home"
          className="flex h-12 items-center justify-center rounded-full"
        >
          <MascotMark />
        </Link>

        <ul className="col-span-4 grid min-w-0 grid-cols-4 items-center">
          {navigationItems.map((item) => (
            <li key={item.label} className="min-w-0">
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`${linkClassName(item.href)} truncate px-1 py-3 text-center lg:px-2`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
