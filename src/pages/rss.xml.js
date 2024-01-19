import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { byEntryDate } from '../utils'

const markdownParser = new MarkdownIt()

export async function GET(context) {
  const postEntries = await getCollection('posts')
  const sortedPosts = postEntries.toSorted(byEntryDate)

  const items = sortedPosts.map(post => {
    const { body, data, slug } = post
    const { date, description, title, tags } = data

    return {
      title,
      pubDate: date,
      description,
      link: slug,
      content: sanitizeHtml(markdownParser.render(body)),
      categories: tags,
    }
  })

  console.log(context)

  return rss({
    title: "Kyle Shevlin's Blog RSS Feed",
    description:
      'Kyle Shevlin is a software engineer who specializes in JavaScript, TypeScript, React and frontend web development.',
    link: 'https://kyleshevlin.com',
    site: context.site,
    items,
  })
}
