import { Field } from 'payload'

export const ChapterTitle: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    hidden: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req: { payload } }) => {
        const manga = await payload.findByID({
          collection: 'manga',
          id: data?.manga,
        })

        return `${manga.title} - Chapter ${data?.chapterNumber}`
      },
    ],
    afterChange: [
      async ({ data, req: { payload } }) => {
        const manga = await payload.findByID({
          collection: 'manga',
          id: data?.manga,
        })

        return `${manga.title} - Chapter ${data?.chapterNumber}`
      },
    ],
  },
}
