/*
 * This script is designed to create the directory structure and necessary files
 * for a new blog post.
 *
 * Parameters:
 * dirName: string - A hyphenated directory name
 */

import fs from 'fs'
import path from 'path'

function makePost(startingPath, directoryName, fileName, content = '') {
  if (!directoryName) {
    throw new Error('You need to supply a name for the new directory!')
  }

  try {
    fs.mkdirSync(path.resolve(startingPath, directoryName))
    fs.writeFileSync(
      path.resolve(startingPath, directoryName, fileName),
      content,
    )
  } catch (err) {
    console.log(err)
  }
}

function makeFrontmatter(directoryName) {
  const date = new Date().toISOString()

  const title = directoryName
    .split('-')
    .map(word => {
      const [firstLetter, ...rest] = word
      return `${firstLetter.toUpperCase()}${rest.join('')}`
    })
    .join(' ')

  const content = `
---
date: '${date}'
slug: '${directoryName}'
title: '${title}'
subtitle: null
description: ''
excerpt: null
tags: ['React']
relatedPostsSlugs: []
---
`.trim()

  return content
}

const POSTS_PATH = path.resolve('./src/content/posts')
const dirName = process.argv[2]

makePost(POSTS_PATH, dirName, 'index.mdx', makeFrontmatter(dirName))
