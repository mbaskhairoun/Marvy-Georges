function GoldDivider({ width = 180 }: { width?: number }) {
  return (
    <svg
      width={width}
      height="16"
      viewBox="0 0 180 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGradBar" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8a6a32" stopOpacity="0" />
          <stop offset="25%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="75%" stopColor="#a8874a" />
          <stop offset="100%" stopColor="#8a6a32" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="8"
        x2="78"
        y2="8"
        stroke="url(#goldGradBar)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradBar)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradBar)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
    </svg>
  );
}

function WineGlassIcon() {
  return (
    <svg
      width="28"
      height="36"
      viewBox="0 0 28 36"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wineGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <path
        d="M6 3 L22 3 C 22 12, 18 18, 14 18 C 10 18, 6 12, 6 3 Z"
        stroke="url(#wineGold)"
        strokeWidth="1.1"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M8 5 C 10 10, 18 10, 20 5"
        stroke="url(#wineGold)"
        strokeWidth="0.7"
        fill="#b45a2c"
        fillOpacity="0.35"
      />
      <line
        x1="14"
        y1="18"
        x2="14"
        y2="31"
        stroke="url(#wineGold)"
        strokeWidth="1.1"
      />
      <line
        x1="7"
        y1="32"
        x2="21"
        y2="32"
        stroke="url(#wineGold)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PageBar() {
  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col px-6 pt-6 pb-6">
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-2">
          Libations
        </p>

        <div className="h-px w-14 bg-rust-600/20 mb-3" />

        <div
          className="relative rounded-2xl overflow-hidden ring-1 ring-rust-600/20 shadow-lg flex-1 min-h-[140px] w-full mb-3"
          style={{ filter: "sepia(0.15) saturate(0.9)" }}
        >
          <img
            src="/venue/barrel-room-dark.webp"
            alt="barrel room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-cream-100/40 rounded-2xl pointer-events-none" />
        </div>

        <div className="flex items-center justify-center mb-1">
          <WineGlassIcon />
        </div>

        <h2
          className="font-display text-ink-900 text-[2.25rem] sm:text-5xl leading-[1]"
          style={{ letterSpacing: "-0.01em" }}
        >
          An Open Bar
        </h2>

        <div className="my-3">
          <GoldDivider width={150} />
        </div>

        <p className="font-serif italic text-ink-700 text-[13.5px] leading-snug max-w-[22rem]">
          Wines from the house, cocktails by the barrel, and toasts all
          around. Come thirsty, leave merry.
        </p>

        <p className="font-hand text-2xl text-rust-600 mt-3">
          to love &amp; long pours
        </p>
      </div>
    </div>
  );
}
