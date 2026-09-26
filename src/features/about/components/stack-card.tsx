import { FaLayerGroup } from "react-icons/fa6";
import type { Skill } from "@/shared/data/skills";
import { skills } from "@/shared/data/skills";
import { BrandIcon } from "@/shared/components/brand-icon";
import { Chip } from "@/shared/components/ui/chip";

type MarqueeRowProps = {
  items: Skill[];
  reverse?: boolean;
};

function MarqueeItems({ items, hidden = false }: { items: Skill[]; hidden?: boolean }) {
  return (
    <ul className="stack-marquee-list" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item.name}>
          <Chip
            icon={<BrandIcon icon={item.icon} className="h-5 w-5 shrink-0 text-primary" />}
            size="md"
            className="whitespace-nowrap"
          >
            {item.name}
          </Chip>
        </li>
      ))}
    </ul>
  );
}

function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  return (
    <div className="stack-marquee" role="region" aria-label="Technology stack marquee">
      <div className={`stack-marquee-track${reverse ? " stack-marquee-track-reverse" : ""}`}>
        <MarqueeItems items={items} />
        <MarqueeItems items={items} hidden />
      </div>
    </div>
  );
}

export function StackCard() {
  const midpoint = Math.ceil(skills.length / 2);
  const rows = [skills.slice(0, midpoint), skills.slice(midpoint)];

  return (
    <article className="flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-border bg-surface py-6 md:py-8">
      <div className="flex items-start justify-between gap-4 px-6 md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">On Learning</p>
          <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] md:text-2xl">Skills & Stacks</h2>
        </div>
        <FaLayerGroup className="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
      </div>

      <div className="my-auto space-y-4 py-8">
        <MarqueeRow items={rows[0]} />
        <MarqueeRow items={rows[1]} reverse />
      </div>
    </article>
  );
}
