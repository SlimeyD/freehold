// modules
const debug       = require('debug')('ws-serve')
const MRPC        = require('muxrpc')
const pull        = require('pull-stream')
const deepMerge   = require('deep-merge')
const pl          = require('pull-level')
const path        = require('path')
const each        = require('lodash/fp/each')

// lib
const serialize   = require('./lib/serialize')
const api         = require('./api')

const makeKey = (author, dateTime) => `${author}-${dateTime}`
const merge = deepMerge((a, b, k) => b != null ? b : a)
const msg = { text: 'hello', author: 'batman', dateTime: Date.now() }
const messages = [msg]

module.exports = stream => {
  const db = Sublevel(Level('./db/messages', { valuencoding: 'json' }))

  const rpc = MRPC({}, api, serialize)({
    addMessage: (message, cb) => {
      cb(null, 'test')
    }
  })

  pull(stream,  rpc.createStream(), stream)
}

