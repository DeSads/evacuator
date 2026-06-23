import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesListBlock',
  title: 'Блок со списком услуг',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок блока',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Избранные услуги (опционально)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }], // ссылаемся на документы "Услуга"
        },
      ],
      description: 'Если оставить пустым, будут показаны все услуги',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return { title: title || 'Блок услуг' }
    },
  },
})