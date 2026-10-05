"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { FaLocationDot } from "react-icons/fa6";

type GlobeColor = [number, number, number];

const jakartaLocation: [number, number] = [-6.2088, 106.8456];

function readThemeColor(name: string, fallback: GlobeColor): GlobeColor {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const match = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(value);

  if (!match) return fallback;

  return [
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ];
}

export function GlobeCard() {
  const globeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = globeContainerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full";
    canvas.setAttribute("aria-hidden", "true");
    container.append(canvas);

    let phi = 2.85;
    let theta = -0.5;
    
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const initialSize = Math.max(container.offsetWidth, 1);

    const globe = createGlobe(canvas, {
      width: initialSize,
      height: initialSize,
      devicePixelRatio,
      phi,
      theta,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: readThemeColor("--muted-foreground", [0.42, 0.45, 0.5]),
      markerColor: readThemeColor("--surface", [1, 1, 1]),
      glowColor: readThemeColor("--secondary", [0.95, 0.96, 0.97]),
      markers: [{ location: jakartaLocation, size: 0.08, id: "indonesia" }],
    });

    const observer = new ResizeObserver(([entry]) => {
      const size = Math.max(Math.round(entry.contentRect.width), 1);
      globe.update({ width: size, height: size });
    });

    let animationFrame = 0;
    let isVisible = false;
    const render = () => {
      animationFrame = 0;
      if (!isVisible || document.hidden) return;
      globe.update({ phi, theta });
      animationFrame = window.requestAnimationFrame(render);
    };
    const requestRender = () => {
      if (!animationFrame && isVisible && !document.hidden) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };
    const updateVisibility = () => {
      if (isVisible && !document.hidden) requestRender();
      else {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      updateVisibility();
    });

    let activePointer: number | null = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartPhi = phi;
    let pointerStartTheta = theta;

    const handlePointerDown = (event: PointerEvent) => {
      activePointer = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerStartPhi = phi;
      pointerStartTheta = theta;
      container.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;

      const size = Math.max(container.offsetWidth, 1);
      phi = pointerStartPhi + ((event.clientX - pointerStartX) / size) * Math.PI;
      theta = Math.min(Math.max(pointerStartTheta + ((event.clientY - pointerStartY) / size) * Math.PI, -1.2), 1.2);
      requestRender();
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      activePointer = null;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const rotationStep = 0.1;

      if (event.key === "ArrowLeft") phi -= rotationStep;
      else if (event.key === "ArrowRight") phi += rotationStep;
      else if (event.key === "ArrowUp") theta = Math.max(theta - rotationStep, -1.2);
      else if (event.key === "ArrowDown") theta = Math.min(theta + rotationStep, 1.2);
      else return;

      event.preventDefault();
      requestRender();
    };

    observer.observe(container);
    visibilityObserver.observe(container);
    document.addEventListener("visibilitychange", updateVisibility);
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerEnd);
    container.addEventListener("pointercancel", handlePointerEnd);
    container.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerEnd);
      container.removeEventListener("pointercancel", handlePointerEnd);
      container.removeEventListener("keydown", handleKeyDown);
      globe.destroy();
      container.replaceChildren();
    };
  }, []);

  return (
    <article className="relative h-full min-h-72 overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Based In</p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-2xl">Jakarta, Indonesia</h2>
        </div>
        <FaLocationDot className="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-0 top-16 mx-auto aspect-square w-full max-w-sm">
        <div
          ref={globeContainerRef}
          className="h-full w-full touch-none cursor-grab rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:cursor-grabbing"
          aria-label="Interactive globe centered on Indonesia. Drag or use the arrow keys to explore."
          role="img"
          tabIndex={0}
        />
        <span className="globe-marker-label pointer-events-none rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold">
          Indonesia
        </span>
      </div>
    </article>
  );
}
