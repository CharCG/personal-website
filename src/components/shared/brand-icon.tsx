import type { SimpleIcon } from "simple-icons";

type BrandIconProps = {
  icon: SimpleIcon;
  className?: string;
};

export function BrandIcon({ icon, className }: BrandIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" focusable="false" viewBox="0 0 24 24">
      <path d={icon.path} />
    </svg>
  );
}
