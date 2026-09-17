"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";

type ProjectGalleryProps = {
  projectTitle: string;
  images: `/${string}`[];
};

export function ProjectGallery({ projectTitle, images }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeAnimationRef = useRef<Animation | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  const openImage = (index: number) => {
    setSelectedIndex(index);
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.animate(
        [
          { opacity: 0, transform: "scale(0.98)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 200, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }
  };

  const closeImage = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }

    closeAnimationRef.current?.cancel();
    closeAnimationRef.current = dialog.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.98)" },
      ],
      { duration: 160, easing: "ease-in" },
    );
    closeAnimationRef.current.finished.then(() => dialog.close()).catch(() => undefined);
  };

  const showPreviousImage = () => {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setSelectedIndex((current) => (current + 1) % images.length);
  };

  return (
    <>
      <div className={`grid min-w-0 gap-4 ${images.length > 1 ? "md:grid-cols-2" : ""}`}>
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => openImage(index)}
            aria-label={`Open ${projectTitle} project preview ${index + 1}`}
            className="group relative aspect-[3/2] min-w-0 cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <Image
              src={image}
              alt={`${projectTitle} project preview ${index + 1}`}
              fill
              sizes={
                images.length > 1
                  ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) 50vw, 400px"
                  : "(max-width: 1199px) calc(100vw - 48px), 800px"
              }
              className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.02]"
              priority={index === 0}
            />
          </button>
        ))}
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
          if (event.key === "ArrowLeft" && images.length > 1) showPreviousImage();
          if (event.key === "ArrowRight" && images.length > 1) showNextImage();
        }}
        className="project-lightbox m-auto h-[calc(100dvh-48px)] w-[calc(100%-48px)] max-w-[1200px] overflow-hidden rounded-2xl border border-border bg-surface p-0"
      >
        <div className="relative h-full w-full bg-background">
          <AnimatePresence initial={false} mode="wait">
            {selectedImage && (
              <m.div
                key={selectedImage}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-lg transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="View next project image"
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-lg transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
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
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
