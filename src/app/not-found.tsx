import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Page Not Found — Charles Cong",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="page-glow flex min-h-screen flex-col overflow-x-clip">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center md:py-32">
        <div className="relative h-32 w-32 md:h-40 md:w-40">
          <Image
            src="/images/mascot-confused.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] md:text-4xl lg:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
          This page doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-14 items-center gap-3 rounded-2xl bg-primary px-8 text-base font-medium text-primary-foreground"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to Home
        </Link>
      </div>

      <Footer />
    </main>
  );
}
