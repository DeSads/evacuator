import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Блок "Герой"',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Фоновое изображение',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaText',
      title: 'Текст на кнопке',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Ссылка кнопки',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return { title: title || 'Блок "Герой"', media }
    },
  },
})