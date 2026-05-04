import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ChurchIcon, FlutesIcon } from '../components/icons';

export default function CeremonyReception() {
  return (
    <section
      id="ceremony"
      className="relative px-6 py-24 sm:py-32 max-w-5xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="The evening">
          Ceremony &amp; Reception
        </SectionHeading>
      </Reveal>

      <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold-500/25 mt-8">
        <div className="bg-espresso-500 p-10 sm:p-12 flex flex-col items-center text-center">
          <div className="text-gold-300 mb-5">
            <ChurchIcon size={36} />
          </div>
          <p className="smallcaps text-[10px] tracking-caps text-gold-400/80 mb-3">
            Ceremony
          </p>
          <h3 className="font-heading italic text-ivory-100 text-3xl sm:text-4xl mb-4">
            {wedding.ceremony.venue}
          </h3>
          <p className="font-display text-ivory-100 text-2xl sm:text-3xl mb-3">
            {wedding.ceremony.time}
          </p>
          <p className="smallcaps text-[10px] tracking-caps-sm text-ivory-200/70 max-w-xs">
            {wedding.ceremony.address}
          </p>
        </div>

        <div className="bg-espresso-500 p-10 sm:p-12 flex flex-col items-center text-center">
          <div className="text-gold-300 mb-5">
            <FlutesIcon size={36} />
          </div>
          <p className="smallcaps text-[10px] tracking-caps text-gold-400/80 mb-3">
            Reception
          </p>
          <h3 className="font-heading italic text-ivory-100 text-3xl sm:text-4xl mb-4">
            {wedding.reception.venue}
          </h3>
          <p className="font-display text-ivory-100 text-2xl sm:text-3xl mb-3">
            {wedding.reception.time}
          </p>
          <p className="smallcaps text-[10px] tracking-caps-sm text-ivory-200/70 max-w-xs">
            {wedding.reception.address}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
