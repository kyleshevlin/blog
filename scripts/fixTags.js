/*
 * Doesn't really fix tags so much as show me a list of all the tags
 * I currently have, which allows me to go and fix some tags
 */

import fs from 'fs'
import path from 'path'
import { fromDir } from './utils.js'

const POSTS_PATH = path.resolve('./src/content/posts')
const TAGS_PATTERN = /(?<=tags: )\[.*?\]/gms

function fixTags() {
  const allTags = []

  fromDir(POSTS_PATH, /\.mdx?$/, filename => {
    try {
      const data = fs.readFileSync(filename).toString()
      const tagsMatches = data.match(TAGS_PATTERN)

      if (!tagsMatches) return

      const tags = tagsMatches[0]
        .replace('[', '')
        .replace(']', '')
        .replace(/'/g, '')
        .replace(/\n/g, '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)

      tags.forEach(tag => {
        allTags.push(tag)
      })
    } catch (err) {
      console.log(err)
    }
  })

  const tagCounts = [...allTags].sort().reduce((acc, cur) => {
    if (!acc[cur]) {
      acc[cur] = 0
    }

    acc[cur]++

    return acc
  }, {})

  console.log(tagCounts)
}

fixTags()
