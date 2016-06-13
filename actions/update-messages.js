const t = require('tcomb')
const Messages = require('../models/messages')
const Model = require('../models/model')

const updateMessages = Messages.extend({}, 'updateMessages')

updateMessages.prototype.update = model => {
  return {
    model: Model.update(
      model,
      { messages: { $set
  }
}

