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
        <linearGradient id="goldGradCover" x1="0" x2="1" y1="0" y2="0">
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
        stroke="url(#goldGradCover)"
        strokeWidth="0.8"
      />
      <line
        x1="102"
        y1="8"
        x2="180"
        y2="8"
        stroke="url(#goldGradCover)"
        strokeWidth="0.8"
      />
      <path
        d="M90 3 C 86 6, 86 10, 90 13 C 94 10, 94 6, 90 3 Z"
        fill="url(#goldGradCover)"
      />
      <circle cx="90" cy="8" r="1.1" fill="#e7c77a" />
      <circle cx="82" cy="8" r="0.9" fill="#a8874a" />
      <circle cx="98" cy="8" r="0.9" fill="#a8874a" />
    </svg>
  );
}

function CornerFlourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <linearGradient id="goldGradCornerCover" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#8a6a32" />
          <stop offset="50%" stopColor="#e7c77a" />
          <stop offset="100%" stopColor="#a8874a" />
        </linearGradient>
      </defs>
      <path
        d="M4 4 C 14 6, 22 10, 28 18 M 4 4 C 8 14, 14 22, 24 26"
        stroke="url(#goldGradCornerCover)"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="28" cy="18" r="1.2" fill="url(#goldGradCornerCover)" />
      <circle cx="24" cy="26" r="1.2" fill="url(#goldGradCornerCover)" />
    </svg>
  );
}

export default function PageCover() {
  return (
    <div className="h-full w-full paper-bg rounded-3xl shadow-paper relative overflow-hidden flex flex-col p-8 pt-14 pb-20">
      {/* watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
        style={{
          backgroundImage: "url('/initials.jpeg')",
          backgroundSize: "70%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          mixBlendMode: "multiply",
        }}
      />
      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(60,30,10,0.18)_100%)]" />

      {/* corner ornaments */}
      <div className="absolute top-4 left-4 opacity-80">
        <CornerFlourish />
      </div>
      <div className="absolute top-4 right-4 opacity-80">
        <CornerFlourish flip />
      </div>
      <div className="absolute bottom-10 left-4 opacity-80 rotate-180">
        <CornerFlourish flip />
      </div>
      <div className="absolute bottom-10 right-4 opacity-80 rotate-180">
        <CornerFlourish />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] tracking-[0.55em] uppercase text-rust-700/80 font-sans mb-3">
          The Engagement of
        </p>

        <div className="h-px w-16 bg-rust-600/20 mb-8" />

        <h1
          className="font-display text-ink-900 leading-[0.95] text-6xl sm:text-7xl"
          style={{ letterSpacing: "-0.01em" }}
        >
          An
          <br />
          Invitation
        </h1>

        <div className="my-8">
          <GoldDivider />
        </div>

        <p className="font-hand text-6xl text-rust-600 leading-[1.05]">
          {invitation.names.a}
          <span className="block font-serif italic text-2xl text-rust-500/70 my-2 tracking-widest">
            &
          </span>
          {invitation.names.b}
        </p>

        <div className="h-px w-16 bg-rust-600/20 mt-10 mb-4" />

        <p className="text-[10px] tracking-[0.5em] uppercase text-ink-700/70 font-serif">
          Summer · MMXXVI
        </p>
      </div>

      <div className="relative z-10 text-center">
        <p className="font-serif italic text-xs text-ink-700/60">I</p>
      </div>
    </div>
  );
}
