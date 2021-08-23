/*
 * This script is designed to create the directory structure and necessary files
 * for a new blog post.
 *
 * Parameters:
 * dirName: string - A hyphenated directory name
 */

const fs = require('fs')
const path = require('path')

function makePost(startingPath, directoryName, fileName, content = '') {
  if (!directoryName) {
    throw new Error('You need to supply a name for the new directory!')
  }

  try {
    fs.mkdirSync(path.resolve(startingPath, directoryName))
    fs.writeFileSync(
      path.resolve(startingPath, directoryName, fileName),
      content
    )
  } catch (err) {
    console.log(err)
  }
}

function makeFrontmatter(directoryName) {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now
    .getDate()
    .toString()
    .padStart(2, '0')

  const title = directoryName
    .split('-')
    .map(word => {
      const [firstLetter, ...rest] = word
      return `${firstLetter.toUpperCase()}${rest.join('')}`
    })
    .join(' ')

  const content = `
---
date: '${year}-${month}-${day}'
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

const POSTS_PATH = path.resolve('./src/posts/published')
const dirName = process.argv[2]

makePost(POSTS_PATH, dirName, 'index.mdx', makeFrontmatter(dirName))
