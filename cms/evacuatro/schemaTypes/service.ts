import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',          // уникальное имя типа (используется в запросах)
  title: 'Услуга',          // отображаемое название в студии
  type: 'document',         // это документ — будет отдельная запись

  fields: [
    defineField({
      name: 'title',
      title: 'Название услуги',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'URL-адрес (slug)',
      type: 'slug',
      options: {
        source: 'title',    // генерируется из названия
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Цена (в рублях)',
      type: 'number',
      validation: (Rule) => Rule.positive().precision(2),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'array',
      of: [{ type: 'block' }], // rich text (жирный, списки и т.д.)
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: { hotspot: true }, // позволяет выбрать фокусную точку при обрезке
    }),
    defineField({
      name: 'order',
      title: 'Порядок сортировки',
      type: 'number',
      initialValue: 0,
    }),
  ],

  // Настройки сортировки в админке
  orderings: [
    {
      title: 'Цена (по возрастанию)',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Название (А–Я)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  // Как выглядит превью документа в списке
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Без названия',
        subtitle: subtitle ? `${subtitle} ₽` : 'Цена не указана',
        media: media,
      }
    },
  },
})