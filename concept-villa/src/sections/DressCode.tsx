import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export default function DressCode() {
  return (
    <section
      id="dress"
      className="relative px-6 py-24 sm:py-32 max-w-3xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="A note on attire">Dress Code</SectionHeading>
      </Reveal>

      <Reveal className="flex flex-col items-center text-center mt-10">
        <h3 className="font-display text-ivory-100 text-4xl sm:text-5xl mb-6">
          {wedding.dressCode.title}
        </h3>

        <div className="flex items-center gap-6 sm:gap-8 mb-7">
          {wedding.dressCode.swatches.map((s) => (
            <div key={s.name} className="flex flex-col items-center">
              <span
                className="block w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-1 ring-gold-400/40"
                style={{ backgroundColor: s.hex }}
                aria-label={s.name}
              />
              <span className="smallcaps text-[9px] tracking-caps text-ivory-200/70 mt-3">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        <p className="font-body italic text-ivory-200/85 leading-relaxed text-lg max-w-lg">
          {wedding.dressCode.note}
        </p>
      </Reveal>
    </section>
  );
}
