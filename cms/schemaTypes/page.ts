import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Страница',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок страницы',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-адрес (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Блоки контента',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'servicesListBlock' },
        { type: 'textBlock' },
        { type: 'contactBlock' },
        // при необходимости можно добавить другие блоки
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({ title, slug }) {
      return {
        title: title,
        subtitle: slug?.current ? `/${slug.current}` : 'без slug',
      }
    },
  },
})