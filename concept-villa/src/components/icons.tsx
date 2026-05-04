/**
 * Vintage-etching-style line-art icons.
 * All inherit `currentColor` so they pick up the surrounding cream/gold.
 */
type IconProps = { size?: number; className?: string };

const baseProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 32 32',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 0.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function RingsIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <circle cx="11" cy="20" r="6.5" />
      <circle cx="21" cy="20" r="6.5" />
      <path d="M11 13.5 L9 8 L13 8 Z" />
      <path d="M21 13.5 L19 8 L23 8 Z" />
    </svg>
  );
}

export function FlutesIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <path d="M11 5 C 9 11, 9 14, 12 16 L 12 26" />
      <path d="M9 5 L15 5" />
      <line x1="9" y1="26" x2="15" y2="26" />
      <path d="M21 5 C 23 11, 23 14, 20 16 L 20 26" />
      <path d="M17 5 L23 5" />
      <line x1="17" y1="26" x2="23" y2="26" />
      <path d="M11 8 C 14 11, 18 11, 21 8" opacity="0.6" />
    </svg>
  );
}

export function WreathIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <path d="M16 6 C 22 8, 26 13, 25 19 C 23 25, 17 27, 16 26" />
      <path d="M16 6 C 10 8, 6 13, 7 19 C 9 25, 15 27, 16 26" />
      <path d="M11 11 L 9 9" />
      <path d="M21 11 L 23 9" />
      <path d="M9 16 L 6 16" />
      <path d="M23 16 L 26 16" />
      <path d="M11 21 L 9 23" />
      <path d="M21 21 L 23 23" />
    </svg>
  );
}

export function DanceIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <circle cx="11" cy="8" r="2.5" />
      <circle cx="21" cy="8" r="2.5" />
      <path d="M11 11 L 11 18 L 13 26" />
      <path d="M21 11 L 21 18 L 19 26" />
      <path d="M13 14 C 16 12, 16 12, 19 14" />
      <path d="M13 19 L 19 19" />
    </svg>
  );
}

export function SparklerIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <line x1="8" y1="24" x2="18" y2="14" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <path d="M20 5 L 20 9" />
      <path d="M27 12 L 23 12" />
      <path d="M25 7 L 22 9" />
      <path d="M25 17 L 22 14" />
      <path d="M14 5 L 18 9" opacity="0.7" />
    </svg>
  );
}

export function ChurchIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <path d="M16 4 L 16 9" />
      <path d="M14 6 L 18 6" />
      <path d="M8 26 L 8 14 L 16 9 L 24 14 L 24 26" />
      <path d="M13 26 L 13 19 C 13 17, 19 17, 19 19 L 19 26" />
      <line x1="6" y1="26" x2="26" y2="26" />
    </svg>
  );
}

export function CarIcon({ size = 36, className }: IconProps) {
  return (
    <svg {...baseProps(size)} viewBox="0 0 48 32" className={className}>
      <path d="M4 22 L 8 13 C 9 11, 12 10, 14 10 L 30 10 C 33 10, 36 11, 38 14 L 42 18 L 44 22" />
      <line x1="4" y1="22" x2="44" y2="22" />
      <line x1="6" y1="22" x2="6" y2="25" />
      <line x1="42" y1="22" x2="42" y2="25" />
      <circle cx="13" cy="25" r="3" />
      <circle cx="35" cy="25" r="3" />
      <line x1="14" y1="14" x2="22" y2="14" />
      <line x1="26" y1="14" x2="34" y2="14" />
    </svg>
  );
}

export function EnvelopeIcon({ size = 96, className }: IconProps) {
  return (
    <svg
      {...baseProps(size)}
      viewBox="0 0 96 64"
      className={className}
      strokeWidth={0.7}
    >
      <rect x="3" y="6" width="90" height="52" rx="1" />
      <path d="M3 8 L 48 38 L 93 8" />
      <path d="M3 56 L 36 32" opacity="0.55" />
      <path d="M93 56 L 60 32" opacity="0.55" />
      {/* Wax seal */}
      <circle cx="48" cy="44" r="6" />
      <path d="M45 41 L 51 47 M51 41 L 45 47" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

export function DoveIcon({ size = 28, className }: IconProps) {
  return (
    <svg {...baseProps(size)} className={className}>
      <path d="M5 18 C 10 10, 18 8, 24 12 C 26 13, 27 16, 25 18 L 18 22 L 14 22 L 8 24 Z" />
      <path d="M14 22 L 16 28" />
      <circle cx="22" cy="13" r="0.6" fill="currentColor" />
      <path d="M24 12 L 28 9" opacity="0.6" />
    </svg>
  );
}

export const TIMELINE_ICONS = {
  rings: RingsIcon,
  flutes: FlutesIcon,
  wreath: WreathIcon,
  dance: DanceIcon,
  sparkler: SparklerIcon,
} as const;
