'use client';

import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaFile, FaFolderOpen, FaMagnifyingGlass } from 'react-icons/fa6';

import { BrandIcon } from '@/shared/components/brand-icon';
import { contacts } from '@/shared/data/contacts';
import { navigationItems } from '@/shared/data/navigation';
import { projects } from '@/shared/data/projects';

type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const commandItemClassName =
  'flex min-h-12 cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm text-foreground outline-none transition-colors duration-200 ease-out data-[selected=true]:bg-secondary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50';

const commandGroupClassName =
  'py-2 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-muted-foreground';

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();

  const navigate = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const openResume = () => {
    onOpenChange(false);
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const openSocial = (href: string) => {
    onOpenChange(false);

    if (href.startsWith('mailto:')) {
      window.location.assign(href);
      return;
    }

    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search pages, projects, and socials"
      loop
      overlayClassName="command-menu-overlay fixed inset-0 z-[60] bg-foreground/30"
      contentClassName="command-menu-content fixed inset-x-6 top-24 z-[70] mx-auto flex max-h-[calc(100dvh-8rem)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface md:top-32 md:max-h-[calc(100dvh-10rem)] lg:inset-x-8"
    >
      <div className="flex shrink-0 items-center gap-4 border-b border-border px-4">
        <FaMagnifyingGlass aria-hidden="true" className="shrink-0 text-muted-foreground" />
        <Command.Input
          placeholder="Search pages, projects, and socials..."
          className="h-16 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded-lg border border-border bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground sm:inline-flex">
          Esc
        </kbd>
      </div>

      <Command.List className="min-h-0 max-h-96 overflow-y-auto overscroll-contain p-2">
        <Command.Empty className="px-4 py-12 text-center text-sm text-muted-foreground">
          No matching pages or projects.
        </Command.Empty>

        <Command.Group heading="Navigation" className={commandGroupClassName}>
          {navigationItems.map((item) => (
            <Command.Item
              key={item.href}
              value={`page:${item.label}`}
              keywords={[item.label, item.href]}
              onSelect={() => navigate(item.href)}
              className={commandItemClassName}
            >
              <FaArrowRight aria-hidden="true" className="shrink-0 text-muted-foreground" />
              <span className="flex-1">{item.label}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator className="mx-4 h-px bg-border" />

        <Command.Group heading="Projects" className={commandGroupClassName}>
          {projects.map((project) => (
            <Command.Item
              key={project.slug}
              value={`project:${project.slug}`}
              keywords={[project.title, project.role, project.type, ...project.technologies]}
              onSelect={() => navigate(`/projects/${project.slug}`)}
              className={commandItemClassName}
            >
              <FaFolderOpen aria-hidden="true" className="shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{project.title}</span>
                <span className="mt-2 block truncate text-xs text-muted-foreground">{project.role}</span>
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator className="mx-4 h-px bg-border" />

        <Command.Group heading="Socials" className={commandGroupClassName}>
          {contacts.map((contact) => (
            <Command.Item
              key={contact.platform}
              value={`contact:${contact.platform}`}
              keywords={[contact.platform, contact.name, contact.link, 'social', 'contact']}
              onSelect={() => openSocial(contact.link)}
              className={commandItemClassName}
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground">
                <BrandIcon icon={contact.icon} />
              </span>
              <span className="flex-1">{contact.platform}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator className="mx-4 h-px bg-border" />

        <Command.Group heading="Actions" className={commandGroupClassName}>
          <Command.Item
            value="action:resume"
            keywords={['resume', 'cv', 'download']}
            onSelect={openResume}
            className={commandItemClassName}
          >
            <FaFile aria-hidden="true" className="shrink-0 text-muted-foreground" />
            <span className="flex-1">Get Resume</span>
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="flex shrink-0 items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
        <span>Navigate with ↑ ↓</span>
        <span>Select with Enter</span>
      </div>
    </Command.Dialog>
  );
}
