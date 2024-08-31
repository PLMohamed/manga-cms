import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'
import { ChapterTitle } from './title'
import { toast } from '@payloadcms/ui'

export const Chapters: CollectionConfig = {
  slug: 'chapters',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['manga', 'chapterNumber', 'publishedAt'],
    livePreview: {
      url: async ({ data, payload }) => {
        const manga = await payload.findByID({
          collection: 'manga',
          id: data?.manga,
        })

        if (!manga) {
          toast.error("Manga field can't be empty")
          return '/'
        }

        const path = generatePreviewPath({
          path: `/${manga.title}/${typeof data?.chapterNumber ? encodeURIComponent(data.chapterNumber) : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        path: `/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      }),
    useAsTitle: 'title',
  },
  fields: [
    ChapterTitle,
    {
      name: 'manga',
      type: 'relationship',
      relationTo: 'manga',
      required: true,
    },
    {
      name: 'chapterNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
