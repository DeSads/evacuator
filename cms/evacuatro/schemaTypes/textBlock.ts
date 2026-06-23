import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Текстовый блок',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Текст',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return { title: title || 'Текстовый блок' }
    },
  },
})