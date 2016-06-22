const { pull } = require('inu')
const messageAdded = require('../actions/message-added')

const debug = require('debug')('streams:message-added-stream')

const messageAddedStream = client => {
  return pull(
    client.messages(),
    pull.map(message => {
      debug('message', typeof message, message)
      return message
    }),
    pull.map(message => messageAdded(message))
  )
}

module.exports = messageAddedStream

