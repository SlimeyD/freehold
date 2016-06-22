const debug = require('debug')('streams')
const many = require('pull-many')
const messageAddedStream = require('./message-added-stream')
const setLocationStream = require('./set-location-stream')
const registerLoaded = require('./register-loaded')

const Streams = client => {
  return many([
    messageAddedStream(client),
    setLocationStream(),
    registerLoaded()
  ])
}

module.exports = Streams

