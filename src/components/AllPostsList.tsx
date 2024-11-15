import type { CollectionEntry } from 'astro:content'
import React from 'react'
import { TagReact } from '../icons/TagReact'
import { inflect } from '../utils'
import { Input } from './Inputs'
import { ShiftBy } from './ShiftBy'

function getFilteredPosts(posts: CollectionEntry<'posts'>[], search: string) {
  if (!search) return posts

  return posts.filter(post => {
    const allText = `
      ${post.data?.title}
      ${post.data?.subtitle}
      ${post.data?.description}
      ${post.data?.excerpt}
      ${post.data?.tags?.join(' ')}
    `.toLowerCase()

    return allText.includes(search.toLowerCase())
  })
}

export function AllPostsList({ posts }: { posts: CollectionEntry<'posts'>[] }) {
  const [search, setSearch] = React.useState(() => {
    if (typeof window === 'undefined') return ''

    return new URLSearchParams(window.location.search).get('search') || ''
  })

  const handleSearchChange = React.useCallback((value: string) => {
    setSearch(value)
    const params = new URLSearchParams(window.location.search)

    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    const paramStr = params.toString() ? `?${params.toString()}` : ''

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}${paramStr}`,
    )
  }, [])

  const filteredPosts = getFilteredPosts(posts, search)

  return (
    <div className="stack gap-4">
      <Input
        variant="block"
        label="Search posts"
        helperText="Search by title or tags"
        value={search}
        onChange={e => handleSearchChange(e.target.value)}
        placeholder="Search posts"
      />

      {filteredPosts.length > 0 ? (
        <div className="stack gap-2">
          <div className="text-sm text-gray-700">
            Displaying {filteredPosts.length}{' '}
            {inflect('post')(filteredPosts.length)}
          </div>

          <div className="-ml-4 flex flex-col">
            {filteredPosts.map(post => {
              const { subtitle, title } = post.data

              return (
                <a
                  key={post.slug}
                  className="stack block gap-2 p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  href={`/${post.slug}`}
                >
                  <div className="font-sans text-accent">
                    <div
                      className="text-2xl"
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <div className="font-bold">{subtitle}</div>
                  </div>

                  <div
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: post.data.description || post.data.excerpt || '',
                    }}
                  />

                  {post.data.tags?.length && (
                    <div className="flex items-center gap-4 pt-2 font-sans">
                      <span className="text-gray-300">
                        <ShiftBy y={2}>
                          <TagReact />
                        </ShiftBy>
                      </span>

                      {post.data.tags.map((tag: string) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      ) : (
        <div>No posts found</div>
      )}
    </div>
  )
}
