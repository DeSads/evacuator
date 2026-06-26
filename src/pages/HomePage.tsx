import { useLoaderData } from 'react-router-dom';
import type { Page as SanityPage, Block as SanityBlock,} from '../sanity.types';
import HeroBlock from '../components/blocks/HeroBlock';
import ServicesListBlock from '../components/blocks/ServicesListBlock';
import TextBlock from '../components/blocks/TextBlock';
import ContactBlock from '../components/blocks/ContactBlock';

export default function HomePage() {
  const page = useLoaderData() as SanityPage | null;
  
  if (!page) {
    return <div className="container mx-auto py-12 text-center">Страница не найдена</div>;
  }

  return (
    <div>
      {page.blocks.map((block: SanityBlock) => {
        switch (block._type) {
          case 'heroBlock':
            return <HeroBlock key={block._key} {...block} />;
          case 'servicesListBlock':
            return <ServicesListBlock key={block._key} {...block} />;
          case 'textBlock':
            return <TextBlock key={block._key} {...block} />;
          case 'contactBlock':
            return <ContactBlock key={block._key} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}