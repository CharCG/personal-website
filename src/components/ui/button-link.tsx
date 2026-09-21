import type { ComponentProps } from "react";
import Link from "next/link";

const variantClassNames = {
  primary: "bg-primary text-primary-foreground hover:opacity-85",
  secondary: "border border-border bg-surface text-foreground hover:border-foreground/20",
  inverted: "bg-surface text-foreground hover:opacity-85",
} as const;

const sizeClassNames = {
  sm: "h-14 gap-3 px-6 text-sm",
  md: "h-14 gap-4 px-6 text-base",
  lg: "h-16 gap-4 px-8 text-base",
} as const;

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: keyof typeof variantClassNames;
  size?: keyof typeof sizeClassNames;
  className?: string;
};

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={[
        "group inline-flex items-center justify-center rounded-2xl font-medium transition-[border-color,opacity,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-safe:active:scale-[0.99]",
        variantClassNames[variant],
        sizeClassNames[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
