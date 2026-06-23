import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Название сайта',
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
    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Социальные сети',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Платформа', type: 'string' }),
            defineField({ name: 'url', title: 'Ссылка', type: 'url' }),
          ],
        },
      ],
    }),
  ],

  // Для настроек обычно один документ, поэтому запрещаем создавать новые
  // (но это опционально)
  // options: { singleton: true } - можно настроить через структуру, пока пропустим
})