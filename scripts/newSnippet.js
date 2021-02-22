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

function makeSnippet(slug) {
  if (!slug) {
    throw new Error('You need to supply a name for the new directory!')
  }

  try {
    const frontmatter = `
---
slug: '${slug}'
name: ''
description: ''
category: ''
---
`.trim()

    fs.writeFileSync(path.resolve(SNIPPETS_PATH, `${slug}.mdx`), frontmatter)
  } catch (err) {
    console.log(err)
  }
}

const slug = process.argv[2]
makeSnippet(slug)
