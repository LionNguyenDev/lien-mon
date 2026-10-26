import type { IconSvgProps } from '@/types';

function Svg({ size = 20, children, ...props }: IconSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  check: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M20 6 9 17l-5-5' />
    </Svg>
  ),
  chevronDown: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='m6 9 6 6 6-6' />
    </Svg>
  ),
  arrowRight: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M5 12h14M13 6l6 6-6 6' />
    </Svg>
  ),
  arrowLeft: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M19 12H5M11 18l-6-6 6-6' />
    </Svg>
  ),
  map: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z' />
      <path d='M9 4v14M15 6v14' />
    </Svg>
  ),
  download: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M12 3v12M7 10l5 5 5-5M5 21h14' />
    </Svg>
  ),
  rotate: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M3 12a9 9 0 1 0 3-6.7L3 8' />
      <path d='M3 3v5h5' />
    </Svg>
  ),
  flag: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M5 21V4M5 4h11l-2 4 2 4H5' />
    </Svg>
  ),
  compass: (props: IconSvgProps) => (
    <Svg {...props}>
      <circle cx='12' cy='12' r='9' />
      <path d='m15.5 8.5-2 5-5 2 2-5 5-2Z' />
    </Svg>
  ),
  book: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z' />
      <path d='M4 19a2 2 0 0 1 2-2h13' />
    </Svg>
  ),
  award: (props: IconSvgProps) => (
    <Svg {...props}>
      <circle cx='12' cy='9' r='6' />
      <path d='m8.5 14-1.5 7 5-3 5 3-1.5-7' />
    </Svg>
  ),
  alert: (props: IconSvgProps) => (
    <Svg {...props}>
      <circle cx='12' cy='12' r='9' />
      <path d='M12 8v5M12 16.5v.01' />
    </Svg>
  ),
  play: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M7 4.5v15l12-7.5-12-7.5Z' fill='currentColor' />
    </Svg>
  ),
  pause: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M8 5v14M16 5v14' strokeWidth={3} />
    </Svg>
  ),
  close: (props: IconSvgProps) => (
    <Svg {...props}>
      <path d='M18 6 6 18M6 6l12 12' />
    </Svg>
  ),
};
