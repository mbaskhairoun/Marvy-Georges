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
        <linearGradient id="goldGradRsvp" x1="0" x2="1" y1="0" y2="0">
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
        stroke="url(#goldGradRsvp)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradRsvp)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradRsvp)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
      <circle cx="82" cy="8" r="0.9" fill="#a8874a" />
      <circle cx="98" cy="8" r="0.9" fill="#a8874a" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="envGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="3"
        width="24"
        height="16"
        rx="1.5"
        stroke="url(#envGold)"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M2 5 L14 13 L26 5"
        stroke="url(#envGold)"
        strokeWidth="1.1"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PageRSVP() {
  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col px-6 pt-6 pb-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(60,30,10,0.12)_100%)]" />

      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-2">
          Répondez s'il vous plaît
        </p>

        <div className="h-px w-14 bg-rust-600/20 mb-3" />

        <div className="mb-2">
          <EnvelopeIcon />
        </div>

        <h2
          className="font-display text-ink-900 text-[2.25rem] sm:text-5xl leading-[0.95]"
          style={{ letterSpacing: "-0.01em" }}
        >
          Kindly
          <br />
          Reply
        </h2>

        <div className="my-3">
          <GoldDivider width={150} />
        </div>

        <p className="font-serif italic text-ink-700 text-[13.5px] leading-snug max-w-[20rem] mb-4">
          Your invitation will unlock a private RSVP page here —
          please check back soon. We'll write when it's ready.
        </p>

        <div className="w-full max-w-xs">
          <input
            disabled
            placeholder="Look up your name…"
            className="w-full px-4 py-2.5 rounded-full bg-cream-100/70 border border-brass-500/60 text-sm font-serif italic text-ink-700 placeholder:text-ink-700/50 text-center disabled:cursor-not-allowed focus:outline-none"
          />
          <button
            disabled
            className="mt-2 w-full px-5 py-2.5 rounded-full border border-brass-500/70 bg-transparent text-rust-600 text-[11px] tracking-[0.35em] uppercase font-sans disabled:cursor-not-allowed opacity-70"
          >
            Find my invitation
          </button>
          <p className="mt-2 font-serif italic text-[11px] tracking-[0.2em] text-ink-700/50">
            coming soon
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center pt-3">
        <div className="h-px w-20 bg-rust-600/20 mb-2" />
        <p className="font-serif italic text-[12px] tracking-[0.2em] text-ink-700/70 mb-1">
          with all our love
        </p>
        <p className="font-hand text-2xl text-rust-600 leading-tight">
          Marvy &amp; Georges
        </p>
      </div>
    </div>
  );
}
