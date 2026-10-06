import type { Project } from '@/shared/data/projects';
import { Reveal } from '@/shared/motion/reveal';

type ProjectContentProps = Pick<Project, 'about' | 'keyFeatures'>;

export function ProjectContent({ about, keyFeatures }: ProjectContentProps) {
  const hasAbout = about.trim().length > 0;
  const features = keyFeatures.filter((feature) => feature.trim().length > 0);
  if (!hasAbout && features.length === 0) return null;

  return (
    <Reveal className="mt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {hasAbout && (
            <section aria-labelledby="about-project">
              <h2 id="about-project" className="text-2xl font-semibold tracking-[-0.03em]">
                About
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{about}</p>
            </section>
          )}

          {features.length > 0 && (
            <section className={hasAbout ? 'mt-8' : ''} aria-labelledby="key-features">
              <h2 id="key-features" className="text-2xl font-semibold tracking-[-0.03em]">
                Key Features
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 rounded-xl bg-secondary p-4 text-base leading-relaxed"
                  >
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Reveal>
  );
}
