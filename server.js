'use strict'
const http = require('http')
const websocket = require('websocket-stream')
const serveStatic = require('serve-static')
const finalHandler = require('finalhandler')
const toPull = require('stream-to-pull-stream')
const pull = require('pull-stream')

// variables
const port = process.env.PORT || 3000
const connections = {}
const messages = []
let connectionIdCounter = 0

// setup
const serve = serveStatic('public')

// server
const server = http.createServer((req, res) => {
  const done = finalHandler(req, res)
  serve(req, res, done)
})

const wss = websocket.createServer({ server: server }, stream => {
  pull(
    toPull.source(stream),
    pull.log()
  )
})

wss.on('connection', connection => {
  connection.id = connectionIdCounter ++
  connections[connection.id] = connection
  console.log(`${new Date()} Connection Id: ${connection.id} accepted`)

  connection.on('close', () => {
    console.log(`${new Date()} Connection Id: ${connection.id} closed`)
    delete connections[connection.id]
  })
})


// listen
if (require.main === module) {
  server.listen(port, function () {
    console.log(`server listening on ${port}`)
  })
}

module.exports = server
