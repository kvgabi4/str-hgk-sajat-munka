const { copyFile, rm } = require('fs').promises

const { createGzip } = require('zlib')
const { pipeline } = require('stream')
const {
  createReadStream,
  createWriteStream
} = require('fs')

const { promisify } = require('util')
const pipe = promisify(pipeline)

const copyTheFile = async (sourceFile, destinationFile) => {
  await copyFile(sourceFile, destinationFile)
}

const removeFiles = async (files) => {
  await files.forEach(file => rm(file))
}

async function doGzip (input) {
  const copiedFile = `${input}.bak`
  await copyTheFile(input, copiedFile)

  const gzip = createGzip()
  const source = createReadStream(copiedFile)
  const destination = createWriteStream(`${copiedFile}.gz`)

  await pipe(source, gzip, destination)

  await removeFiles([input, copiedFile])
}

module.exports = {
  doGzip
}
