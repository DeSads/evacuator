import PortableTextRenderer from '../PortableTextRender';
import type { TextBlock as SanityTextBlock } from '../../sanity.types';

type TextBlockProps = SanityTextBlock

export default function TextBlock({ title, content }: TextBlockProps) {
  return (
    <section className="container mx-auto py-12 px-4 max-w-3xl">
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
      {content && <div className="prose"><PortableTextRenderer value={content} /></div>}
    </section>
  );
}