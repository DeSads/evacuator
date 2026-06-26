import type { ContactBlock as SanityContactBlock } from "../../sanity.types";
type ContactBlockProps = SanityContactBlock

export default function ContactBlock({ title, phone, email, address }: ContactBlockProps) {
  return (
    <section className="container mx-auto py-12 px-4">
      {title && <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>}
      <div className="flex flex-wrap justify-center gap-8 text-center">
        {phone && (
          <div>
            <p className="text-sm text-gray-500">Телефон</p>
            <p className="text-lg font-semibold">{phone}</p>
          </div>
        )}
        {email && (
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold">{email}</p>
          </div>
        )}
        {address && (
          <div>
            <p className="text-sm text-gray-500">Адрес</p>
            <p className="text-lg font-semibold">{address}</p>
          </div>
        )}
      </div>
    </section>
  );
}