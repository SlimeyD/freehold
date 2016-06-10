const t = require('tcomb')
const Messages = require('./messages')

const Model = t.struct({ messages: Messages }, 'Model')

module.exports = Model

