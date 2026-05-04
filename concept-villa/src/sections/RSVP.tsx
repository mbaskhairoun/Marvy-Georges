import { wedding } from '../data/wedding';
import { Reveal } from '../components/Reveal';
import { Divider } from '../components/Divider';
import { EnvelopeIcon } from '../components/icons';

export default function RSVP() {
  const mailto = `mailto:${wedding.contactEmail}?subject=${encodeURIComponent(
    wedding.rsvp.subject
  )}&body=${encodeURIComponent(wedding.rsvp.body)}`;

  return (
    <section
      id="rsvp"
      className="relative px-6 py-24 sm:py-32 max-w-3xl mx-auto"
    >
      <Reveal className="flex flex-col items-center text-center">
        <p className="smallcaps text-[10px] sm:text-[11px] tracking-caps text-gold-400/80 mb-4">
          Your reply requested
        </p>
        <h2
          className="font-heading italic text-ivory-100 text-5xl sm:text-6xl md:text-7xl leading-[1] lowercase"
          style={{ letterSpacing: '0.005em' }}
        >
          Rsvp
        </h2>
        <div className="mt-5">
          <Divider width={220} />
        </div>

        <div className="mt-10 text-gold-300/80">
          <EnvelopeIcon size={120} />
        </div>

        <p className="font-body italic text-ivory-200/85 leading-relaxed text-lg max-w-lg mt-8">
          We would be so grateful to hear from you by{' '}
          <span className="text-ivory-100 not-italic font-heading">
            {wedding.rsvp.deadline}
          </span>
          . Tap below to send us a quick note — it will open your mail with
          everything we need already filled in.
        </p>

        <a
          href={mailto}
          className="mt-10 smallcaps text-[11px] tracking-caps text-ivory-100 px-9 py-3.5 rounded-full border border-gold-400/70 hover:bg-gold-400/10 transition-colors"
        >
          RSVP Now
        </a>

        <p className="font-body text-[12px] text-ivory-200/55 mt-6 max-w-md">
          Or write us at{' '}
          <a
            href={`mailto:${wedding.contactEmail}`}
            className="text-gold-300 hover:text-gold-200"
          >
            {wedding.contactEmail}
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
