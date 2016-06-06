console.log('It really bloody works')
const websocket = require('websocket-stream')

const stream = websocket('ws://localhost:3000')

stream.on('data', d => {
  console.log('d', d)
})

stream.write(new Buffer('test'))
