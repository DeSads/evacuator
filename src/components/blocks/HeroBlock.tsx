import { urlFor } from '../../lib/sanity';
import type { HeroBlock as SanityHeroBlock } from '../../sanity.types';
type HeroBlockProps = SanityHeroBlock

export default function heroBlock({ title, subtitle, backgroundImage, ctaText, ctaLink }: HeroBlockProps) {
  const bgUrl = backgroundImage ? urlFor(backgroundImage).width(1920).height(600).url() : '';
  return (
    <section
      className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : 'linear-gradient(to right, #1a202c, #2d3748)' }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative text-center max-w-2xl px-4">
        {title && <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>}
        {subtitle && <p className="text-lg md:text-xl mt-2">{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}