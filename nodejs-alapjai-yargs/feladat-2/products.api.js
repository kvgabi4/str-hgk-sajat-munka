const { readFile } = require('fs').promises

const ProductsApi = (path, prop) => ({
  async get () {
    const dataString = await readFile(path, (err) => {
      if (err) throw err
    })
    return JSON.parse(dataString)[prop]
  }
})

module.exports = ProductsApi
