"use client";

// Adapted from React Bits SplitText; semantic headings remain in their pages.
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { motionDuration, motionEaseOut, motionStagger } from "@/shared/motion/config";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger, GSAPSplitText);
const revealEase = CustomEase.create("portfolio-reveal", motionEaseOut.join(","));

type SplitTextProps = {
  children: ReactNode;
  splitType?: "words" | "chars";
};

export function SplitText({ children, splitType = "words" }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const element = ref.current;
    if (!element) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const split = GSAPSplitText.create(element, {
        tag: "span",
        type: splitType,
        smartWrap: true,
        autoSplit: true,
        onSplit: (self) => gsap.fromTo(
          splitType === "chars" ? self.chars : self.words,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: motionDuration.reveal,
            ease: revealEase,
            stagger: motionStagger / 2,
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          },
        ),
      });

      return () => split.revert();
    });

    return () => media.revert();
  }, { scope: ref, dependencies: [splitType], revertOnUpdate: true });

  return <span ref={ref} className="block">{children}</span>;
}
