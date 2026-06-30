import { client } from '../lib/sanity';
import type { SiteSettings } from '../sanity.types';

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    title,
    phone,
    email,
    address,
    logo,
    socialLinks[] {
      platform,
      url
    }
  }`;
  const settings = await client.fetch(query);
  return settings;
}