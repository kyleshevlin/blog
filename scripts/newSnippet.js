/*
 * This script is designed to create the necessary files
 * for a new snippet.
 *
 * Parameters:
 * fileName: string - A hyphenated slug for the snippet
 */

const fs = require('fs')
const path = require('path')

const SNIPPETS_PATH = path.resolve('./src/snippets')

function makeSnippet(fileName) {
  if (!fileName) {
    throw new Error('You need to supply a `fileName`!')
  }

  try {
    const frontmatter = `
---
slug: '${fileName}'
name: ''
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
