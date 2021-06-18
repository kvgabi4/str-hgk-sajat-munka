const { doGzip } = require('./utils')

const file = 'C:/Users/frontend/frontend-halado/str-hgk-sajat-munka/nodejs-alapjai-fs-modul/feladat-2/input.txt'

doGzip(file)
  .catch((err) => {
    console.error('An error occurred:', err)
    process.exitCode = 1
  })
