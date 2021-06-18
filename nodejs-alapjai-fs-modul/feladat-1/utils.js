const { mkdir, writeFile } = require('fs').promises

const folderMaker = async (folder) => {
  await mkdir(folder)
}

const fileMaker = async (file) => {
  await writeFile(file, '')
}

module.exports = {
  fileMaker,
  folderMaker
}
