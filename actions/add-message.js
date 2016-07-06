// modules
const debug = require('debug')('actions:add-message')
const t = require('tcomb')
const Message = require('../models/message')
const messageStream = require('../effects/message-stream')

const addMessage = Message.extend({}, 'addMessage')

addMessage.prototype.update = function (model) {
  debug('message effect: ', messageStream(this))
  return {
    model: model,
    effect: messageStream(this)
  }
}

module.exports = addMessage
