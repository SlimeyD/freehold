const many = require('pull-many')
const messageAddedStream = require('./message-added-stream')
const setLocationStream = require('./set-location-stream')

const Streams = stream => {
  return many([
    messageAddedStream(stream),
    setLocationStream()
  ])
}

module.exports = Streams

