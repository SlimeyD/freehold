const debug         = require('debug')('streams:message-added-stream')
const { pull }      = require('inu')
const messageAdded  = require('../actions/message-added')

const messages = client => {
  return pull(
    client.messages(),
    pull.map(message => {
      debug('message: ', message)
      return message
    }),
    pull.map(messageAdded)
  )
}

module.exports = messages

