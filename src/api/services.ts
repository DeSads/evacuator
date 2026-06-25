import { client } from '../lib/sanity';
import type { Service } from '../sanity.types'

export async function getServices(): Promise<Service> {
    const query = `*[_type == "service"] | order(order asc, price asc) {
        _id,
        title,
        slug,
        price,
        description,
        image,
        order
    }`;
    const services = await client.fetch(query)
    return services
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    description,
    image,
    order
  }`;
  const service = await client.fetch(query, { slug });
  return service;
}