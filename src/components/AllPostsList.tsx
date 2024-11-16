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

    return allText.toLowerCase().includes(search.toLowerCase())
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
          <div className="text-sm text-gray-700 dark:text-gray-200">
            Displaying {filteredPosts.length}{' '}
            {inflect('post')(filteredPosts.length)}
          </div>

          <div className="-ml-4 flex flex-col">
            {filteredPosts.map(post => {
              const { subtitle, title } = post.data

              return (
                <a
                  key={post.slug}
                  className="stack block gap-2 p-4 transition-colors hover:bg-gray-100  dark:hover:bg-gray-800"
                  href={`/${post.slug}`}
                >
                  <div className="font-sans text-accent">
                    <HighlightedHTML
                      html={title}
                      search={search}
                      className="text-2xl"
                    />
                    {subtitle && (
                      <HighlightedHTML
                        html={subtitle}
                        search={search}
                        className="font-bold"
                      />
                    )}
                  </div>

                  <HighlightedHTML
                    html={post.data.description || post.data.excerpt || ''}
                    search={search}
                    className="text-gray-700 dark:text-gray-200"
                  />

                  {post.data.tags?.length && (
                    <div className="flex items-center gap-4 pt-2 font-sans">
                      <span className="text-gray-300">
                        <ShiftBy y={2}>
                          <TagReact />
                        </ShiftBy>
                      </span>

                      {post.data.tags.map((tag: string) => (
                        <HighlightedHTML key={tag} html={tag} search={search} />
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

const highlightHTML = (html: string, search: string): string => {
  if (!search?.trim() || !html) return html

  // Escape special characters in search term
  const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Create a temporary container
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  // Function to highlight text in a node
  const highlightTextNode = (textNode: Text) => {
    const regex = new RegExp(`(${escapedSearch})`, 'gi')
    const text = textNode.textContent || ''
    if (!regex.test(text)) return

    const wrapper = document.createElement('span')
    wrapper.innerHTML = text.replace(
      regex,
      '<mark class="bg-yellow-300 px-0.5">$1</mark>',
    )

    textNode.parentNode?.replaceChild(wrapper, textNode)
  }

  // Recursive function to process all text nodes
  const processNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      highlightTextNode(node as Text)
      return
    }

    const children = Array.from(node.childNodes)
    children.forEach(processNode)
  }

  // Process all nodes
  processNode(tempDiv)

  return tempDiv.innerHTML
}

function HighlightedHTML({
  html,
  search,
  className,
}: {
  html: string
  search: string
  className?: string
}) {
  const highlightedContent = React.useMemo(
    () => highlightHTML(html, search),
    [html, search],
  )

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
    />
  )
}
