const t = require('tcomb')

const messageAdded = require('./message-added')
const setLocation = require('./set-location')

const Action = t.union([
  messageAdded,
  setLocation
])

module.exports = Action
