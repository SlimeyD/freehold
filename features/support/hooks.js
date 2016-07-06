require('babel-register')
const config = require('../../config')
const server = require('../../server')

const start = cb => {
  console.log('server starting....')
  server.listen(config.proxy.port, cb)
}
const stop = cb => {
  console.log('server stopping...')
  server.close(cb)
}

module.exports = function () {
  this.registerHandler('BeforeFeatures', (features, cb) => start(cb))
  this.registerHandler('AfterFeatures', (features, cb) => stop(cb))
}
