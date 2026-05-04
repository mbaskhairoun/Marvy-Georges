import { wedding } from '../data/wedding';

/**
 * Full-bleed hero with a centered scalloped/doily-edged oval frame.
 * Background photo is a sepia-treated venue shot — swap for a final
 * bridal-detail / doorway image when you have one.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center"
    >
      {/* TODO: swap for a final B&W bride/door/dress detail image */}
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80"
        alt="A doorway draped in vines, sepia-toned"
        className="absolute inset-0 w-full h-full object-cover bw-warm"
      />
      {/* Vignette + dark wash so cream text holds against any photo */}
      <div className="absolute inset-0 bg-espresso-700/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(20,10,5,0.85)_100%)]" />

      <div className="relative z-10 px-6 py-16 flex flex-col items-center text-center">
        <ScallopedFrame>
          <p className="smallcaps text-[10px] sm:text-[11px] tracking-caps text-gold-300/80 mb-6">
            {wedding.tagline}
          </p>

          <h1
            className="font-display text-ivory-100 text-[3.5rem] sm:text-7xl md:text-[6rem] leading-[0.95]"
            style={{ letterSpacing: '0.01em' }}
          >
            {wedding.bride}
            <span className="amp gilded mx-3 sm:mx-4">&amp;</span>
            {wedding.groom}
          </h1>

          <div className="mt-7 mb-2 flex justify-center">
            <ThinDivider />
          </div>

          <p className="smallcaps text-[10px] sm:text-[11px] tracking-caps text-ivory-200/85 mt-4">
            {wedding.dateDisplay}
          </p>
          <p className="smallcaps text-[10px] sm:text-[11px] tracking-caps text-ivory-200/85 mt-2">
            {wedding.location}
          </p>
        </ScallopedFrame>

        {/* Soft scroll hint */}
        <div className="mt-14 flex flex-col items-center text-gold-300/70">
          <p className="smallcaps text-[10px] tracking-caps mb-2">scroll</p>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect
              x="1"
              y="1"
              width="12"
              height="20"
              rx="6"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="7"
              y1="6"
              x2="7"
              y2="11"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

/**
 * The scalloped/doily oval. We draw the outer scallop as repeated arcs along
 * an ellipse, then a thin gold inner ellipse. The interior is mostly
 * transparent so the photograph shows through, with a touch of dark wash.
 */
function ScallopedFrame({ children }: { children: React.ReactNode }) {
  // 24 arcs around the ellipse — gives a delicate doily edge.
  const arcs = 24;
  const arcsArr = Array.from({ length: arcs });
  return (
    <div className="relative px-8 sm:px-14 py-12 sm:py-16">
      <svg
        viewBox="-100 -120 200 240"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="frame-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8a6a32" />
            <stop offset="50%" stopColor="#e7c77a" />
            <stop offset="100%" stopColor="#a8874a" />
          </linearGradient>
        </defs>
        {/* Soft dark wash inside the oval so text holds */}
        <ellipse
          cx="0"
          cy="0"
          rx="92"
          ry="112"
          fill="rgba(20,10,5,0.42)"
        />
        {/* Inner hairline */}
        <ellipse
          cx="0"
          cy="0"
          rx="84"
          ry="104"
          fill="none"
          stroke="url(#frame-gold)"
          strokeWidth="0.4"
          opacity="0.7"
        />
        {/* Outer hairline */}
        <ellipse
          cx="0"
          cy="0"
          rx="92"
          ry="112"
          fill="none"
          stroke="url(#frame-gold)"
          strokeWidth="0.5"
        />
        {/* Doily scallops */}
        {arcsArr.map((_, i) => {
          const theta = (i / arcs) * Math.PI * 2;
          const cx = Math.cos(theta) * 92;
          const cy = Math.sin(theta) * 112;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.2"
              fill="none"
              stroke="url(#frame-gold)"
              strokeWidth="0.4"
            />
          );
        })}
        {/* Top + bottom small leaf accents */}
        <path
          d="M0 -118 C -4 -113, -4 -109, 0 -104 C 4 -109, 4 -113, 0 -118 Z"
          fill="url(#frame-gold)"
        />
        <path
          d="M0 104 C -4 109, -4 113, 0 118 C 4 113, 4 109, 0 104 Z"
          fill="url(#frame-gold)"
        />
      </svg>
      <div className="relative max-w-md sm:max-w-lg">{children}</div>
    </div>
  );
}

function ThinDivider() {
  return (
    <svg width="180" height="10" viewBox="0 0 180 10" fill="none">
      <defs>
        <linearGradient id="hero-rule" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8a6a32" stopOpacity="0" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#8a6a32" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="5"
        x2="80"
        y2="5"
        stroke="url(#hero-rule)"
        strokeWidth="0.6"
      />
      <line
        x1="100"
        y1="5"
        x2="180"
        y2="5"
        stroke="url(#hero-rule)"
        strokeWidth="0.6"
      />
      <circle cx="90" cy="5" r="1.6" fill="#e7c77a" />
    </svg>
  );
}
