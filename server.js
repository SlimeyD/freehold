'use strict'
require('babel-register')
//main
const debug            = require('debug')('server')
const http             = require('http')
const ws               = require('pull-ws-server')
const pull             = require('inu').pull
const toPull           = require('stream-to-pull-stream')
const serveStatic      = require('serve-static')

//lib
const wsServe          = require('./ws-serve')
const render           = require('./view')

// variables
const port = process.env.PORT || require('./config').port
const connections = {}
let connectionIdCounter = 0

// page routing
const serve = serveStatic('public')

// server
const server = http.createServer((req, res) => {
  debug('url :', req.url)

  serve(req, res, () => {
    debug('next ------')
    pull(
      render(req.url),
      pull.drain(page => {
        debug('page: ', page)
        res.writeHead(200, { "Content-Type": 'text-plain' })
        res.end(page)
      })
    )
  })
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
