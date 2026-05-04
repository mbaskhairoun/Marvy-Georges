import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export default function Accommodations() {
  return (
    <section
      id="stay"
      className="relative px-6 py-24 sm:py-32 max-w-5xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="Where to rest your head">
          Accommodations
        </SectionHeading>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-12">
        {wedding.accommodations.map((hotel, i) => (
          <Reveal
            key={hotel.name}
            delay={i * 0.05}
            className="flex flex-col items-center text-center bg-espresso-500/60 ring-1 ring-gold-500/20 p-10"
          >
            <p className="smallcaps text-[10px] tracking-caps text-gold-400/80 mb-3">
              An option
            </p>
            <h3 className="font-heading italic text-ivory-100 text-3xl sm:text-4xl mb-4">
              {hotel.name}
            </h3>
            <p className="font-body text-ivory-200/80 leading-relaxed mb-7 max-w-sm">
              {hotel.blurb}
            </p>
            <a
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="smallcaps text-[10px] tracking-caps text-ivory-100 px-7 py-3 rounded-full border border-gold-400/70 hover:bg-gold-400/10 transition-colors"
            >
              Book Now
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
