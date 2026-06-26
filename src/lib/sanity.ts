import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'j3s0eleg',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);