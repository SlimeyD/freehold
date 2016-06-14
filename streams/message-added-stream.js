const { pull } = require('inu')
const messageAdded = require('../actions/message-added')

const debug = require('debug')('streams:message-added-stream')

const messageAddedStream = stream => {
  debug('stream', messageAdded)
  return pull(
    stream,
    pull.map(message => {
      debug('message', typeof message, message)
      return message
    }),
    pull.map(JSON.parse),
    pull.map(message => {
      debug('message: ', message, typeof message) 
      return message
    }),
    pull.map(message => messageAdded(message))
  )
}

module.exports = messageAddedStream

