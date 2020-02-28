/*
 * This script is designed to create the directory structure and necessary files
 * for a new blog post.
 *
 * Parameters:
 * dirName: string - A hyphenated directory name
 */

const fs = require('fs')
const path = require('path')

const POSTS_PATH = path.resolve('./src/posts/published')
const identity = x => x

module.exports = function makePost(
  dirName,
  fileName,
  frontmatterFormatter = identity
) {
  if (!dirName) {
    throw new Error('You need to supply a name for the new directory!')
  }

  try {
    fs.mkdirSync(path.resolve(POSTS_PATH, dirName))

    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now
      .getDate()
      .toString()
      .padStart(2, '0')

    const title = dirName
      .split('-')
      .map(word => {
        const [firstLetter, ...rest] = word
        return `${firstLetter.toUpperCase()}${rest.join('')}`
      })
      .join(' ')

    const frontmatter = frontmatterFormatter(`
---
date: '${year}-${month}-${day}'
slug: '${dirName}'
title: '${title}'
description: ''
categories: ['JavaScript', 'Software Engineering', 'Web Development']
tags: ['React']
relatedPosts: []
---
`).trim()

    fs.writeFileSync(path.resolve(POSTS_PATH, dirName, fileName), frontmatter)
  } catch (err) {
    console.log(err)
  }
}
