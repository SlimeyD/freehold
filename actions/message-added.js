// modules
const debug = require('debug')('actions:message-added')

// models
const Model = require('../models/model')
const Message = require('../models/message')

const messageAdded = Message.extend({}, 'messageAdded')

messageAdded.prototype.update = function (model) {
  debug('this: ', this)
  return {
    model: Model.update(
      model,
      { messages: { $push: [this] } }
    )
  }
}

module.exports = messageAdded
