// modules
const debug = require('debug')('streams')
const many = require('pull-many')

// streams
// const messages        = require('./messages')
const setLocation = require('./set-location')
const focusInputs = require('./focus-inputs')

const Streams = client => {
  debug('streams....')
  return many([
    setLocation(),
    focusInputs()
  ])
}

module.exports = Streams
