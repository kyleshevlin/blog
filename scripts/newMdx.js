const makePost = require('./makePost')
const dirName = process.argv[2]

const frontmatterFormatter = frontmatter => {
  return `
${frontmatter}
`
}

makePost(dirName, 'index.mdx', frontmatterFormatter)
