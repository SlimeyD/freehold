const t = require('tcomb')

// actions
const addMessage    = require('./add-message')
const messageAdded  = require('./message-added')
const setLocation   = require('./set-location')
const focusInput    = require('./focus-input')
const inputLoaded   = require('./input-loaded')

const Action = t.union([
  addMessage,
  messageAdded,
  setLocation,
  focusInput,
  inputLoaded
])

module.exports = Action
