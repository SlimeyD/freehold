'use strict'
//main
const debug            = require('debug')('server')
const http             = require('http')
const ws               = require('pull-ws-server')
const serveStatic      = require('serve-static')
const finalHandler     = require('finalhandler')
const { start, pull }  = require('inu')
const toPull           = require('pull-stream-to-stream')
const createServer     = require('pull-http-server')

//lib
const wsServe       = require('./ws-serve')
const view          = require('./view')

// variables
const port = process.env.PORT || require('./config').port
const connections = {}
let connectionIdCounter = 0

// page routing
const serve = serveStatic('public')

// server
const server = createServer(stream => {
  debug('stream :', stream.source.url)

  pull(
    view(stream.source.url),
    pull.map(page => {
      debug('page; ', page)
      return page
    }),
    stream
  )
})

const wss = ws.createServer({ server: server }, wsServe)

wss.on('connection', connection => {
  connection.id = connectionIdCounter ++
  connections[connection.id] = connection
  console.log(`${new Date()} Connection Id: ${connection.id} accepted`)
})

// listen
if (require.main === module) {
  server.listen(port, function () {
    console.log(`server listening on ${port}`)
  })
}

module.exports = server
