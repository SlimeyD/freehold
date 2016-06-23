const debug   = require('debug')('effects:message-stream')
const t       = require('tcomb')
const Message = require('../models/message')

const messageStream = Message.extend({}, 'messageStream')

messageStream.prototype.run = function (client) {
  debug('this: ', this)
  client.addMessage(this, (err, res) => {
    debug('err: ', err)
    debug('res: ', res)
  })
}

module.exports = messageStream
