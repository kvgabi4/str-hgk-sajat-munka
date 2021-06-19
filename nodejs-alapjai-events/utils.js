const { createReadStream, createWriteStream } = require('fs')
const { Transform } = require('stream')
const file = 'input.txt'

const readableStream = createReadStream(`${file}`, {
  encoding: 'utf8',
  highWaterMark: 512 * 1024
})

const capializeFirstLetters = new Transform({
  objectMode: true,
  transform (chunk, enc, done) {
    this.push(chunk.toString('utf8').split(' ')
      .map(word => {
        if (word.includes('\n')) {
          return `${word[0]}${word.trim()[0].toUpperCase()}${word.trim().slice(1)}`
        }
        return `${word.trim()[0].toUpperCase()}${word.trim().slice(1)}`
      }).join(' '))
    done()
  }
})

const writeableStream = createWriteStream(`${file.slice(0, file.length - 4)}Copy.txt`)

module.exports = {
  readableStream,
  capializeFirstLetters,
  writeableStream
}
