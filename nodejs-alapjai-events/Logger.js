const EventEmitter = require('events')

class Logger extends EventEmitter {
  error (error) {
    console.error('\x1b[31m', error, '\x1b[30m')
  }

  success (message) {
    console.log('\x1b[32m', message, '\x1b[30m')
  }
}

module.exports = Logger
