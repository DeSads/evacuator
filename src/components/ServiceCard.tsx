import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import PortableTextRenderer from './PortableTextRender';
import type { Service } from '../sanity.types';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <Link to={`/services/${service.slug.current}`} className="card-link block">
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        {service.image && (
          <img
            src={urlFor(service.image).width(400).height(250).url()}
            alt={service.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <p className="text-blue-600 font-bold mt-1">{service.price} ₽</p>
          {service.description && (
            <div className="mt-2 text-sm text-gray-600 line-clamp-3">
              <PortableTextRenderer value={service.description} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}