"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { motionDuration, motionEaseOut } from "@/components/motion/config";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: motionDuration.reveal, delay, ease: motionEaseOut }}
    >
      {children}
    </m.div>
  );
}
