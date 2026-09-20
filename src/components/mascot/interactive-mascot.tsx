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
  const mascotRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const eyeGraphics = mascot.querySelectorAll<HTMLElement>(".interactive-mascot-eye-graphic");
    const patLayer = mascot.querySelector<HTMLElement>(".interactive-mascot-pat");
    let animationFrame = 0;
    let previousFrameTime = 0;
    let nextBlinkTimer = 0;
    let secondBlinkTimer = 0;
    let idleTimer = 0;
    let lastActivityTime = performance.now();
    let isSleeping = false;
    let blinkAnimations: Animation[] = [];
    let patAnimation: Animation | null = null;
    const idleDelay = 10_000;

    const motion = {
      eyeX: 0,
      eyeY: 0,
      eyeVelocityX: 0,
      eyeVelocityY: 0,
      bodyX: 0,
      bodyY: 0,
      bodyRotation: 0,
      bodyVelocityX: 0,
      bodyVelocityY: 0,
      bodyRotationVelocity: 0,
      targetEyeX: 0,
      targetEyeY: 0,
      targetBodyX: 0,
      targetBodyY: 0,
      targetBodyRotation: 0,
    };

    const setMascotMotion = () => {
      mascot.style.setProperty("--mascot-eye-x", `${motion.eyeX.toFixed(2)}px`);
      mascot.style.setProperty("--mascot-eye-y", `${motion.eyeY.toFixed(2)}px`);
      mascot.style.setProperty("--mascot-body-x", `${motion.bodyX.toFixed(2)}px`);
      mascot.style.setProperty("--mascot-body-y", `${motion.bodyY.toFixed(2)}px`);
      mascot.style.setProperty(
        "--mascot-body-rotation",
        `${motion.bodyRotation.toFixed(2)}deg`,
      );
    };

    const stepSpring = (
      position: number,
      velocity: number,
      target: number,
      stiffness: number,
      damping: number,
      deltaTime: number,
    ) => {
      const acceleration = (target - position) * stiffness - velocity * damping;
      const nextVelocity = velocity + acceleration * deltaTime;

      return {
        position: position + nextVelocity * deltaTime,
        velocity: nextVelocity,
      };
    };

    const isSettled = () =>
      Math.abs(motion.targetEyeX - motion.eyeX) < 0.02 &&
      Math.abs(motion.targetEyeY - motion.eyeY) < 0.02 &&
      Math.abs(motion.eyeVelocityX) < 0.02 &&
      Math.abs(motion.eyeVelocityY) < 0.02 &&
      Math.abs(motion.targetBodyX - motion.bodyX) < 0.02 &&
      Math.abs(motion.targetBodyY - motion.bodyY) < 0.02 &&
      Math.abs(motion.targetBodyRotation - motion.bodyRotation) < 0.02 &&
      Math.abs(motion.bodyVelocityX) < 0.02 &&
      Math.abs(motion.bodyVelocityY) < 0.02 &&
      Math.abs(motion.bodyRotationVelocity) < 0.02;

    const animateMotion = (time: number) => {
      const deltaTime = previousFrameTime
        ? Math.min((time - previousFrameTime) / 1000, 0.032)
        : 1 / 60;
      previousFrameTime = time;

      const eyeX = stepSpring(
        motion.eyeX,
        motion.eyeVelocityX,
        motion.targetEyeX,
        130,
        16,
        deltaTime,
      );
      const eyeY = stepSpring(
        motion.eyeY,
        motion.eyeVelocityY,
        motion.targetEyeY,
        130,
        16,
        deltaTime,
      );
      const bodyX = stepSpring(
        motion.bodyX,
        motion.bodyVelocityX,
        motion.targetBodyX,
        72,
        13,
        deltaTime,
      );
      const bodyY = stepSpring(
        motion.bodyY,
        motion.bodyVelocityY,
        motion.targetBodyY,
        72,
        13,
        deltaTime,
      );
      const bodyRotation = stepSpring(
        motion.bodyRotation,
        motion.bodyRotationVelocity,
        motion.targetBodyRotation,
        64,
        12,
        deltaTime,
      );

      motion.eyeX = eyeX.position;
      motion.eyeY = eyeY.position;
      motion.eyeVelocityX = eyeX.velocity;
      motion.eyeVelocityY = eyeY.velocity;
      motion.bodyX = bodyX.position;
      motion.bodyY = bodyY.position;
      motion.bodyVelocityX = bodyX.velocity;
      motion.bodyVelocityY = bodyY.velocity;
      motion.bodyRotation = bodyRotation.position;
      motion.bodyRotationVelocity = bodyRotation.velocity;
      setMascotMotion();

      if (!isSettled()) {
        animationFrame = requestAnimationFrame(animateMotion);
      } else {
        animationFrame = 0;
        previousFrameTime = 0;
      }
    };

    const startMotion = () => {
      if (!animationFrame && !reducedMotion.matches) {
        animationFrame = requestAnimationFrame(animateMotion);
      }
    };

    const resetMascot = () => {
      motion.targetEyeX = 0;
      motion.targetEyeY = 0;
      motion.targetBodyX = 0;
      motion.targetBodyY = 0;
      motion.targetBodyRotation = 0;
      startMotion();
    };

    const followPointer = (event: PointerEvent) => {
      recordActivity();
      if (event.pointerType !== "mouse" || reducedMotion.matches) return;

      const bounds = mascot.getBoundingClientRect();
      const deltaX = event.clientX - (bounds.left + bounds.width / 2);
      const deltaY = event.clientY - (bounds.top + bounds.height / 2);
      const distance = Math.hypot(deltaX, deltaY);
      const strength = Math.min(distance / Math.max(bounds.width * 0.55, 120), 1);
      const directionX = distance ? deltaX / distance : 0;
      const directionY = distance ? deltaY / distance : 0;

      motion.targetEyeX = directionX * strength * bounds.width * 0.052;
      motion.targetEyeY = directionY * strength * bounds.width * 0.032;
      motion.targetBodyX = directionX * strength * bounds.width * 0.01;
      motion.targetBodyY = directionY * strength * bounds.width * 0.006;
      motion.targetBodyRotation = directionX * strength * 2.4;
      startMotion();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) resetMascot();
    };

    const handlePat = () => {
      recordActivity();
      if (!patLayer || reducedMotion.matches) return;

      blink();
      patAnimation?.cancel();
      patAnimation = patLayer.animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: "translateY(5px) scaleX(1.025) scaleY(0.95)", offset: 0.32 },
          { transform: "translateY(-2px) scaleX(0.99) scaleY(1.015)", offset: 0.7 },
          { transform: "translateY(0) scale(1)" },
        ],
        { duration: 420, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
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

    const enterSleep = () => {
      idleTimer = 0;
      if (reducedMotion.matches || isSleeping) return;

      isSleeping = true;
      mascot.dataset.sleeping = "true";
      stopBlinking();
      resetMascot();
    };

    const checkIdle = () => {
      idleTimer = 0;
      const remainingTime = idleDelay - (performance.now() - lastActivityTime);

      if (remainingTime <= 0) {
        enterSleep();
      } else {
        idleTimer = window.setTimeout(checkIdle, remainingTime);
      }
    };

    const scheduleIdleCheck = () => {
      if (!idleTimer && !reducedMotion.matches && !isSleeping) {
        idleTimer = window.setTimeout(checkIdle, idleDelay);
      }
    };

    function recordActivity() {
      lastActivityTime = performance.now();

      if (isSleeping) {
        isSleeping = false;
        mascot?.removeAttribute("data-sleeping");
        scheduleNextBlink();
      }

      scheduleIdleCheck();
    }

    const handleMotionPreference = () => {
      stopBlinking();
      window.clearTimeout(idleTimer);
      idleTimer = 0;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      previousFrameTime = 0;

      if (reducedMotion.matches) {
        isSleeping = false;
        delete mascot.dataset.sleeping;
        Object.assign(motion, {
          eyeX: 0,
          eyeY: 0,
          eyeVelocityX: 0,
          eyeVelocityY: 0,
          bodyX: 0,
          bodyY: 0,
          bodyRotation: 0,
          bodyVelocityX: 0,
          bodyVelocityY: 0,
          bodyRotationVelocity: 0,
          targetEyeX: 0,
          targetEyeY: 0,
          targetBodyX: 0,
          targetBodyY: 0,
          targetBodyRotation: 0,
        });
        setMascotMotion();
      } else {
        lastActivityTime = performance.now();
        scheduleNextBlink();
        scheduleIdleCheck();
      }
    };

    scheduleNextBlink();
    scheduleIdleCheck();
    window.addEventListener("pointermove", followPointer, { passive: true });
    window.addEventListener("pointerdown", recordActivity, { passive: true });
    window.addEventListener("keydown", recordActivity);
    window.addEventListener("scroll", recordActivity, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", resetMascot);
    mascot.addEventListener("click", handlePat);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      cancelAnimationFrame(animationFrame);
      patAnimation?.cancel();
      stopBlinking();
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("pointerdown", recordActivity);
      window.removeEventListener("keydown", recordActivity);
      window.removeEventListener("scroll", recordActivity);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", resetMascot);
      mascot.removeEventListener("click", handlePat);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <button
      type="button"
      ref={mascotRef}
      className={`interactive-mascot relative cursor-pointer touch-manipulation appearance-none border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${className}`}
      aria-label="Pat the mascot"
    >
      <span className="interactive-mascot-sleep-indicator" aria-hidden="true">
        <span>Z</span>
        <span>z</span>
        <span>z</span>
      </span>

      <span className="interactive-mascot-pat">
        <span className="interactive-mascot-breath">
          <span className="interactive-mascot-character">
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
          </span>
        </span>
      </span>
    </button>
  );
}
