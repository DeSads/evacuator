import { useLoaderData } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import { motion } from 'framer-motion';
import PortableTextRenderer from '../components/PortableTextRender';
import type { Service } from '../sanity.types'; // или из другого файла

export default function ServiceDetailPage() {
  const service = useLoaderData() as Service;

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
        >
        {service.image && (
          <img
            src={urlFor(service.image).width(800).height(400).url()}
            alt={service.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        )}
        <h1 className="text-4xl font-bold mt-6">{service.title}</h1>
        <p className="text-2xl text-blue-600 mt-2">{service.price} ₽</p>
        <div className="mt-6 prose max-w-none">
          <PortableTextRenderer value={service.description} />
        </div>
        {/* Здесь можно добавить кнопку "Заказать" или форму */}
      </motion.div>
    </div>
  );
}