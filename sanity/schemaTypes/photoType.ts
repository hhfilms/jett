import { defineType, defineField } from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Set as Featured Image',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})