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
        <linearGradient id="goldGradWelcome" x1="0" x2="1" y1="0" y2="0">
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
        stroke="url(#goldGradWelcome)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradWelcome)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradWelcome)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
      <circle cx="82" cy="8" r="0.9" fill="#a8874a" />
      <circle cx="98" cy="8" r="0.9" fill="#a8874a" />
    </svg>
  );
}

function VineOrnament() {
  return (
    <svg
      width="56"
      height="14"
      viewBox="0 0 56 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vineGoldWelcome" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <path
        d="M2 7 C 10 2, 18 12, 28 7 C 38 2, 46 12, 54 7"
        stroke="url(#vineGoldWelcome)"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="28" cy="7" r="1.2" fill="url(#vineGoldWelcome)" />
    </svg>
  );
}

export default function PageWelcome() {
  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col p-6 pt-10 pb-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(60,30,10,0.12)_100%)]" />

      <div className="relative z-10 flex-1 flex flex-col items-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-3">
          Chapter One
        </p>

        <div className="h-px w-16 bg-rust-600/20 mb-6" />

        <h2
          className="font-display text-ink-900 text-5xl sm:text-6xl leading-[1.02] mb-5"
          style={{ letterSpacing: "-0.01em" }}
        >
          A love story,
          <br />
          uncorked.
        </h2>

        <div className="mb-6">
          <GoldDivider width={160} />
        </div>

        <p className="font-serif italic text-ink-700 text-[15px] leading-relaxed mb-7 max-w-[22rem]">
          We fell in love slowly, and then all at once. Please celebrate
          with us among barrels, brick, and candlelight — somewhere
          beautiful between the vines and the lake.
        </p>

        <div
          className="relative rounded-2xl overflow-hidden ring-1 ring-rust-600/20 shadow-lg h-[40vh] min-h-[220px] w-full"
          style={{ filter: "sepia(0.15) saturate(0.9)" }}
        >
          <img
            src="/venue/cheers.webp"
            alt="cheers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-cream-100/40 rounded-2xl pointer-events-none" />
        </div>

        <div className="mt-5 mb-2">
          <VineOrnament />
        </div>

        <p className="font-hand text-3xl text-rust-500 leading-tight">
          a toast to forever
        </p>
      </div>

      <div className="relative z-10 text-center pt-3">
        <p className="font-serif italic text-xs text-ink-700/60">II</p>
      </div>
    </div>
  );
}
