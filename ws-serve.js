// modules
const debug       = require('debug')('ws-serve')
const MRPC        = require('muxrpc')
const pull        = require('pull-stream')
const deepMerge   = require('deep-merge')
const Level       = require('level-party')
const pl          = require('pull-level')
const Sublevel    = require('level-sublevel')
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
      debug('addMessage -> :', message)
      const key = makeKey(message.author, message.dateTime)
      debug('key: ', key)
      db.get(key, function (err, _value) {
        debug('get -> ', err, _value)
        if (err || !_value) {
          db.put(key, message || {}, err => {
            debug('put -> ', err)
            cb(null, { message: message, action: 'put' })
          })
        } else {
          db.put(key, merge(_value, message) || {}, (err, v) => {
            debug('put2 ->', err)
            cb(null, { message: message, action: 'put' })
          })
        }
      })
    },

    messages: () => { 
      return pull(
        pl.live(db, { live: true }), 
        pull.map(dbAction => dbAction.value)
      )
    },

    db: db
  })

  pull(stream,  rpc.createStream(), stream)
}

