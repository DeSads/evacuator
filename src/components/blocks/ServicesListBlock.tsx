import ServiceCard from '../ServiceCard';
import type { ServicesListBlock as SanityServicesListBlock } from '../../sanity.types';

type ServicesListBlockProps = SanityServicesListBlock

export default function ServicesListBlock({ title, subtitle, featuredServices }: ServicesListBlockProps) {
  const services = featuredServices || [];
  return (
    <section className="container mx-auto py-12 px-4">
      {title && <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>}
      {subtitle && <p className="text-center text-gray-600 mb-8">{subtitle}</p>}
      {services.length === 0 ? (
        <p className="text-center text-gray-500">Нет избранных услуг</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}