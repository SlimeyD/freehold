const t = require('tcomb')
const Message = require('./message')

const Messages = t.list(Message, 'Messages')

module.exports = Messages
