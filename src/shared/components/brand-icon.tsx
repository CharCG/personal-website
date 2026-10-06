import type { IconType } from 'react-icons';
import type { SimpleIcon } from 'simple-icons';

type BrandIconProps = {
  icon: IconType | SimpleIcon;
  className?: string;
};

export function BrandIcon({ icon, className }: BrandIconProps) {
  if (typeof icon === 'function') {
    const ReactIcon = icon;
    return <ReactIcon aria-hidden="true" className={className} />;
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path d={icon.path} />
    </svg>
  );
}
