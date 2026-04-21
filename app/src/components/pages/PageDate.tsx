import { useEffect, useState } from "react";

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
        <linearGradient id="goldGradDate" x1="0" x2="1" y1="0" y2="0">
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
        stroke="url(#goldGradDate)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradDate)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradDate)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
      <circle cx="82" cy="8" r="0.9" fill="#a8874a" />
      <circle cx="98" cy="8" r="0.9" fill="#a8874a" />
    </svg>
  );
}

export default function PageDate() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date("2026-06-30T18:00:00-04:00").getTime();
    const now = Date.now();
    const diff = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
    setDays(diff);
  }, []);

  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col p-6 pt-10 pb-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(60,30,10,0.14)_100%)]" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-2">
          Save the Date
        </p>

        <div className="h-px w-16 bg-rust-600/20 mb-6" />

        <div className="mb-4">
          <GoldDivider width={150} />
        </div>

        <p className="font-serif text-[11px] tracking-[0.55em] uppercase text-rust-700 mb-3">
          Tuesday
        </p>

        <h2
          className="font-display gilded leading-none text-[9rem] sm:text-[10rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          30
        </h2>

        <p className="font-serif text-[11px] tracking-[0.4em] uppercase text-brass-500 mt-3">
          June · MMXXVI
        </p>

        <div className="my-6">
          <GoldDivider width={150} />
        </div>

        <p className="font-serif italic text-xl text-ink-900">
          six o'clock in the evening
        </p>

        <p className="font-serif italic text-xs text-ink-700/70 mt-6 max-w-[18rem] leading-relaxed">
          June 30th is a Tuesday — but Canada Day is the very next day,
          so everyone is off.
        </p>

        {days !== null && (
          <p className="mt-8 font-serif italic text-xs text-rust-600/80 tracking-[0.2em]">
            — {days} days from today —
          </p>
        )}
      </div>

      <div className="relative z-10 text-center">
        <p className="font-serif italic text-xs text-ink-700/60">III</p>
      </div>
    </div>
  );
}
