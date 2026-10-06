'use client';

import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { BrandIcon } from '@/shared/components/brand-icon';
import { skillCategories, type SkillCategory } from '@/shared/data/skills';
import { motionStagger } from '@/shared/motion/config';
import { Reveal } from '@/shared/motion/reveal';
import { useReducedMotion } from '@/shared/motion/use-reduced-motion';

type CategoryListProps = {
  activeCategoryId: SkillCategory['id'];
  repeated?: boolean;
  onSelect: (id: SkillCategory['id']) => void;
};

const AUTO_ROTATE_MS = 10000;

function CategoryList({ activeCategoryId, repeated = false, onSelect }: CategoryListProps) {
  return (
    <div
      className={`skills-category-list ${repeated ? 'skills-category-list-repeat' : ''}`}
      aria-hidden={repeated || undefined}
    >
      {skillCategories.map((category) => {
        const active = category.id === activeCategoryId;

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={active}
            tabIndex={repeated ? -1 : undefined}
            className={`skills-category-item cursor-pointer text-lg transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground md:text-xl ${
              active
                ? 'bg-primary font-semibold text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onSelect(category.id)}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<SkillCategory['id']>(skillCategories[0]?.id ?? '');
  const isInView = useInView(sectionRef);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isPageVisible, setIsPageVisible] = useState(true);
  const activeCategory = skillCategories.find((category) => category.id === activeCategoryId) ?? skillCategories[0];
  const isPaused = isPointerOver || isFocusWithin;
  const isAutoRotating = isInView && isPageVisible && !isPaused && !prefersReducedMotion && skillCategories.length > 1;

  useEffect(() => {
    const updatePageVisibility = () => setIsPageVisible(!document.hidden);

    updatePageVisibility();
    document.addEventListener('visibilitychange', updatePageVisibility);

    return () => {
      document.removeEventListener('visibilitychange', updatePageVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isAutoRotating) return;

    const timer = window.setTimeout(() => {
      const currentIndex = skillCategories.findIndex((category) => category.id === activeCategoryId);
      setActiveCategoryId(skillCategories[(currentIndex + 1) % skillCategories.length].id);
    }, AUTO_ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [activeCategoryId, isAutoRotating]);

  const setMarqueeSpeed = (rate: number) => {
    trackRef.current?.getAnimations().forEach((animation) => animation.updatePlaybackRate(rate));
  };

  if (!activeCategory) return null;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mx-auto max-w-content px-6 pt-12 md:px-6 md:pt-16 lg:px-8 lg:pt-20"
    >
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Skills</p>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] md:text-heading-sm lg:text-4xl">
          Tools I <span className="font-accent font-normal tracking-normal">Work</span> With
        </h2>
        <p className="mt-2 text-base text-muted-foreground md:text-lg">
          Technologies, tools, and platforms I use to build and ship products.
        </p>
      </Reveal>

      <Reveal className="mt-8" delay={motionStagger}>
        <div
          onPointerEnter={(event) => {
            if (event.pointerType !== 'touch') setIsPointerOver(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType !== 'touch') setIsPointerOver(false);
          }}
          onFocusCapture={() => setIsFocusWithin(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsFocusWithin(false);
          }}
        >
          <div
            className="skills-category-marquee select-none border-y border-border"
            aria-label="Skill categories"
            onPointerEnter={(event) => {
              if (event.pointerType !== 'touch') setMarqueeSpeed(0.2);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== 'touch') setMarqueeSpeed(1);
            }}
          >
            <div ref={trackRef} className="skills-category-track">
              <CategoryList activeCategoryId={activeCategoryId} onSelect={setActiveCategoryId} />
              <CategoryList activeCategoryId={activeCategoryId} onSelect={setActiveCategoryId} repeated />
            </div>
          </div>

          <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-6 text-center md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Currently viewing</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] md:text-heading-sm lg:text-4xl">
              {activeCategory.label}
            </h3>
            {activeCategory.description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {activeCategory.description}
              </p>
            )}
            <ul
              className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8"
              aria-label={`${activeCategory.label} technologies`}
            >
              {activeCategory.skills.map((skill) => (
                <li key={skill.name} className="flex w-20 flex-col items-center gap-2 text-center">
                  <BrandIcon icon={skill.icon} className="h-8 w-8 text-primary" />
                  <span className="text-xs text-muted-foreground">{skill.name}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex self-end flex-col items-end gap-2 text-xs text-muted-foreground">
              <span>
                {prefersReducedMotion || skillCategories.length <= 1
                  ? 'Manual viewing'
                  : isAutoRotating
                    ? 'Auto-rotating'
                    : 'Paused'}
              </span>
              <span className="h-1 w-24 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                <span
                  key={`${activeCategoryId}-${isAutoRotating}`}
                  className="skills-auto-rotate-progress block h-full w-full rounded-full bg-primary"
                  style={{
                    animationDuration: `${AUTO_ROTATE_MS}ms`,
                    animationPlayState: isAutoRotating ? 'running' : 'paused',
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
