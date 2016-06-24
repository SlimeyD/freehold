const t               = require('tcomb')
const scheduleInit    = require('./scheduleInit')
const focusInput      = require('./focus-input')
const messageStream   = require('./message-stream')

const Effect = t.union([
  scheduleInit, 
  focusInput,
  messageStream
])

module.exports = Effect
