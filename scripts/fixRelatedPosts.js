/*
 * This script is intended to make sure that related posts are kept in sync,
 * That is, in the graph of related posts, each of them has a directional edge
 * to each other.
 *
 * If post A has relatedPostSlugs `[B, C]`, this script will ensure that
 * posts B and C also have `relatedPostSlugs` for A
 *
 * For now, the script merely find BROKEN related posts. Still working on the
 * automatic updating
 */

import fs from 'fs'
import path from 'path'
import { fromDir } from './utils'

const POSTS_PATH = path.resolve('./src/content/posts')

const SLUG_PATTERN = /(?<=slug: )'.*?'/g
const RELATED_POSTS_PATTERN = /(?<=relatedPostsSlugs.*?)\[.*?\]/gms

function fixRelatedPosts() {
  // Get all the mardown and mdx files
  // create a map of filename -> { slug, relatedPostsSlugs }
  // Loop through each file
  //   for each post in relatedPostsSlugs
  //   check if this file's slug is included
  //   if not, add it

  const filesToDataMap = {}
  const slugToRelatedPostsMap = {}

  fromDir(POSTS_PATH, /\.mdx?$/, filename => {
    try {
      const data = fs.readFileSync(filename).toString()
      const slugMatches = data.match(SLUG_PATTERN)
      const relatedPostsSlugsMatches = data.match(RELATED_POSTS_PATTERN)

      if (!(slugMatches && relatedPostsSlugsMatches)) return

      const slug = slugMatches[0].replace(/'/g, '')
      const relatedPostsSlugs = relatedPostsSlugsMatches[0]
        .replace('[', '')
        .replace(']', '')
        .replace(/'/g, '')
        .replace(/\n/g, '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)

      filesToDataMap[filename] = { slug, relatedPostsSlugs }
      slugToRelatedPostsMap[slug] = relatedPostsSlugs
    } catch (err) {
      console.log(err)
    }
  })

  Object.entries(filesToDataMap).forEach(
    ([_filename, { slug, relatedPostsSlugs }]) => {
      relatedPostsSlugs.forEach(rpSlug => {
        const otherPostRelatedPosts = slugToRelatedPostsMap[rpSlug] || []
        const result = otherPostRelatedPosts.includes(slug)

        if (!result) {
          console.log(`${rpSlug} IS MISSING POST ${slug}`)
        }
      })
    },
  )
}

fixRelatedPosts()
