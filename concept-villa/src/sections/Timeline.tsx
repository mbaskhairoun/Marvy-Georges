import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { TIMELINE_ICONS } from '../components/icons';

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative px-6 py-24 sm:py-32 max-w-3xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="A loose plan">Our Timeline</SectionHeading>
      </Reveal>

      <ol className="relative mt-14 pl-12 sm:pl-16">
        {/* Hairline connecting line */}
        <span
          aria-hidden
          className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-gold-500/55 to-transparent"
        />

        {wedding.timeline.map((item, i) => {
          const Icon = TIMELINE_ICONS[item.icon as keyof typeof TIMELINE_ICONS];
          return (
            <Reveal
              as="article"
              key={item.title}
              delay={i * 0.05}
              className="relative pb-12 last:pb-0"
            >
              {/* Icon node sitting on top of the rule */}
              <span
                aria-hidden
                className="absolute -left-12 sm:-left-16 top-0 w-9 h-9 rounded-full border border-gold-500/55 bg-espresso-500 flex items-center justify-center text-gold-300"
              >
                {Icon && <Icon size={20} />}
              </span>

              <li className="list-none">
                <p className="smallcaps text-[10px] tracking-caps text-gold-400/80 mb-1">
                  {item.time}
                </p>
                <h3 className="font-heading italic text-ivory-100 text-2xl sm:text-3xl">
                  {item.title}
                </h3>
                <p className="font-body text-ivory-200/75 mt-2 leading-relaxed">
                  {item.detail}
                </p>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
