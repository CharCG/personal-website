"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navigationItems } from "@/data/navigation";

function MascotMark() {
  return (
    <Image
      src="/images/mascot-logo.png"
      alt=""
      width={20}
      height={20}
      className="h-auto w-auto object-contain"
      priority
    />
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const linkClassName = (href: string) =>
    `rounded-full text-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
      pathname === href ? "bg-secondary/80 font-medium text-foreground" : "text-muted-foreground"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-4 lg:pt-8">
      <div className="relative mx-auto w-full max-w-2xl">
        <nav
          aria-label="Primary navigation"
          className="flex h-14 w-full items-center justify-between rounded-2xl border border-border/70 bg-surface/80 px-2 backdrop-blur-xl lg:hidden"
        >
          <Link
            href="/"
            aria-label="Charles Cong home"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <MascotMark />
          </Link>
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 touch-manipulation cursor-pointer items-center justify-center rounded-full bg-secondary/80 text-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </nav>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-16 z-50 rounded-2xl border border-border bg-surface p-2 lg:hidden"
          >
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`${linkClassName(item.href)} block px-4 py-3`}
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
          className="hidden w-full rounded-2xl border border-border/70 bg-surface/70 p-2 backdrop-blur-xl lg:block"
        >
          <ul className="grid min-w-0 grid-flow-col auto-cols-fr items-center">
            <li className="h-12 min-w-0">
              <Link
                href="/"
                aria-label="Charles Cong home"
                className="flex h-12 w-full items-center justify-center rounded-full"
              >
                <MascotMark />
              </Link>
            </li>

            {navigationItems.map((item) => (
              <li key={item.label} className="h-12 min-w-0">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`${linkClassName(item.href)} flex h-12 items-center justify-center truncate px-1 text-center lg:px-2`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
