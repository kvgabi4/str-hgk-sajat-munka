const Option = ({ alias, describe, type = 'string', demandOption = true } = {}) => ({
  alias, describe, type, demandOption
})

const id = Option({
  alias: 'i',
  describe: 'Product ID',
  type: 'number'
})

const name = Option({
  alias: 'n',
  describe: 'Product name'
})

const price = Option({
  alias: 'p',
  describe: 'Product price',
  type: 'number'
})

const count = Option({
  alias: 'c',
  describe: 'Product count',
  type: 'number'
})

module.exports = Object.freeze({
  id,
  name,
  price,
  count
})
