'use client';

import { AnimatePresence, m } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';

import { motionDuration, motionEaseOut, motionEaseOutCss } from '@/shared/motion/config';
import { useReducedMotion } from '@/shared/motion/use-reduced-motion';

type ProjectGalleryProps = {
  projectTitle: string;
  images: `/${string}`[];
};

export function ProjectGallery({ projectTitle, images }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openAnimationRef = useRef<Animation | null>(null);
  const closeAnimationRef = useRef<Animation | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  useEffect(
    () => () => {
      openAnimationRef.current?.cancel();
      closeAnimationRef.current?.cancel();
    },
    [],
  );

  const openImage = (index: number) => {
    setSelectedIndex(index);
    const dialog = dialogRef.current;
    if (!dialog) return;

    openAnimationRef.current?.cancel();
    closeAnimationRef.current?.cancel();
    closeAnimationRef.current = null;
    if (!dialog.open) dialog.showModal();

    if (!prefersReducedMotion) {
      openAnimationRef.current = dialog.animate(
        [
          { opacity: 0, transform: 'scale(0.98)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: motionDuration.fast * 1000, easing: motionEaseOutCss },
      );
    }
  };

  const closeImage = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closeAnimationRef.current?.playState === 'running') return;

    openAnimationRef.current?.cancel();
    if (prefersReducedMotion) {
      dialog.close();
      return;
    }

    closeAnimationRef.current?.cancel();
    closeAnimationRef.current = dialog.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.98)' },
      ],
      { duration: motionDuration.fast * 1000, easing: motionEaseOutCss },
    );
    const animation = closeAnimationRef.current;
    animation.finished
      .then(() => {
        if (closeAnimationRef.current === animation) {
          dialog.close();
          closeAnimationRef.current = null;
        }
      })
      .catch(() => undefined);
  };

  const showPreviousImage = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setSelectedIndex((current) => (current + 1) % images.length);
  };

  return (
    <>
      <div className="min-w-0 rounded-2xl border border-border bg-secondary p-4 md:p-6">
        <div className="relative aspect-video min-w-0 overflow-hidden rounded-xl bg-surface">
          <AnimatePresence initial={false} mode="wait">
            {selectedImage && (
              <m.div
                key={`${selectedImage}-${selectedIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: prefersReducedMotion ? 0 : motionDuration.fast, ease: motionEaseOut }}
              >
                <Image
                  src={selectedImage}
                  alt={`${projectTitle} project preview ${selectedIndex + 1}`}
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 80px), 760px"
                  className="object-contain"
                  priority={selectedIndex === 0}
                />
              </m.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => openImage(selectedIndex)}
            aria-label={`Open ${projectTitle} project preview ${selectedIndex + 1}`}
            className="absolute inset-0 z-10 cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="View previous project image"
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-sm transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="View next project image"
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-sm transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-4 flex justify-center" aria-label="Choose a project image">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View project image ${index + 1}`}
                aria-current={selectedIndex === index ? 'true' : undefined}
                className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ease-out ${
                    selectedIndex === index ? 'bg-primary' : 'bg-border'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`${projectTitle} image preview`}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeImage();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeImage();
        }}
        onKeyDown={(event) => {
          if (images.length > 1 && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            event.preventDefault();
            if (event.key === 'ArrowLeft') showPreviousImage();
            else showNextImage();
          }
        }}
        className="project-lightbox m-auto h-[calc(100dvh-48px)] w-[calc(100%-48px)] max-w-content overflow-hidden rounded-2xl border border-border bg-surface p-0"
      >
        <div className="relative h-full w-full bg-background">
          <AnimatePresence initial={false} mode="wait">
            {selectedImage && (
              <m.div
                key={`${selectedImage}-${selectedIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: prefersReducedMotion ? 0 : motionDuration.fast, ease: motionEaseOut }}
              >
                <Image
                  src={selectedImage}
                  alt={`${projectTitle} project preview ${selectedIndex + 1}`}
                  fill
                  sizes="calc(100vw - 48px)"
                  className="object-contain p-4 md:p-8"
                />
              </m.div>
            )}
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="View previous project image"
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-lg transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="View next project image"
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-lg transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
              <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium">
                {selectedIndex + 1} / {images.length}
              </p>
            </>
          )}

          <button
            type="button"
            onClick={closeImage}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-lg transition-colors duration-200 ease-out hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
