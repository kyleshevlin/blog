const makePost = require('./makePost')
const dirName = process.argv[2]

makePost(dirName, 'index.md')
