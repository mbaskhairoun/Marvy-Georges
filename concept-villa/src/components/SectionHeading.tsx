import { Divider } from './Divider';

interface SectionHeadingProps {
  eyebrow?: string;
  children: string;
  /**
   * If you want a small italic line of subtext between the heading and the
   * divider — e.g. "an antique love letter" — pass it here.
   */
  subtitle?: string;
}

/**
 * The standard section heading: tracked small-caps eyebrow, big italic serif
 * title, hairline gold divider with a centered floret.
 */
export function SectionHeading({
  eyebrow,
  children,
  subtitle,
}: SectionHeadingProps) {
  return (
    <header className="flex flex-col items-center text-center mb-10">
      {eyebrow && (
        <p className="smallcaps text-[10px] sm:text-[11px] tracking-caps text-gold-400/80 mb-4">
          {eyebrow}
        </p>
      )}
      <h2
        className="font-heading italic text-ivory-100 text-4xl sm:text-5xl md:text-6xl leading-[1.05]"
        style={{ letterSpacing: '-0.005em' }}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="font-heading italic text-ivory-200/70 mt-3 text-base sm:text-lg max-w-xl">
          {subtitle}
        </p>
      )}
      <div className="mt-5">
        <Divider width={220} />
      </div>
    </header>
  );
}
