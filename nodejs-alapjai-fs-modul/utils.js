const { mkdir } = require('fs')

const fileHandlerCallback = (err) => {
    if (err) throw err
    console.log('file process successful')
}

const folderAndFileMaker = ({ path, callback = fileHandlerCallback } = {}) => {
    mkdir(path, callback)
}

module.exports = {
    folderAndFileMaker
}