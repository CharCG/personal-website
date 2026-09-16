"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type ProjectGalleryProps = {
  projectTitle: string;
  images: `/${string}`[];
};

export function ProjectGallery({ projectTitle, images }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  const openImage = (index: number) => {
    setSelectedIndex(index);
    dialogRef.current?.showModal();
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
            className="relative aspect-[3/2] min-w-0 cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
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
              className="object-cover"
              priority={index === 0}
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`${projectTitle} image preview`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto h-[calc(100dvh-48px)] w-[calc(100%-48px)] max-w-[1200px] overflow-hidden rounded-2xl border border-border bg-surface p-0 backdrop:bg-foreground/80"
      >
        <div className="relative h-full w-full bg-background">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={`${projectTitle} project preview ${selectedIndex + 1}`}
              fill
              sizes="calc(100vw - 48px)"
              className="object-contain p-4 md:p-8"
            />
          )}

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
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
