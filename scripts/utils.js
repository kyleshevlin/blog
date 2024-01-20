import fs from 'fs'
import path from 'path'

export function fromDir(startingPath, regexPattern, callback) {
  if (!fs.existsSync) {
    console.error('No directory', startingPath)
    return
  }

  const files = fs.readdirSync(startingPath)

  files.forEach(file => {
    const filename = path.join(startingPath, file)
    const stat = fs.lstatSync(filename)

    if (stat.isDirectory()) {
      fromDir(filename, regexPattern, callback)
      return
    }

    if (regexPattern.test(filename)) {
      callback(filename)
    }
  })
}
