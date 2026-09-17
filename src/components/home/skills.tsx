import StackIcon from "tech-stack-icons";
import { Reveal } from "@/components/motion/reveal";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1200px] px-6 pt-8 md:px-6 md:pt-10 lg:px-8 lg:pt-12"
    >
      <div aria-hidden="true" className="border-t border-border" />

      <Reveal>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground md:mt-10 lg:mt-12">
          Skills
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-[28px] lg:text-4xl">
          Tools I Work With
        </h2>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          Technologies, tools, and platforms I use to build and ship products.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-3 md:grid-cols-4 md:p-6 lg:grid-cols-6">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="flex min-w-0 items-center justify-start gap-3 rounded-full bg-secondary px-3 py-3 text-sm"
            >
              <StackIcon name={skill.icon} className="h-5 w-5 shrink-0" />
              <span className="truncate">{skill.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
