interface DividerProps {
  width?: number;
  className?: string;
}

/**
 * Hairline gold rule with a small ornamental flourish in the middle.
 * Used between sections to break the page softly.
 */
export function Divider({ width = 240, className = '' }: DividerProps) {
  return (
    <svg
      width={width}
      height="20"
      viewBox="0 0 240 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="div-gold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8a6a32" stopOpacity="0" />
          <stop offset="25%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="75%" stopColor="#a8874a" />
          <stop offset="100%" stopColor="#8a6a32" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="10"
        x2="100"
        y2="10"
        stroke="url(#div-gold)"
        strokeWidth="0.8"
      />
      <line
        x1="140"
        y1="10"
        x2="240"
        y2="10"
        stroke="url(#div-gold)"
        strokeWidth="0.8"
      />
      {/* Center floret — three leaves */}
      <path
        d="M120 4 C 116 8, 116 12, 120 16 C 124 12, 124 8, 120 4 Z"
        fill="url(#div-gold)"
      />
      <circle cx="120" cy="10" r="1.4" fill="#e7c77a" />
      <circle cx="110" cy="10" r="1" fill="#a8874a" />
      <circle cx="130" cy="10" r="1" fill="#a8874a" />
    </svg>
  );
}

/**
 * Tiny single-leaf flourish for use between paragraphs / story blocks.
 */
export function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg
      width="68"
      height="16"
      viewBox="0 0 68 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="sprig-gold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <path
        d="M2 8 C 12 3, 22 13, 34 8 C 46 3, 56 13, 66 8"
        stroke="url(#sprig-gold)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="34" cy="8" r="1.4" fill="url(#sprig-gold)" />
    </svg>
  );
}
