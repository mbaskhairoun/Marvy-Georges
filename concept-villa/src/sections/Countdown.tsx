import { useEffect, useState } from 'react';
import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { Divider } from '../components/Divider';

interface Parts {
  d: number;
  h: number;
  m: number;
  s: number;
}

function diff(target: Date): Parts {
  const ms = Math.max(0, target.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

const pad = (n: number, len = 2) => n.toString().padStart(len, '0');

export default function Countdown() {
  const target = new Date(wedding.date);
  const [parts, setParts] = useState<Parts>(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setParts(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells: Array<[string, string]> = [
    [pad(parts.d, parts.d > 99 ? 3 : 2), 'Days'],
    [pad(parts.h), 'Hours'],
    [pad(parts.m), 'Minutes'],
    [pad(parts.s), 'Seconds'],
  ];

  return (
    <section
      id="countdown"
      className="relative px-6 py-24 sm:py-32 flex flex-col items-center"
    >
      <Reveal className="flex flex-col items-center text-center">
        <p className="smallcaps text-[10px] sm:text-[11px] tracking-caps text-gold-400/80 mb-4">
          The Countdown
        </p>
        <h2
          className="font-heading italic text-ivory-100 text-4xl sm:text-5xl md:text-6xl leading-[1.05]"
          style={{ letterSpacing: '-0.005em' }}
        >
          Forever starts in
        </h2>
        <div className="mt-5">
          <Divider width={220} />
        </div>

        <div className="mt-12 flex items-end gap-2 sm:gap-6 md:gap-10 font-display text-ivory-100">
          {cells.map(([num, label], i) => (
            <div key={label} className="flex items-end">
              <div className="flex flex-col items-center">
                <span className="text-[3rem] sm:text-7xl md:text-8xl leading-none tabular-nums">
                  {num}
                </span>
                <span className="smallcaps text-[9px] sm:text-[10px] tracking-caps text-gold-400/80 mt-3">
                  {label}
                </span>
              </div>
              {i < cells.length - 1 && (
                <span className="text-3xl sm:text-5xl md:text-6xl text-gold-400/60 mx-1 sm:mx-2 md:mx-4 pb-3 sm:pb-5 md:pb-6 leading-none">
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Cinematic horizontal photo beneath the count */}
      <Reveal delay={0.1} className="mt-20 w-full max-w-5xl">
        {/* TODO: swap for a wide cinematic B&W couple shot */}
        <div className="relative aspect-[21/9] w-full overflow-hidden ring-1 ring-gold-500/30 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.85)]">
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1800&q=80"
            alt="A tree-lined path at dusk, sepia-toned"
            loading="lazy"
            className="w-full h-full object-cover bw-warm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-700/60 via-transparent to-espresso-700/30" />
          <div className="absolute inset-2 ring-1 ring-ivory-100/15 pointer-events-none" />
        </div>
      </Reveal>
    </section>
  );
}
