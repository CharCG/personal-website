"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { m } from "motion/react";
import { CommandMenu } from "@/shared/components/layout/command-menu";
import { navigationItems } from "@/shared/data/navigation";

const activeIndicatorTransition = { type: "spring", stiffness: 500, damping: 40 } as const;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const toggleCommandMenu = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) return;

      event.preventDefault();
      setCommandOpen((current) => !current);
    };

    document.addEventListener("keydown", toggleCommandMenu);
    return () => document.removeEventListener("keydown", toggleCommandMenu);
  }, []);

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
    `relative rounded-full text-sm transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
      isActive(href) ? "font-medium text-foreground" : "text-muted-foreground"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-4 lg:px-8 lg:pt-8">
      <div className="relative mx-auto w-full max-w-2xl">
        <nav
          aria-label="Primary navigation"
          className="flex h-14 w-full items-center justify-end rounded-2xl border border-border/70 bg-surface/80 px-2 backdrop-blur-xl lg:hidden"
        >
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 touch-manipulation cursor-pointer items-center justify-center rounded-full bg-secondary/80 text-lg transition-colors duration-200 ease-out hover:bg-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
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
              <li>
                <button
                  type="button"
                  className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-full px-4 text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  onClick={() => {
                    setMenuOpen(false);
                    setCommandOpen(true);
                  }}
                >
                  <FaMagnifyingGlass aria-hidden="true" />
                  Search pages, projects, and socials...
                </button>
              </li>
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`${linkClassName(item.href)} flex h-12 items-center px-4`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {isActive(item.href) && (
                      <m.span
                        layoutId="mobile-navigation-active"
                        className="absolute inset-0 rounded-full bg-secondary/80"
                        transition={activeIndicatorTransition}
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
                      transition={activeIndicatorTransition}
                    />
                  )}
                  <span className="relative z-10 truncate">{item.label}</span>
                </Link>
              </li>
            ))}

            <li className="h-12 min-w-0">
              <button
                type="button"
                aria-label="Search pages, projects, and socials. Command or Control K"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-2 text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                onClick={() => setCommandOpen(true)}
              >
                <span className="truncate">Search</span>
                <kbd className="hidden font-mono text-xs xl:inline">⌘K</kbd>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
