const { pull } = require('inu')
const messageAdded = require('../actions/message-added')

const debug = require('debug')('streams:message-added-stream')

const messageAddedStream = stream => {
  debug('stream', messageAdded)
  return pull(
    stream,
    pull.map(JSON.parse),
    pull.map(message => {
      debug('message: ', typeof message) 
      return message
    }),
    pull.map(message => messageAdded(message))
  )
}

module.exports = messageAddedStream

