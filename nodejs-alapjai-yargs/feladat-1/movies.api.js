const { readFile, writeFile } = require('fs').promises

const MoviesApi = (path, prop) => ({
  async get () {
    const dataString = await readFile(path, (err) => {
      if (err) throw err
    })
    return JSON.parse(dataString)[prop]
  },

  async save (data) {
    await writeFile(path, JSON.stringify({ [prop]: data }), (err) => {
      if (err) throw err
    })
  }
})

module.exports = MoviesApi
