const http = require('http')
// const { url } = require('inspector')
const SiteRouter = require('./router/site.router')

const port = 8080
const dateNow = new Date().toLocaleDateString('hu')

const consoleLog = (url, method) => {
  console.log(`Date: ${dateNow} Url: ${url} Method: ${method}`)
}

http.createServer((req, res) => {
  consoleLog(req.url, req.method)
  SiteRouter[req.url] ? SiteRouter[req.url](res) : SiteRouter['/'](res)
})
  .on('error', err => console.log(`Server.error: ${err.message}`))
  .on('listening', () => console.log(`Run: http://127.0.0.1:${port}`))
  .listen(port)
