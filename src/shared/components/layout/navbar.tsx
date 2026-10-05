"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { m, useReducedMotion } from "motion/react";
import { CommandMenu } from "@/shared/components/layout/command-menu";
import { navigationItems } from "@/shared/data/navigation";
import { motionDuration, motionEaseOut } from "@/shared/motion/config";

const controlClassName =
  "flex size-12 shrink-0 touch-manipulation cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 ease-out hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const glassClassName = "rounded-2xl border border-border/70 bg-surface/80 p-2 backdrop-blur-xl";

export function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [linksOverflow, setLinksOverflow] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const menuOpen = menuPath === pathname;
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  const currentItem = navigationItems.find((item) => isActive(item.href));

  // CSS chooses the initial layout; measurement only handles overflowing links.
  useEffect(() => {
    const container = containerRef.current;
    const desktop = desktopRef.current;
    if (!container || !desktop) return;
    const links = desktop.querySelector("ul");
    if (!links) return;
    const updateLayout = () => setLinksOverflow(desktop.scrollWidth > desktop.clientWidth);
    const observer = new ResizeObserver(updateLayout);
    observer.observe(container);
    observer.observe(desktop);
    observer.observe(links);
    updateLayout();
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const toggleCommandMenu = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) return;
      event.preventDefault();
      setMenuPath(null);
      setCommandOpen((current) => !current);
    };
    document.addEventListener("keydown", toggleCommandMenu);
    return () => document.removeEventListener("keydown", toggleCommandMenu);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuPath(null);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setMenuPath(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  const openSearch = () => {
    setMenuPath(null);
    setCommandOpen(true);
  };
  const searchControl = (
    <button
      type="button"
      aria-label="Search pages, projects, and socials. Command or Control K"
      aria-keyshortcuts="Meta+k Control+k"
      className="flex h-12 shrink-0 touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm text-muted-foreground transition-colors duration-200 ease-out hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
      onClick={openSearch}
    >
      <span>Search</span>
      <kbd aria-hidden="true" className="rounded-md border border-border bg-secondary px-2 font-mono text-xs leading-6">⌘K</kbd>
    </button>
  );
  const renderLinks = (compact: boolean) => navigationItems.map((item) => (
    <li key={item.href} className={compact ? "min-w-0" : "min-w-max flex-1"}>
      <Link
        href={item.href}
        aria-current={isActive(item.href) ? "page" : undefined}
        className={`relative flex min-h-12 items-center rounded-full px-6 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none ${
          compact ? "break-words" : "justify-center whitespace-nowrap"
        } ${isActive(item.href) ? "text-primary-foreground" : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"}`}
        onClick={() => setMenuPath(null)}
      >
        {isActive(item.href) && (
          <m.span
            aria-hidden="true"
            layoutId={compact ? "mobile-navigation-active" : "desktop-navigation-active"}
            className="absolute inset-0 rounded-full bg-primary"
            transition={{ duration: reducedMotion ? 0 : motionDuration.fast, ease: motionEaseOut }}
          />
        )}
        <span className="relative">{item.label}</span>
      </Link>
    </li>
  ));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-6 pt-4 lg:px-8 lg:pt-8">
      <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
        <nav
          ref={desktopRef}
          aria-label="Primary navigation"
          aria-hidden={linksOverflow || undefined}
          inert={linksOverflow}
          className={`${glassClassName} invisible absolute left-0 top-0 w-full overflow-hidden ${
            linksOverflow ? "" : "pointer-events-auto md:visible md:relative"
          }`}
        >
          <div className="flex items-center gap-2">
            <ul className="flex min-w-max flex-1 items-center gap-2">{renderLinks(false)}</ul>
            <div className="shrink-0 border-l border-border pl-2">{searchControl}</div>
          </div>
        </nav>
        <div className={`${glassClassName} pointer-events-auto flex items-center justify-between gap-4 ${linksOverflow ? "" : "md:hidden"}`}>
          <span className="min-w-0 truncate px-4 text-sm font-medium">{currentItem?.label ?? "Navigation"}</span>
          <div className="flex shrink-0 items-center gap-2">
            {searchControl}
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`${controlClassName} bg-secondary/80 text-foreground`}
              onClick={() => setMenuPath(menuOpen ? null : pathname)}
            >
              {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className={`${glassClassName} pointer-events-auto absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-8rem)] overflow-y-auto ${linksOverflow ? "" : "md:hidden"}`}
            onBlur={(event) => {
              if (event.relatedTarget instanceof Node && !containerRef.current?.contains(event.relatedTarget)) setMenuPath(null);
            }}
          >
            <ul className="space-y-2">{renderLinks(true)}</ul>
          </nav>
        )}
      </div>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
