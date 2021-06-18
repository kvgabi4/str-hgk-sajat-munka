const { fileMaker, folderMaker } = require('./utils')

const folders = ['controllers', 'routers', 'views']
folders.forEach(item => folderMaker(item))

const files = ['./controllers/site.controller.js', './routers/site.router.js', './views/index.html', 'app.js']
files.forEach(item => fileMaker(item))
