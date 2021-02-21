/*
 * This script is designed to create the directory structure and necessary files
 * for a new blog post.
 *
 * Parameters:
 * dirName: string - A hyphenated directory name
 */

const fs = require('fs')
const path = require('path')

const SNIPPETS_PATH = path.resolve('./src/snippets')

function makeSnippet(fileName) {
  if (!fileName) {
    throw new Error('You need to supply a name for the new directory!')
  }

  try {
    const name = fileName
      .split('-')
      .map(word => {
        const [firstLetter, ...rest] = word
        return `${firstLetter.toUpperCase()}${rest.join('')}`
      })
      .join(' ')

    const frontmatter = `
---
slug: '${fileName}'
name: '${name}'
description: ''
category: ''
---
`.trim()

    fs.writeFileSync(
      path.resolve(SNIPPETS_PATH, `${fileName}.mdx`),
      frontmatter
    )
  } catch (err) {
    console.log(err)
  }
}

const fileName = process.argv[2]
makeSnippet(fileName)
