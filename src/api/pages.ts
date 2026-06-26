import { client } from '../lib/sanity';
import type { Page } from '../sanity.types';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    blocks[] {
      ...,
      ...select(_type == "servicesListBlock" => {
        featuredServices[]-> {
          _id,
          title,
          slug,
          price,
          description,
          image,
          order
        }
      })
    }
  }`;
  const page = await client.fetch(query, { slug });
  return page;
}