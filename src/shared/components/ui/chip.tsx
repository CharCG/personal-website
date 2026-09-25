import type { HTMLAttributes, ReactNode } from "react";

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  icon?: ReactNode;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-4 py-2 text-sm",
} as const;

export function Chip({ children, className = "", icon, size = "sm", ...props }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-secondary text-foreground ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon}
      <span className="truncate">{children}</span>
    </span>
  );
}
