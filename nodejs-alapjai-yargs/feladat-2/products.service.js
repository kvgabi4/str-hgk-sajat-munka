const MoviesService = (productsApi) => {
  const products = productsApi.get()

  const sumAllProductPrice = async () => {
    const sum = (await products)
      .reduce((acc, curr) => acc + curr.price * curr.count, 0)
    return sum
  }

  const avgAllProductPrice = async () => {
    const avg = Math.round((await sumAllProductPrice()) /
      (await products).reduce((acc, curr) => acc + curr.count, 0) * 100) / 100
    return avg
  }

  const lessThen = async (count) => {
    return JSON.stringify((await products)
      .filter(product => product.count < count))
  }

  return {
    sumAllProductPrice,
    avgAllProductPrice,
    lessThen
  }
}

module.exports = MoviesService
