const t = require('tcomb')

const Message = t.struct({ 
  text: t.String, 
  author: t.String, 
  dateTime: t.Integer
}, 'Message')

module.exports = Message

