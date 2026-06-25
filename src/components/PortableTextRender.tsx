import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

// Компонент для отображения форматированного текста из Sanity
interface Props {
  value: PortableTextBlock[]; // массив блоков
}

export default function PortableTextRenderer({ value }: Props) {
  if (!value || value.length === 0) return null;

  return (
    <div className="prose prose-sm max-w-none">
      <PortableText value={value} />
    </div>
  );
}