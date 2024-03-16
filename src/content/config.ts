import { defineCollection, z } from 'astro:content'

const coursesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    date: z.string().datetime(),
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
    date: z.string().datetime(),
    description: z.string(),
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
