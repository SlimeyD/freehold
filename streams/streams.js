// modules
const debug           = require('debug')('streams')
const many            = require('pull-many')

// streams
const messages        = require('./messages')
const setLocation     = require('./set-location')
const registerLoaded  = require('./register-loaded')

const Streams = client => {
  return many([
    messages(client),
    setLocation(),
    registerLoaded()
  ])
}

module.exports = Streams

