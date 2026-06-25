import { useState, useMemo } from "react";
import { useLoaderData, Link } from 'react-router-dom';
import { urlFor } from "../lib/sanity";    
import type { Service } from '../sanity.types';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import PortableTextRenderer from "../components/PortableTextRender";

export default function ServicesPage() {
    const services = useLoaderData() as Service[];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return services;
        return services.filter( service => service.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [services, searchTerm]);
    if (!services) return <div>Загрузка...</div>;
      return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Наши услуги</h1>
      
      {/* Поле поиска */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск услуги..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-md"
        />
      </div>

      {/* Список услуг */}
      {filteredServices.length === 0 ? (
        <p>Услуг не найдено</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }} // каждый элемент появляется чуть позже
            >
              <ServiceCard key={service._id} service={service} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}