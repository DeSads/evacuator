import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactBlock',
  title: 'Блок контактов',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Адрес',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return { title: title || 'Блок контактов' }
    },
  },
})