const increaseAndFormatDate = require('./utils')

const dates = [new Date(1492,08,07), new Date(1999,11,30), new Date(2020,05,30), new Date(1970,00,01)]
console.log(increaseAndFormatDate(dates, 10))