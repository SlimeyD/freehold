'use strict'
const http = require('http')
const ws = require('pull-ws-server')
const serveStatic = require('serve-static')
const finalHandler = require('finalhandler')
const toPull = require('stream-to-pull-stream')
const toStream = require('pull-stream-to-stream')
const pull = require('pull-stream')
const JSONDL = require('pull-json-doubleline')

const map = require('lodash/fp/map')
const Message = require('./models/message')
// const Messages = require('./models/messages')
let messages = []

// variables
const port = process.env.PORT || 3000
const connections = {}
let connectionIdCounter = 0

// setup
const serve = serveStatic('public')

// server
const server = http.createServer((req, res) => {
  const done = finalHandler(req, res)
  serve(req, res, done)
})

const wss = ws.createServer({ server: server }, stream => {
  console.log('stream', stream)

  pull(stream, pull.through(console.log), stream)
 // pull(
 //   stream,
 //   JSONDL.parse(),
 //   pull.map(msg => {
 //     console.log('msg', msg)
 //     messages.push(Message(msg)) 
 //     return msg
 //   }),
 //   pull.drain(() => {
 //     console.log('drain: ', messages)
 //     pull(
 //       pull.values([messages]),
 //       JSONDL.stringify(),
 //       pull.map(messages => {
 //         console.log('messages out:', messages)
 //         return messages
 //       }),
 //       stream
 //     )
 //   })
 // )
})

wss.on('connection', connection => {
  connection.id = connectionIdCounter ++
  connections[connection.id] = connection
  console.log(`${new Date()} Connection Id: ${connection.id} accepted`)

  console.log('connection', connection)
  //connection.on('close', () => {
  //  console.log(`${new Date()} Connection Id: ${connection.id} closed`)
  //  delete connections[connection.id]
  //})
})


// listen
if (require.main === module) {
  server.listen(port, function () {
    console.log(`server listening on ${port}`)
  })
}

module.exports = server
