import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { CarIcon } from '../components/icons';

export default function Transportation() {
  return (
    <section
      id="transportation"
      className="relative px-6 py-24 sm:py-32 max-w-3xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="Getting there">
          Transportation
        </SectionHeading>
      </Reveal>

      <Reveal className="flex flex-col items-center text-center mt-12">
        <div className="text-gold-300 mb-7">
          <CarIcon size={64} />
        </div>
        <p className="font-body text-ivory-200/85 leading-relaxed text-lg max-w-xl">
          {wedding.transportation.note}
        </p>
      </Reveal>
    </section>
  );
}
