'use strict'
//main
const debug         = require('debug')('server')
const http          = require('http')
const ws            = require('pull-ws-server')
const serveStatic   = require('serve-static')
const finalHandler  = require('finalhandler')
const map           = require('lodash/fp/map')

//lib
const wsServe       = require('./ws-serve')
const Router        = require('./components/router')
const Page          = require('./components/page')
const serverState   = require('./state/server')

// variables
const port = process.env.PORT || require('./config').port
const connections = {}
let connectionIdCounter = 0

// page routing
const serve = serveStatic('public')

// server
const server = http.createServer((req, res) => {
  const model = serverState()
  const html = Page(Router(model))
  debug('html: ', html)
  
  const done = finalHandler(req, res)
  serve(req, res, done)
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
