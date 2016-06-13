const t = require('tcomb')

const messageAdded = require('./message-added')

// const Action = t.union([
//   messageAdded
// ], 'Action')

const Action = messageAdded

module.exports = Action
