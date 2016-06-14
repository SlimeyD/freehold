const t = require('tcomb')
const Messages = require('./messages')

const Model = t.struct({ 
  messages: Messages, 
  url: t.String
}, 'Model')

module.exports = Model

