import { invitation } from "../../data/invitation";

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
        <linearGradient id="goldGradVenue" x1="0" x2="1" y1="0" y2="0">
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
        stroke="url(#goldGradVenue)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradVenue)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradVenue)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
    </svg>
  );
}

export default function PageVenue() {
  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col px-6 pt-6 pb-6">
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-2">
          The Place
        </p>

        <div className="h-px w-14 bg-rust-600/20 mb-3" />

        <div
          className="relative rounded-2xl overflow-hidden ring-1 ring-rust-600/20 shadow-lg flex-1 min-h-[140px] w-full mb-4"
          style={{ filter: "sepia(0.15) saturate(0.9)" }}
        >
          <img
            src="/venue/entrance-wide.webp"
            alt="The Hare Wine Co. entrance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-cream-100/40 rounded-2xl pointer-events-none" />
        </div>

        <h2
          className="font-display text-ink-900 text-[2rem] sm:text-4xl leading-[1.05]"
          style={{ letterSpacing: "-0.01em" }}
        >
          The Hare
          <br />
          Wine Co.
        </h2>

        <div className="my-3">
          <GoldDivider width={140} />
        </div>

        <p className="text-[10px] tracking-[0.35em] uppercase text-ink-900 font-serif leading-relaxed max-w-[20rem]">
          {invitation.venue.address}
        </p>

        <div className="h-px w-20 bg-rust-600/20 my-3" />

        <p className="font-serif italic text-ink-700 text-[13.5px] leading-snug max-w-[22rem]">
          A rustic winery wrapped in brick, barrels, and string lights
          on the Niagara Peninsula.
        </p>

        <a
          href={invitation.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center px-5 py-2 rounded-full border border-rust-600 text-rust-600 text-[11px] tracking-[0.35em] uppercase font-sans hover:bg-rust-600/10 transition-colors"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}
