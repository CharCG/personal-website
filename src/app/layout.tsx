import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/shared/motion/motion-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charles — Software Engineer",
  description: "A personal website for Charles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
