import { useState, useMemo } from "react";
import { useLoaderData } from 'react-router-dom';
import { urlFor } from "../lib/sanity";    
import type { Service } from '../../sanity.types'

export default function ServicesPage() {
    const services = useLoaderData() as Service[];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return services;
        return services.filter( service => service.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [services, searchTerm]);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service._id} className="border rounded p-4 shadow">
              {service.image && (
                <img
                  src={urlFor(service.image).width(300).height(200).url()}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-semibold mt-2">{service.title}</h2>
              <p className="text-gray-700 mt-1">{service.price} ₽</p>
              {/* Здесь можно добавить описание (но оно в формате Portable Text, пока пропустим) */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}