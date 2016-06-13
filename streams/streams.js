const many = require('pull-many')
const messageAddedStream = require('./message-added-stream')

const Streams = stream => {
  return many([
    messageAddedStream(stream)
  ])
}

module.exports = Streams

