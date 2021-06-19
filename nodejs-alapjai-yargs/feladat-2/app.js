const yargs = require('yargs')
const { count } = require('./option')
const ProductsApi = require('./products.api')
const ProductsService = require('./products.service')
const { dbFilePath, propName } = require('./config')

const productsApi = ProductsApi(dbFilePath, propName)
const {
  sumAllProductPrice,
  avgAllProductPrice,
  lessThen
} = ProductsService(productsApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'sum',
    describe: 'The price of all products',
    builder: {},
    handler: async () =>
      console.log('\x1b[32m', `The price of all products: ${await sumAllProductPrice()} Ft`, '\x1b[30m')
  })
  .command({
    command: 'avg',
    describe: 'The average price of all products',
    builder: {},
    handler: async () =>
      console.log('\x1b[31m', `The average price of all products: ${await avgAllProductPrice()} Ft`, '\x1b[30m')
  })
  .command({
    command: 'lessthan',
    describe: 'Products with a count of less than the given pieces ',
    builder: { count },
    handler: async (args) =>
      console.log('\x1b[34m',
        `Products with a count of less than ${args.count}: 
        ${await lessThen(args.count)}`, '\x1b[30m')
  })
  .locale('en')
  .strict()
  .help()
  .parse() // process.argv
