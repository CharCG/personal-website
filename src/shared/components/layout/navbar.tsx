'use client';

import { m } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { FaBars, FaMagnifyingGlass, FaXmark } from 'react-icons/fa6';

import { CommandMenu } from '@/shared/components/layout/command-menu';
import { navigationItems } from '@/shared/data/navigation';
import { motionDuration, motionEaseOut } from '@/shared/motion/config';
import { useReducedMotion } from '@/shared/motion/use-reduced-motion';

const glassClassName = 'border border-border bg-surface/80 backdrop-blur-xl';
const controlClassName =
  'inline-flex min-h-12 shrink-0 touch-manipulation cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none';

function isActivePath(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

type NavigationLinksProps = {
  pathname: string;
  onNavigate: () => void;
  compact?: boolean;
};

function NavigationLinks({ pathname, onNavigate, compact = false }: NavigationLinksProps) {
  const reducedMotion = useReducedMotion();

  return navigationItems.map((item) => {
    const active = isActivePath(pathname, item.href);

    return (
      <li key={item.href} className={compact ? 'min-w-0' : 'shrink-0'}>
        <Link
          href={item.href}
          aria-current={active ? 'page' : undefined}
          onClick={onNavigate}
          className={`relative flex min-h-12 items-center rounded-full px-8 text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none ${
            compact ? 'break-words' : 'justify-center whitespace-nowrap'
          } ${active ? 'text-foreground' : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}`}
        >
          {active && (
            <m.span
              aria-hidden="true"
              layoutId={compact ? 'compact-navigation-active' : 'inline-navigation-active'}
              className="absolute inset-0 rounded-full bg-secondary"
              transition={{ duration: reducedMotion ? 0 : motionDuration.fast, ease: motionEaseOut }}
            />
          )}
          <span className="relative">{item.label}</span>
        </Link>
      </li>
    );
  });
}

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const availableSpaceRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [linksOverflow, setLinksOverflow] = useState(false);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const menuOpen = menuPath === pathname;

  useEffect(() => {
    const availableSpace = availableSpaceRef.current;
    const desktop = desktopRef.current;
    const links = desktop?.querySelector('ul');
    if (!availableSpace || !desktop || !links) return;

    const updateLayout = () => {
      const requiredWidth = desktop.scrollWidth - desktop.clientWidth + desktop.getBoundingClientRect().width;
      setLinksOverflow(Math.ceil(requiredWidth) > availableSpace.clientWidth);
    };
    const observer = new ResizeObserver(updateLayout);
    observer.observe(availableSpace);
    observer.observe(desktop);
    observer.observe(links);
    updateLayout();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const toggleCommandMenu = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || (!event.metaKey && !event.ctrlKey)) return;
      event.preventDefault();
      setMenuPath(null);
      setCommandOpen((current) => !current);
    };

    document.addEventListener('keydown', toggleCommandMenu);
    return () => document.removeEventListener('keydown', toggleCommandMenu);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuPath(null);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setMenuPath(null);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [menuOpen]);

  const closeNavigation = () => setMenuPath(null);
  const openSearch = () => {
    closeNavigation();
    setCommandOpen(true);
  };
  const searchControl = (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search pages, projects, and socials. Command or Control K"
      aria-keyshortcuts="Meta+k Control+k"
      className={`${controlClassName} w-12 bg-secondary/80 px-4 text-muted-foreground hover:bg-secondary hover:text-foreground sm:w-48`}
    >
      <FaMagnifyingGlass aria-hidden="true" className="size-4 shrink-0" />
      <span className="hidden font-normal sm:inline">Search...</span>
      <kbd
        aria-hidden="true"
        className="ml-auto hidden rounded-md bg-surface px-2 font-mono text-xs leading-6 sm:inline-flex"
      >
        ⌘ K
      </kbd>
    </button>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-6 pt-4 lg:px-8 lg:pt-8">
      <div ref={availableSpaceRef} className="mx-auto flex w-full max-w-4xl justify-center">
        <div
          ref={containerRef}
          className="relative w-full max-w-full"
          onBlur={(event) => {
            if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
              closeNavigation();
            }
          }}
        >
          <nav
            ref={desktopRef}
            aria-label="Primary navigation"
            aria-hidden={linksOverflow || undefined}
            inert={linksOverflow}
            className={`${glassClassName} invisible absolute left-0 top-0 inline-flex w-full items-center gap-4 overflow-hidden rounded-full px-4 py-2 ${
              linksOverflow ? '' : 'pointer-events-auto md:visible md:relative'
            }`}
          >
            <ul className="flex min-w-max flex-1 items-center justify-start gap-2">
              <NavigationLinks pathname={pathname} onNavigate={closeNavigation} />
            </ul>
            {searchControl}
          </nav>

          <div
            className={`${glassClassName} pointer-events-auto flex items-center justify-between gap-2 rounded-full p-2 ${linksOverflow ? '' : 'md:hidden'}`}
          >
            {searchControl}
            {navigationItems.length > 0 && (
              <button
                ref={menuButtonRef}
                type="button"
                aria-controls={menuId}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className={`${controlClassName} size-12 bg-secondary/80 text-foreground hover:bg-secondary`}
                onClick={() => setMenuPath(menuOpen ? null : pathname)}
              >
                {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
              </button>
            )}
          </div>

          {menuOpen && (
            <nav
              id={menuId}
              aria-label="Navigation menu"
              className={`${glassClassName} pointer-events-auto absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl p-4 ${linksOverflow ? '' : 'md:hidden'}`}
            >
              <ul className="mt-2 space-y-2">
                <NavigationLinks pathname={pathname} onNavigate={closeNavigation} compact />
              </ul>
            </nav>
          )}
        </div>
      </div>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
