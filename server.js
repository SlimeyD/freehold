'use strict'
const http = require('http')
const serveStatic = require('serve-static')
const finalHandler = require('finalhandler')
const port = process.env.PORT || 3000
const websocket = require('websocket-stream')

// setup
const serve = serveStatic('public')

// server
const server = http.createServer((req, res) => {
  const done = finalHandler(req, res)
  serve(req, res, done)
})

const wss = websocket.createServer({ server: server }, stream => {
  stream.on('data', d => {
    console.log('data', d.toString())
  })

  console.log('stream', stream.socket)

//  stream.socket.onopen(connection => {
 //   console.log('open', connection)
 // })

})



// listen
if (require.main === module) {
  server.listen(port, function () {
    console.log(`server listening on ${port}`)
  })
}

module.exports = server
