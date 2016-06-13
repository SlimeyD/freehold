const t = require('tcomb')
const Messages = require('../models/messages')
const Message = require('../models/message')
const Model = require('../models/model')

const messageAdded = Message.extend({}, 'messageAdded')

messageAdded.prototype.update = function (model) {
  return {
    model: Model.update(
      model,
      { messages: { $push: [this] } }
    )
  }
}

module.exports = messageAdded
