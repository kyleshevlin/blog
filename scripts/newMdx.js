const makePost = require('./makePost')
const dirName = process.argv[2]

const frontmatterFormatter = frontmatter => {
  return `
${frontmatter}
import { FootnoteMarker as Marker } from '../../../components/Footnotes'
`
}

makePost(dirName, 'index.mdx', frontmatterFormatter)
