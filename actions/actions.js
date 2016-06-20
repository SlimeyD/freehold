const t = require('tcomb')

const messageAdded = require('./message-added')
const setLocation = require('./set-location')
const focusInput = require('./focus-input')
const inputLoaded = require('./input-loaded')

const Action = t.union([
  messageAdded,
  setLocation,
  focusInput,
  inputLoaded
])

module.exports = Action
