const MRPC        = require('muxrpc')
const pull        = require('pull-stream')
const Pushable    = require('pull-pushable')
const serialize   = require('./lib/serialize')
const api         = require('./api')

const msg = { text: 'hello', author: 'batman', dateTime: Date.now() }
const messages = [msg]
const messageStream = Pushable()


module.exports = stream => {
  const rpc = MRPC({}, api, serialize)({
    addMessage: (message, cb) => {
      messages.push(message)
      messageStream.push(messages)
      cb(null, { message: message, success: true })
    },

    messages: () => messageStream
  })

  pull(stream, rpc.createStream(), stream)
  messageStream.push(messages)
}



