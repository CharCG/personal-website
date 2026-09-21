import type { Metadata } from "next";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Page Not Found — Charles",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="page-glow flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center md:py-32 lg:px-8">
        <div className="relative h-32 w-32 md:h-40 md:w-40">
          <Image src="/images/mascot/fallbacks/confused-rays.png" alt="" fill className="object-contain" priority />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] md:text-4xl lg:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
          This page doesn’t exist or may have been moved. Let’s get you back on track.
        </p>

        <ButtonLink href="/" className="mt-8">
          <FaArrowLeft aria-hidden="true" />
          Back to Home
        </ButtonLink>
      </main>

      <Footer />
    </div>
  );
}
