const muxrpc = require('muxrpc')
const pull = require('pull-stream')
const ws = require('pull-ws-server')
const serialize = require('./lib/serialize')
const port = require('./config').port

module.exports = manifest => {
  // create rpc object
  const client = muxrpc(manifest, false, serialize)()

  // setup rpc stream over websockets
  const protocol = (window.location.protocol == 'https:') ? 'wss:' : 'ws:'
  const stream = ws.connect(
    `${protocol}//${(window.location.hostname)}:${port}`,
    { onClose: onConnectionLost }
  )

  pull(stream, client.createStream(), stream)
  return client
}

const onConnectionLost = () => {
  document.body.classList.add('connection-lost')
}
