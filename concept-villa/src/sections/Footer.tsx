import { wedding } from '../data/wedding';
import { Monogram } from '../components/Monogram';
import { Divider } from '../components/Divider';

export default function Footer() {
  return (
    <footer className="relative px-6 pt-16 pb-10 flex flex-col items-center text-center bg-espresso-700/60 border-t border-gold-500/15">
      <Monogram a={wedding.initials.a} b={wedding.initials.b} size={110} />

      <p className="font-heading italic text-ivory-100 text-2xl sm:text-3xl mt-6">
        With love,
      </p>
      <p className="font-display gilded text-3xl sm:text-4xl mt-2">
        {wedding.bride} <span className="amp">&amp;</span> {wedding.groom}
      </p>

      <div className="mt-7">
        <Divider width={200} />
      </div>

      <p className="font-body text-[12px] text-ivory-200/65 mt-7 max-w-md leading-relaxed">
        For questions, please write to the bride and groom at{' '}
        <a
          href={`mailto:${wedding.contactEmail}`}
          className="text-gold-300 hover:text-gold-200"
        >
          {wedding.contactEmail}
        </a>
        .
      </p>

      <a
        href="#hero"
        className="smallcaps text-[10px] tracking-caps text-gold-400/80 hover:text-gold-200 mt-10 inline-flex items-center gap-2"
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path
            d="M5 13 L5 1 M1 5 L5 1 L9 5"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to the top
      </a>
    </footer>
  );
}
