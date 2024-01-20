import { defineCollection, z } from 'astro:content'

const coursesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
    description: z.string(),
    logo: z.string(),
    nickname: z.string(),
    title: z.string(),
    url: z.string(),
  }),
})

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    coverImage: z.string().optional(),
    date: z.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
    description: z.string().optional(),
    excerpt: z.string().optional().nullable(),
    relatedPostsSlugs: z.array(z.string()).optional(),
    relevantCourseNickname: z.string().optional(),
    subtitle: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
})

const snippetCollection = defineCollection({
  type: 'content',
  schema: z.object({
    category: z.string(),
    description: z.string(),
    name: z.string(),
  }),
})

export const collections = {
  courses: coursesCollection,
  posts: postsCollection,
  snippets: snippetCollection,
}
