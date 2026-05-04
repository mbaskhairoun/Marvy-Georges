import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative px-6 py-24 sm:py-32 max-w-3xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="A few answers">
          Wedding FAQs
        </SectionHeading>
      </Reveal>

      <div className="flex flex-col gap-8 sm:gap-10 mt-12">
        {wedding.faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04} as="article">
            <h3 className="font-heading italic text-ivory-100 text-xl sm:text-2xl mb-2">
              {item.q}
            </h3>
            <p className="font-body text-ivory-200/80 leading-relaxed">
              {item.a}
            </p>
            {i < wedding.faqs.length - 1 && (
              <div className="hairline mt-7" />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
