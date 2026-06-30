import { useLoaderData } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import type { SiteSettings } from '../sanity.types'; // если тип есть

export default function ContactsPage() {
  const settings = useLoaderData() as SiteSettings | null;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Контакты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Левая колонка — контактные данные */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
          {settings ? (
            <div className="space-y-3 text-gray-700">
              {settings.phone && <p>📞 <strong>Телефон:</strong> {settings.phone}</p>}
              {settings.email && <p>✉️ <strong>Email:</strong> {settings.email}</p>}
              {settings.address && <p>📍 <strong>Адрес:</strong> {settings.address}</p>}
              {settings.socialLinks && settings.socialLinks.length > 0 && (
                <div>
                  <p className="font-semibold">Мы в соцсетях:</p>
                  <ul className="flex gap-4">
                    {settings.socialLinks.map((link: any, idx: number) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {link.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Контактные данные не загружены</p>
          )}
        </div>

        {/* Правая колонка — форма */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Напишите нам</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}