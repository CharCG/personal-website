"use client";

// Adapted from React Bits CountUp to use the portfolio's motion and typography.
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { motionDuration } from "@/shared/motion/config";

type CountUpProps = {
  to: number;
  className?: string;
};

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function CountUp({ to, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: motionDuration.reveal * 1000, bounce: 0 });
  const formattedValue = numberFormatter.format(to);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView) return;

    if (reducedMotion) {
      motionValue.jump(to);
      springValue.jump(to);
      element.textContent = formattedValue;
      return;
    }

    element.textContent = numberFormatter.format(springValue.get());
    const unsubscribe = springValue.on("change", (value) => {
      element.textContent = numberFormatter.format(value);
    });
    motionValue.set(to);

    return () => {
      unsubscribe();
      springValue.stop();
    };
  }, [to, formattedValue, isInView, reducedMotion, motionValue, springValue]);

  return (
    <span className={className}>
      <span className="sr-only">{formattedValue}</span>
      <span ref={ref} aria-hidden="true">
        {formattedValue}
      </span>
    </span>
  );
}
