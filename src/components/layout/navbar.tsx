"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { m } from "motion/react";
import { navigationItems } from "@/data/navigation";

function MascotMark({ celebrating }: { celebrating: boolean }) {
  return (
    <span className={`navbar-mascot-mark ${celebrating ? "navbar-mascot-celebrating" : ""}`}>
      <Image
        src="/images/mascot/fallbacks/logo.png"
        alt=""
        width={20}
        height={20}
        className="h-auto w-auto object-contain"
        priority
      />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [easterEggVisible, setEasterEggVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mascot-easter-egg-pending") !== "true") return;

    sessionStorage.removeItem("mascot-easter-egg-pending");
    const timeout = window.setTimeout(() => setEasterEggVisible(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!easterEggVisible) return;

    const timeout = window.setTimeout(() => setEasterEggVisible(false), 3200);
    return () => window.clearTimeout(timeout);
  }, [easterEggVisible]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const linkClassName = (href: string) =>
    `relative rounded-full text-sm transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
      isActive(href) ? "font-medium text-foreground" : "text-muted-foreground"
    }`;

  const handleMascotClick = () => {
    setMenuOpen(false);

    const currentCount = Number(sessionStorage.getItem("mascot-click-count")) || 0;
    const nextCount = currentCount + 1;

    if (nextCount < 8) {
      sessionStorage.setItem("mascot-click-count", String(nextCount));
      return;
    }

    sessionStorage.removeItem("mascot-click-count");

    if (pathname === "/") {
      setEasterEggVisible(true);
    } else {
      sessionStorage.setItem("mascot-easter-egg-pending", "true");
    }
  };

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
            className="navbar-mascot-link relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            onClick={handleMascotClick}
          >
            <MascotMark celebrating={easterEggVisible} />
            {easterEggVisible && (
              <span
                role="status"
                className="navbar-mascot-message pointer-events-none absolute left-0 top-full mt-4 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground"
              >
                You found me!
              </span>
            )}
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
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`${linkClassName(item.href)} block px-4 py-3`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {isActive(item.href) && (
                      <m.span
                        layoutId="mobile-navigation-active"
                        className="absolute inset-0 rounded-full bg-secondary/80"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
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
                className="navbar-mascot-link relative flex h-12 w-full items-center justify-center rounded-full"
                onClick={handleMascotClick}
              >
                <MascotMark celebrating={easterEggVisible} />
                {easterEggVisible && (
                  <span
                    role="status"
                    className="navbar-mascot-message pointer-events-none absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground"
                  >
                    You found me!
                  </span>
                )}
              </Link>
            </li>

            {navigationItems.map((item) => (
              <li key={item.label} className="h-12 min-w-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`${linkClassName(item.href)} flex h-12 items-center justify-center truncate px-1 text-center lg:px-2`}
                >
                  {isActive(item.href) && (
                    <m.span
                      layoutId="desktop-navigation-active"
                      className="absolute inset-0 rounded-full bg-secondary/80"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative z-10 truncate">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
