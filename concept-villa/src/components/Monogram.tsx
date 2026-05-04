interface MonogramProps {
  a: string;
  b: string;
  size?: number;
}

/**
 * The couple's initials inside an oval cartouche with a hairline gold border
 * and a small leaf flourish at the top and bottom of the oval.
 */
export function Monogram({ a, b, size = 110 }: MonogramProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size * 1.18 }}
      aria-label={`Monogram: ${a} and ${b}`}
    >
      <svg
        viewBox="0 0 110 130"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mono-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8a6a32" />
            <stop offset="50%" stopColor="#e7c77a" />
            <stop offset="100%" stopColor="#a8874a" />
          </linearGradient>
        </defs>
        <ellipse
          cx="55"
          cy="65"
          rx="49"
          ry="58"
          stroke="url(#mono-gold)"
          strokeWidth="0.9"
          fill="none"
        />
        <ellipse
          cx="55"
          cy="65"
          rx="44"
          ry="53"
          stroke="url(#mono-gold)"
          strokeWidth="0.4"
          fill="none"
          opacity="0.6"
        />
        {/* Top leaf */}
        <path
          d="M55 4 C 51 9, 51 13, 55 18 C 59 13, 59 9, 55 4 Z"
          fill="url(#mono-gold)"
        />
        {/* Bottom leaf */}
        <path
          d="M55 112 C 51 117, 51 121, 55 126 C 59 121, 59 117, 55 112 Z"
          fill="url(#mono-gold)"
        />
      </svg>
      <span
        className="font-display gilded relative leading-none"
        style={{ fontSize: size * 0.42 }}
      >
        {a}
        <span className="amp px-1 text-ivory-200" style={{ fontSize: size * 0.34 }}>
          &amp;
        </span>
        {b}
      </span>
    </div>
  );
}
