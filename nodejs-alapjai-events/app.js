const Logger = require('./Logger')
const {
  readableStream,
  capializeFirstLetters,
  writeableStream
} = require('./utils')

const logger = new Logger()

readableStream
  .pipe(capializeFirstLetters)
  .pipe(writeableStream)

readableStream.on('error', (error) => logger.error(error.message))

writeableStream.on('error', (error) => logger.error(error.message))

writeableStream.on('finish', () => logger.success('File transform successful'))
