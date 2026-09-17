"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type InteractiveMascotProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function InteractiveMascot({
  className = "",
  priority = false,
  sizes = "256px",
}: InteractiveMascotProps) {
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const eyeGraphics = mascot.querySelectorAll<HTMLElement>(".interactive-mascot-eye-graphic");
    let animationFrame = 0;
    let nextBlinkTimer = 0;
    let secondBlinkTimer = 0;
    let blinkAnimations: Animation[] = [];

    const resetEyes = () => {
      mascot.style.setProperty("--mascot-eye-x", "0px");
      mascot.style.setProperty("--mascot-eye-y", "0px");
    };

    const followPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion.matches) return;

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const bounds = mascot.getBoundingClientRect();
        const deltaX = event.clientX - (bounds.left + bounds.width / 2);
        const deltaY = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(deltaX, deltaY);
        const strength = Math.min(distance / 140, 1);
        const directionX = distance ? deltaX / distance : 0;
        const directionY = distance ? deltaY / distance : 0;

        mascot.style.setProperty(
          "--mascot-eye-x",
          `${directionX * strength * bounds.width * 0.032}px`,
        );
        mascot.style.setProperty(
          "--mascot-eye-y",
          `${directionY * strength * bounds.width * 0.02}px`,
        );
      });
    };

    const blink = () => {
      blinkAnimations = Array.from(eyeGraphics, (eye) =>
        eye.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0.08)", offset: 0.45 },
            { transform: "scaleY(1)" },
          ],
          { duration: 180, easing: "ease-in-out" },
        ),
      );
    };

    const scheduleNextBlink = () => {
      if (reducedMotion.matches) return;

      const delay = 2600 + Math.random() * 4000;
      nextBlinkTimer = window.setTimeout(() => {
        blink();

        if (Math.random() < 0.35) {
          secondBlinkTimer = window.setTimeout(() => {
            blink();
            scheduleNextBlink();
          }, 260);
        } else {
          scheduleNextBlink();
        }
      }, delay);
    };

    const stopBlinking = () => {
      window.clearTimeout(nextBlinkTimer);
      window.clearTimeout(secondBlinkTimer);
      blinkAnimations.forEach((animation) => animation.cancel());
      blinkAnimations = [];
    };

    const handleMotionPreference = () => {
      stopBlinking();
      resetEyes();
      if (!reducedMotion.matches) scheduleNextBlink();
    };

    scheduleNextBlink();
    window.addEventListener("pointermove", followPointer, { passive: true });
    window.addEventListener("blur", resetEyes);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      cancelAnimationFrame(animationFrame);
      stopBlinking();
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("blur", resetEyes);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div
      ref={mascotRef}
      className={`interactive-mascot relative ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/images/mascot/parts/body.svg"
        alt=""
        fill
        priority={priority}
        sizes={sizes}
      />

      <span className="interactive-mascot-eye interactive-mascot-eye-left">
        <span className="interactive-mascot-eye-graphic">
          <Image src="/images/mascot/parts/left-eye.svg" alt="" fill sizes="50px" />
        </span>
      </span>

      <span className="interactive-mascot-eye interactive-mascot-eye-right">
        <span className="interactive-mascot-eye-graphic">
          <Image src="/images/mascot/parts/right-eye.svg" alt="" fill sizes="50px" />
        </span>
      </span>
    </div>
  );
}
