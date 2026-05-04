import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { Sprig } from '../components/Divider';
import { Monogram } from '../components/Monogram';

interface Vignette {
  title: string;
  body: string;
  image: string;
  alt: string;
}

const vignettes: Vignette[] = [
  {
    title: 'How we met',
    body:
      'A Saturday at a friend’s table, a long Italian dinner, and a glance that lingered after the wine had gone. We left at the same time, with the same coat, by the same door — and somehow, that was that.',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    alt: 'Two glasses on a candlelit table',
  },
  {
    title: 'Falling in love',
    body:
      'A first walk along the lake. A kitchen full of music. The slow discovery that home is not a place — it is a person, and we had each found ours.',
    image:
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    alt: 'A couple walking by the water at golden hour',
  },
  {
    title: 'The proposal',
    body:
      'A quiet evening, a winery in the off-season, and a question that had been waiting patiently for years. The answer was the easiest one ever given.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    alt: 'A lantern-lit doorway in old town',
  },
];

export default function LoveStory() {
  return (
    <section
      id="story"
      className="relative px-6 py-24 sm:py-32 max-w-6xl mx-auto"
    >
      <Reveal>
        <SectionHeading eyebrow="A short history">Our Love Story</SectionHeading>
      </Reveal>

      <div className="flex flex-col gap-16 sm:gap-24 mt-12">
        {vignettes.map((v, i) => {
          const flipped = i % 2 === 1;
          return (
            <Reveal
              key={v.title}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 sm:gap-16 ${
                flipped ? 'md:[direction:rtl]' : ''
              }`}
            >
              <div
                className={`relative ${
                  flipped ? 'md:[direction:ltr]' : ''
                }`}
              >
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden ring-1 ring-gold-500/30 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.7)]">
                  <img
                    src={v.image}
                    alt={v.alt}
                    loading="lazy"
                    className="w-full h-full object-cover bw-warm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-700/50 to-transparent" />
                  <div className="absolute inset-2 ring-1 ring-ivory-100/15 pointer-events-none" />
                </div>
              </div>

              <div
                className={`text-center md:text-left max-w-md mx-auto md:mx-0 ${
                  flipped ? 'md:[direction:ltr]' : ''
                }`}
              >
                <p className="smallcaps text-[10px] tracking-caps text-gold-400/80 mb-3">
                  Chapter {i + 1}
                </p>
                <h3 className="font-heading italic text-ivory-100 text-3xl sm:text-4xl mb-5">
                  {v.title}
                </h3>
                <p className="font-body text-[15px] sm:text-base leading-relaxed text-ivory-200/85">
                  {v.body}
                </p>
                {i < vignettes.length - 1 && (
                  <div className="hidden md:flex justify-start mt-8">
                    <Sprig />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.05} className="flex justify-center mt-20">
        <Monogram a={wedding.initials.a} b={wedding.initials.b} size={130} />
      </Reveal>
    </section>
  );
}
