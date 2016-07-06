const t = require('tcomb')
const scheduleInit = require('./scheduleInit')
const focusInput = require('./focus-input')

const Effect = t.union([
  scheduleInit,
  focusInput
])

module.exports = Effect
