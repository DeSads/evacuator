import { client } from '../lib/sanity';
import type { Service } from '../../sanity.types'

export async function getServices(): Promise<Service> {
    const query = `*[_type == "service"] | order(order asc, price sac) {
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