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
        <linearGradient id="goldGradDress" x1="0" x2="1" y1="0" y2="0">
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
        stroke="url(#goldGradDress)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradDress)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradDress)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
    </svg>
  );
}

function DressIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dressGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <path
        d="M9 3h6l-1 4 4 13H6l4-13-1-4Z"
        stroke="url(#dressGold)"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function TuxIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tuxGold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <path
        d="M6 4 L12 8 L18 4 L20 20 L4 20 L6 4 Z M12 8 V 18"
        stroke="url(#tuxGold)"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="13" r="0.6" fill="url(#tuxGold)" />
      <circle cx="12" cy="16" r="0.6" fill="url(#tuxGold)" />
    </svg>
  );
}

export default function PageDresscode() {
  const swatches = [
    { name: "cream", color: "#f4ead8" },
    { name: "sage", color: "#a8b89b" },
    { name: "sky", color: "#9bb0c1" },
    { name: "rust", color: "#b45a2c" },
  ];

  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col p-8 pt-14 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(60,30,10,0.12)_100%)]" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-2">
          Attire
        </p>

        <div className="h-px w-16 bg-rust-600/20 mb-6" />

        <div className="flex items-center gap-5 mb-5">
          <DressIcon />
          <span className="h-5 w-px bg-brass-500/50" />
          <TuxIcon />
        </div>

        <h2
          className="font-display text-ink-900 text-5xl sm:text-6xl leading-[0.95]"
          style={{ letterSpacing: "-0.01em" }}
        >
          Cocktail
          <br />
          Chic
        </h2>

        <div className="my-7">
          <GoldDivider width={160} />
        </div>

        <p className="font-serif italic text-ink-700 text-[15px] leading-relaxed max-w-[18rem] mb-9">
          Light & airy suits and dresses. Think linen, cream, sage,
          and summer wine.
        </p>

        <div className="flex items-center gap-5">
          {swatches.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full shadow-inner"
                style={{
                  background: s.color,
                  boxShadow:
                    "inset 0 0 0 1.5px rgba(231,199,122,0.9), 0 1px 2px rgba(60,30,10,0.15)",
                }}
              />
              <span className="text-[9px] tracking-[0.3em] uppercase text-ink-700/70 font-serif italic">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        <div className="h-px w-24 bg-rust-600/20 mt-9" />
      </div>

      <div className="relative z-10 text-center">
        <p className="font-serif italic text-xs text-ink-700/60">V</p>
      </div>
    </div>
  );
}
